/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { createTaskApi } from "@/app/api/createTask";
import { getPriorityTaskApi } from "@/app/api/getPriorityTask";
import { getProjectListApi } from "@/app/api/getProjectList.ts";
import { getStatusTaskApi } from "@/app/api/getStatusTask";
import { getTypeTaskApi } from "@/app/api/getTypeTask";
import Button from "@/app/component/Button";
import Input from "@/app/component/Input";
import { CreateTaskProps } from "@/app/types/task";
import { useMounted } from "@/lib/hooks/useMounted";
import useUpdateTaskDetail from "@/lib/store/client/flagUpdateTask";
import useUpdateStatusModal from "@/lib/store/client/statusIsShowModal";
import { createTaskSchema } from "@/lib/utils/rules";
import {
  CheckCircleTwoTone,
  ClockCircleOutlined,
  HighlightOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Slider, notification } from "antd";
import { getCookie } from "cookies-next";
import { Editor } from "primereact/editor";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import SelectController from "../SelectController";

interface FormEditTaskProps {
  handleDeleteTask?: (taskId: number | string) => void;
  dataProjectDetail?: CreateTaskProps;
}

export default function FormEditTask({
  handleDeleteTask,
  dataProjectDetail,
}: FormEditTaskProps) {
  //   const {
  //     projectId,
  //     taskName,
  //     statusId,
  //     priorityId,
  //     typeId,
  //     listUserAsign,
  //     timeTrackingSpent,
  //     timeTrackingRemaining,
  //     originalEstimate,
  //     description,
  //   } = dataProjectDetail;
  const defaultValues: CreateTaskProps = {};

  // check render UI server -> client
  const isClient = useMounted();

  const { updateIsEditTask } = useUpdateStatusModal();

  const { isChange, updateIsChange } = useUpdateTaskDetail();

  const [descriptionTask, setDescriptionTask] = useState(
    dataProjectDetail?.description
  );

  const [isLoading, setIsLoading] = useState(false);

  const tokenUser = getCookie("__token") as string;

  const [selectedMembers, setSelectedMembers] = useState([]);

  const [visibleTaskName, setVisibleTaskName] = useState(false);

  const [visibleDesciption, setVisibleDescription] = useState(false);

  const [taskName, setTaskName] = useState(dataProjectDetail?.taskName);

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const { data }: any = useQuery({
    queryKey: ["get-project-list"],
    queryFn: () => getProjectListApi(),
  });

  // call api status
  const status = useQuery({
    queryKey: ["get-status"],
    queryFn: () => getStatusTaskApi(),
  });

  const dataStatusOption = status?.data?.content.map(
    (item: { statusId: number; statusName: string }) => {
      return { value: Number(item.statusId), label: item.statusName };
    }
  );

  // call api priority
  const priority = useQuery({
    queryKey: ["get-priority"],
    queryFn: () => getPriorityTaskApi(),
  });

  const dataPriorityOption = priority?.data?.content.map(
    (item: { priorityId: number; priority: string }) => {
      return { value: item.priorityId, label: item.priority };
    }
  );

  // call api type
  const typeTask = useQuery({
    queryKey: ["get-type-task"],
    queryFn: () => getTypeTaskApi(),
  });

  const dataTypeOption = typeTask?.data?.content.map(
    (item: { id: number; taskType: string }) => {
      return { value: item.id, label: item.taskType.toLocaleUpperCase() };
    }
  );

  useEffect(() => {
    if (dataProjectDetail) {
      setTaskName(dataProjectDetail?.taskName);
      setDescriptionTask(dataProjectDetail?.description);
    }
  }, [dataProjectDetail]);

  // get data choose project
  //   const dataAssignMemberOption =
  //     dataFilterProjectId &&
  //     dataFilterProjectId?.map((item: { members: MemberProject[] }) => {
  //       return item.members?.map((mem) => {
  //         return { value: mem.userId, label: mem.name };
  //       });
  //     });

  const handleMemberSelectChange = (selectedOptions: any) => {
    setSelectedMembers(selectedOptions);
  };

  const arrayMemberId =
    selectedMembers &&
    selectedMembers?.map((member: { value: number; name: string }) => {
      return member.value;
    });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(createTaskSchema()),
    shouldFocusError: false,
  });

  const createTaskMutation = useMutation({
    mutationFn: (data: CreateTaskProps) => createTaskApi(data, tokenUser),
    onSuccess: (responseApi) => {
      if (responseApi?.statusCode === 200) {
        notification.success({
          message: `Create Task Successfully !`,
        });

        updateIsChange(!isChange);

        setIsLoading(false);

        updateIsEditTask(false);
      } else {
        notification.error({
          message: responseApi?.response.data.content,
        });

        setIsLoading(false);
      }
    },
  });

  const onSubmit = handleSubmit((formCreateTask) => {
    setIsLoading(true);

    createTaskMutation.mutate({
      ...formCreateTask,
      description: descriptionTask,
      listUserAsign: arrayMemberId,
    });
  });

  const handleFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="shadow-primary bg-neutral-1 p-6 rounded-xl">
      <div className="grid grid-cols-2 gap-5 mt-5 items-start">
        <div className="grid grid-cols-1 gap-5">
          {visibleTaskName ? (
            <div className="relative">
              <Input
                classNameLabel="text-neutral-8"
                nameLabel=""
                isRequired={false}
                required
                name="taskName"
                type="text"
                id="taskName"
                className="relative group min-w-[280px] text-neutral-8"
                errorMessage={errors.taskName?.message}
                register={register}
                maxLength={255}
                value={taskName}
                classNameInput="!bg-neutral-1 text-neutral-8 pl-4"
                onChange={(e) => setTaskName(e.target.value)}
              />
              <button
                className="absolute top-2 right-1 p-2 rounded-full hover:scale-[1.1] bg-neutral-1"
                title="Save"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4.49746 20.835L21.0072 13.4725C22.3309 12.8822 22.3309 11.1178 21.0072 10.5275L4.49746 3.16496C3.00163 2.49789 1.45006 3.97914 2.19099 5.36689L5.34302 11.2706C5.58817 11.7298 5.58818 12.2702 5.34302 12.7294L2.19099 18.6331C1.45007 20.0209 3.00163 21.5021 4.49746 20.835Z"
                    fill="#22c1c3"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <h2
              className="text-24 lg:text-32 text-gradient-red font-bold leading-1-4 text-left"
              onClick={() => setVisibleTaskName(true)}
            >
              {taskName}
            </h2>
          )}
          {dataProjectDetail?.description && (
            <div>
              {visibleDesciption ? (
                <>
                  <div className="flex items-center justify-between">
                    <label className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold mb-1 block">
                      Desciption:
                    </label>
                    <button
                      className="border-2 border-blue-15 p-1 rounded-full hover:border-blue-16 bg-neutral-1"
                      title="Save"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4.49746 20.835L21.0072 13.4725C22.3309 12.8822 22.3309 11.1178 21.0072 10.5275L4.49746 3.16496C3.00163 2.49789 1.45006 3.97914 2.19099 5.36689L5.34302 11.2706C5.58817 11.7298 5.58818 12.2702 5.34302 12.7294L2.19099 18.6331C1.45007 20.0209 3.00163 21.5021 4.49746 20.835Z"
                          fill="#22c1c3"
                        />
                      </svg>
                    </button>
                  </div>
                  <Editor
                    value={descriptionTask}
                    onTextChange={(e: any) => setDescriptionTask(e.htmlValue)}
                    className="border-[2px] border-blue-15  rounded-[10px] overflow-hidden mt-1 "
                    name="description"
                    placeholder="You can write description your project"
                  />
                </>
              ) : (
                <div
                  className="flex items-center gap-2"
                  onClick={() => setVisibleDescription(true)}
                >
                  <label className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold block">
                    Desciption:
                  </label>
                  <div
                    className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-normal"
                    dangerouslySetInnerHTML={{
                      __html: descriptionTask ? descriptionTask : "",
                    }}
                  ></div>
                </div>
              )}
            </div>
          )}

          <div>
            <h3 className="text-20 text-gradient-blue leading-1-4 font-semibold">
              Comment:
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div className="flex items-center gap-5 justify-end">
            <p title="Delete task" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                //   onClick={() => handleDeleteTask(ele.taskId)}
              >
                <path
                  d="M0 4.52381C0 4.12932 0.32671 3.80952 0.729726 3.80952H5.51787C5.52437 2.9683 5.61554 1.81504 6.45037 1.01668C7.10737 0.388386 8.00808 0 8.99999 0C9.99191 0 10.8926 0.388385 11.5496 1.01668C12.3844 1.81504 12.4756 2.9683 12.4821 3.80952H17.2703C17.6733 3.80952 18 4.12932 18 4.52381C18 4.9183 17.6733 5.2381 17.2703 5.2381H0.729726C0.32671 5.2381 0 4.9183 0 4.52381Z"
                  fill="#ff0000"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.5956 20H9.4044C12.1871 20 13.5785 20 14.4831 19.1141C15.3878 18.2281 15.4803 16.7749 15.6654 13.8685L15.9321 9.6806C16.0326 8.10361 16.0828 7.31511 15.6289 6.81545C15.1751 6.31579 14.4087 6.31579 12.876 6.31579H5.12404C3.59127 6.31579 2.82488 6.31579 2.37105 6.81545C1.91722 7.31511 1.96744 8.10361 2.06788 9.6806L2.33459 13.8685C2.5197 16.7749 2.61225 18.2281 3.51689 19.1141C4.42153 20 5.81289 20 8.5956 20ZM7.24628 10.1885C7.20506 9.75463 6.83753 9.43809 6.42537 9.48148C6.01321 9.52486 5.71251 9.91174 5.75372 10.3456L6.25372 15.6087C6.29494 16.0426 6.66247 16.3591 7.07463 16.3157C7.48678 16.2724 7.78749 15.8855 7.74628 15.4516L7.24628 10.1885ZM11.5746 9.48148C11.9868 9.52486 12.2875 9.91174 12.2463 10.3456L11.7463 15.6087C11.7051 16.0426 11.3375 16.3591 10.9254 16.3157C10.5132 16.2724 10.2125 15.8855 10.2537 15.4516L10.7537 10.1885C10.7949 9.75463 11.1625 9.43809 11.5746 9.48148Z"
                  fill="#ff0000"
                />
              </svg>
            </p>

            <p title="Close task" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                onClick={() => updateIsEditTask(false)}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.9426 1.25C9.63423 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63423 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25H11.9426ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62178 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.268 3.0449 18.9082 3.23714 19.4075 3.53188L14.75 8.18934V6.25C14.75 5.83579 14.4142 5.5 14 5.5C13.5858 5.5 13.25 5.83579 13.25 6.25V10C13.25 10.4142 13.5858 10.75 14 10.75H17.75C18.1642 10.75 18.5 10.4142 18.5 10C18.5 9.58579 18.1642 9.25 17.75 9.25H15.8107L20.4681 4.59254C20.7629 5.09183 20.9551 5.73199 21.0736 6.61358C21.2484 7.91356 21.25 9.62178 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62178 21.25 7.91356 21.2484 6.61358 21.0736C5.73199 20.9551 5.09183 20.7629 4.59254 20.4681L9.25 15.8107V17.75C9.25 18.1642 9.58579 18.5 10 18.5C10.4142 18.5 10.75 18.1642 10.75 17.75V14C10.75 13.5858 10.4142 13.25 10 13.25H6.25C5.83579 13.25 5.5 13.5858 5.5 14C5.5 14.4142 5.83579 14.75 6.25 14.75H8.18934L3.53188 19.4075C3.23714 18.9082 3.0449 18.268 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62178 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z"
                  fill="#1C274C"
                />
              </svg>
            </p>
          </div>

          <div>
            <label
              htmlFor=""
              className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold mb-1 block"
            >
              Status <span className="text-red-1">*</span>
            </label>
            <SelectController
              name="statusId"
              control={control}
              options={dataStatusOption}
              errorMessage={errors.statusId?.message}
              placeholder="Choose a status task"
              iconSelect={
                <CheckCircleTwoTone
                  className="text-20 text-blue-15  "
                  twoToneColor="#22c1c3"
                />
              }
            />
          </div>

          <div>
            <label
              htmlFor=""
              className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold mb-1 block"
            >
              Priority <span className="text-red-1">*</span>
            </label>
            <SelectController
              name="priorityId"
              control={control}
              options={dataPriorityOption}
              errorMessage={errors.priorityId?.message}
              placeholder="Choose a priority task"
              iconSelect={
                <HighlightOutlined className="text-20 text-blue-15  " />
              }
            />
          </div>

          <div>
            <label
              htmlFor=""
              className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold mb-1 block"
            >
              Task Type <span className="text-red-1">*</span>
            </label>
            <SelectController
              name="typeId"
              control={control}
              options={dataTypeOption}
              errorMessage={errors.typeId?.message}
              placeholder="Choose a type task"
              iconSelect={<TagsOutlined className="text-20 text-blue-15  " />}
            />
          </div>

          <div>
            <label
              htmlFor=""
              className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold mb-1 block"
            >
              Assignees <span className="text-red-1">*</span>
            </label>
            {isClient && (
              <Select
                defaultValue={"Choose member"}
                isMulti
                name="listUserAsign"
                // options={
                //   dataAssignMemberOption && dataAssignMemberOption?.flat()
                // }
                className="basic-multi-select "
                classNamePrefix="select"
                value={selectedMembers}
                onChange={handleMemberSelectChange}
              />
            )}
          </div>

          <div>
            <label
              htmlFor=""
              className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold mb-1 block"
            >
              Time Checking <span className="text-red-1">*</span>
            </label>
            <Form.Item validateTrigger={["onChange"]} className="m-0">
              <Slider
                value={timeTracking.timeTrackingSpent}
                max={
                  Number(timeTracking.timeTrackingSpent) +
                  Number(timeTracking.timeTrackingRemaining)
                }
              />
              <div className="flex justify-between items-center">
                <p>{timeTracking.timeTrackingSpent}h logged</p>
                <p>{timeTracking.timeTrackingRemaining}h remaining</p>
              </div>
            </Form.Item>
          </div>

          <div className="grid grid-cols-3 items-center gap-5">
            <Input
              classNameLabel="text-neutral-8"
              nameLabel="Original estimate"
              required
              name="originalEstimate"
              type="number"
              id="originalEstimate"
              className="relative group "
              errorMessage={errors.originalEstimate?.message}
              register={register}
              classNameInput="!bg-neutral-1 text-neutral-8"
              iconInput={
                <ClockCircleOutlined className="text-20 text-blue-15  " />
              }
              min={0}
            />
            <Input
              classNameLabel="text-neutral-8"
              nameLabel="Time Spent"
              required
              name="timeTrackingSpent"
              type="number"
              id="timeTrackingSpent"
              className="relative group "
              errorMessage={errors.timeTrackingSpent?.message}
              register={register}
              classNameInput="!bg-neutral-1 text-neutral-8"
              onChange={(e) =>
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingSpent: +e.target.value,
                })
              }
              iconInput={
                <MinusCircleOutlined className="text-20 text-blue-15  " />
              }
              min={0}
            />
            <Input
              classNameLabel="text-neutral-8"
              nameLabel="Time Remaining"
              required
              name="timeTrackingRemaining"
              type="number"
              id="timeTrackingRemaining"
              className="relative group "
              errorMessage={errors.timeTrackingRemaining?.message}
              register={register}
              classNameInput="!bg-neutral-1 text-neutral-8"
              onChange={(e) =>
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingRemaining: +e.target.value,
                })
              }
              iconInput={
                <PlusCircleOutlined className="text-20 text-blue-15  " />
              }
              min={0}
            />
          </div>

          <Button
            isLoading={isLoading}
            onClick={(e) => handleFormSubmit(e)}
            disabled={!isValid}
            className={`border-0 max-w-[170px] lg:max-w-[300px] mx-auto`}
          >
            Update Task
          </Button>
        </div>
      </div>
    </form>
  );
}
