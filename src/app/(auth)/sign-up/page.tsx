"use client";

import Input from "@/app/component/Input";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/lib/utils/rules";
import Button from "@/app/component/Button";
import { submitSignUpApi } from "@/app/api/submitSignUp";
import { FormSignUp } from "@/app/types/sign-up";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import PATH_NAME from "@/app/constans/pathname";
import {
	MailOutlined,
	KeyOutlined,
	UserOutlined,
	PhoneOutlined,
} from "@ant-design/icons";

export default function SignUp() {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const defaultValues: FormSignUp = {
		email: "",
		password: "",
		phoneNumber: "",
		name: "",
	};

	const {
		handleSubmit,
		register,
		setError,
		formState: { errors, isValid },
	} = useForm<FormSignUp>({
		mode: "all",
		defaultValues,
		resolver: yupResolver(signUpSchema()),
		shouldFocusError: false,
	});

	const onSubmit = handleSubmit(async (formDataSignUp: FormSignUp) => {
		setIsLoading(true);

		try {
			const responseSignUp = await submitSignUpApi(formDataSignUp);

			if (responseSignUp?.statusCode === 200) {
				setIsLoading(false);

				notification.success({
					message: "Register Successfully!",
				});

				router.push(PATH_NAME.SIGN_IN);
			} else {
				setError("email", {
					message: responseSignUp?.response.data.message,
				});
				notification.error({
					message: responseSignUp?.response.data.message,
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
		<div className="min-w-[350px] max-w-[350px] mx-auto absolute lg:relative top-[95%] -translate-y-full left-1/2 -translate-x-1/2 lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0 backdrop-blur-md p-4 lg:p-0 rounded-lg">
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
						name="name"
						type="text"
						id="name"
						className="relative group"
						errorMessage={errors.name?.message}
						register={register}
						maxLength={255}
						iconInput={<UserOutlined className="text-20 text-blue-15" />}
						placeholder="Enter your name"
					/>
					<Input
						nameLabel="Phone Number"
						required
						name="phoneNumber"
						type="text"
						id="phoneNumber"
						className="relative group "
						errorMessage={errors.phoneNumber?.message}
						register={register}
						maxLength={15}
						iconInput={<PhoneOutlined className="text-20 text-blue-15" />}
						placeholder="Enter your phone"
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
						iconInput={<MailOutlined className="text-20 text-blue-15" />}
						placeholder="Enter your email"
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
						iconInput={<KeyOutlined className="text-20 text-blue-15" />}
						placeholder="Enter your password"
					/>

					<Button
						isLoading={isLoading}
						disabled={!isValid || isLoading}
						onClick={(e) => handleFormSubmit(e)}
						className={`${isValid ? "opacity-100" : "opacity-70"}  mt-4`}
					>
						{" "}
						Sign Up
					</Button>
				</form>

				<div className="mt-4 text-center">
					<Link
						href={PATH_NAME.SIGN_IN}
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
