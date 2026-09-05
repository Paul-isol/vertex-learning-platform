import { defineType, defineField, defineArrayMember } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Summary',
      rows: 3,
      description: 'Short summary for course cards and search previews (max 200 chars)',
      validation: (rule) =>
        rule
          .required()
          .max(200)
          .warning('Keep it under 200 characters for optimal display on cards'),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'level',
      type: 'string',
      title: 'Level',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price (USD)',
      description: 'Set to 0 for free courses',
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'popular',
      type: 'boolean',
      title: 'Popular Course',
      description: 'Feature this course with a popular badge',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      type: 'number',
      title: 'Student Count',
      description: 'Display student count',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'learningOutcomes',
      type: 'array',
      title: "What You'll Learn",
      of: [defineArrayMember({ type: 'learningOutcome' })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'instructor',
      type: 'reference',
      title: 'Instructor',
      to: [{ type: 'instructor' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'modules',
      type: 'array',
      title: 'Modules',
      of: [defineArrayMember({ type: 'module' })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      instructorName: 'instructor.name',
      media: 'coverImage',
    },
    prepare({ title, instructorName, media }) {
      return {
        title: title || 'Untitled Course',
        subtitle: instructorName ? `by ${instructorName}` : undefined,
        media,
      }
    },
  },
})
