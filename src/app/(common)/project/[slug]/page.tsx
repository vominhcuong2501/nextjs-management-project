"use client";
import { getProjectCategory } from "@/app/api/getProjectCategory";
import Button from "@/app/component/Button";
import Input from "@/app/component/Input";
import { CreateProject } from "@/app/types/project";
import { createProjectSchema } from "@/lib/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "primereact/editor";
import SelectController from "@/app/component/SelectController";
import { createProject } from "@/app/api/createProject";
import { getCookie } from "cookies-next";
import PATH_NAME from "@/app/constans/pathname";

export default function CreateProject() {
  const [_, setIsFormValid] = useState(false);

  const [text, setText] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const tokenUser = getCookie("__token") as string;

  const router = useRouter();

  const defaultValues: CreateProject = {
    projectName: "",
    categoryId: 0,
  };

  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: () => getProjectCategory(),
  });

  const dataOption = data?.content.map(
    (item: { id: number; projectCategoryName: string }) => {
      return { value: item.id, label: item.projectCategoryName };
    }
  );

  const {
    handleSubmit,
    register,
    setError,
    setValue,
    control,
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSubmit = handleSubmit(async (formDataLogin: CreateProject) => {
    setIsLoading(true);
    console.log(formDataLogin);

    try {
      const responseSignIn = await createProject(
        {
          ...formDataLogin,
          description: text,
        },
        tokenUser
      );

      if (responseSignIn?.statusCode === 200) {
        setIsLoading(false);

        notification.success({
          message: "Successfully!",
        });
        setIsLoading(false);

        setValue("projectName", "");
        setValue("categoryId", 0);
        setText("");

        // router.push(PATH_NAME.PROFILE);
      } else {
        notification.success({
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
    <>
      <div className="rounded-lg bg-white bg-opacity-50 backdrop-blur-lg p-4">
        <h1 className="text-24 lg:text-32 text-gradient-red font-bold leading-1-4 ">
          Create Project
        </h1>
      </div>
      <div className="rounded-lg bg-white bg-opacity-50 backdrop-blur-lg p-4 mt-4">
        <form className="grid grid-cols-1 gap-5">
          <Input
            classNameLabel="text-neutral-8"
            nameLabel="Project Name"
            required
            name="projectName"
            type="text"
            id="projectName"
            className="relative group "
            errorMessage={errors.projectName?.message}
            register={register}
            maxLength={255}
            classNameInput="!bg-neutral-1 mt-2 text-neutral-8"
          />

          <div>
            <label
              htmlFor=""
              className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold "
            >
              Project Category <span className="text-red-1">*</span>
            </label>
            {/* <Select
              onChange={handleChange}
              options={dataOption}
              className="w-full mt-2 md:h-12 h-11 rounded-lg  outline-none transition-colors text-14 lg:text-16 border-[2px] border-blue-15 text-neutral-1 focus:border-blue-7 leading-1-4"
            /> */}

            <SelectController
              name="categoryId"
              control={control}
              options={dataOption}
              optionDefault="Choose Project Category"
              errorMessage={errors.categoryId?.message}
            />
          </div>

          <div>
            <label
              htmlFor=""
              className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold "
            >
              Description <span className="text-red-1">*</span>
            </label>
            <Editor
              value={text}
              onTextChange={(e: any) => setText(e.htmlValue)}
              className="min-h-[35vh]  border-[2px] border-blue-15 rounded-lg overflow-hidden mt-2"
            />
          </div>

          <Button
            isLoading={isLoading}
            disabled={!isValid}
            onClick={(e) => handleFormSubmit(e)}
            className={`${
              isValid ? "opacity-100" : "opacity-75"
            } bg-gradient-to-r from-green-400 via-cyan-400 to-indigo-400 lg:h-14 h-8 rounded-lg text-14 lg:text-16 font-semibold w-full leading-1-4 text-neutral-1 border-0`}
          >
            Sign In
          </Button>
        </form>
      </div>
    </>
  );
}
