import { useSearchParams } from 'next/navigation'

/**
 * Get all query parameters from the given URL search params.
 * @param {string} queryParams - The URL search params.
 * @returns {Object} - An object containing all the query parameters.
 */
export default function useQueryParams() {
  const queryParams = useSearchParams()
  const params = new URLSearchParams(queryParams)

  const getAllQueryParams = () => {
    const queryParamObj: { [key: string]: string } = {}

    params.forEach((value, key) => {
      queryParamObj[key] = value
    })

    return queryParamObj
  }

  return { getAllQueryParams }
}
