"use client";

import Input from "@/app/component/Input";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/lib/utils/rules";
import Button from "@/app/component/Button";

export interface FormDataSignUp {
  email: string;
  password: string;
  phone_number: string;
  full_name: string;
}
export default function SignUp() {
  const [_, setIsFormValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: FormDataSignUp = {
    email: "",
    password: "",
    phone_number: "",
    full_name: "",
  };

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
  } = useForm<FormDataSignUp>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(signUpSchema()),
    shouldFocusError: false,
  });

  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid]);

  const onSubmit = handleSubmit(async (formDataSignUp: FormDataSignUp) => {
    setIsLoading(true);
    console.log("formDataSignUp", formDataSignUp);
  });

  const handleFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="min-w-[350px] max-w-[350px] mx-auto absolute lg:relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0 backdrop-blur-md p-4 lg:p-0 rounded-lg">
      <h1 className="text-30 font-bold leading-1-4 text-neutral-1 text-center">
        Welcome!
      </h1>
      <p className="text-14 font-normal text-gray-1 leading-1-4 text-center">
        Use these awesome forms to login or create new account in your project
        for free.
      </p>
      <div className="mt-2">
        <form className=" grid grid-cols-1 gap-3 lg:gap-4">
          <Input
            nameLabel="Full Name"
            required
            name="full_name"
            type="text"
            id="full_name"
            className="relative group"
            errorMessage={errors.full_name?.message}
            register={register}
            maxLength={255}
          />
          <Input
            nameLabel="Phone Number"
            required
            name="phone_number"
            type="text"
            id="phone_number"
            className="relative group "
            errorMessage={errors.phone_number?.message}
            register={register}
            maxLength={255}
          />

          <Input
            nameLabel="Email"
            required
            name="email"
            type="text"
            id="email"
            className="relative group"
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
          />

          <Button
            isLoading={isLoading}
            disabled={!isValid || isLoading}
            onClick={(e) => handleFormSubmit(e)}
            className={`${
              isValid ? "opacity-100" : "opacity-75"
            } bg-blue-12 lg:h-14 h-8 rounded-lg text-14 lg:text-16 font-semibold w-full leading-1-4 text-neutral-1 border-0 mt-4`}
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link
            href={`/sign-in`}
            className="text-gray-1 text-14 lg:text-16 leading-1-4 font-normal "
            title="Already have an account? Sign in"
            target="_self"
          >
            Already have an account?
            <span className="text-neutral-1 font-semibold underline hover:no-underline ml-1">
              Sign in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
