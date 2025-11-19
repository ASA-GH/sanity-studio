import {defineField, defineType} from 'sanity';

export const blogPostEmbeddedVideoType = defineType({
  type: 'document',
  name: 'blogPostEmbeddedVideo',
  title: 'Blog Post Embedded Video',
  description: '',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', hidden: false}),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Url',
      hidden: false,
      description: 'Example: https://www.youtube.com/embed/KGkWhUiMDI4',
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
