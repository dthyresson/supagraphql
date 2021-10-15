export const typeDefs = /* GraphQL */ `
  directive @auth on FIELD_DEFINITION

  type Country {
    id: Int!
    name: String!
    local_name: String
    continent: String
    iso2: String
    iso3: String
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
    country(id: Int!): Country! @auth
    countries: [Country!]! @auth
  }

  type Mutation {
    signUp(email: String!, password: String!): User!
    signIn(email: String!, password: String!): User!
  }
`
