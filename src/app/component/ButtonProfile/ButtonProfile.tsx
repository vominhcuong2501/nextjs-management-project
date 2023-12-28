"use client";
import PATH_NAME from "@/app/constans/pathname";
import useDataUser from "@/lib/store/client/infomationUser";
import { useReverseModifyObject } from "@/lib/utils/modifyContent";
import { Avatar } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Main() {
	const { userInfo } = useDataUser();
	const convertUserInfo = useReverseModifyObject(userInfo, false);
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);
	return (
		<>
			{isClient && (
				<Link
					href={PATH_NAME.PROFILE}
					title={convertUserInfo?.name}
					target="_self"
					className="flex items-center gap-2 text-neutral-1 text-18 font-bold leading-1-4  bg-gradient-to-r from-[#7fe2f3] to-[#5f88c9] px-3 py-2 rounded-lg "
				>
					{convertUserInfo?.name}
					<Avatar src={convertUserInfo?.avatar} />
				</Link>
			)}
		</>
	);
}
