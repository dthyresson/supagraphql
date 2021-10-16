import {
  getGraphQLParameters,
  processRequest,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix'

import { config } from './config'
import { renderPlaygroundPage } from 'graphql-playground-html'
import { getEnveloped } from './envelop'

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
