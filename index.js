const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, rootValue } = require('./schema');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(
  '/api',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }),
);

app.listen(PORT, () => {
  console.log(`[ index.js ] Running express server with GQL on port ${PORT}`);
});
