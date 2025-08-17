import {defineType, defineField} from 'sanity'

const postType = defineType({
  name: 'post',
  title: 'Blogbeitrag',
  type: 'document',
  fields: [
    defineField({ name: 'title',  title: 'Titel',       type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug',   title: 'Slug',        type: 'slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),
    defineField({ name: 'excerpt',title: 'Teaser',      type: 'text' }),
    defineField({ name: 'cover',  title: 'Titelbild',   type: 'image', options: { hotspot: true } }),
    defineField({ name: 'author', title: 'Autor/in',    type: 'reference', to: [{ type: 'author' }], validation: r => r.required() }),
    defineField({ name: 'categories', title: 'Kategorien', type: 'array', of: [{ type: 'reference', to: [{ type: 'postCategory' }] }] }),
    defineField({ name: 'publishedAt', title: 'Veröffentlicht am', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'body', title: 'Inhalt', type: 'blockContent', validation: r => r.required() }),
  ],
  preview: { select: { title: 'title', media: 'cover', subtitle: 'publishedAt' } },
})

export default postType
