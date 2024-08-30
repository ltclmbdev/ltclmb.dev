'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'
import { markdownSchema } from 'sanity-plugin-markdown'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    markdownSchema(),
    cloudinarySchemaPlugin(),
  ],
})
