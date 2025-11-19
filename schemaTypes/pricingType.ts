import {defineField, defineType} from 'sanity';

export const pricingType = defineType({
  type: 'document',
  name: 'pricing',
  title: 'Pricing',
  description: '',
  fields: [
    defineField({name: 'mainTitile', type: 'string', title: 'Main Title', hidden: false}),
    defineField({
      type: 'boolean',
      description:
        'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
      name: 'contentfulArchived',
      readOnly: true,
    }),
  ],
  preview: {select: {title: 'mainTitile'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
});
