import {defineField, defineType, type SchemaTypeDefinition} from 'sanity'

const validateIn = (values: (string | number)[], value: any) =>
  values.includes(value) ? true : `Value must be one of ${values.join(', ')}`

export const navigationType = defineType({
  type: 'document',
  name: 'navigation',
  title: 'Navigation',
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
      name: 'navigationElements',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'navigationElement'}, {type: 'navigationSubmenu'}]}],
      title: 'Navigation Elements',
      hidden: false,
      validation: (Rule) => Rule.min(1),
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
})

export const navigationElementType = defineType({
  type: 'document',
  name: 'navigationElement',
  title: 'Navigation Element',
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
      name: 'name',
      type: 'string',
      title: 'Name',
      hidden: false,
      description: 'HTML available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isExternalLink',
      type: 'boolean',
      title: 'Is External Link?',
      hidden: false,
      description: 'Enable option if the link is outside of this blog',
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
      type: 'boolean',
      description:
        'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
      name: 'contentfulArchived',
      readOnly: true,
    }),
  ],
  preview: {select: {title: 'title'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const navigationSubmenuType = defineType({
  type: 'document',
  name: 'navigationSubmenu',
  title: 'Navigation Submenu',
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
      name: 'name',
      type: 'string',
      title: 'Name',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navigationElements',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'navigationElement'}]}],
      title: 'Navigation Elements',
      hidden: false,
      validation: (Rule) => Rule.min(1),
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
})

export const postType = defineType({
  type: 'document',
  name: 'post',
  title: 'Blog Post',
  description: '',
  fields: [
    defineField({
      name: 'localizations',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: (Rule) => Rule.custom((value) => validateIn(['en-US', 'de'], value)),
          options: {list: ['en-US', 'de']},
        },
      ],
      title: 'Localizations',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {value: 'en-US', title: 'en-US'},
          {value: 'de', title: 'de'},
        ],
      },
    }),
    defineField({
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title',
      hidden: false,
      description: '(optional)',
    }),
    defineField({
      name: 'metaType',
      type: 'string',
      title: 'Meta Type',
      hidden: false,
      description: '(optional)',
    }),
    defineField({
      name: 'metaUrl',
      type: 'string',
      title: 'Meta Url',
      hidden: false,
      description: '(optional)',
    }),
    defineField({
      name: 'metaDescription',
      type: 'string',
      title: 'Meta Description',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaKeywords',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Meta Keywords',
      hidden: false,
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'metaImage',
      type: 'image',
      title: 'Meta Image',
      hidden: false,
      description: '(optional)',
    }),
    defineField({
      name: 'structuredData',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'blogPostSchema'}]}],
      title: 'Structured Data',
      hidden: false,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {source: 'name'},
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      hidden: false,
      description: 'Recommended size: 1456x560px ',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagePreview',
      type: 'image',
      title: 'Image Preview',
      hidden: false,
      description: 'Recommended size: 112x112px',
    }),
    defineField({
      name: 'h1',
      type: 'string',
      title: 'H1',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedDate',
      type: 'date',
      title: 'Published Date',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      title: 'Author',
      hidden: false,
      validation: (Rule) => Rule.required(),
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'excerpt',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
      title: 'Excerpt',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredProduct',
      type: 'reference',
      title: 'Featured product',
      hidden: false,
      to: [{type: 'postBanner'}],
    }),
    defineField({
      name: 'popularArticles',
      type: 'reference',
      title: 'Popular Articles',
      hidden: false,
      description: '(optional) Please select recommended articles:',
      to: [{type: 'popularArticles'}],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Heading 5', value: 'h5'},
            {title: 'Heading 6', value: 'h6'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                type: 'object',
                name: 'link',
                title: 'url',
                fields: [
                  defineField({
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (Rule) => Rule.required(),
                  }),
                  defineField({
                    type: 'string',
                    name: 'target',
                    title: 'Target',
                    options: {
                      list: [
                        {value: '_blank', title: 'Blank'},
                        {value: '_parent', title: 'Parent'},
                      ],
                    },
                  }),
                ],
              },
              {
                type: 'reference',
                name: 'reference',
                title: 'Reference',
                to: [
                  {type: 'navigation'},
                  {type: 'navigationElement'},
                  {type: 'navigationSubmenu'},
                  {type: 'post'},
                  {type: 'person'},
                  {type: 'header'},
                  {type: 'logo'},
                  {type: 'footer'},
                  {type: 'socialBar'},
                  {type: 'socialIcon'},
                  {type: 'popularArticles'},
                  {type: 'deploy'},
                  {type: 'indexPage'},
                  {type: 'indexPageBanner'},
                  {type: 'postPageBanner'},
                  {type: 'customScripts'},
                  {type: 'script'},
                  {type: 'blogPostEmbeddedVideo'},
                  {type: 'postBanner'},
                  // {type: 'jumpLink'},
                  {type: 'contentTable'},
                  {type: 'commonPaywall'},
                  {type: 'pricing'},
                  {type: 'blogPostMobileBanner'},
                  {type: 'blogPostEmbeddedAutoVideo'},
                  {type: 'collectPanem'},
                  {type: 'inlineLink'},
                  {type: 'postListAdditionalBanners'},
                  {type: 'blogPostWebinarBanner'},
                  {type: 'watchTutorial'},
                  {type: 'blogPostSchema'},
                  {type: 'innerContentSwitcher'},
                ],
              },
              {type: 'image'},
              {type: 'file'},
            ],
          },
          of: [
            {
              type: 'reference',
              title: 'Reference',
              to: [
                {type: 'inlineLink'},
                {type: 'innerContentSwitcher'},
                // {type: 'jumpLink'}
              ],
            },
          ],
        },
        {
          type: 'reference',
          title: 'Reference',
          to: [
            {type: 'postPageBanner'},
            {type: 'blogPostEmbeddedAutoVideo'},
            {type: 'blogPostEmbeddedVideo'},
            {type: 'blogPostMobileBanner'},
            {type: 'blogPostWebinarBanner'},
            {type: 'innerContentSwitcher'},
            // {type: 'jumpLink'},
            {type: 'contentTable'},
          ],
        },
        {type: 'image'},
        {type: 'file'},
        {type: 'break'},
      ],
      title: 'Body',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'collectPanelDisplay',
      type: 'boolean',
      title: 'Collect Panel Display',
      hidden: false,
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'collectPanel',
      type: 'reference',
      title: 'Collect Panel',
      hidden: false,
      validation: (Rule) => Rule.required(),
      to: [{type: 'collectPanem'}],
    }),
    defineField({
      name: 'watchTutorial',
      type: 'reference',
      title: 'Watch Tutorial',
      hidden: false,
      to: [{type: 'watchTutorial'}],
    }),
    defineField({
      type: 'boolean',
      description:
        'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
      name: 'contentfulArchived',
      readOnly: true,
    }),
  ],
  preview: {select: {title: 'name'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const personType = defineType({
  type: 'document',
  name: 'person',
  title: 'Person',
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
      name: 'firstName',
      type: 'string',
      title: 'First Name',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      type: 'string',
      title: 'Last Name',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      title: 'Avatar',
      hidden: false,
      description: 'width and height at least 90px',
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
})

export const headerType = defineType({
  type: 'document',
  name: 'header',
  title: 'Header',
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
      name: 'headerId',
      type: 'slug',
      title: 'Header ID',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {source: 'title'},
    }),
    defineField({
      name: 'logoSticky',
      type: 'reference',
      title: 'Logo Sticky',
      hidden: false,
      validation: (Rule) => Rule.required(),
      to: [{type: 'logo'}],
    }),
    defineField({
      name: 'logoMobileMenu',
      type: 'reference',
      title: 'Logo Mobile Menu',
      hidden: false,
      validation: (Rule) => Rule.required(),
      to: [{type: 'logo'}],
    }),
    defineField({
      name: 'socialBar',
      type: 'reference',
      title: 'Social Bar',
      hidden: false,
      validation: (Rule) => Rule.required(),
      to: [{type: 'socialBar'}],
    }),
    defineField({
      name: 'navigation',
      type: 'reference',
      title: 'Navigation',
      hidden: false,
      validation: (Rule) => Rule.required(),
      to: [{type: 'navigation'}],
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
})

export const logoType = defineType({
  type: 'document',
  name: 'logo',
  title: 'Logo',
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
      name: 'isBlank',
      type: 'boolean',
      title: 'Is opening as new page?',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt',
      hidden: false,
      description: 'Short description',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      hidden: false,
      description: 'Recommended size: 100x40px, Recommended format: SVG',
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
})

export const footerType = defineType({
  type: 'document',
  name: 'footer',
  title: 'Footer',
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
      name: 'footerId',
      type: 'slug',
      title: 'Footer ID',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {source: 'title'},
    }),
    defineField({
      name: 'logo',
      type: 'reference',
      title: 'Logo',
      hidden: false,
      validation: (Rule) => Rule.required(),
      to: [{type: 'logo'}],
    }),
    defineField({
      name: 'socialBar',
      type: 'reference',
      title: 'Social Bar',
      hidden: false,
      validation: (Rule) => Rule.required(),
      to: [{type: 'socialBar'}],
    }),
    defineField({
      name: 'navigation',
      type: 'reference',
      title: 'Navigation',
      hidden: false,
      to: [{type: 'navigation'}],
    }),
    defineField({name: 'copyright', type: 'string', title: 'Copyright', hidden: false}),
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
})

export const socialBarType = defineType({
  type: 'document',
  name: 'socialBar',
  title: 'Social Bar',
  description: '',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'mainSlogan', type: 'string', title: 'Main Slogan', hidden: false}),
    defineField({name: 'secondSlogan', type: 'string', title: 'Second Slogan', hidden: false}),
    defineField({
      name: 'socialIcons',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'socialIcon'}]}],
      title: 'Social Icons',
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
  preview: {select: {title: 'title'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const socialIconType = defineType({
  type: 'document',
  name: 'socialIcon',
  title: 'Social Icon',
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
      name: 'alt',
      type: 'string',
      title: 'Alt',
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
      name: 'isBlank',
      type: 'boolean',
      title: 'Is opening as new page?',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      type: 'image',
      title: 'Icon',
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
  preview: {select: {title: 'title'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const popularArticlesType = defineType({
  type: 'document',
  name: 'popularArticles',
  title: 'Popular Articles',
  description: '',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name of entity',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'identifier',
      type: 'slug',
      title: 'Identifier',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {source: 'name'},
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      title: 'Articles',
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
  preview: {select: {title: 'name'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const deployType = defineType({
  type: 'document',
  name: 'deploy',
  title: 'DEPLOY',
  description: '',
  fields: [
    defineField({
      name: 'server',
      type: 'string',
      title: 'Server',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Description of update',
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
  preview: {select: {title: 'server'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const indexPageType = defineType({
  type: 'document',
  name: 'indexPage',
  title: 'Main Page',
  description: '',
  fields: [
    defineField({
      name: 'metaType',
      type: 'string',
      title: 'Meta Type',
      hidden: false,
      description: '(optional)',
    }),
    defineField({
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title',
      hidden: false,
      description: '(optional)',
    }),
    defineField({
      name: 'metaDescription',
      type: 'string',
      title: 'Meta Description',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaKeywords',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Meta Keywords',
      hidden: false,
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'metaImage',
      type: 'image',
      title: 'Meta Image',
      hidden: false,
      description: '(optional)',
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'identifier',
      type: 'slug',
      title: 'Identifier',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {source: 'name'},
    }),
    defineField({
      name: 'h1',
      type: 'string',
      title: 'H1',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'h1Image',
      type: 'image',
      title: 'H1 Image',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'signupFormInputPlaceholder',
      type: 'string',
      title: 'Signup Form Input Placeholder',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'signupFormCta',
      type: 'string',
      title: 'Signup Form CTA',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'signupFormUrl',
      type: 'string',
      title: 'Signup Form URL',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'signupFormGroupId',
      type: 'string',
      title: 'Signup Form Group ID',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainPageBanner',
      type: 'reference',
      title: 'Main Page Banner',
      hidden: false,
      to: [{type: 'indexPageBanner'}],
    }),
    defineField({
      type: 'boolean',
      description:
        'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
      name: 'contentfulArchived',
      readOnly: true,
    }),
  ],
  preview: {select: {title: 'name'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const indexPageBannerType = defineType({
  type: 'document',
  name: 'indexPageBanner',
  title: 'Main Page Banner',
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
})

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
})

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
})

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
})

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
})

export const jumpLinkType = defineType({
  type: 'document',
  name: 'jumpLink',
  title: 'Jump Link',
  description: '',
  fields: [
    defineField({
      name: 'reference',
      type: 'slug',
      title: 'Reference',
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
  preview: {select: {title: 'reference.current'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const contentTableType = defineType({
  type: 'document',
  name: 'contentTable',
  title: 'Table of contents',
  description: '',
  fields: [
    defineField({
      name: 'list',
      type: 'array',
      of: [{type: 'string'}],
      title: 'List',
      hidden: false,
      description: 'Please enter a list of content:',
      validation: (Rule) => Rule.required(),
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
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
  preview: {select: {title: 'title'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const commonPaywallType = defineType({
  type: 'document',
  name: 'commonPaywall',
  title: 'Common Paywall',
  description: 'Paywall content for Site, NewSite, Blog',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
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
  preview: {select: {title: 'title'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const pricingType = defineType({
  type: 'document',
  name: 'pricing',
  title: 'Pricing',
  description: '',
  fields: [
    defineField({name: 'mainTitile', type: 'string', title: 'Main Title', hidden: false}),
    defineField({
      type: 'boolean',
      description:
        'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
      name: 'contentfulArchived',
      readOnly: true,
    }),
  ],
  preview: {select: {title: 'mainTitile'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const blogPostMobileBannerType = defineType({
  type: 'document',
  name: 'blogPostMobileBanner',
  title: 'Blog Post Mobile Banner',
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
      description: 'Recommended resolution: 126 width (not fix height)',
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
})

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
        Rule.required().custom((url, context) => {
          if (url && !url.includes('embed')) {
            return 'URL must contain "embed"';
          }
          return true;
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
})

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
})

export const inlineLinkType = defineType({
  type: 'document',
  name: 'inlineLink',
  title: 'Inline Link',
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
      name: 'url',
      type: 'url',
      title: 'URL',
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
      name: 'target',
      type: 'string',
      title: 'Target',
      hidden: false,
      validation: (Rule) =>
        Rule.required().custom((value) => validateIn(['_blank', '_self'], value)),
      options: {list: ['_blank', '_self']},
    }),
    defineField({
      name: 'follow',
      type: 'boolean',
      title: 'Follow',
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
  preview: {select: {title: 'title'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const postListAdditionalBannersType = defineType({
  type: 'document',
  name: 'postListAdditionalBanners',
  title: 'Post List Additional Banners',
  description: '',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', hidden: false}),
    defineField({
      name: 'listBanners',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'postBanner'}]}],
      title: ' List Banners',
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
  preview: {select: {title: 'title'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

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
})

export const watchTutorialType = defineType({
  type: 'document',
  name: 'watchTutorial',
  title: 'Watch Tutorial',
  description: '',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', hidden: false}),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
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
})

export const blogPostSchemaType = defineType({
  type: 'document',
  name: 'blogPostSchema',
  title: 'Blog Post Schema',
  description: '',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
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
  preview: {select: {title: 'name'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const innerContentSwitcherType = defineType({
  type: 'document',
  name: 'innerContentSwitcher',
  title: 'Inner Content Switcher',
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
      name: 'desktopContent',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Heading 5', value: 'h5'},
            {title: 'Heading 6', value: 'h6'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                type: 'object',
                name: 'link',
                title: 'url',
                fields: [
                  defineField({
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (Rule) => Rule.required(),
                  }),
                  defineField({
                    type: 'string',
                    name: 'target',
                    title: 'Target',
                    options: {
                      list: [
                        {value: '_blank', title: 'Blank'},
                        {value: '_parent', title: 'Parent'},
                      ],
                    },
                  }),
                ],
              },
              {
                type: 'reference',
                name: 'reference',
                title: 'Reference',
                to: [
                  {type: 'navigation'},
                  {type: 'navigationElement'},
                  {type: 'navigationSubmenu'},
                  {type: 'post'},
                  {type: 'person'},
                  {type: 'header'},
                  {type: 'logo'},
                  {type: 'footer'},
                  {type: 'socialBar'},
                  {type: 'socialIcon'},
                  {type: 'popularArticles'},
                  {type: 'deploy'},
                  {type: 'indexPage'},
                  {type: 'indexPageBanner'},
                  {type: 'postPageBanner'},
                  {type: 'customScripts'},
                  {type: 'script'},
                  {type: 'blogPostEmbeddedVideo'},
                  {type: 'postBanner'},
                  // {type: 'jumpLink'},
                  {type: 'contentTable'},
                  {type: 'commonPaywall'},
                  {type: 'pricing'},
                  {type: 'blogPostMobileBanner'},
                  {type: 'blogPostEmbeddedAutoVideo'},
                  {type: 'collectPanem'},
                  {type: 'inlineLink'},
                  {type: 'postListAdditionalBanners'},
                  {type: 'blogPostWebinarBanner'},
                  {type: 'watchTutorial'},
                  {type: 'blogPostSchema'},
                  {type: 'innerContentSwitcher'},
                ],
              },
              {type: 'image'},
              {type: 'file'},
            ],
          },
        },
        {type: 'break'},
      ],
      title: 'Desktop Content',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileContent',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Heading 5', value: 'h5'},
            {title: 'Heading 6', value: 'h6'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                type: 'object',
                name: 'link',
                title: 'url',
                fields: [
                  defineField({
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (Rule) => Rule.required(),
                  }),
                  defineField({
                    type: 'string',
                    name: 'target',
                    title: 'Target',
                    options: {
                      list: [
                        {value: '_blank', title: 'Blank'},
                        {value: '_parent', title: 'Parent'},
                      ],
                    },
                  }),
                ],
              },
              {
                type: 'reference',
                name: 'reference',
                title: 'Reference',
                to: [
                  {type: 'navigation'},
                  {type: 'navigationElement'},
                  {type: 'navigationSubmenu'},
                  {type: 'post'},
                  {type: 'person'},
                  {type: 'header'},
                  {type: 'logo'},
                  {type: 'footer'},
                  {type: 'socialBar'},
                  {type: 'socialIcon'},
                  {type: 'popularArticles'},
                  {type: 'deploy'},
                  {type: 'indexPage'},
                  {type: 'indexPageBanner'},
                  {type: 'postPageBanner'},
                  {type: 'customScripts'},
                  {type: 'script'},
                  {type: 'blogPostEmbeddedVideo'},
                  {type: 'postBanner'},
                  // {type: 'jumpLink'},
                  {type: 'contentTable'},
                  {type: 'commonPaywall'},
                  {type: 'pricing'},
                  {type: 'blogPostMobileBanner'},
                  {type: 'blogPostEmbeddedAutoVideo'},
                  {type: 'collectPanem'},
                  {type: 'inlineLink'},
                  {type: 'postListAdditionalBanners'},
                  {type: 'blogPostWebinarBanner'},
                  {type: 'watchTutorial'},
                  {type: 'blogPostSchema'},
                  {type: 'innerContentSwitcher'},
                ],
              },
              {type: 'image'},
              {type: 'file'},
            ],
          },
        },
        {type: 'break'},
      ],
      title: 'Mobile Content',
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
  preview: {select: {title: 'title'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})

export const breakType = defineType({
  name: 'break',
  title: 'Break',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      type: 'string',
      options: {
        list: [
          {title: 'Line break', value: 'lineBreak'},
          {title: 'Read more', value: 'readMore'},
        ],
      },
    }),
  ],
})

export const schemaTypes = [
  navigationType,
  navigationElementType,
  navigationSubmenuType,
  postType,
  personType,
  headerType,
  logoType,
  footerType,
  socialBarType,
  socialIconType,
  popularArticlesType,
  deployType,
  indexPageType,
  indexPageBannerType,
  postPageBannerType,
  customScriptsType,
  scriptType,
  blogPostEmbeddedVideoType,
  postBannerType,
  jumpLinkType,
  contentTableType,
  commonPaywallType,
  pricingType,
  blogPostMobileBannerType,
  blogPostEmbeddedAutoVideoType,
  collectPanemType,
  inlineLinkType,
  postListAdditionalBannersType,
  blogPostWebinarBannerType,
  watchTutorialType,
  blogPostSchemaType,
  innerContentSwitcherType,
  breakType,
] satisfies SchemaTypeDefinition[]
