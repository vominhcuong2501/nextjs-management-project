import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";
import { CreateTaskProps } from "../types/task";

export const createTaskApi = async (
	dataCreateTask: CreateTaskProps,
	tokenUser: string
) => {
	try {
		const response = await request.post(
			`${BASE_URL_API}/Project/createTask`,
			dataCreateTask,
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
