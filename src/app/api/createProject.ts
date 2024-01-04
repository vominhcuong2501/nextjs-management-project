import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";
import { CreateProject } from "../types/project";

export const createProject = async (
	dataCreate: CreateProject,
	tokenUser: string
) => {
	try {
		const response = await request.post(
			`${BASE_URL_API}/Project/createProjectAuthorize`,
			dataCreate,
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
