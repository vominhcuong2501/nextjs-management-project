import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";

export const getTypeTaskApi = async () => {
	try {
		const response = await request.get(`${BASE_URL_API}/TaskType/getAll`);
		if (response.status === HttpStatusCode.Ok) return response?.data;
	} catch (error) {
		return error;
	}
};
