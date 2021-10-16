import 'dotenv-defaults/config'

export const config = {
  graphQLEndpoint: process.env.GRAPHQL_ENDPOINT || '/graphql',
  port: process.env.PORT || 3000,
}
