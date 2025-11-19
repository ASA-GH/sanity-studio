import {defineField, defineType} from 'sanity';
import {validateIn} from './validation';

export const blogPostWebinarBannerType = defineType({
  type: 'document',
  name: 'blogPostWebinarBanner',
  title: 'Blog Post Webinar Banner',
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
      name: 'link',
      type: 'string',
      title: 'Link',
      hidden: false,
      validation: (Rule) =>
        Rule.required().regex(
          /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/,
          {invert: false},
        ),
    }),
    defineField({
      name: 'linkRel',
      type: 'string',
      title: 'Link Rel',
      hidden: false,
      description: '(optional)',
      validation: (Rule) => Rule.custom((value) => validateIn(['nofollow'], value)),
      options: {list: ['nofollow']},
    }),
    defineField({
      name: 'linkTarget',
      type: 'boolean',
      title: 'Link: Open in new tab?',
      hidden: false,
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      type: 'image',
      title: 'Mobile Image',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'analyticsAction',
      type: 'string',
      title: 'Analytics Action',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'analyticsCategory',
      type: 'string',
      title: 'Analytics Category',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'analyticsLabel',
      type: 'string',
      title: 'Analytics Label',
      hidden: false,
      description: '(optional)',
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
