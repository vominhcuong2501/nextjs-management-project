import HttpStatusCode from '@/lib/utils/httpStatusCode.enum'
import { BASE_URL_API } from '../constans/common'
import { request } from './axios'

export const getCommentListApi = async (taskId: number | string | undefined) => {
  try {
    const response = await request.get(`${BASE_URL_API}/Comment/getAll?taskId=${taskId}`)
    if (response.status === HttpStatusCode.Ok) return response?.data
  } catch (error) {
    return error
  }
}
