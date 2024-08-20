import { client } from '@/sanity/lib/client'

export type Post = {
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
  description: string
  body: string
}

export const getAllPosts = async (): Promise<Post[]> => {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
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
      description,
      body
    }`,
    {},
    { next: { revalidate: 60 } },
  )
}

export const getPostBySlug = async (slug: string): Promise<Post> => {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      publishedAt,
      title,
      slug,
      author->{name},
      mainImage{
        public_id,
        secure_url
      },
      description,
      body
    }`,
    { slug },
    { next: { revalidate: 60 } },
  )
}
