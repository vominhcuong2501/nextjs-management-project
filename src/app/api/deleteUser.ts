import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";

export const deleteUser = async (
  userId: number | string,
  tokenUser: string
) => {
  try {
    const response = await request.delete(
      `${BASE_URL_API}/Users/deleteUser?id=${userId}`,
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
