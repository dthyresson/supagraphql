import { config } from '../config'

test('defaults the port', () => {
  expect(config.port).toBe('3000')
})

test('defaults the GraphQL endpoint', () => {
  expect(config.graphQLEndpoint).toBe('/graphql')
})
