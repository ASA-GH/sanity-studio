import {defineField, defineType} from 'sanity';

export const blogPostSchemaType = defineType({
  type: 'document',
  name: 'blogPostSchema',
  title: 'Blog Post Schema',
  description: '',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
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
  preview: {select: {title: 'name'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
});
