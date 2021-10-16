import {
  getGraphQLParameters,
  processRequest,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix'

import { config } from './config'
import { renderPlaygroundPage } from 'graphql-playground-html'
import { getEnveloped } from './envelop'

/**
 * handleGraphQLRequest uses Envelop and GraphQL-Helix
 * to handle the incoming GraphQL request and then
 * parse, validate, setup and extend the context (for authentication),
 * and execute (resolve) the query or mutation.
 *
 * It also will render the GraphQL playground,
 *
 * @param req Incoming request with a query or mutation
 * @param res Response contains GraphQL data.
 */
export const handleGraphQLRequest = async (req, res) => {
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
        endpoint: config.graphQLEndpoint,
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
}
