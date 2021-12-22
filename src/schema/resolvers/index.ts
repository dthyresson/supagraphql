import { signIn, signUp, updateRoles } from './authentication'
import {
  country,
  countries,
  deleteCountry,
  createCountry,
  updateCountry,
} from './country'
import { hello } from './hello'

/**
 * Resolvers map to Queries and Mutations
 */
export const resolvers = {
  Query: {
    hello: () => hello(),
    country: async (_, { id }, context) => {
      return await country(id, context)
    },
    countries: async (context) => {
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
    createCountry: async (_, { input }, context) => {
      return await createCountry({ input }, context)
    },
    deleteCountry: async (_, { id }, context) => {
      return await deleteCountry({ id }, context)
    },
    updateCountry: async (_, { id, input }, context) => {
      return await updateCountry({ id, input }, context)
    },
    updateRoles: async (_, { roles }) => {
      return await updateRoles(roles)
    },
  },
}
