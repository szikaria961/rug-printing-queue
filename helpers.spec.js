const { getNextItemsToPrint } = require('./helpers');

describe('getNextItemsToPrint', () => {
  test('returns correct printer queue', () => {
    const exampleInput = {
      "roll_length": 25.62,
      "include_rush": true
    }

    const exampleOutput = {
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

    expect(getNextItemsToPrint(exampleInput)).toEqual(exampleOutput);
  });
});