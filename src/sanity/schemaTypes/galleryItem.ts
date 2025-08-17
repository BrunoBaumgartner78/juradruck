// sanity/schemas/galleryItem.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Galerie-Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          { title: 'Textildruck', value: 'textildruck' },
          { title: 'Stickerei', value: 'stickerei' },
          { title: 'Werbetechnik', value: 'werbetechnik' },
          { title: 'Fahrzeug', value: 'fahrzeug' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt-Text (Barrierefrei / SEO)',
      type: 'string',
      description: 'Beschreibt das Bild für Screenreader & Suchmaschinen',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'city',
      title: 'Ort',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Jahr',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Hervorgehoben',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Veröffentlicht am',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image', subtitle: 'category' },
  },
})
