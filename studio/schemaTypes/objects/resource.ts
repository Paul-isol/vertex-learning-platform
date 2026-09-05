import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Resource Type',
      options: {
        list: [
          { title: 'PDF', value: 'pdf' },
          { title: 'Link', value: 'link' },
          { title: 'Repository', value: 'repo' },
          { title: 'Code Snippet', value: 'code' },
          { title: 'Slide Deck', value: 'slides' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 2,
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
  },
})
