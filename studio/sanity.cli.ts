import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '83t066qq',
    dataset: process.env.SANITY_STUDIO_DATASET || 'vertex',
  },
  typegen: {
    enabled: true,
    path: '../{app,components,sanity,lib}/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../sanity.types.ts',
    overloadClientMethods: true,
  },
})
