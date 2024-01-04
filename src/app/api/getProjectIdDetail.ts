import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";

export const getProjectIdDetail = async (
	projectId: string,
	tokenUser: string
) => {
	try {
		const response = await request.get(
			`${BASE_URL_API}/Project/getProjectDetail?id=${projectId}`,
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
