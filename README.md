# supagraphql

GraphQL server using Supabase, GraphQL Helix, Envelop and Fastify

This example relies on the Supabase sample Countries data being loaded into the `countries` table.

## Envelop example with GraphQL-Helix

This example demonstrate how to implement the basic GraphQL Envelop flow with Envelop and [`graphql-helix`](https://github.com/contrawork/graphql-helix).

GraphQL-Helix provides a GraphQL execution flow, that abstract the HTTP execution, and allow you to easily support multiple transports, based on your needs.

## Setup

1. Create new project on Supabase
2. Create the Quick Start sample `Countries` data

![Countries Quick Start](https://github.com/dthyresson/supagraphql/blob/main/docs/screens/countries_quick_start.png 'Countries Quick Start')

## Running the GraphQL Server

1. Install all dependencies from the root of the repo (using `yarn`)
2. Configure `.env` with your Supabase client `SUPABASE_URL` and `SUPABASE_KEY` from the Supabase API settings
3. `cd` into that folder, and run `yarn start`.
4. Open http://localhost:3000/graphql in your browser, and try to run:

`query { hello }`

![Hello](https://github.com/dthyresson/supagraphql/blob/main/docs/screens/query_hello.png 'Hello')

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

![Countries](https://github.com/dthyresson/supagraphql/blob/main/docs/screens/query_countries.png 'Countries')

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

![Country](https://github.com/dthyresson/supagraphql/blob/main/docs/screens/query_country.png 'Country')
