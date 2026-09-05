import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './schemaTypes'
import { structure } from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '83t066qq'
const dataset = process.env.SANITY_STUDIO_DATASET || 'vertex'

if (!projectId) {
  throw new Error('Missing environment variable: SANITY_STUDIO_PROJECT_ID')
}

if (!dataset) {
  throw new Error('Missing environment variable: SANITY_STUDIO_DATASET')
}

export default defineConfig({
  name: 'default',
  title: 'Vertex',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2026-09-05' }),
  ],
  schema,
})
