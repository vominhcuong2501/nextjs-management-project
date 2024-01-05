/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Button from "@/app/component/Button";
import Input from "@/app/component/Input";
import { ProjectItem } from "@/app/types/project";
import { createProjectSchema } from "@/lib/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { notification } from "antd";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createProjectApi } from "@/app/api/createProject";
import { getCookie } from "cookies-next";
import {
	UserOutlined,
	KeyOutlined,
	MailOutlined,
	LockOutlined,
	PhoneOutlined,
} from "@ant-design/icons";
import { EditProfile } from "@/app/types/user";

export default function FormEditUser() {
	const defaultValues: EditProfile = {
		id: 0,
		name: "",
		email: "",
		passWord: "",
		phoneNumber: "",
	};

	const [formState, setFormState] = useState<EditProfile>(defaultValues);

	const [nameProject, setNameProject] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const tokenUser = getCookie("__token") as string;

	const router = useRouter();

	const params = useParams();

	// const projectQuery = useQuery({
	// 	queryKey: ["get-project-detail-id", params?.slug],

	// 	queryFn: () =>
	// 		params?.slug !== "add" &&
	// 		getProjectIdDetailApi(params?.slug as string, tokenUser),

	// 	enabled: params?.slug !== undefined,

	// 	staleTime: 1000 * 10,
	// });

	// useEffect(() => {
	// 	if (projectQuery?.data?.statusCode === 200) {
	// 		//  hiển thị UI
	// 		setFormState(projectQuery?.data?.content);
	// 		setNameProject(projectQuery?.data?.content.projectName);

	// 		// set giá trị cho các field
	// 		setValue("categoryId", projectQuery?.data?.content.projectCategory?.id);
	// 		setValue("projectName", projectQuery?.data?.content.projectName);
	// 		setValue("description", projectQuery?.data?.content.description);

	// 	}
	// }, [projectQuery?.data]);

	const {
		handleSubmit,
		register,
		setValue,
		control,
		formState: { errors, isValid },
	} = useForm<any>({
		mode: "all",
		defaultValues,
		resolver: yupResolver(createProjectSchema()),
		shouldFocusError: false,
	});

	// validate form
	const [isFormChange, setIsFormChange] = useState(isValid);

	// const getProjectDetail = {
	// 	projectName: formState?.projectName,
	// 	categoryId: formState?.projectCategory?.id,
	// 	description: formState?.description,
	// };

	// const currentProjectDetail = {
	// 	projectName: nameProject,
	// 	categoryId: valueCategoryId,
	// 	description: text,
	// };

	// useEffect(() => {
	// 	const formHasChanged =
	// 		JSON.stringify(currentProjectDetail) !== JSON.stringify(getProjectDetail);
	// 	setIsFormChange(formHasChanged);
	// }, [nameProject, text, valueCategoryId, currentProjectDetail]);

	const onSubmit = handleSubmit(async (formProject: ProjectItem) => {
		setIsLoading(true);
		try {
			const responseCreateProject = await createProjectApi(
				{
					...formProject,
				},
				tokenUser
			);

			if (responseCreateProject?.statusCode === 200) {
				notification.success({
					message: "Successfully!",
				});

				setIsLoading(false);

				setNameProject("");

				setValue("categoryId", 0);
			} else {
				notification.error({
					message: responseCreateProject?.response.data.content,
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
		<div className="w-screen md:w-[40vw] h-screen shadow-primary bg-neutral-1">
			<h2 className="text-24 lg:text-32 text-gradient-red font-bold leading-1-4 text-center">
				Update User
			</h2>
			<div className="rounded-lg bg-white bg-opacity-50 backdrop-blur-lg p-4 mt-4">
				<form className="grid grid-cols-1 gap-5">
					<Input
						classNameLabel="text-neutral-8"
						nameLabel="ID"
						required
						name="id"
						type="text"
						id="id"
						className="relative group "
						classNameInput="!bg-neutral-1  text-neutral-8 cursor-no-drop"
						disabled={true}
						value={formState?.id}
						iconInput={<LockOutlined className="text-20 text-blue-15" />}
					/>
					<Input
						classNameLabel="text-neutral-8"
						nameLabel="Name"
						required
						name="name"
						type="text"
						id="name"
						className="relative group "
						errorMessage={errors.name?.message}
						register={register}
						maxLength={255}
						classNameInput="!bg-neutral-1  text-neutral-8"
						value={nameProject}
						onChange={(e) => setNameProject(e.target.value)}
						iconInput={<UserOutlined className="text-20 text-blue-15" />}
					/>
					<Input
						classNameLabel="text-neutral-8"
						classNameInput="!bg-neutral-1  text-neutral-8"
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
					/>

					<Input
						classNameLabel="text-neutral-8"
						classNameInput="!bg-neutral-1  text-neutral-8"
						nameLabel="Email"
						required
						name="email"
						type="text"
						id="email"
						className="relative group "
						errorMessage={errors.email?.message}
						register={register}
						maxLength={255}
						iconInput={<MailOutlined className="text-20 text-blue-15" />}
					/>
					<Input
						classNameLabel="text-neutral-8"
						type="password"
						name="passWord"
						id="passWord"
						classNameInput="!bg-neutral-1  text-neutral-8"
						nameLabel="Password"
						className="relative group"
						autoComplete="current-password"
						errorMessage={errors.passWord?.message}
						register={register}
						required
						isRequired={false}
						maxLength={20}
						minLength={6}
						autocomplete=""
						iconInput={<KeyOutlined className="text-20 text-blue-15" />}
					/>
					<Button
						isLoading={isLoading}
						onClick={(e) => handleFormSubmit(e)}
						disabled={!isFormChange}
						className={`bg-gradient-to-r from-green-400 via-cyan-400 to-indigo-400 lg:h-14 h-8 text-14 lg:text-16 font-semibold w-full leading-1-4 text-neutral-1 border-0 max-w-[50vw] lg:max-w-[30vw] mx-auto rounded-[50px]`}
					>
						Update Profile
					</Button>
				</form>
			</div>
		</div>
	);
}
