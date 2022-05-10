const {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const app = express();
app.get(
  "/protected",
  jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),
  function (req, res) {
    if (!req.auth.admin) return res.sendStatus(401);
    res.sendStatus(200);
  }
);

const port = 4000;
app.use(
  jwt({
    secret: "f1BtnWgD3VKY",
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [{ name: "accounts", url: "http://localhost:4001" }],
  }),
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http.headers.set(
          "user",
          context.user ? JSON.stringify(context.user) : null
        );
      },
    });
  },
});

async function startApolloServer(gateway, app) {
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    // With Apollo Federation,adding user object to the gateway API'scontext
    //  doesn't automatically make this information available to the resolvers
    // in the implementing services.
    // To pass the user data on to the accounts service, we'll need to add
    //  a buildService method to the ApolloGateway config
    context: ({ req }) => {
      const user = req.user || null;
      return { user };
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}

startApolloServer(gateway, app);
