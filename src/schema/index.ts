import { makeExecutableSchema } from '@graphql-tools/schema'
/* Schema and Type Definitions */
import { typeDefs } from './sdl/typeDefs'
import { resolvers } from './resolvers/index'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
