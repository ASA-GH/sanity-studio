import {defineField, defineType} from 'sanity';

export const scriptType = defineType({
  type: 'document',
  name: 'script',
  title: 'Script',
  description: '',
  fields: [
    defineField({name: 'nameOfEntity', type: 'string', title: 'Name Of Entity', hidden: false}),
    defineField({
      name: 'isInternal',
      type: 'boolean',
      title: 'isInternal',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
      title: 'Value',
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
  preview: {select: {title: 'nameOfEntity'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})
