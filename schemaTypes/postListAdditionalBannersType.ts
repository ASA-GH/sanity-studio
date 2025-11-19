import {defineField, defineType} from 'sanity';

export const postListAdditionalBannersType = defineType({
  type: 'document',
  name: 'postListAdditionalBanners',
  title: 'Post List Additional Banners',
  description: '',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', hidden: false}),
    defineField({
      name: 'listBanners',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'postBanner'}]}],
      title: ' List Banners',
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
