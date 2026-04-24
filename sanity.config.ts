'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name: 'alem-do-veu',
  title: 'Além do Véu — Admin',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Além do Véu')
          .items([
            S.listItem()
              .title('Produtos')
              .child(S.documentTypeList('produto').title('Produtos')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
