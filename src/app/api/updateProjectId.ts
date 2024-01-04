import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";
import { ProjectItem } from "../types/project";

export const updateProjectId = async (
	projectId: number,
	dataUpdate: ProjectItem,
	tokenUser: string
) => {
	try {
		const response = await request.put(
			`${BASE_URL_API}/Project/updateProject?projectId=${projectId}`,
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
