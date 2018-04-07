const express = require('express');

const graphqlHttp = require('express-graphql')

const schema = require('./schema/schema');
const app = express();

app.use('/graphql', graphqlHttp({
    schema: schema,
    graphiql: true
}))

const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Server listening on port ${port}`))