import {defineField, defineType} from 'sanity';

export const jumpLinkType = defineType({
  type: 'document',
  name: 'jumpLink',
  title: 'Jump Link',
  description: '',
  fields: [
    defineField({
      name: 'reference',
      type: 'slug',
      title: 'Reference',
      hidden: false,
      description: 'Please enter anchor id. Example: link-top',
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
  preview: {select: {title: 'reference.current'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
});
