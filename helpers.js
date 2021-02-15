const { db, runQuery } = require('./db');

const getNextItemsToPrint = async ({
  roll_length: rollLength,
  include_rush: includeRush
}) => {
  try {
    const rows = await runQuery({
      db,
      query: 'SELECT * FROM "order"'
    });

    return rows;
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
