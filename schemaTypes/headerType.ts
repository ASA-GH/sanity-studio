import {defineField, defineType} from 'sanity';

export const headerType = defineType({
  type: 'document',
  name: 'header',
  title: 'Header',
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
      name: 'headerId',
      type: 'slug',
      title: 'Header ID',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {source: 'title'},
    }),
    defineField({
      name: 'logoSticky',
      type: 'reference',
      title: 'Logo Sticky',
      hidden: false,
      validation: (Rule) => Rule.required(),
      to: [{type: 'logo'}],
    }),
    defineField({
      name: 'logoMobileMenu',
      type: 'reference',
      title: 'Logo Mobile Menu',
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
      validation: (Rule) => Rule.required(),
      to: [{type: 'navigation'}],
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
