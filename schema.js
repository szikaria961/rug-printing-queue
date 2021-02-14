const { buildSchema } = require('graphql');

const schema = buildSchema(`
  scalar Date

  type Query {
    getNextItemsToPrint(roll_length: Float!, include_rush: Boolean!): [Queue]
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
  getNextItemsToPrint: ({
    roll_length: rollLength,
    include_rush: includeRush
  }) => {
    console.log({ rollLength, includeRush });

    return [
      {
        "roll_id": 2562,
        "length": 14.2,
        "plan": [
          {
            "id": 5683,
            "position": 1,
            "size": "2.5x7",
            "order_date": "2020-10-13 04:27:30-07:00",
            "sku": "RS-1234-27",
            "rush": true
          },
          {
            "id": 2562,
            "position": 1,
            "size": "2.5x7",
            "order_date":"2020-09-14 16:24:24-07:00",
            "sku": "RC-1013-27",
            "rush": false
          },
          {
            "id": 9876,
            "position": 2,
            "size": "3x5",
            "order_date":"2020-11-22 10:02:06-07:00",
            "sku": "RS-1234-27",
            "rush": true
          },
          {
            "id": 5684,
            "position": 3,
            "size": "3x5",
            "order_date":"2020-11-22 10:30:24-07:00",
            "rush": true
          }
        ]
      }
    ]
  }
};

module.exports = {
  schema,
  rootValue
}
