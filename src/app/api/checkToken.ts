import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";

export const checkTokenApi = async (tokenUser: string) => {
  try {
    const response = await request.post(
      `${BASE_URL_API}/Users/TestToken`,
      tokenUser
    );
    if (response.status === HttpStatusCode.Ok) return response?.data;
  } catch (error) {
    return error;
  }
};
