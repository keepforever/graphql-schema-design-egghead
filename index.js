const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Image {
        url: String
        description: String
        thumbnailUrl(width: Int, height: Int): String
    }
# adding @deprecated directive will give a warning in the playground
    type Product {
        name: String
        description: String
        imageUrl: String @deprecated(reason: "use image instead")
        image: Image
    }

    type Query {
        product(id: ID!): Product
    }
`;

/* Apollo server allows us to customize the mocks for a given query */

const mocks = {
    String: () => 'my custom string',
    Product: () => ({
        imageUrl: () => null
    })
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
