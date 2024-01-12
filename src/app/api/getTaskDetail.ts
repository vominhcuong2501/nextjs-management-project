import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";

export const getTaskDetailApi = async (
  taskId: string | number,
  tokenUser: string
) => {
  try {
    const response = await request.get(
      `${BASE_URL_API}/Project/getTaskDetail?taskId=${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      }
    );
    if (response.status === HttpStatusCode.Ok) return response?.data;
  } catch (error) {
    return error;
  }
};
