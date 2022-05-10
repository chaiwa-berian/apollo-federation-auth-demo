# Stack

## Backend

- `@apollo/federation` used to create a unified supergraph that combines multiple GraphQL APIs
- `@apollo/gateway` extends Apollo Server's functionality, enabling it to act as the gateway for a supergraph.
- `concurrently` This package provides dependency mangement for child procecesses and callbacks. It also allows you to create custom tasks that may then be added as a dependency elsewhere. We’ll use concurrently with a wildcard to start up all of the scripts with the `server:` prefix, at once.
- `apollo-server` used for accounts service
- `apollo-server-express` used for gateway API so we can use Express middleware to validate JWTs sent from the client.
- `express` used as a backend web application framework for Node.js.
- `graphql` a data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.
- `nodemon` used to automatically restarting the node application when file changes in the directory are detected.
- `wait-on` We will use wait-on to ensure that the accounts service is ready on port 4001 before starting the gateway application
