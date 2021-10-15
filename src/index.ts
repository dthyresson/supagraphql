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
import {
  useGenericAuth,
  ResolveUserFn,
  ValidateUserFn,
} from '@envelop/generic-auth'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { renderPlaygroundPage } from 'graphql-playground-html'

/* Schema and Type Definitions */
import { typeDefs } from './sdl/graphql'

import { signIn, signUp, verifyToken } from './resolvers/auth'
import { country, countries } from './resolvers/country'
import { hello } from './resolvers/hello'

import type { User } from './types/user'

const PORT = process.env.PORT

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      hello: () => hello(),
      country: async (root, { id }, context) => {
        return await country(context, id)
      },
      countries: async (root, args, context) => {
        return await countries(context)
      },
    },
    Mutation: {
      signUp: async (_, { email, password }) => {
        return await signUp(email, password)
      },
      signIn: async (_, { email, password }) => {
        return await signIn(email, password)
      },
    },
  },
})

const resolveUserFn: ResolveUserFn<User> = async (context) => {
  // Here you can implement any custom sync/async code, and use the context built so far in Envelop and the HTTP request
  // to find the current user.
  // Common practice is to use a JWT token here, validate it, and use the payload as-is, or fetch the user from an external services.
  // Make sure to either return `null` or the user object.

  try {
    const headers = context.req['headers'] || {}
    const authorization = headers['authorization']
    const access_token = authorization.split(' ')[1]

    const session = verifyToken(access_token)

    const user = { ...session, access_token } as User

    return user
  } catch (e) {
    context.req['log'].error('Failed to validate token')

    return null
  }
}
const validateUser: ValidateUserFn<User> = async (user, _context) => {
  // Here you can implement any custom to check if the user is valid and have access to the server.
  // This method is being triggered in different flows, based on the mode you chose to implement.

  // If you are using the `protect-auth-directive` mode, you'll also get 2 additional parameters: the resolver parameters as object and the DirectiveNode of the auth directive.

  if (!user) {
    throw new Error(`Unauthenticated!`)
  }
}

const getEnveloped = envelop({
  plugins: [
    useSchema(schema),
    useGenericAuth({
      resolveUserFn,
      validateUser,
      mode: 'protect-auth-directive',
    }),
    useLogger(),
    useMaskedErrors(),
    useTiming(),
  ],
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
