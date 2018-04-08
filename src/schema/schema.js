const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;


// dummy Data 

const books = [
    { name:'Book 1', gener: 'Fantasy', id: '1'},
    { name:'Book 2', gener: 'Sci-Fi', id: '2'},
    { name:'Book 3', gener: 'Biography', id: '3'},
]

// The BookType 

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: { type: GraphQLString },
        gener: { type: GraphQLString }
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
                return books.find((book) => book.id == args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})