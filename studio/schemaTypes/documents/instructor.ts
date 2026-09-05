import { defineType, defineField, defineArrayMember } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const instructor = defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }),
      ],
    }),
    defineField({
      name: 'expertise',
      type: 'array',
      title: 'Expertise',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'bio',
      type: 'blockContent',
      title: 'Bio',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'expertise.0',
      media: 'photo',
    },
  },
})
