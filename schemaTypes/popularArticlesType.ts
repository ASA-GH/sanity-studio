import {defineField, defineType} from 'sanity';

export const popularArticlesType = defineType({
  type: 'document',
  name: 'popularArticles',
  title: 'Popular Articles',
  description: '',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name of entity',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'identifier',
      type: 'slug',
      title: 'Identifier',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {source: 'name'},
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      title: 'Articles',
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
