/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import PATH_NAME from "@/app/constans/pathname";
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

  // useQuery({
  // 	queryKey: ['check-token-user'],
  // 	queryFn: () => checkTokenApi(tokenUser)
  // })

  const listIsRequiredAuth = [
    PATH_NAME.PROFILE,
    PATH_NAME.CREATE_PROJECT,
    PATH_NAME.TABLE_PROJECT,
    PATH_NAME.TABLE_USER,
    PATH_NAME.DASHBOARD,
  ];

  const listNotRequiredAuth = [PATH_NAME.SIGN_IN, PATH_NAME.SIGN_UP];

  const pageIsAuth = listIsRequiredAuth.includes(pathname as string);

  const pageIsNotAuth = listNotRequiredAuth.includes(pathname as string);

  if (typeof window !== "undefined" && !getCookie("__token") && pageIsAuth) {
    window.location.href = PATH_NAME.SIGN_IN;
  }

  if (typeof window !== "undefined" && getCookie("__token") && pageIsNotAuth) {
    window.location.href = PATH_NAME.PROFILE;
  }

  const fetchData = async (tokenUser: string) => {
    // if (!getCookie("__token")) {
    //   updateUser(undefined);
    //   router.push(PATH_NAME.SIGN_IN);
    // }

    try {
      router.push(PATH_NAME.PROFILE);
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
      router.push(PATH_NAME.SIGN_IN);
    }

    if (_isEmpty(userInfo) || !userInfo) {
      getCookie("__token") && fetchData(tokenUser);
    }
  }, [tokenUser, userInfo]);

  return <></>;
};

export default BaseComponent;
