/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Input from "@/app/component/Input";
import Link from "next/link";
import { Switch, notification } from "antd";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/lib/utils/rules";
import Button from "@/app/component/Button";
import { FormSignIn } from "@/app/types/sign-in";
import { submitSignIn } from "@/app/api/submitSignIn";
import { deleteCookie, setCookie, getCookie } from "cookies-next";
import {
  useModifyObject,
  useReverseModifyObject,
} from "@/lib/utils/modifyContent";
import { useRouter } from "next/navigation";
import useDataUser from "@/lib/store/client/infomationUser";
import PATH_NAME from "@/app/constans/pathname";

export default function SignIn() {
  const [remember, setRemeber] = useState(false);

  const handleRemember = (checked: boolean) => {
    setRemeber(checked);
  };

  const [_, setIsFormValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const defaultValues: FormSignIn = {
    email: "",
    password: "",
  };

  const { updateUser } = useDataUser();

  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormSignIn>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(signInSchema()),
    shouldFocusError: false,
  });

  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid]);

  const dataRememberGetCookie = getCookie("__remember");

  useEffect(() => {
    if (dataRememberGetCookie) {
      const dataRememberConvert = useReverseModifyObject(
        JSON.parse(dataRememberGetCookie),
        false
      );
      setValue("email", dataRememberConvert?.email);
      setValue("password", dataRememberConvert?.password);
    } else {
      setValue("email", "");
      setValue("password", "");
    }
  }, []);

  const onSubmit = handleSubmit(async (formDataLogin: FormSignIn) => {
    const dataRememberCookie = useModifyObject(formDataLogin, false);

    remember
      ? setCookie("__remember", dataRememberCookie)
      : deleteCookie("__remember");

    setIsLoading(true);
    try {
      const responseSignIn = await submitSignIn(formDataLogin);

      if (responseSignIn?.statusCode === 200) {
        setIsLoading(false);

        const currentTime = new Date();

        const expirationTime = new Date(
          currentTime.getTime() + 7 * 24 * 60 * 60 * 1000
        );

        setCookie("__token", responseSignIn?.content.accessToken, {
          maxAge: Number(expirationTime),
        });

        const infoUserModify = useModifyObject(responseSignIn?.content, false);

        updateUser(infoUserModify);

        notification.success({
          message: "Successfully!",
        });

        router.push(PATH_NAME.DASHBOARD);
      } else {
        setError("email", {
          message: responseSignIn?.response.data.message,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="min-w-[350px] max-w-[350px] mx-auto absolute lg:relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0 backdrop-blur p-4 lg:p-0 rounded-xl">
      <h1 className="text-30 font-bold leading-1-4 text-neutral-1 text-center">
        Nice to see you!
      </h1>
      <p className="text-14 font-normal text-gray-1 leading-1-4 text-center">
        Enter your email and password to sign in
      </p>
      <div className="mt-7">
        <form className=" grid grid-cols-1 gap-3 lg:gap-4">
          <Input
            nameLabel="Email"
            required
            name="email"
            type="text"
            id="email"
            className="relative group "
            errorMessage={errors.email?.message}
            register={register}
            maxLength={255}
          />
          <Input
            type="password"
            name="password"
            id="password"
            nameLabel="Password"
            className="relative group"
            autoComplete="current-password"
            errorMessage={errors.password?.message}
            register={register}
            required
            maxLength={20}
            minLength={6}
            autocomplete=""
          />
          <div className="flex items-center gap-2">
            <Switch
              onChange={handleRemember}
              className="bg-neutral-7"
              size="small"
            />
            <p className="text-14 font-normal text-neutral-1 leading-1-4">
              Remember me!
            </p>
          </div>
          <Button
            isLoading={isLoading}
            disabled={!isValid || isLoading}
            onClick={(e) => handleFormSubmit(e)}
            className={`${
              isValid ? "opacity-100" : "opacity-75"
            } bg-blue-12 lg:h-14 h-8 rounded-lg text-14 lg:text-16 font-semibold w-full leading-1-4 text-neutral-1 border-0`}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link
            href={PATH_NAME.SIGN_UP}
            className="text-gray-1 text-14 lg:text-16 leading-1-4 font-normal "
            title="Do not have an account? Sign up"
            target="_self"
          >
            Do not have an account?
            <span className="text-neutral-1 font-semibold underline hover:no-underline ml-1">
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
