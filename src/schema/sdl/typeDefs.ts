export const typeDefs = /* GraphQL */ `
  directive @auth on FIELD_DEFINITION

  enum Continent {
    AFRICA
    ANTARCTICA
    ASIA
    EUROPE
    OCEANIA
    NORTH_AMERICA
    SOUTH_AMERICA
  }

  type Country {
    id: Int!
    name: String!
    local_name: String
    continent: Continent
    iso2: String!
    iso3: String
  }

  input UpdateCountryInput {
    name: String
    iso2: String
    iso3: String
    local_name: String
    continent: Continent
  }

  type Credentials {
    email: String!
    password: String!
  }

  type User {
    id: String!
    email: String!
    access_token: String
  }

  type Query {
    hello: String!
    country(id: Int!): Country!
    countries: [Country!]!
  }

  type Mutation {
    signUp(email: String!, password: String!): User!
    signIn(email: String!, password: String!): User!
    updateCountry(id: Int!, input: UpdateCountryInput!): Country! @auth
  }
`
