import {defineField, defineType} from 'sanity';

export const deployType = defineType({
  type: 'document',
  name: 'deploy',
  title: 'DEPLOY',
  description: '',
  fields: [
    defineField({
      name: 'server',
      type: 'string',
      title: 'Server',
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
      name: 'description',
      type: 'string',
      title: 'Description of update',
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
  preview: {select: {title: 'server'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
});
