# supagraphql

GraphQL server using Supabase, GraphQL Helix, Envelop and Fastify

This example relies on the Supabase sample Countries data being loaded into the `countries` table.

## Envelop example with GraphQL-Helix

This example demonstrate how to implement the basic GraphQL Envelop flow with Envelop and [`graphql-helix`](https://github.com/contrawork/graphql-helix).

GraphQL-Helix provides a GraphQL execution flow, that abstract the HTTP execution, and allow you to easily support multiple transports, based on your needs.

## Setup

1. Create new project on Supabase
2. Create the sample `Countries` data

## Running the GraphQL Server

1. Install all dependencies from the root of the repo (using `yarn`)
2. Configure `.env` with your Supabase client `SUPABASE_URL` and `SUPABASE_KEY` from the Supabase API settings
3. `cd` into that folder, and run `yarn start`.
4. Open http://localhost:3000/graphql in your browser, and try to run:

`query { hello }`

```
query COUNTRIES {
  countries {
    id
    name
    iso2
    iso3
    continent
  }
}
```

```
// with { "id": 234 }
query GET_COUNTRY($id: Int!) {
  country(id: $id) {
    id
    name
    iso2
    continent
  }
}
```
