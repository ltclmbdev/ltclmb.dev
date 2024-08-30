import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const playgroundType = defineType({
  name: 'playground',
  title: 'Playground',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'cloudinary.asset',
      description:
        'This image will be used for the main image of the playground',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'github',
      title: 'GitHub link',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'body',
      type: 'markdown',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author, media } = selection
      return {
        ...selection,
        subtitle: author && `by ${author}`,
        media: (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.secure_url}
            alt="Preview"
            style={{ objectFit: 'cover' }}
          />
        ),
      }
    },
  },
})
