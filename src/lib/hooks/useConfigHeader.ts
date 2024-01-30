import type { ListMenuProfile } from '@/components/MenuAccount/MenuAccount'
import { S3_STATIC_BASE } from '@/constants/configGlobal'

export const useConfigHeader = (configData: {
  t: (configKey: string) => string
  getAQuotePagePath: string
  loginPagePath: string
  myOrderPagePath: string
  proFilePagePath: string
  paymentHistoryPagePath: string
  homePagePath: string
}) => {
  const {
    t = () => null,
    getAQuotePagePath = '',
    loginPagePath = '',
    myOrderPagePath = '',
    proFilePagePath = '',
    paymentHistoryPagePath = '',
    homePagePath = ''
  } = configData

  const tn_header = {
    tn_logo_name: t('txt_brand_name'),
    tn_icon_247_name: t('txt_notifications'),
    tn_button_name: t('btn_get_a_quote'),
    tn_button_link: getAQuotePagePath,
    tn_icon_search: `${S3_STATIC_BASE}/home/icon-search-header.svg`,
    tn_icon_search_name: t('btn_search'),
    tn_input_your_key: t('txt_input_your_keywords'),
    tn_icon_close_name: t('btn_close'),
    tn_button_signin: t('txt_sign_in'),
    tn_button_signin_link: loginPagePath,
    tn_icon_dropdown_name: t('txt_show_more'),
    txt_country: t('txt_country'),
    txt_language: t('txt_language'),
    txt_currency: t('txt_currency'),
    txt_buy_now: t('txt_buy_now'),
    url_insurance_step_1: t('url_insurance_step_1')
  }

  const menuProfile = [
    {
      tn_name: t('txt_my_booking'),
      tn_link: myOrderPagePath,
      tn_icon: `${S3_STATIC_BASE}/account/icon-my-apply.svg`
    },
    {
      tn_name: t('txt_my_profile_detail'),
      tn_link: proFilePagePath,
      tn_icon: `${S3_STATIC_BASE}/account/icon-my-account.svg`
    },
    {
      tn_name: t('txt_make_payment_history'),
      tn_link: paymentHistoryPagePath,
      tn_icon: `${S3_STATIC_BASE}/account/icon-make-payment-history.svg`
    }
  ] as ListMenuProfile[]

  const profileLogOut = {
    tn_name: t('txt_sign_out'),
    tn_link: homePagePath,
    tn_icon: `${S3_STATIC_BASE}/account/icon-sign-out.svg`
  } as ListMenuProfile

  return { tn_header, menuProfile, profileLogOut }
}
