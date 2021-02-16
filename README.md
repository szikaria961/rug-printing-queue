# Rug Printing Queue

Graph API for generating a priority queue for rugs to be printed.

## Installation

```
git clone https://github.com/szikaria961/rug-printing-queue.git
cd rug-printing-queue
npm install
```

## Usage

```
npm start
```

Then open [`http://localhost:8000/api`](http://localhost:8000/api) and use Graphiql to test the API.

Run the following query:

```
{
  getNextItemsToPrint(roll_length: 25.62, include_rush: true) {
    roll_length
    plan {
      id
      position
      size
      order_date
      sku
      rush
    }
  }
}
```

Then you'll get back a nested response like this:

```
{
  "data": {
    "getNextItemsToPrint": {
      "roll_length": 25.62,
      "plan": [
        {
          "id": 4,
          "position": 1,
          "size": "3x5",
          "order_date": "2020-10-14 10:10:10.000000",
          "sku": "RS-MY18-35",
          "rush": true
        },
        {
          "id": 6,
          "position": 2,
          "size": "2.5x7",
          "order_date": "2020-10-16 10:27:30.000000",
          "sku": "RS-DS55-27",
          "rush": true
        },
        {
          "id": 1,
          "position": 2,
          "size": "2.5x7",
          "order_date": "2020-10-13 04:27:30.000000",
          "sku": "RC-0027-27",
          "rush": true
        },
        {
          "id": 2,
          "position": 3,
          "size": "5x7",
          "order_date": "2020-10-13 04:27:30.000000",
          "sku": "RC-0030-57",
          "rush": true
        },
        {
          "id": 3,
          "position": 4,
          "size": "2.5x7",
          "order_date": "2020-10-14 09:14:30.000000",
          "sku": "RC-DY25-27",
          "rush": true
        },
        {
          "id": 8,
          "position": 4,
          "size": "2.5x7",
          "order_date": "2020-10-17 19:25:00.000000",
          "sku": "RS-AH27-27",
          "rush": true
        }
      ]
    }
  }
}
```

## Development

```
npm install -g nodemon
npm run dev
```

## License

MIT