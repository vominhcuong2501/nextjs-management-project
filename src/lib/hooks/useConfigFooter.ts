import type { DataConfigFooter, DataPaymentFooter, DataSocialFooter } from '@/components/Footer/Footer'
import { S3_STATIC_BASE } from '@/constants/configGlobal'

export const useConfigFooter = (configData: { t: (configKey: string) => string }) => {
  const { t = () => null } = configData

  const tn_config_footer = {
    txt_brand_name: t('txt_brand_name'),
    txt_subscribe_footer: t('txt_subscribe_footer'),
    txt_email_address_placeholder: t('txt_email_address_placeholder'),
    txt_subscribe: t('txt_subscribe'),
    txt_company_name_footer: t('txt_company_name_footer'),
    txt_copyright_new_footer: t('txt_copyright_new_footer'),
    txt_thanks_subscription: t('txt_thanks_subscription'),
    txt_contact_us: t('txt_contact_us'),
    txt_this_field_is_required: t('txt_this_field_is_required'),
    txt_this_field_is_invalid: t('txt_this_field_is_invalid')
  } as DataConfigFooter

  const tn_list_social_footer = [
    {
      tn_href: 'https://www.youtube.com/@travelnerglobal',
      tn_icon: `${S3_STATIC_BASE}/footer/icon-youtube.svg`,
      tn_alt: t('txt_youtube_footer')
    },
    {
      tn_href: 'https://www.facebook.com/travelneragency',
      tn_icon: `${S3_STATIC_BASE}/footer/icon-facebook.svg`,
      tn_alt: t('txt_facebook_footer')
    },
    {
      tn_href: 'https://www.instagram.com/travelnercom/',
      tn_icon: `${S3_STATIC_BASE}/footer/icon-instagram.svg`,
      tn_alt: t('txt_instagram_footer')
    },
    {
      tn_href: 'https://www.linkedin.com/company/travelner/',
      tn_icon: `${S3_STATIC_BASE}/footer/icon-linkedin.svg`,
      tn_alt: t('txt_linkedin_footer')
    },
    {
      tn_href: 'https://www.tiktok.com/@travelnerglobal',
      tn_icon: `${S3_STATIC_BASE}/footer/icon-tiktok.svg`,
      tn_alt: t('txt_tiktok_footer')
    },
    {
      tn_href: 'https://twitter.com/travelner',
      tn_icon: `${S3_STATIC_BASE}/footer/icon-twitter.svg`,
      tn_alt: t('txt_twitter_footer')
    }
  ] as DataSocialFooter[]

  const tn_payment_secure = [
    {
      tn_name: t('txt_payment'),
      tn_list_content: [
        {
          tn_href: '#',
          tn_icon: `${S3_STATIC_BASE}/footer/icon-visa-footer.svg`,
          tn_alt: t('txt_visa')
        },
        {
          tn_href: '#',
          tn_icon: `${S3_STATIC_BASE}/footer/icon-master-footer.svg`,
          tn_alt: t('txt_master')
        },
        {
          tn_href: '#',
          tn_icon: `${S3_STATIC_BASE}/footer/icon-express-footer.svg`,
          tn_alt: t('txt_american_express')
        },
        {
          tn_href: '#',
          tn_icon: `${S3_STATIC_BASE}/footer/icon-paypal-footer.svg`,
          tn_alt: t('txt_paypal')
        }
      ]
    },
    {
      tn_name: t('txt_secure_payment'),
      tn_list_content: [
        {
          tn_href: '#',
          tn_icon: `${S3_STATIC_BASE}/footer/icon-secure-trust.svg`,
          tn_alt: t('txt_secure_trust')
        },
        {
          tn_href: '#',
          tn_icon: `${S3_STATIC_BASE}/footer/icon-norton-secure.svg`,
          tn_alt: t('txt_norton_secured')
        },
        {
          tn_href: '#',
          tn_icon: `${S3_STATIC_BASE}/footer/icon-pci.svg`,
          tn_alt: t('txt_pci')
        }
      ]
    }
  ] as DataPaymentFooter[]

  const tn_config_topbar = {
    txt_link_phone_topbar: t('txt_link_phone_topbar'),
    txt_name_phone_topbar: t('txt_name_phone_topbar'),
    txt_consultant_support: t('txt_consultant_support'),
    txt_show_more: t('txt_show_more'),
    txt_sign_in: t('txt_sign_in')
  } as {
    txt_link_phone_topbar: string
    txt_name_phone_topbar: string
    txt_consultant_support: string
    txt_show_more: string
    txt_sign_in: string
  }

  return { tn_config_topbar, tn_payment_secure, tn_list_social_footer, tn_config_footer }
}
