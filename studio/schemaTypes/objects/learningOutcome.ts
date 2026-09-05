import { defineType, defineField } from 'sanity'
import { CheckmarkCircleIcon } from '@sanity/icons'

export const learningOutcome = defineType({
  name: 'learningOutcome',
  title: 'Learning Outcome',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon Name',
      options: {
        list: [
          { title: 'Code', value: 'Code' },
          { title: 'Database', value: 'Database' },
          { title: 'Server', value: 'Server' },
          { title: 'Shield', value: 'Shield' },
          { title: 'Zap', value: 'Zap' },
          { title: 'Layout', value: 'Layout' },
          { title: 'Cpu', value: 'Cpu' },
          { title: 'Layers', value: 'Layers' },
          { title: 'Globe', value: 'Globe' },
          { title: 'Sparkles', value: 'Sparkles' },
          { title: 'Terminal', value: 'Terminal' },
          { title: 'CheckCircle', value: 'CheckCircle' },
        ],
      },
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
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
