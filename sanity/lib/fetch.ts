import 'server-only'
import type { QueryParams } from 'next-sanity'
import { client } from './client'

export const CACHE_TAGS = {
  course: 'course',
  lesson: 'lesson',
  instructor: 'instructor',
  category: 'category',
} as const

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 3600,
  tags = [],
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  })
}
