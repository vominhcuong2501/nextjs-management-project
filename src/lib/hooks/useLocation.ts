'use client'
import { getLocation } from '@/lib/store/server/location/queries'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

export const useLocation = () => {
  const [currency, setCurrency] = useState('')

  const locationCode = getCookie('__location')?.toString() || 'gx'
  const languageCode = getCookie('__language')?.toString() || 'en'
  const currencyCode = getCookie('__currency')?.toString() || 'USD'

  const { data: dataLocation } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => getLocation()
  })

  useEffect(() => {
    setCurrency(currencyCode)
  }, [currencyCode])

  const sortCurrentLocation = dataLocation && Object.entries(dataLocation)
  sortCurrentLocation &&
    sortCurrentLocation.sort(([keyA]: string[], [keyB]: string[]) => {
      if (keyA === locationCode) return -1
      if (keyB === locationCode) return 1
      return 0
    })

  const defaultLang = {
    location_lang_code: 'en',
    language_name: 'English',
    location_alternate_hreflang: 'en'
  }
  const sortedData = sortCurrentLocation && Object.fromEntries(sortCurrentLocation)
  const listLocation = (sortedData && Object.values(sortedData)) || []
  const currencyAndLanguage = dataLocation && dataLocation[locationCode]
  const currencyLanguage = (dataLocation && dataLocation[locationCode]?.languages?.[languageCode]) ?? defaultLang
  const currencies = currencyAndLanguage && Object.values(currencyAndLanguage.currencies)
  const languages = currencyAndLanguage && Object.values(currencyAndLanguage.languages)

  return {
    currency,
    listLocation,
    currencyLanguage,
    currencies,
    languages,
    locationCode,
    locationDefault: {
      country_name: currencyAndLanguage?.country_name,
      country_code: currencyAndLanguage?.location_country_code
    }
  }
}
