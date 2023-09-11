const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const routes = require('./routes')
const path = require("path");
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const cors = require('cors')
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "DELETE", "PATCH", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(routes);
  app.use('/graphql', expressMiddleware(server));
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};
startApolloServer();
