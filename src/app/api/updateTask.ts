import HttpStatusCode from '@/lib/utils/httpStatusCode.enum'
import { BASE_URL_API } from '../constans/common'
import { CreateTaskProps } from '../types/task'
import { request } from './axios'

export const updateTaskApi = async (dataUpdateTask: CreateTaskProps, tokenUser: string) => {
	try {
		const response = await request.post(`${BASE_URL_API}/Project/updateTask`, dataUpdateTask, {
			headers: {
				Authorization: `Bearer ${tokenUser}`
			}
		})
		if (response.status === HttpStatusCode.Ok) return response?.data
	} catch (error) {
		return error
	}
}
