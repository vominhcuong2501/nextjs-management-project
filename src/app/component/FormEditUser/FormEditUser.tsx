/* eslint-disable react-hooks/rules-of-hooks */
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
  SmileOutlined,
} from "@ant-design/icons";
import { EditProfile } from "@/app/types/user";
import {
  useModifyObject,
  useReverseModifyObject,
} from "@/lib/utils/modifyContent";
import useDataUser from "@/lib/store/client/infomationUser";
import { updateUserApi } from "@/app/api/updateUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FormEditUserProps {
  handleCloseFormEditUser: () => void;
}

export default function FormEditUser({
  handleCloseFormEditUser,
}: FormEditUserProps) {
  const { userInfo, updateUser } = useDataUser();

  const profileDetail = useReverseModifyObject(userInfo, false);

  const defaultValues: EditProfile = {
    id: Number(profileDetail?.id),
    name: profileDetail?.name,
    email: profileDetail?.email,
    passWord: "",
    phoneNumber: profileDetail?.phoneNumber,
    avatar: profileDetail?.avatar,
  };

  const [nameProfile, setNameProfile] = useState(profileDetail?.name);

  const [emailProfile, setEmailProfile] = useState(profileDetail?.email);

  const [phoneProfile, setPhoneProfile] = useState(profileDetail?.phoneNumber);

  const [avatarProfile, setAvatarProfile] = useState(profileDetail?.avatar);

  const [passProfile, setPassProfile] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const tokenUser = getCookie("__token") as string;

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(editUserSchema()),
    shouldFocusError: false,
  });

  // validate form
  const [isFormChange, setIsFormChange] = useState(isValid);

  const currentProfile = {
    id: Number(profileDetail?.id),
    name: nameProfile,
    email: emailProfile,
    passWord: passProfile,
    phoneNumber: phoneProfile,
    avatar: avatarProfile,
  };

  useEffect(() => {
    const formHasChanged =
      JSON.stringify(currentProfile) !== JSON.stringify(defaultValues);
    setIsFormChange(formHasChanged);
  }, [nameProfile, emailProfile, passProfile, phoneProfile, avatarProfile]);

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
      }
    },
  });

  const onSubmit = handleSubmit((formEditProfile: EditProfile) => {
    setIsLoading(true);

    updateProfileMutation.mutate(formEditProfile);

    if (!isLoading) {
      const dataUpdate = useModifyObject(formEditProfile, false);

      updateUser(dataUpdate);
    }
  });

  const handleFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="w-screen md:w-[40vw] h-screen shadow-primary bg-neutral-1 pt-8 px-4 overflow-y-scroll scrollbar-input">
      <div className="relative">
        <h2 className="text-24 lg:text-32 text-gradient-red font-bold leading-1-4 text-center">
          Update User
        </h2>
        <svg
          onClick={handleCloseFormEditUser}
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer border border-neutral-9 rounded-lg hover:border-blue-15 absolute right-4 -top-[10px] scale-[.75] lg:scale-100"
        >
          <path
            d="M27.9952 17.3475C28.366 16.9767 28.366 16.3755 27.9952 16.0047C27.6243 15.6339 27.0231 15.6339 26.6523 16.0047L21.9999 20.6571L17.3475 16.0047C16.9767 15.6339 16.3755 15.6339 16.0047 16.0047C15.6339 16.3755 15.6339 16.9767 16.0047 17.3475L20.6571 21.9999L16.0047 26.6523C15.6339 27.0231 15.6339 27.6243 16.0047 27.9952C16.3755 28.366 16.9767 28.366 17.3475 27.9952L21.9999 23.3428L26.6523 27.9952C27.0231 28.366 27.6243 28.366 27.9952 27.9952C28.366 27.6243 28.366 27.0231 27.9952 26.6523L23.3428 21.9999L27.9952 17.3475Z"
            fill="#262626"
          />
        </svg>
      </div>
      <div className="rounded-lg bg-white bg-opacity-50 backdrop-blur-lg p-4 ">
        <form className="grid grid-cols-1 gap-5">
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
            value={defaultValues?.id}
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
            classNameInput="text-neutral-8"
            value={nameProfile}
            onChange={(e) => setNameProfile(e.target.value)}
            iconInput={<UserOutlined className="text-20 text-blue-15" />}
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
            iconInput={<PhoneOutlined className="text-20 text-blue-15" />}
            value={phoneProfile}
            onChange={(e) => setPhoneProfile(e.target.value)}
          />
          <Input
            classNameLabel="text-neutral-8"
            classNameInput="text-neutral-8"
            nameLabel="Avatar"
            required
            name="avatar"
            type="text"
            id="avatar"
            className="relative group "
            errorMessage={errors.avatar?.message}
            register={register}
            maxLength={15}
            iconInput={<SmileOutlined className="text-20 text-blue-15" />}
            value={avatarProfile}
            onChange={(e) => setAvatarProfile(e.target.value)}
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
            iconInput={<MailOutlined className="text-20 text-blue-15" />}
            value={emailProfile}
            onChange={(e) => setEmailProfile(e.target.value)}
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
            iconInput={<KeyOutlined className="text-20 text-blue-15" />}
            placeholder="Enter your new password"
            value={passProfile}
            onChange={(e) => setPassProfile(e.target.value)}
          />
          <Button
            isLoading={isLoading}
            onClick={(e) => handleFormSubmit(e)}
            disabled={!isFormChange}
            className={`border-0 max-w-[50vw] lg:max-w-[30vw] mx-auto`}
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
