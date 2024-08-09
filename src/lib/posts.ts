import { client } from '@/sanity/lib/client'
import { SanityDocument } from '@sanity/client'

export type Post = {
  _id: string
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
  body: string
}

export const getAllPosts = async (): Promise<SanityDocument[]> => {
  return client.fetch(
    `*[_type == "post"]{ 
      slug
    }`,
    {},
    { next: { revalidate: 60 } },
  )
}

export const getPostBySlug = async (slug: string): Promise<Post> => {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      author->{name},
      mainImage{
        public_id,
        secure_url
      },
      body,
      publishedAt
    }`,
    { slug },
    { next: { revalidate: 60 } },
  )
}
