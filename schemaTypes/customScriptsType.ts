import {defineField, defineType} from 'sanity';

export const customScriptsType = defineType({
  type: 'document',
  name: 'customScripts',
  title: 'Custom Scripts',
  description: '',
  fields: [
    defineField({
      name: 'titleOfEntity',
      type: 'string',
      title: 'Title of entity',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scriptsId',
      type: 'slug',
      title: 'Scripts ID',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {source: 'titleOfEntity'},
    }),
    defineField({
      name: 'scripts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'script'}]}],
      title: 'Scripts',
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
  preview: {select: {title: 'titleOfEntity'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
});
