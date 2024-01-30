import { getCurrentLocale } from '@/lib/utils/utilFuncs'
import type { LocationType } from '@/types/common'
import { useCallback } from 'react'

export const useLocationLink = () => {
  return useCallback((location: LocationType) => {
    const firstItem = location.languages[Object.keys(location.languages)[0]]
    const langUrlSlashed = getCurrentLocale(firstItem.location_lang_code, location.location_country_code)
    return `${langUrlSlashed ? `/${langUrlSlashed}` : '/'}` as string
  }, [])
}
