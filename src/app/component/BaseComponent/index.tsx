/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import useDataUser from "@/lib/store/client/infomationUser";
import { _isEmpty } from "@/lib/utils/utilsFunc";
import { getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

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
		// router.push("/sign-in");
		window.location.href = "/sign-in";
	}

	if (getCookie("__token") && pageIsNotAuth) {
		// router.push("/dashboard");
		window.location.href = "/dashboard";
	}

	const fetchData = async (tokenUser: string) => {
		if (!getCookie("__token")) {
			updateUser(undefined);
			router.push("/sign-in");
		}

		try {
			router.push("/dashboard");
			updateStatusAuth(true);
			// const userInfo = await onSubmitGetUser(tokenUser);

			// const dataUser = _get(userInfo, "data.data", {});

			// const dataUserModify = useModifyObject(dataUser, false);

			// dataUserModify && updateUser(dataUserModify);

			// window.location.href = `/${PAGE_TYPE.MY_PROFILE}`;
		} catch (_) {
			throw new Error("Error occurred");
		}
	};

	useEffect(() => {
		if (!getCookie("__token")) {
			updateUser(undefined);
		}

		if (_isEmpty(userInfo) || !userInfo) {
			getCookie("__token") && fetchData(tokenUser);
		}
	}, [tokenUser, userInfo]);

	return <></>;
};

export default BaseComponent;
