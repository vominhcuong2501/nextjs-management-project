import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";
import { AddMemberProjectProps } from "../types/project";
import { notification } from "antd";

export const addMemberProjectApi = async (
  dataMember: AddMemberProjectProps,
  tokenUser: string
) => {
  try {
    const response = await request.post(
      `${BASE_URL_API}/Project/assignUserProject`,
      dataMember,
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
