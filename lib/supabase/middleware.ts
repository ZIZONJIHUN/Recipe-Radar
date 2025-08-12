import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'
import type { Database } from './types'

export function createMiddlewareSupabaseClient(req: NextRequest, res: Response) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          res = new Response(res.body, {
            status: res.status,
            statusText: res.statusText,
            headers: res.headers,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            res.headers.append('Set-Cookie', `${name}=${value}; Path=/; ${options ? Object.entries(options).map(([key, val]) => `${key}=${val}`).join('; ') : ''}`)
          )
        }
      }
    }
  )
}