const { db, runQuery } = require('./db');
const _ = require('lodash');
const moment = require('moment');

const {
  SELECT_ALL_TABLES,
  RUG_DIMENSION_MAPPINGS,
  STARTING_POSITION,
  ROLL_WIDTH,
  RUNNER_DIMENSION,
  DIMENSION_DELIMITER,
  ITEM_DELETE_COUNT
} = require('./constants');

const filterRushConditions = row => {
  const isNonRushedRug = row.rush === 'false';

  return row.includeRush || isNonRushedRug;
}

const partitionRushedRugBuckets = row => {
  const isRushed = row.rush === 'true';

  return isRushed;
}


const getPrintingDetails = ({ size }) => {
  return {
    printingDimension: RUG_DIMENSION_MAPPINGS[size],
    isRunner: size === RUNNER_DIMENSION
  }
}

const partitionRunners = row => {
  return row.isRunner && row.isPairedRunner;
}

const getNextItemsToPrint = async ({
  roll_length: rollLength,
  include_rush: includeRush
}) => {
  try {
    const rows = await runQuery({
      db,
      query: SELECT_ALL_TABLES
    });

    const [rushedRugs, nonRushedRugs] = _.chain(rows)
      .map(row => {
        return {
          ...row,
          includeRush,
          ...getPrintingDetails(row)
        }
      })
      .filter(filterRushConditions)
      .partition(partitionRushedRugBuckets)
      .value();

    let isPairedRunner = false;

    const prioritizedRugs = _.map([...rushedRugs, ...nonRushedRugs], rug => {
      let output = {}

      if (rug.isRunner) {
        output = {
          ...rug,
          isPairedRunner
        }

        isPairedRunner = !isPairedRunner;
      } else {
        output = {
          ...rug
        }
      }

      return output;
    });

    let [
      pairedRunners,
      printableRugs
    ] = _.partition(prioritizedRugs, partitionRunners);

    let remainingRollLength = rollLength;
    let position = STARTING_POSITION;
    const plan = [];

    _.forEach(printableRugs, rug => {
      if (remainingRollLength > rug.printingDimension) {
        plan.push({
          id: rug.id,
          position,
          size: rug.size,
          order_date: rug.order_date,
          sku: rug.sku,
          rush: rug.rush === 'true'
        });

        if (rug.isRunner && pairedRunners.length > 0) {
          const topPairedRunner = pairedRunners[0];

          plan.push({
            id: topPairedRunner.id,
            position,
            size: topPairedRunner.size,
            order_date: topPairedRunner.order_date,
            sku: topPairedRunner.sku,
            rush: topPairedRunner.rush === 'true'
          });

          pairedRunners = _.drop(pairedRunners);
        }

        remainingRollLength -= rug.printingDimension;
        position += 1;
      }
    });

    return {
      roll_length: rollLength,
      plan
    }
  } catch (error) {
    return {
      error
    }
  }
  return null;
}

module.exports = {
  getNextItemsToPrint
}
