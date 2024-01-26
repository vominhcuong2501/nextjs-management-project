import HttpStatusCode from '@/lib/utils/httpStatusCode.enum'
import { BASE_URL_API } from '../constans/common'
import { request } from './axios'

export const updatePriorityApi = async (priority: any, tokenUser: string) => {
	try {
		const response = await request.put(`${BASE_URL_API}/Project/updatePriority`, priority, {
			headers: {
				Authorization: `Bearer ${tokenUser}`
			}
		})
		if (response.status === HttpStatusCode.Ok) return response?.data
	} catch (error) {
		return error
	}
}
