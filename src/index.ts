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
  useExtendContext,
  useLogger,
  useMaskedErrors,
  useSchema,
} from '@envelop/core'
import { useGenericAuth } from '@envelop/generic-auth'

import { renderPlaygroundPage } from 'graphql-playground-html'

import { config } from './config'
import { schema } from './schema/index'
import { validateUser, resolveUserFn, setAccessToken } from './lib/auth'
import { formatError } from './lib/errors'

const getEnveloped = envelop({
  plugins: [
    useSchema(schema),
    useExtendContext(async (contextSoFar) => {
      return setAccessToken(contextSoFar)
    }),
    useGenericAuth({
      resolveUserFn,
      validateUser,
      mode: 'protect-auth-directive',
    }),
    useLogger(),
    useMaskedErrors({ formatError }),
  ],
  enableInternalTracing: true,
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

      // Tell fastify a response was sent
      res.sent = true
    }
  },
})

app.listen(config.port, () => {
  console.log(`GraphQL server is running on port ${config.port}.`)
})
