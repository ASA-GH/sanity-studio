import {defineField, defineType} from 'sanity';
import {validateIn} from './validation';

export const inlineLinkType = defineType({
  type: 'document',
  name: 'inlineLink',
  title: 'Inline Link',
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
      name: 'url',
      type: 'url',
      title: 'URL',
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
      name: 'target',
      type: 'string',
      title: 'Target',
      hidden: false,
      validation: (Rule) =>
        Rule.required().custom((value) => validateIn(['_blank', '_self'], value)),
      options: {list: ['_blank', '_self']},
    }),
    defineField({
      name: 'follow',
      type: 'boolean',
      title: 'Follow',
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
