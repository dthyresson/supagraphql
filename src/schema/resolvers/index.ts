import { signIn, signUp } from './authentication'
import { country, countries, updateCountry } from './country'
import { hello } from './hello'

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
    updateCountry: async (_, { id, input }, context) => {
      return await updateCountry({ id, input }, context)
    },
  },
}
