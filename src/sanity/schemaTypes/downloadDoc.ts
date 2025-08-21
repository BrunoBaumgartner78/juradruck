// sanity/schemas/downloadDoc.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'downloadDoc',
  title: 'Download (PDF)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
    }),
    defineField({
      name: 'file',
      title: 'PDF',
      type: 'file',
      options: { accept: '.pdf' },
      validation: (r) => r.required(),
    }),
    // 🔵 NEU: Optionales Vorschaubild / Cover
    defineField({
      name: 'image',
      title: 'Vorschaubild',
      type: 'image',
      options: { hotspot: true },
      description: 'Optionales Vorschau-/Coverbild für den Download.',
    }),
    defineField({
      name: 'size',
      title: 'Dateigröße (optional)',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          { title: 'Katalog', value: 'katalog' },
          { title: 'Preisliste', value: 'preisliste' },
          { title: 'Datenblatt', value: 'datenblatt' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Veröffentlicht am',
      type: 'datetime',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
