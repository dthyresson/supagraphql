import 'dotenv-defaults/config'

/* eslint-disable no-console */
import Fastify from 'fastify'
import {
  getGraphQLParameters,
  processRequest,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix'
import {
  envelop,
  useLogger,
  useMaskedErrors,
  useSchema,
  useTiming,
} from '@envelop/core'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { renderPlaygroundPage } from 'graphql-playground-html'

/* Schema and Type Definitions */
import { typeDefs } from './sdl/graphql'

import { country, countries } from './resolvers/country'
import { hello } from './resolvers/hello'

const PORT = process.env.PORT

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      hello: () => hello(),
      country: async (_, { id }) => {
        return await country(id)
      },
      countries: async () => {
        return await countries()
      },
    },
  },
})

const getEnveloped = envelop({
  plugins: [useSchema(schema), useLogger(), useMaskedErrors(), useTiming()],
})

const app = Fastify({
  logger: { prettyPrint: true },
})

app.route({
  method: ['GET', 'POST'],
  url: '/graphql',
  async handler(req, res) {
    const { parse, validate, contextFactory, execute, schema } = getEnveloped({
      req,
    })
    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query,
    }

    if (shouldRenderGraphiQL(request)) {
      res.type('text/html')
      res.send(
        renderPlaygroundPage({
          endpoint: '/graphql',
        })
      )
    } else {
      const { operationName, query, variables } = getGraphQLParameters(request)
      const result = await processRequest({
        operationName,
        query,
        variables,
        request,
        schema,
        parse,
        validate,
        execute,
        contextFactory,
      })

      sendResult(result, res.raw)
    }
  },
})

app.listen(PORT, () => {
  console.log(`GraphQL server is running on port ${PORT}.`)
})
