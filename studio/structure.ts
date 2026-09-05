import type { StructureResolver } from 'sanity/structure'
import { BookIcon, PlayIcon, UserIcon, TagIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Courses')
        .schemaType('course')
        .icon(BookIcon)
        .child(S.documentTypeList('course').title('Courses')),
      S.listItem()
        .title('Lessons')
        .schemaType('lesson')
        .icon(PlayIcon)
        .child(S.documentTypeList('lesson').title('Lessons')),
      S.divider(),
      S.listItem()
        .title('Instructors')
        .schemaType('instructor')
        .icon(UserIcon)
        .child(S.documentTypeList('instructor').title('Instructors')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .icon(TagIcon)
        .child(S.documentTypeList('category').title('Categories')),
    ])
