import {defineField, defineType} from 'sanity';

export const postPageBannerType = defineType({
  type: 'document',
  name: 'postPageBanner',
  title: 'Blog Post Banner',
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
      name: 'mainText',
      type: 'string',
      title: 'Banner Title',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
      title: 'Banner CTA',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      type: 'url',
      title: 'Banner URL',
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
      name: 'bannerImage',
      type: 'image',
      title: 'Banner Image',
      hidden: false,
      description: 'Recommended resolution: 252x252px',
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
