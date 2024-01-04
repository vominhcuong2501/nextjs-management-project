import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { FormSignIn } from "../types/sign-in";
import { request } from "./axios";

export const submitSignInApi = async (data: FormSignIn) => {
  try {
    const response = await request.post(`${BASE_URL_API}/Users/signin`, data);
    if (response.status === HttpStatusCode.Ok) return response?.data;
  } catch (error) {
    return error;
  }
};
