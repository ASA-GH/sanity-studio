import {defineField, defineType} from 'sanity'

export const personType = defineType({
  type: 'document',
  name: 'person',
  title: 'Person',
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
      name: 'firstName',
      type: 'string',
      title: 'First Name',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      type: 'string',
      title: 'Last Name',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      title: 'Avatar',
      hidden: false,
      description: 'width and height at least 90px',
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
