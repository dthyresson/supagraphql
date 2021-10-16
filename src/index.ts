/* eslint-disable no-console */
import Fastify from 'fastify'

import { config } from './config'
import { handleGraphQLRequest } from './helix'

const app = Fastify({
  logger: { prettyPrint: true },
})

app.register(import('fastify-cors'), {
  origin: true,
  credentials: true,
})

app.route({
  method: ['GET', 'POST'],
  url: config.graphQLEndpoint,
  async handler(req, res) {
    handleGraphQLRequest(req, res)

    // Tell fastify a response was sent
    res.sent = true
  },
})

app.listen(config.port, () => {
  console.log(
    `GraphQL server is running at ${config.graphQLEndpoint} on port ${config.port}.`
  )
})
