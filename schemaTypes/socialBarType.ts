import {defineField, defineType} from 'sanity';

export const socialBarType = defineType({
  type: 'document',
  name: 'socialBar',
  title: 'Social Bar',
  description: '',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'mainSlogan', type: 'string', title: 'Main Slogan', hidden: false}),
    defineField({name: 'secondSlogan', type: 'string', title: 'Second Slogan', hidden: false}),
    defineField({
      name: 'socialIcons',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'socialIcon'}]}],
      title: 'Social Icons',
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
