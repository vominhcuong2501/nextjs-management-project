import HttpStatusCode from '@/lib/utils/httpStatusCode.enum'
import { BASE_URL_API } from '../constans/common'
import { request } from './axios'

export const createCommentApi = async (
  dataComment: {
    taskId: string | number
    contentComment: string
  },
  tokenUser: string
) => {
  try {
    const response = await request.post(`${BASE_URL_API}/Comment/insertComment`, dataComment, {
      headers: {
        Authorization: `Bearer ${tokenUser}`
      }
    })
    if (response.status === HttpStatusCode.Ok) return response?.data
  } catch (error) {
    return error
  }
}
