const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Image {
        url: String
        description: String
        thumbnailUrl(width: Int, height: Int): String
    }
    # adding an enum for more configurable fields. We will then add an optional argument to the
    # description field on Product that takes one of the enums
    enum ProductDescriptionFormat {
        TEXT
        HTML
    }
    # We can do a similar thing to specify language
    enum Locales {
        ENGLISH
        FRENCH
        SPANISH
        GERMAN
    }
    # adding @deprecated directive will give a warning in the playground
    type Product {
        name: String
        # by adding "... = TEXT" we provide a default value.
        description(format: ProductDescriptionFormat = TEXT, locale: Locales = EN): String
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
};

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
