import {defineField, defineType} from 'sanity'

export const navigationSubmenuType = defineType({
  type: 'document',
  name: 'navigationSubmenu',
  title: 'Navigation Submenu',
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
      name: 'name',
      type: 'string',
      title: 'Name',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navigationElements',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'navigationElement'}]}],
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
