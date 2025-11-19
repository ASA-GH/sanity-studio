import {defineField, defineType} from 'sanity';

export const blogPostEmbeddedAutoVideoType = defineType({
  type: 'document',
  name: 'blogPostEmbeddedAutoVideo',
  title: 'Blog Post Embedded Auto Video',
  description: 'Replacing GIFs for performance ',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'youtubeEmbedUrl',
    //   type: 'url',
    //   title: 'Youtube Embed URL',
    //   hidden: false,
    //   description: 'Please enter URL',
    //   validation: (Rule) =>
    //     Rule.required()
    //       .regex(/\bembed\S*\b/, {invert: false})
    //       .uri({
    //         allowCredentials: true,
    //         allowRelative: true,
    //         relativeOnly: false,
    //         scheme: [/^http/, /^https/],
    //       }),
    // }),
    defineField({
      name: 'youtubeEmbedUrl',
      type: 'url',
      title: 'Youtube Embed URL',
      hidden: false,
      description: 'Please enter a valid YouTube embed URL (must contain "embed")',
      validation: (Rule) =>
        Rule.required().custom((url) => {
          if (url && !url.includes('embed')) {
            return 'URL must contain "embed"'
          }
          return true
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
