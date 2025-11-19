import {defineField, defineType} from 'sanity'

export const navigationElementType = defineType({
  type: 'document',
  name: 'navigationElement',
  title: 'Navigation Element',
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
      name: 'name',
      type: 'string',
      title: 'Name',
      hidden: false,
      description: 'HTML available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isExternalLink',
      type: 'boolean',
      title: 'Is External Link?',
      hidden: false,
      description: 'Enable option if the link is outside of this blog',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isBlank',
      type: 'boolean',
      title: 'Is opening as new page?',
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
