import {defineType, defineField} from 'sanity'

const categoryType = defineType({
  name: 'postCategory',
  title: 'Kategorie',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug',  title: 'Slug',  type: 'slug', options: { source: 'title', maxLength: 64 }, validation: r => r.required() }),
  ],
  preview: { select: { title: 'title' } },
})

export default categoryType
