import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";
import { EditProfile } from "../types/user";

export const updateUserApi = async (
  dataUpdate: EditProfile,
  tokenUser: string
) => {
  try {
    const response = await request.put(
      `${BASE_URL_API}/Users/editUser`,
      dataUpdate,
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
