import { User as SupabaseUser } from '@supabase/supabase-js'

type token = {
  access_token: string
}

export type User = SupabaseUser & token
