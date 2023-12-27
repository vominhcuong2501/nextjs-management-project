/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import useDataUser from "@/lib/store/client/infomationUser";
import { _isEmpty } from "@/lib/utils/utilsFunc";
import { getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

// const BaseComponent = () => {
// 	const pathname = usePathname();

// 	const router = useRouter();

// 	const { updateUser, updateStatusAuth, userInfo } = useDataUser();

// 	const tokenUser = getCookie("__token") as string;

// 	const listIsRequiredAuth = [
// 		"/profile",
// 		"/table-project",
// 		"/table-user",
// 		"/create-project",
// 		"/dashboard",
// 	];

// 	const listNotRequiredAuth = ["/sign-in", "/sign-up"];

// 	const pageIsAuth = listIsRequiredAuth.includes(pathname as string);

// 	const pageIsNotAuth = listNotRequiredAuth.includes(pathname as string);

// 	if (!getCookie("__token") && pageIsAuth) {
// 		router.push("/sign-in");
// 		return;
// 	}

// 	if (getCookie("__token") && pageIsNotAuth) {
// 		router.push("/dashboard");
// 		return;
// 	}

// 	const fetchData = async (tokenUser: string) => {
// 		if (!getCookie("__token")) {
// 			updateUser(undefined);
// 			router.push("/sign-in");
// 			return;
// 		} else {
// 			router.push("/dashboard");
// 			updateStatusAuth(true);
// 		}

// 		// try {
// 		// const userInfo = await onSubmitGetUser(tokenUser);

// 		// const dataUser = _get(userInfo, "data.data", {});

// 		// const dataUserModify = useModifyObject(dataUser, false);

// 		// dataUserModify && updateUser(dataUserModify);

// 		// window.location.href = `/${PAGE_TYPE.MY_PROFILE}`;
// 		// router.push("/dashboard");
// 		// } catch (_) {
// 		// 	throw new Error("Error occurred");
// 		// }
// 	};

// 	useEffect(() => {
// 		if (!getCookie("__token")) {
// 			updateUser(undefined);
// 		}

// 		if (_isEmpty(userInfo) || !userInfo) {
// 			getCookie("__token") && fetchData(tokenUser);
// 		}
// 	}, [tokenUser]);

// 	return <></>;
// };

// export default BaseComponent;
const BaseComponent = () => {
	const pathname = usePathname();

	const router = useRouter();

	const { updateUser, updateStatusAuth, userInfo } = useDataUser();

	const tokenUser = getCookie("__token") as string;

	const listIsRequiredAuth = [
		"/profile",
		"/table-project",
		"/table-user",
		"/create-project",
		"/dashboard",
	];

	const listNotRequiredAuth = ["/sign-in", "/sign-up"];

	const pageIsAuth = listIsRequiredAuth.includes(pathname as string);

	const pageIsNotAuth = listNotRequiredAuth.includes(pathname as string);

	if (!getCookie("__token") && pageIsAuth) {
		router.push("/sign-in");
	}

	if (getCookie("__token") && pageIsNotAuth) {
		router.push("/dashboard");
	}

	useEffect(() => {
		const fetchData = async (tokenUser: string) => {
			try {
				router.push("/dashboard");
				updateStatusAuth(true);
			} catch (error) {
				console.error("Error occurred", error);
			}
		};

		if (!getCookie("__token")) {
			updateUser(undefined);
			router.push("/sign-in");
		} else if (_isEmpty(userInfo) || !userInfo) {
			fetchData(tokenUser);
		}
	}, [tokenUser, userInfo, updateStatusAuth, updateUser, router]);

	return <></>;
};

export default BaseComponent;
