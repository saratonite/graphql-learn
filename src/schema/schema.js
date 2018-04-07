const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;


// The BookType 

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: { type: GraphQLString },
        gener: { GraphQLString }
    })
})

// The RootQuery 

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: { 
            type: BookType,
            args: { id : { type: GraphQLString }},
            resolve(parent, args) {
                // Code to get data from db / other data
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})