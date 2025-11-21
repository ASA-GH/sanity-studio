import {defineField, defineType} from 'sanity';

const validateYouTubeEmbedUrl = (url: string | undefined) => {
  if (!url) return true;
  const youtubeEmbedRegex = /^https?:\/\/(?:www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+/;
  if (!youtubeEmbedRegex.test(url)) {
    return 'Please enter a valid YouTube embed URL (format: https://www.youtube.com/embed/VIDEO_ID)';
  }
  return true;
};

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
    defineField({
      name: 'youtubeEmbedUrl',
      type: 'url',
      title: 'Youtube Embed URL',
      hidden: false,
      description: 'Please enter a valid YouTube embed URL (must contain "embed")',
      validation: (Rule) =>
        Rule.required()
          .uri({
            allowCredentials: true,
            allowRelative: true,
            relativeOnly: false,
            scheme: [/^http/, /^https/],
          })
          .custom(validateYouTubeEmbedUrl),
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
  readOnly: ({document}) => (document?.contentfulArchived) === true,
});