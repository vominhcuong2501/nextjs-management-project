import { BASE_URL_API } from "@/app/constans/common";

// ----------------------------------------------------------------------
/**
 * Performs an HTTP request using fetch.
 *
 * @param {string} endpoint The API endpoint.
 * @param {string} method The HTTP method (GET or POST, default is GET).
 * @param {Object} data The request data (only used for POST method).
 * @param {Object} options Other custom options for the request.
 *
 * @returns {Promise} A Promise that returns JSON data or an error if any.
 */
export const useFetch = async (
	endpoint: string,
	method = "GET",
	data: Record<string, any> = {},
	headerOptions: Record<string, any> = {},
	request: Record<string, any> = {},
	cache: boolean = true
) => {
	try {
		// Create default headers with language and location
		const customHeaders: Record<string, string> = {
			Accept: "application/json",
			"Content-Type": "application/json",
			...headerOptions,
		};

		// Create request options
		const requestOptions: RequestInit & { body?: string } = {
			method: method,
			headers: customHeaders,
			next: { tags: ["all"] },
			...request,
		};

		if (!cache) delete requestOptions.next;
		if (method === "POST") {
			// Add request data if using the POST method
			requestOptions.body = JSON.stringify(data);
		}

		// Perform the fetch request
		const url = endpoint.includes("http")
			? endpoint
			: `${BASE_URL_API}/${endpoint}`;
		const response = await fetch(url, requestOptions);

		// Handle HTTP status
		if (response.ok) return await response.json();
		if (response.status === 429) {
			// eslint-disable-next-line no-console
			return { data: null, success: false };
		}
		// eslint-disable-next-line no-console
		return await response.json();
	} catch (error) {
		return error;
	}
};

// ----------------------------------------------------------------------
/**
 * Parses a JSON string and returns the parsed object.
 * If the input string is undefined or null, returns null.
 * If the input string is not a valid JSON, returns null.
 *
 * @param jsonString - The JSON string to parse.
 * @returns The parsed JSON object or null.
 */
export const parseJSON = (jsonString: string | undefined | null) => {
	try {
		return jsonString ? JSON.parse(jsonString) : null;
	} catch (error) {
		return null;
	}
};

// Check  value is array
// ----------------------------------------------------------------------
export const isArray = (value: unknown) => value instanceof Array;

// ----------------------------------------------------------------------
/**
 * Check object is Empty
 * @param obj Object
 * @returns boolean
 */
export const _isEmpty = (obj: unknown): boolean => {
	if (typeof obj !== "object" || obj === null || obj === undefined) {
		return true;
	}

	return Object.values(obj).every((value) => {
		if (typeof value === "object") {
			return _isEmpty(value);
		}

		if (isArray(value)) {
			return value.length > 0;
		}

		return !value;
	});
};
