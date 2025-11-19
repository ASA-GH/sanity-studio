import {type SchemaTypeDefinition} from 'sanity';
import {navigationType} from './navigationType';
import {navigationElementType} from './navigationElementType';
import {navigationSubmenuType} from './navigationSubmenuType';
import {postType} from './postType';
import {personType} from './personType';
import {headerType} from './headerType';
import {logoType} from './logoType';
import {footerType} from './footerType';
import {socialBarType} from './socialBarType';
import {socialIconType} from './socialIconType';
import {popularArticlesType} from './popularArticlesType';
import {deployType} from './deployType';
import {indexPageType} from './indexPageType';
import {indexPageBannerType} from './indexPageBannerType';
import {postPageBannerType} from './postPageBannerType';
import {customScriptsType} from './customScriptsType';
import {scriptType} from './scriptType';
import {blogPostEmbeddedVideoType} from './blogPostEmbeddedVideoType';
import {postBannerType} from './postBannerType';
import {jumpLinkType} from './jumpLinkType';
import {contentTableType} from './contentTableType';
import {commonPaywallType} from './commonPaywallType';
import {pricingType} from './pricingType';
import {blogPostMobileBannerType} from './blogPostMobileBannerType';
import {blogPostEmbeddedAutoVideoType} from './blogPostEmbeddedAutoVideoType';
import {collectPanemType} from './collectPanemType';
import {inlineLinkType} from './inlineLinkType';
import {postListAdditionalBannersType} from './postListAdditionalBannersType';
import {blogPostWebinarBannerType} from './blogPostWebinarBannerType';
import {watchTutorialType} from './watchTutorialType';
import {blogPostSchemaType} from './blogPostSchemaType';
import {innerContentSwitcherType} from './innerContentSwitcherType';
import {breakType} from './breakType';

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
] satisfies SchemaTypeDefinition[];
