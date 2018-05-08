const express = require('express');

const graphqlHttp = require('express-graphql')

const mongoose = require('mongoose')


const schema = require('./schema/schema');

// DB Connection

mongoose.connect('mongodb://127.0.0.1:27017/graphql-learn')

mongoose.connection.once('open', () => {
    console.log('DB Connected')
})

const app = express();


app.use('/graphql', graphqlHttp({
    schema: schema,
    graphiql: true
}))

const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Server listening on port ${port}`))