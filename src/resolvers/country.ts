import { GraphQLError } from 'graphql'

import { supabase } from '../lib/supabase'

import type { Country } from '../types/country'

export const country = async (context, id: number): Promise<Country> => {
  console.log(context.currentUser.access_token, '<<< in country')

  supabase.auth.setAuth(context.currentUser.access_token)

  const { data: country, error } = await supabase
    .from('countries')
    .select('id, name, local_name, continent, iso2, iso3')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new GraphQLError('Country not found')
  }

  return country
}

export const countries = async (context): Promise<[Country]> => {
  console.log(context.currentUser.access_token, '<<< in countries')
  supabase.auth.setAuth(context.currentUser.access_token)

  const { data: countries, error } = await supabase
    .from('countries')
    .select('id, name, local_name, continent, iso2, iso3')
    .order('name', { ascending: true })

  if (error) {
    console.error(error)
    throw new GraphQLError('Could not fetch Countries.')
  }

  return countries as [Country]
}
