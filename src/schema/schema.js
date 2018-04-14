const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;


// dummy Data 

const books = [
    { name:'Book 1', gener: 'Fantasy', id: '1', authorId: '1'},
    { name:'Book 2', gener: 'Sci-Fi', id: '2', authorId: '2'},
    { name:'Book 3', gener: 'Biography', id: '3', authorId: '3'}
]

const authors = [
    { name: 'Author 1', age: 50, id: "1"},
    { name: 'Author 2', age: 90, id: "2"},
    { name: 'Author 3', age: 53, id: "3"}
]

// The BookType 

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        gener: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {

                return authors.find(author => author.id === parent.authorId)
            }
        }
    })
})

// The Author Type

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }

    })
})

// The RootQuery 

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: { 
            type: BookType,
            args: { id : { type: GraphQLID }},
            resolve(parent, args) {
                // Code to get data from db / other data
                return books.find((book) => book.id == args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {
                // Code to get author data
                return authors.find(author => author.id == args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})