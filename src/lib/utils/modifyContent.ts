/* eslint-disable react-hooks/rules-of-hooks */
import { parseJSON } from "./utilsFunc";

const secretKey = "WHO2G6";
var CryptoJS = require("crypto-js");

export function useEncrypt(
	value: string,
	secret: string = secretKey
): string | null {
	if (!secret || typeof secret !== "string") {
		return null;
	}

	if (value == null) {
		return null;
	}

	try {
		return encryptWithNoErrors(secret, value);
	} catch (error) {
		return null;
	}
}

function encryptWithNoErrors(secret: string, value: string): string {
	return CryptoJS.AES.encrypt(value, secret).toString();
}

export function useDecrypt(
	value: string | null,
	secret: string = secretKey
): string | null {
	if (!secret || typeof secret !== "string") {
		return null;
	}

	if (value == null) {
		return null;
	}

	try {
		return decryptWithNoErrors(secret, value);
	} catch (error) {
		return null;
	}
}

function decryptWithNoErrors(secret: string, value: string): string {
	const decrypted = CryptoJS.AES.decrypt(value, secret);
	return decrypted.toString(CryptoJS.enc.Utf8);
}

export const useModifyObject = <T>(obj: T, off = true): T => {
	if (process.env.NEXT_PUBLIC_DEBUG_API_MODE === "ON" && off) return obj;
	try {
		if (obj === null || obj === undefined || obj === "" || obj === 0) {
			return obj as T;
		}

		if (Array.isArray(obj)) {
			return obj.map((item) => useModifyObject(item, off)) as T;
		} else if (typeof obj === "object") {
			const modifiedObject: Record<string, any> = {};
			for (const key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					const value = obj[key];
					modifiedObject[
						CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(key))
					] = useModifyObject(value, off);
				}
			}
			return modifiedObject as T;
		}
		return useEncrypt(obj.toString(), secretKey) as T;
	} catch (error) {
		return obj;
	}
};

export const useReverseModifyObject = <T>(
	obj: T,
	off = true
): T | undefined => {
	if (process.env.NEXT_PUBLIC_DEBUG_API_MODE === "ON" && off) return obj;

	try {
		if (obj === null || obj === undefined || obj === "" || obj === 0) {
			return obj as T;
		}

		if (Array.isArray(obj)) {
			return obj.map((item) => useReverseModifyObject(item, off)) as T;
		} else if (typeof obj === "object") {
			const reversedObject: Record<string, any> = {};
			for (const key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					const value = obj[key];
					const reversedKey = CryptoJS.enc.Base64.parse(key).toString(
						CryptoJS.enc.Utf8
					);
					reversedObject[reversedKey] = useReverseModifyObject(value, off);
				}
			}
			return reversedObject as T;
		}

		if (typeof obj === "string") {
			return useDecrypt(obj) as T;
		}
	} catch (error) {
		return obj;
	}
};

export const useEncryptBase64 = (value: string, off = true) => {
	if ((process.env.NEXT_PUBLIC_DEBUG_API_MODE === "ON", off)) return value;
	try {
		return btoa(useEncrypt(value) as string);
	} catch (error) {
		return value;
	}
};

export const useDecryptBase64 = (value: string, off = true) => {
	if (process.env.NEXT_PUBLIC_DEBUG_API_MODE === "ON" && off) return value;
	try {
		const decodeBase64 = atob(value);
		const decodeValues = useDecrypt(decodeBase64);
		return parseJSON(decodeValues as string);
	} catch (error) {
		return value;
	}
};
