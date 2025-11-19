import {defineField, defineType} from 'sanity';

export const socialIconType = defineType({
  type: 'document',
  name: 'socialIcon',
  title: 'Social Icon',
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
      name: 'alt',
      type: 'string',
      title: 'Alt',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Link',
      hidden: false,
      validation: (Rule) =>
        Rule.required().uri({
          allowCredentials: true,
          allowRelative: true,
          relativeOnly: false,
          scheme: [/^http/, /^https/],
        }),
    }),
    defineField({
      name: 'isBlank',
      type: 'boolean',
      title: 'Is opening as new page?',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      type: 'image',
      title: 'Icon',
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
