import {defineField, defineType} from 'sanity';

export const footerType = defineType({
  type: 'document',
  name: 'footer',
  title: 'Footer',
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
      name: 'footerId',
      type: 'slug',
      title: 'Footer ID',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {source: 'title'},
    }),
    defineField({
      name: 'logo',
      type: 'reference',
      title: 'Logo',
      hidden: false,
      validation: (Rule) => Rule.required(),
      to: [{type: 'logo'}],
    }),
    defineField({
      name: 'socialBar',
      type: 'reference',
      title: 'Social Bar',
      hidden: false,
      validation: (Rule) => Rule.required(),
      to: [{type: 'socialBar'}],
    }),
    defineField({
      name: 'navigation',
      type: 'reference',
      title: 'Navigation',
      hidden: false,
      to: [{type: 'navigation'}],
    }),
    defineField({name: 'copyright', type: 'string', title: 'Copyright', hidden: false}),
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
