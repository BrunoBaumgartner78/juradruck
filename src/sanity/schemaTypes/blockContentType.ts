import {defineType} from 'sanity'

const blockContentType = defineType({
  name: 'blockContent',
  title: 'Richtext',
  type: 'array',
  of: [
    { type: 'block' },
    { type: 'image', options: { hotspot: true } },
  ],
})

export default blockContentType
