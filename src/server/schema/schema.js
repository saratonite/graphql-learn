const graphql = require('graphql')

const { GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList, GraphQLNonNull }= graphql;

// Models 

const Book = require('../models/book');
const Author = require('../models/author');

// dummy Data 

const books = [
    { name:'Book 1', gener: 'Fantasy', id: '1', authorId: '1'},
    { name:'Book 2', gener: 'Sci-Fi', id: '2', authorId: '2'},
    { name:'Book 3', gener: 'Biography', id: '3', authorId: '3'},
    { name:'Book 4', gener: 'Biography', id: '4', authorId: '3'}
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

                //return authors.find(author => author.id === parent.authorId)
               return Author.findById(parent.authorId)
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
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return books.filter(book => book.authorId === parent.id)
                return Book.find({authorId:parent.id});
            }
        }

    })
})

// Mutations

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });

                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type:  new GraphQLNonNull(GraphQLString)},
                gener: { type: new GraphQLNonNull(GraphQLString)},
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {

                let book = new Book({
                    name: args.name,
                    gener: args.gener,
                    authorId: args.authorId
                })

                return book.save();

            }
        }
    }
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
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {
                // Code to get author data
                return Author.findById(args.id)
            }
        },
        books : {
            type: new GraphQLList(BookType),
            resolve() {
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                return Author.find({});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})