import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";

export const getUserKeywordApi = async (keyWord: string, tokenUser: string) => {
  try {
    const response = await request.get(
      `${BASE_URL_API}/Users/getUser?keyword=${keyWord}`,
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
