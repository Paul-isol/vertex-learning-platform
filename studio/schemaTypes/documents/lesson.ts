import { defineType, defineField, defineArrayMember } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: PlayIcon,
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
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
      description: 'URL hosted on YouTube, Vimeo, or Bunny',
      validation: (rule) =>
        rule
          .required()
          .uri({
            scheme: ['https'],
          })
          .custom((url) => {
            if (!url) return true
            try {
              const parsed = new URL(url)
              const host = parsed.hostname.toLowerCase()
              const isYoutube =
                host.includes('youtube.com') || host.includes('youtu.be')
              const isVimeo = host.includes('vimeo.com')
              const isBunny =
                host.includes('bunny.net') || host.includes('b-cdn.net')
              if (!isYoutube && !isVimeo && !isBunny) {
                return 'Video URL must be hosted on YouTube, Vimeo, or Bunny'
              }
              return true
            } catch {
              return 'Invalid URL'
            }
          }),
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail',
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
      name: 'duration',
      type: 'number',
      title: 'Duration (seconds)',
      description: 'Total duration of the lesson video in seconds',
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: 'freePreview',
      type: 'boolean',
      title: 'Free Preview',
      description: 'Allow learners to preview this lesson for free',
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
      name: 'notes',
      type: 'blockContent',
      title: 'Notes',
      description: 'Lesson notes and rich text explanations',
    }),
    defineField({
      name: 'keyPoints',
      type: 'array',
      title: 'Key Points',
      description: 'In this lesson you will learn (max 6)',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'proTip',
      type: 'text',
      title: 'Pro Tip',
      rows: 2,
    }),
    defineField({
      name: 'resources',
      type: 'array',
      title: 'Resources',
      of: [defineArrayMember({ type: 'resource' })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      duration: 'duration',
      media: 'thumbnail',
    },
    prepare({ title, duration, media }) {
      const formattedDuration =
        typeof duration === 'number'
          ? `${Math.floor(duration / 60)}m ${duration % 60}s`
          : 'No duration'
      return {
        title: title || 'Untitled Lesson',
        subtitle: formattedDuration,
        media,
      }
    },
  },
})
