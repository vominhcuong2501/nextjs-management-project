'use client'

import { getCurrentLocale, splitLocale } from '@/lib/utils/utilFuncs'
import { useParams } from 'next/navigation'

export const useLangUrlSlashed = () => {
  const params = useParams()
  const { lang, location } = splitLocale(params?.locale as string)
  const langUrlSlashed = getCurrentLocale(lang, location)

  return langUrlSlashed
}
