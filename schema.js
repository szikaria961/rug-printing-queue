const { buildSchema } = require('graphql');
const { getNextItemsToPrint } = require('./helpers');

const schema = buildSchema(`
  scalar Date

  type Query {
    getNextItemsToPrint(roll_length: Float!, include_rush: Boolean!): Queue
  }

  type Queue {
    roll_id: Int
    length: Float
    plan: [Plan]
  }

  type Plan {
    id: Int!
    position: Int
    size: String
    order_date: Date
    sku: String
    rush: Boolean
  }
`);

const rootValue = {
  getNextItemsToPrint
}

module.exports = {
  schema,
  rootValue
}
