import {defineField, defineType} from 'sanity'

export const navigationType = defineType({
  type: 'document',
  name: 'navigation',
  title: 'Navigation',
  description: '',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navigationElements',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'navigationElement'}, {type: 'navigationSubmenu'}]}],
      title: 'Navigation Elements',
      hidden: false,
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      type: 'boolean',
      description:
        'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
      name: 'contentfulArchived',
      readOnly: true,
    }),
  ],
  preview: {select: {title: 'title'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
});
