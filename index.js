const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Fiz {
        alpha: String
    }

    type Foo {
        bar: String,
        fiz: [Fiz]
    }

    type Query {
        hello: String,
        helloTwo: String,
        myFoo: Foo
    }
`;

/* Apollo server allows us to customize the mocks for a given query */

const mocks = {
    String: () => 'my custom string value' /* since the scalar type String starts with uppercase "S",
    the entry in the mocks object must also */
}

/* We can mock resolvers if we'd like. */

const resolvers = {
    Query: {
        helloTwo: () => {
            return 'helloTwo\'s string response'
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    /* Activate mock mode. Allows us to not need to write resolvers. Apollo will
    automatically return objects based on the return type provided in typeDefs */
    // mocks: true // use this when you don't want to provide any custom mocks.
    mocks, // mocks resolvers per your mocks option config.
    resolvers,
    mockEntireSchema: false // must use this if providing custom resolvers.

});

server.listen(4001).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
