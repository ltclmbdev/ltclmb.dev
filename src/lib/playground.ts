import { client } from '@/sanity/lib/client'

export type Playground = {
  _id: string
  _updatedAt: string
  publishedAt: string
  title: string
  slug: {
    current: string
  }
  author: {
    name: string
  }
  mainImage: {
    public_id: string
    secure_url: string
  }
  github: string
  description: string
  body: string
}

export const getAllPlaygroundItems = async (): Promise<Playground[]> => {
  const playgrounds = await client.fetch(
    `*[_type == "playground"] | order(publishedAt desc) {
      _id,
      _updatedAt,
      publishedAt,
      title,
      slug,
      author->{name},
      mainImage{
        public_id,
        secure_url
      },
      github,
      description,
      body
    }`,
    {},
    { next: { revalidate: 60 } },
  )
  return playgrounds || []
}

export const getPlaygroundBySlug = async (
  slug: string,
): Promise<Playground | null> => {
  const playground = await client.fetch(
    `*[_type == "playground" && slug.current == $slug][0]{
      _id,
      publishedAt,
      title,
      slug,
      author->{name},
      mainImage{
        public_id,
        secure_url
      },
      github,
      description,
      body
    }`,
    { slug },
    { next: { revalidate: 60 } },
  )
  return playground || null
}
