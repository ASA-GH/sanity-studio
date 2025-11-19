import {defineField, defineType} from 'sanity';
import {validateIn} from './validation';

export const collectPanemType = defineType({
  type: 'document',
  name: 'collectPanem',
  title: 'Collect Panel',
  description: 'https://app.clickup.com/t/pbb5ah',
  fields: [
    defineField({name: 'mainTitle', type: 'string', title: 'Main Title', hidden: false}),
    defineField({
      name: 'descriptionRich',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Quote', value: 'blockquote'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [],
          },
        },
        {type: 'break'},
      ],
      title: 'DescriptionRich',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'btnTitle', type: 'string', title: 'Btn Title', hidden: false}),
    defineField({name: 'btnAuthTitle', type: 'string', title: 'Btn Auth Title', hidden: false}),
    defineField({
      name: 'redirectLink',
      type: 'url',
      title: 'Redirect Link',
      hidden: false,
      validation: (Rule) =>
        Rule.uri({
          allowCredentials: true,
          allowRelative: true,
          relativeOnly: false,
          scheme: [/^http/, /^https/],
        }),
    }),
    defineField({
      name: 'customBlockClass',
      type: 'string',
      title: 'CustomBlockClass',
      hidden: false,
    }),
    defineField({name: 'operation', type: 'string', title: 'Operation', hidden: false}),
    defineField({name: 'placeholder', type: 'string', title: 'Placeholder', hidden: false}),
    defineField({name: 'icon', type: 'image', title: 'Icon', hidden: false}),
    defineField({
      name: 'software',
      type: 'string',
      title: 'Software',
      hidden: false,
      validation: (Rule) =>
        Rule.custom((value) =>
          validateIn(
            [
              'LANDING',
              'BLOG',
              'WEB',
              'CALC_EXT',
              'SCOUT_EXT',
              'SCOUT_EXT_PRO',
              'SCOUT_EXT_PRO_ENTERPRISE',
              'QUICK_VIEW_EXT',
              'KW_TRACKER_EXT',
              'MARKETING',
              'AMZSCOUT_MARKETING',
              'STOCK_STATS_EXT',
              'OA_EXT',
            ],
            value,
          ),
        ),
      options: {
        list: [
          'LANDING',
          'BLOG',
          'WEB',
          'CALC_EXT',
          'SCOUT_EXT',
          'SCOUT_EXT_PRO',
          'SCOUT_EXT_PRO_ENTERPRISE',
          'QUICK_VIEW_EXT',
          'KW_TRACKER_EXT',
          'MARKETING',
          'AMZSCOUT_MARKETING',
          'STOCK_STATS_EXT',
          'OA_EXT',
        ],
      },
    }),
    defineField({
      type: 'boolean',
      description:
        'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
      name: 'contentfulArchived',
      readOnly: true,
    }),
  ],
  preview: {select: {title: 'mainTitle'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
});
