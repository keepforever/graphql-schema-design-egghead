const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Product {
        name: String
        description: String
    }

    type Query {
        product(id: ID!): Product
    }
`;

/* Apollo server allows us to customize the mocks for a given query */

const mocks = {
    String: () => 'product something or other'
}

/* We can mock resolvers if we'd like. */

// const resolvers = {
//     Query: {
//         helloTwo: () => {
//             return 'helloTwo\'s string response'
//         }
//     }
// }

const server = new ApolloServer({
    typeDefs,
    mocks,
    mockEntireSchema: false 

});

server.listen(4001).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
