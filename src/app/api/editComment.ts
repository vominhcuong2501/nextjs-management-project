import HttpStatusCode from '@/lib/utils/httpStatusCode.enum'
import { BASE_URL_API } from '../constans/common'
import { request } from './axios'

export const editCommentApi = async (
  dataComment: {
    id: string | number
    contentComment: string
  },
  tokenUser: string
) => {
  try {
    const response = await request.put(
      `${BASE_URL_API}/Comment/updateComment?id=${dataComment.id}&contentComment=${dataComment.contentComment}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenUser}`
        }
      }
    )
    if (response.status === HttpStatusCode.Ok) return response?.data
  } catch (error) {
    return error
  }
}
