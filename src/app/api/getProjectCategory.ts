import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";

export const getProjectCategoryApi = async () => {
  try {
    const response = await request.get(`${BASE_URL_API}/ProjectCategory`);
    if (response.status === HttpStatusCode.Ok) return response?.data;
  } catch (error) {
    return error;
  }
};
