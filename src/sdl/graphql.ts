export const typeDefs = /* GraphQL */ `
  type Country {
    id: Int!
    name: String!
    local_name: String
    continent: String
    iso2: String
    iso3: String
  }

  type Query {
    hello: String!
    country(id: Int!): Country!
    countries: [Country!]!
  }
`
