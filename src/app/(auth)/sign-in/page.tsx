"use client";

import Input from "@/app/component/Input";
import Link from "next/link";
import { Switch } from "antd";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/lib/utils/rules";
import Button from "@/app/component/Button";

export interface FormDataLogin {
	email: string;
	password: string;
}
export default function SignIn() {
	const handleRemember = (checked: boolean) => {
		console.log(`switch to ${checked}`);
	};

	const [_, setIsFormValid] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const defaultValues: FormDataLogin = {
		email: "",
		password: "",
	};

	const {
		handleSubmit,
		register,
		setError,
		formState: { errors, isValid },
	} = useForm<FormDataLogin>({
		mode: "all",
		defaultValues,
		resolver: yupResolver(signInSchema()),
		shouldFocusError: false,
	});

	useEffect(() => {
		setIsFormValid(isValid);
	}, [isValid]);

	const onSubmit = handleSubmit(async (formDataLogin: FormDataLogin) => {
		setIsLoading(true);
	});

	const handleFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<div className="min-w-[350px] max-w-[350px] mx-auto absolute lg:relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0">
			<h1 className="text-30 font-bold leading-1-4 text-neutral-1">
				Nice to see you!
			</h1>
			<p className="text-14 font-normal text-gray-1 leading-1-4 ">
				Enter your email and password to sign in
			</p>
			<div className="mt-7">
				<form className=" grid grid-cols-1 lg:gap-6 gap-4">
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
						disabled={!isValid}
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
						href={`/sign-up`}
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
