"use client";
import { submitSignIn } from "@/app/api/submitSignIn";
import Button from "@/app/component/Button";
import Input from "@/app/component/Input";
import PATH_NAME from "@/app/constans/pathname";
import { CreateProject } from "@/app/types/project";
import { createProjectSchema, signInSchema } from "@/lib/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateProject() {
	const [_, setIsFormValid] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const defaultValues: CreateProject = {
		projectName: "",
		description: "",
	};

	const {
		handleSubmit,
		register,
		setError,
		setValue,
		formState: { errors, isValid },
	} = useForm<CreateProject>({
		mode: "all",
		defaultValues,
		resolver: yupResolver(createProjectSchema()),
		shouldFocusError: false,
	});

	useEffect(() => {
		setIsFormValid(isValid);
	}, [isValid]);

	const onSubmit = handleSubmit(async (formDataLogin: CreateProject) => {
		setIsLoading(true);
		// try {
		// 	const responseSignIn = await submitSignIn(formDataLogin);

		// 	if (responseSignIn?.statusCode === 200) {
		// 		setIsLoading(false);

		// 		notification.success({
		// 			message: "Successfully!",
		// 		});

		// 		router.push(PATH_NAME.PROFILE);
		// 	} else {
		// 		notification.success({
		// 			message: responseSignIn?.response.data.message,
		// 		});

		// 		setIsLoading(false);
		// 	}
		// } catch (error) {
		// 	console.error(error);
		// }
	});

	const handleFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onSubmit();
	};
	return (
		<div>
			<form>
				<Input
					nameLabel="Email"
					required
					name="projectName"
					type="text"
					id="projectName"
					className="relative group "
					errorMessage={errors.projectName?.message}
					register={register}
					maxLength={255}
				/>
				<Input
					nameLabel="Email"
					required
					name="description"
					type="text"
					id="description"
					className="relative group "
					errorMessage={errors.description?.message}
					register={register}
					maxLength={255}
				/>
				<Button
					isLoading={isLoading}
					disabled={!isValid || isLoading}
					onClick={(e) => handleFormSubmit(e)}
					className={`${
						isValid ? "opacity-100" : "opacity-75"
					} bg-gradient-to-r from-green-400 via-cyan-400 to-indigo-400 lg:h-14 h-8 rounded-lg text-14 lg:text-16 font-semibold w-full leading-1-4 text-neutral-1 border-0`}
				>
					Sign In
				</Button>
			</form>
		</div>
	);
}
