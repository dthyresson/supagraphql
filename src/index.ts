/* eslint-disable no-console */
import Fastify from 'fastify'

import { config } from './config'
import { handleGraphQLRequest } from './helix'

// Fastify with logger
const app = Fastify({
  logger: { prettyPrint: process.env.NODE_ENV !== 'production' },
})

// We'll setup cors ...
app.register(import('fastify-cors'), {
  origin: true,
  credentials: true,
})

app.route({
  method: ['GET'],
  url: '/',
  async handler(req, res) {
    res.redirect('/graphql')
  },
})

// and just need a single route to handle GraphQL requests at
// the configured endpoint (/graphql).
// Note: We allow GET for the GraphQL playground, but all
// other GraphQL requests will be POSTs.
app.route({
  method: ['GET', 'POST'],
  url: config.graphQLEndpoint,
  async handler(req, res) {
    // do the work of parsing, validating, executing
    // the GraphQL request and send back a result
    handleGraphQLRequest(req, res)

    // Tell fastify a response was sent
    res.sent = true
  },
})

// and finally start up!
app.listen(config.port, '0.0.0.0', () => {
  console.log(
    `GraphQL server is running at ${config.graphQLEndpoint} on port ${config.port}.`
  )
})
