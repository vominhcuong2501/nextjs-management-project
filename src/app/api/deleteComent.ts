import HttpStatusCode from '@/lib/utils/httpStatusCode.enum'
import { BASE_URL_API } from '../constans/common'
import { request } from './axios'

export const deleteCommentApi = async (commentId: number | string | undefined, tokenUser: string) => {
  try {
    const response = await request.delete(`${BASE_URL_API}/Comment/deleteComment?idComment=${commentId}`, {
      headers: {
        Authorization: `Bearer ${tokenUser}`
      }
    })
    if (response.status === HttpStatusCode.Ok) return response?.data
  } catch (error) {
    return error
  }
}
