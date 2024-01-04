/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getProjectCategoryApi } from "@/app/api/getProjectCategory";
import Button from "@/app/component/Button";
import Input from "@/app/component/Input";
import { ProjectItem } from "@/app/types/project";
import { createProjectSchema } from "@/lib/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "primereact/editor";
import SelectController from "@/app/component/SelectController";
import { createProjectApi } from "@/app/api/createProject";
import { getCookie } from "cookies-next";
import PATH_NAME from "@/app/constans/pathname";
import { getProjectIdDetailApi } from "@/app/api/getProjectIdDetail";
import { updateProjectApi } from "@/app/api/updateProjectId";

export default function CreateProjectPage() {
  const defaultValues: ProjectItem = {
    projectName: "",
    categoryId: 0,
    description: "",
  };

  const [formState, setFormState] = useState<ProjectItem>(defaultValues);

  const [valueCategoryId, setValueCategoryId] = useState(0);

  const [text, setText] = useState("");

  const [nameProject, setNameProject] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const tokenUser = getCookie("__token") as string;

  const router = useRouter();

  const params = useParams();

  // useEffect(() => {
  //   !getCookie("__token") && router.push(PATH_NAME.SIGN_IN);
  // }, []);

  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: () => getProjectCategoryApi(),
  });

  const dataOption = data?.content?.map(
    (item: { id: number; projectCategoryName: string }) => {
      return { value: item.id, label: item.projectCategoryName };
    }
  );

  const projectQuery = useQuery({
    queryKey: ["get-project-detail-id", params?.slug],

    queryFn: () =>
      params?.slug !== "add" &&
      getProjectIdDetailApi(params?.slug as string, tokenUser),

    enabled: params?.slug !== undefined,

    staleTime: 1000 * 10,
  });

  useEffect(() => {
    if (projectQuery?.data?.statusCode === 200) {
      //  hiển thị UI
      setFormState(projectQuery?.data?.content);
      setNameProject(projectQuery?.data?.content.projectName);
      setText(projectQuery?.data?.content.description);

      // set giá trị cho các field
      setValue("categoryId", projectQuery?.data?.content.projectCategory?.id);
      setValue("projectName", projectQuery?.data?.content.projectName);
      setValue("description", projectQuery?.data?.content.description);

      setValueCategoryId(projectQuery?.data?.content.projectCategory?.id);
    }
  }, [projectQuery?.data]);

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

  const getProjectDetail = {
    projectName: formState?.projectName,
    categoryId: formState?.projectCategory?.id,
    description: formState?.description,
  };
  const currentProjectDetail = {
    projectName: nameProject,
    categoryId: valueCategoryId,
    description: text,
  };

  useEffect(() => {
    const formHasChanged =
      JSON.stringify(currentProjectDetail) !== JSON.stringify(getProjectDetail);
    setIsFormChange(formHasChanged);
  }, [nameProject, text, valueCategoryId, currentProjectDetail]);

  const onSubmit = handleSubmit(async (formProject: ProjectItem) => {
    setIsLoading(true);
    if (params?.slug === "add") {
      try {
        const responseCreateProject = await createProjectApi(
          {
            ...formProject,
            description: text,
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

          setText("");
        } else {
          console.log("responseCreateProject", responseCreateProject);

          notification.error({
            message: responseCreateProject?.response.data.content,
          });

          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const responseUpdateProject = await updateProjectApi(
          +params?.slug,
          {
            ...formProject,
            id: formState?.id,
            description: text,
          },
          tokenUser
        );

        if (responseUpdateProject?.statusCode === 200) {
          notification.success({
            message: "Successfully!",
          });

          setIsLoading(false);

          router.push(PATH_NAME.TABLE_PROJECT);
        } else {
          notification.error({
            message: responseUpdateProject?.response.data.content,
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
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
          {params.slug === "add" ? "Create" : "Update"} Project
        </h1>
      </div>
      <div className="rounded-lg bg-white bg-opacity-50 backdrop-blur-lg p-4 mt-4">
        <form className="grid grid-cols-1 gap-5">
          {formState?.id && (
            <Input
              classNameLabel="text-neutral-8"
              nameLabel="Project ID"
              required
              name="projectId"
              type="text"
              id="projectID"
              className="relative group "
              classNameInput="!bg-neutral-1 mt-2 text-neutral-8 cursor-no-drop"
              disabled={true}
              value={formState?.id}
            />
          )}

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
            value={nameProject}
            onChange={(e) => setNameProject(e.target.value)}
          />

          <div>
            <label
              htmlFor=""
              className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold "
            >
              Project Category <span className="text-red-1">*</span>
            </label>
            <SelectController
              name="categoryId"
              control={control}
              options={dataOption}
              errorMessage={errors.categoryId?.message}
              optionDefault={formState?.projectCategory?.name}
              onChange={(selected) => setValueCategoryId(+selected)}
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
              className="min-h-[20vh] border-[2px] border-blue-15 rounded-lg overflow-hidden mt-2"
              name="description"
            />
          </div>

          <Button
            isLoading={isLoading}
            onClick={(e) => handleFormSubmit(e)}
            disabled={!isFormChange}
            className={`bg-gradient-to-r from-green-400 via-cyan-400 to-indigo-400 lg:h-14 h-8 rounded-lg text-14 lg:text-16 font-semibold w-full leading-1-4 text-neutral-1 border-0`}
          >
            {params?.slug ? "Create" : "Update"} Project
          </Button>
        </form>
      </div>
    </>
  );
}