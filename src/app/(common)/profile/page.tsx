/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Button from "@/app/component/Button";
import Input from "@/app/component/Input";
import { editUserSchema } from "@/lib/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { notification } from "antd";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCookie } from "cookies-next";
import {
	UserOutlined,
	KeyOutlined,
	MailOutlined,
	LockOutlined,
	PhoneOutlined,
} from "@ant-design/icons";
import { EditProfile } from "@/app/types/user";
import { useReverseModifyObject } from "@/lib/utils/modifyContent";
import useDataUser from "@/lib/store/client/infomationUser";
import { updateUserApi } from "@/app/api/updateUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserListApi } from "@/app/api/getUserList";

export default function Profile() {
	const defaultValues: EditProfile = {
		id: 0,
		name: "",
		email: "",
		passWord: "",
		phoneNumber: "",
	};

	const { userInfo, updateUser } = useDataUser();

	const getProfile = useReverseModifyObject(userInfo, false);

	const [isLoading, setIsLoading] = useState(false);

	const queryClient = useQueryClient();

	const [dataDefault, setDataDefault] = useState<EditProfile>(defaultValues);

	const [dataProfile, setDataProfile] = useState<EditProfile>(defaultValues);

	const tokenUser = getCookie("__token") as string;

	const { data, status }: any = useQuery({
		queryKey: ["get-user-list"],
		queryFn: () => getUserListApi(tokenUser),
	});

	useEffect(() => {
		if (status) {
			const listDataUser = data?.content;
			const index =
				Number(getProfile?.id) &&
				listDataUser?.findIndex(
					(user: any) => Number(getProfile?.id) === user.userId
				);
			if (index) {
				const profile = listDataUser[index];

				setDataProfile({
					id: profile?.userId,
					name: profile?.name,
					email: profile?.email,
					passWord: profile?.passWord,
					phoneNumber: profile?.phoneNumber,
				});

				setDataDefault({
					id: profile?.userId,
					name: profile?.name,
					email: profile?.email,
					passWord: profile?.passWord,
					phoneNumber: profile?.phoneNumber,
				});

				setValue("name", profile?.name);
				setValue("email", profile?.email);
				setValue("phoneNumber", profile?.phoneNumber);
				setValue("passWord", profile?.passWord);
				setValue("id", profile?.userId);
			}
		}
	}, [data?.content, status]);

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isValid },
	} = useForm<any>({
		mode: "all",
		defaultValues,
		resolver: yupResolver(editUserSchema()),
		shouldFocusError: false,
	});

	// validate form
	const [isFormChange, setIsFormChange] = useState(isValid);

	useEffect(() => {
		const formHasChanged =
			JSON.stringify(dataProfile) !== JSON.stringify(dataDefault);
		setIsFormChange(formHasChanged);
	}, [dataProfile]);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setDataProfile((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const updateProfileMutation = useMutation({
		mutationFn: (data: EditProfile) => updateUserApi(data, tokenUser),
		onSuccess: (responseApi) => {
			if (responseApi?.statusCode === 200) {
				notification.success({
					message: `Update Profile Successfully !`,
				});

				queryClient.invalidateQueries({
					queryKey: ["get-user-list"],
					exact: true,
				});

				setIsLoading(false);
			} else {
				notification.error({
					message: responseApi?.response.data.content,
				});

				setIsLoading(false);
			}
		},
	});

	const onSubmit = handleSubmit((formEditProfile: EditProfile) => {
		setIsLoading(true);

		updateProfileMutation.mutate(formEditProfile);

		!isLoading && updateUser(formEditProfile);
	});

	const handleFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<>
			<div className="rounded-lg bg-white bg-opacity-50 backdrop-blur-lg p-4">
				<h1 className="text-24 lg:text-32 text-gradient-red font-bold leading-1-4 text-center">
					My Profile
				</h1>
			</div>
			<div className="rounded-lg bg-white bg-opacity-50 backdrop-blur-lg p-4 mt-4">
				<form className="grid grid-cols-1 gap-5">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<Input
							classNameLabel="text-neutral-8"
							nameLabel="ID"
							required
							name="id"
							type="text"
							id="id"
							className="relative group "
							classNameInput="text-neutral-8 cursor-no-drop"
							disabled={true}
							value={dataProfile?.id ? dataProfile?.id : 0}
							iconInput={<LockOutlined className="text-20 text-blue-15  " />}
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
							classNameInput="text-neutral-8"
							value={dataProfile?.name ? dataProfile?.name : ""}
							onChange={handleChange}
							iconInput={<UserOutlined className="text-20 text-blue-15  " />}
						/>
						<Input
							classNameLabel="text-neutral-8"
							classNameInput="text-neutral-8"
							nameLabel="Phone Number"
							required
							name="phoneNumber"
							type="text"
							id="phoneNumber"
							className="relative group "
							errorMessage={errors.phoneNumber?.message}
							register={register}
							maxLength={15}
							iconInput={<PhoneOutlined className="text-20 text-blue-15  " />}
							value={dataProfile?.phoneNumber ? dataProfile?.phoneNumber : ""}
							onChange={handleChange}
						/>

						<Input
							classNameLabel="text-neutral-8"
							classNameInput="text-neutral-8"
							nameLabel="Email"
							required
							name="email"
							type="text"
							id="email"
							className="relative group "
							errorMessage={errors.email?.message}
							register={register}
							maxLength={255}
							iconInput={<MailOutlined className="text-20 text-blue-15  " />}
							value={dataProfile?.email ? dataProfile?.email : ""}
							onChange={handleChange}
						/>
						<Input
							classNameLabel="text-neutral-8"
							type="password"
							name="passWord"
							id="passWord"
							classNameInput="text-neutral-8"
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
							iconInput={<KeyOutlined className="text-20 text-blue-15  " />}
							placeholder="Enter your new password"
							value={dataProfile?.passWord ? dataProfile?.passWord : ""}
							onChange={handleChange}
						/>
					</div>
					<Button
						isLoading={isLoading}
						onClick={(e) => handleFormSubmit(e)}
						disabled={!isFormChange}
						className={` max-w-[50vw] lg:max-w-[20vw] mx-auto`}
					>
						Update Profile
					</Button>
				</form>
			</div>
		</>
	);
}
