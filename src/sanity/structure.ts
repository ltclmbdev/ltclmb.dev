import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
  S.list()
    .title('ltclmb.dev')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('playground').title('Playgrounds'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        item =>
          item.getId() &&
          !['post', 'playground', 'category', 'author'].includes(item.getId()!),
      ),
    ])
