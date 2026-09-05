import { type SchemaTypeDefinition } from 'sanity'
import { course } from './documents/course'
import { lesson } from './documents/lesson'
import { instructor } from './documents/instructor'
import { category } from './documents/category'
import { module as moduleType } from './objects/module'
import { learningOutcome } from './objects/learningOutcome'
import { resource } from './objects/resource'
import { blockContent } from './objects/blockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    course,
    lesson,
    instructor,
    category,
    // Objects
    moduleType,
    learningOutcome,
    resource,
    blockContent,
  ],
}
