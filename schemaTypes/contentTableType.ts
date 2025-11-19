import {defineField, defineType} from 'sanity';

export const contentTableType = defineType({
  type: 'document',
  name: 'contentTable',
  title: 'Table of contents',
  description: '',
  fields: [
    defineField({
      name: 'list',
      type: 'array',
      of: [{type: 'string'}],
      title: 'List',
      hidden: false,
      description: 'Please enter a list of content:',
      validation: (Rule) => Rule.required(),
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: false,
      validation: (Rule) => Rule.required(),
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
