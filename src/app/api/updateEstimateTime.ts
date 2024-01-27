import HttpStatusCode from '@/lib/utils/httpStatusCode.enum'
import { BASE_URL_API } from '../constans/common'
import { request } from './axios'

export const updateEstimateTimeApi = async (estimate: any, tokenUser: string) => {
	try {
		const response = await request.put(`${BASE_URL_API}/Project/updateEstimate`, estimate, {
			headers: {
				Authorization: `Bearer ${tokenUser}`
			}
		})
		if (response.status === HttpStatusCode.Ok) return response?.data
	} catch (error) {
		return error
	}
}
