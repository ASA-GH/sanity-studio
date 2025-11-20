import {defineField, defineType, PreviewConfig} from 'sanity'

export const jumpLinkType = defineType({
  type: 'document',
  name: 'jumpLink',
  title: 'Jump Link',
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
      name: 'reference',
      type: 'slug',
      title: 'Reference',
      hidden: false,
      description: 'Please enter anchor id. Example: link-top',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkTop',
      type: 'string',
      title: 'Link top',
      hidden: false,
      description: 'Please enter anchor id. Example: link-top',
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
  preview: {
    select: {
      title: 'title',
      reference: 'reference.current',
      linkTop: 'linkTop',
    },
    prepare(selection: {title?: string; reference?: string}) {
      const {title, reference} = selection
      return {
        title: title || reference,
      }
    },
  } as PreviewConfig,
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})
