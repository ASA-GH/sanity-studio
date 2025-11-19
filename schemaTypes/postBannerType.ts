import {defineField, defineType} from 'sanity';

export const postBannerType = defineType({
  type: 'document',
  name: 'postBanner',
  title: 'Post Banner',
  description: '',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title of entity',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isExternalLink',
      type: 'boolean',
      title: 'Is External Link?',
      hidden: false,
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
      name: 'bannerAlt',
      type: 'string',
      title: 'Banner Alt',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bannerImage',
      type: 'image',
      title: 'Banner Image',
      hidden: false,
      description: 'Recommended size: 688x560px',
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
