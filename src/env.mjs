import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SANITY_STUDIO_PROJECT_ID: z.string(),
    SANITY_STUDIO_DATASET: z.string(),
    SANITY_API_VERSION: z.string(),
  },
  client: {
    NEXT_PUBLIC_URL: z.string().url(),
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_SITE_TITLE: z.string(),
    NEXT_PUBLIC_PRODUCT_DESCRIPTION: z.string(),
    NEXT_PUBLIC_SEO_KEYWORDS: z.string(),
    NEXT_PUBLIC_AUTHOR_FIRST_NAME: z.string(),
    NEXT_PUBLIC_AUTHOR_LAST_NAME: z.string(),
    NEXT_PUBLIC_AUTHOR_FULL_NAME: z.string(),
    NEXT_PUBLIC_AUTHOR_X: z.string(),
    NEXT_PUBLIC_AUTHOR_EMAIL: z.string().email(),
    // NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
    // NEXT_PUBLIC_SANITY_DATASET: z.string(),
    // NEXT_PUBLIC_SANITY_API_VERSION: z.string(),
  },
  runtimeEnv: {
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
    SANITY_API_VERSION: process.env.SANITY_API_VERSION,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE,
    NEXT_PUBLIC_PRODUCT_DESCRIPTION:
      process.env.NEXT_PUBLIC_PRODUCT_DESCRIPTION,
    NEXT_PUBLIC_SEO_KEYWORDS: process.env.NEXT_PUBLIC_SEO_KEYWORDS,
    NEXT_PUBLIC_AUTHOR_FIRST_NAME: process.env.NEXT_PUBLIC_AUTHOR_FIRST_NAME,
    NEXT_PUBLIC_AUTHOR_LAST_NAME: process.env.NEXT_PUBLIC_AUTHOR_LAST_NAME,
    NEXT_PUBLIC_AUTHOR_FULL_NAME: process.env.NEXT_PUBLIC_AUTHOR_FULL_NAME,
    NEXT_PUBLIC_AUTHOR_X: process.env.NEXT_PUBLIC_AUTHOR_X,
    NEXT_PUBLIC_AUTHOR_EMAIL: process.env.NEXT_PUBLIC_AUTHOR_EMAIL,
    // NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    // NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    // NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  },
})
