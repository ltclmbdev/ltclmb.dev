'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'
import { markdownSchema } from 'sanity-plugin-markdown'
import { structureTool } from 'sanity/structure'
import { env } from './src/env.mjs'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION }),
    markdownSchema(),
    cloudinarySchemaPlugin(),
  ],
})
