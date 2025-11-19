import {defineField, defineType} from 'sanity';

export const commonPaywallType = defineType({
  type: 'document',
  name: 'commonPaywall',
  title: 'Common Paywall',
  description: 'Paywall content for Site, NewSite, Blog',
  fields: [
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
