const { db, runQuery } = require('./db');
const { SELECT_ALL_TABLES } = require('./constants');
const _ = require('lodash');
const moment = require('moment');

const filterNotCancelledAndPending = row => {
  const isNotCancelled = row.cancelled === 'false';
  const isPending = row.status === 'Pending';

  return isNotCancelled && isPending;
}

const filterRushConditions = row => {
  const isNonRushedRug = row.rush === 'false';

  return row.includeRush || isNonRushedRug;
}

const partitionRushedRugBuckets = row => {
  const isRushed = row.rush === 'true';

  return isRushed;
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
          orderDateInMs: moment(row.order_date).valueOf(),
          includeRush
        }
      })
      .filter(filterNotCancelledAndPending)
      .filter(filterRushConditions)
      .sortBy('orderDateInMs')
      .partition(partitionRushedRugBuckets)
      .value();

    const prioritizedRugs = [...rushedRugs, ...nonRushedRugs];

    return prioritizedRugs;
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
