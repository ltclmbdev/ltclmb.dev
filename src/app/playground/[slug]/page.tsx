import React from 'react'
import { Metadata } from 'next'
import { generateBaseMetadata } from '@/config'
import { env } from '@/env.mjs'
import { getAllPlaygroundItems, getPlaygroundBySlug } from '@/lib/playground'
import PlaygroundTemplate from '@/templates/playground-template'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const playground = await getPlaygroundBySlug(params.slug)
  const baseMetadata: Metadata = generateBaseMetadata(
    `/playground/${params.slug}`,
  )

  return {
    ...baseMetadata,
    title: `${playground?.title} | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: `${playground?.description}`,
    openGraph: {
      title: `${playground?.title} | ${env.NEXT_PUBLIC_APP_NAME}`,
      url: `/playground/${params.slug}`,
      images: [
        {
          url: `/playground/${params.slug}/opengraph-image`,
        },
      ],
    },
    twitter: {
      title: `${playground?.title} | ${env.NEXT_PUBLIC_APP_NAME}`,
      description: `${playground?.description}`,
      images: [`/playground/${params.slug}/opengraph-image`],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const playground = await getPlaygroundBySlug(params.slug)

  return (
    <div className="container pb-16 pt-8 md:pb-24 md:pt-12 lg:pb-40">
      {playground && <PlaygroundTemplate playground={playground} />}
    </div>
  )
}

export async function generateStaticParams() {
  const playgroundItems = await getAllPlaygroundItems()
  return playgroundItems.map(playground => ({
    slug: playground.slug.current,
  }))
}
