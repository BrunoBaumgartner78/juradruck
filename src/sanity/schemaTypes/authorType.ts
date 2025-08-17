import {defineType, defineField} from 'sanity'

const authorType = defineType({
  name: 'author',
  title: 'Autor/in',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'avatar', title: 'Avatar', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Kurzbio', type: 'text' }),
  ],
  preview: { select: { title: 'name', media: 'avatar' } },
})

export default authorType
