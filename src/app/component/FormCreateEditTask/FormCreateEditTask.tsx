/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Button from "@/app/component/Button";
import Input from "@/app/component/Input";
import { createTaskSchema } from "@/lib/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCookie } from "cookies-next";
import {
	HighlightOutlined,
	CheckCircleTwoTone,
	ProjectOutlined,
	FileSearchOutlined,
	TagsOutlined,
	ClockCircleOutlined,
	MinusCircleOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUpdateStatusModal from "@/lib/store/client/statusIsShowModal";
import SelectController from "../SelectController";
import { Editor } from "primereact/editor";
import Select from "react-select";
import { Form, Slider, notification } from "antd";
import { CreateTaskProps } from "@/app/types/task";
import { getStatusTaskApi } from "@/app/api/getStatusTask";
import { useMounted } from "@/lib/hooks/useMounted";
import { MemberProject, ProjectItem } from "@/app/types/project";
import { getPriorityTaskApi } from "@/app/api/getPriorityTask";
import { getTypeTaskApi } from "@/app/api/getTypeTask";
import { createTaskApi } from "@/app/api/createTask";
import { getMemberByProjectApi } from "@/app/api/getMemberByProjectId";

interface FormCreateTaskProps {
	projectData?: ProjectItem;
}

export default function FormCreateEditTask({
	projectData,
}: FormCreateTaskProps) {
	const defaultValues: CreateTaskProps = {
		projectId: 0,
		taskName: "",
		statusId: 0,
		priorityId: 0,
		typeId: 0,
		listUserAsign: [],
		timeTrackingSpent: 0,
		timeTrackingRemaining: 0,
		originalEstimate: 0,
		description: "",
	};

	// check render UI server -> client
	const isClient = useMounted();

	const { updateIsCreateTask } = useUpdateStatusModal();

	const [descriptionTask, setDescriptionTask] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const tokenUser = getCookie("__token") as string;

	const [selectProjectName, setSelectProjectName] = useState(0);

	const [selectedMembers, setSelectedMembers] = useState([]);

	const queryClient = useQueryClient();

	const [timeTracking, setTimeTracking] = useState({
		timeTrackingSpent: 0,
		timeTrackingRemaining: 0,
	});

	// list Project
	const dataProjectNameOption =
		projectData &&
		projectData?.map((item: { id: number; projectName: string }) => {
			return { value: item.id, label: item.projectName };
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

	// get data choose project
	const dataFilterProjectId: any =
		projectData &&
		projectData?.filter((item: ProjectItem) => item.id === selectProjectName);

	const dataAssignMemberOption =
		dataFilterProjectId &&
		dataFilterProjectId?.map((item: { members: MemberProject[] }) => {
			return item.members?.map((mem) => {
				return { value: mem.userId, label: mem.name };
			});
		});

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

	const updateUserMutation = useMutation({
		mutationFn: (data: CreateTaskProps) => createTaskApi(data, tokenUser),
		onSuccess: (responseApi) => {
			if (responseApi?.statusCode === 200) {
				notification.success({
					message: `Create Task Successfully !`,
				});

				queryClient.invalidateQueries({
					queryKey: ["get-project-list"],
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

	const onSubmit = handleSubmit((formCreateTask) => {
		setIsLoading(true);

		updateUserMutation.mutate({
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
		<div className="w-screen lg:w-[50vw] h-screen shadow-primary bg-neutral-1 pt-8 px-4 overflow-y-scroll scrollbar-input">
			<div className="relative">
				<h2 className="text-24 lg:text-32 text-gradient-red font-bold leading-1-4 text-center">
					Create Task
				</h2>
				<svg
					onClick={() => updateIsCreateTask(false)}
					width="44"
					height="44"
					viewBox="0 0 44 44"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="cursor-pointer border border-neutral-9 rounded-lg hover:border-blue-15  absolute right-4 -top-[10px] scale-[.75] lg:scale-100"
				>
					<path
						d="M27.9952 17.3475C28.366 16.9767 28.366 16.3755 27.9952 16.0047C27.6243 15.6339 27.0231 15.6339 26.6523 16.0047L21.9999 20.6571L17.3475 16.0047C16.9767 15.6339 16.3755 15.6339 16.0047 16.0047C15.6339 16.3755 15.6339 16.9767 16.0047 17.3475L20.6571 21.9999L16.0047 26.6523C15.6339 27.0231 15.6339 27.6243 16.0047 27.9952C16.3755 28.366 16.9767 28.366 17.3475 27.9952L21.9999 23.3428L26.6523 27.9952C27.0231 28.366 27.6243 28.366 27.9952 27.9952C28.366 27.6243 28.366 27.0231 27.9952 26.6523L23.3428 21.9999L27.9952 17.3475Z"
						fill="#262626"
					/>
				</svg>
			</div>
			<div className="rounded-lg bg-white bg-opacity-50 backdrop-blur-lg p-4 ">
				<form className="grid grid-cols-1 gap-5">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<div>
							<label
								htmlFor=""
								className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold mb-1 block"
							>
								Project Name <span className="text-red-1">*</span>
							</label>
							<SelectController
								name="projectId"
								control={control}
								options={dataProjectNameOption}
								errorMessage={errors.projectId?.message}
								onChange={(selected) => setSelectProjectName(+selected)}
								placeholder="Choose a project"
								iconSelect={
									<FileSearchOutlined className="text-20 text-blue-15  " />
								}
							/>
						</div>

						<Input
							classNameLabel="text-neutral-8"
							nameLabel="Task Name"
							required
							name="taskName"
							type="text"
							id="taskName"
							className="relative group "
							errorMessage={errors.taskName?.message}
							register={register}
							maxLength={255}
							classNameInput="!bg-neutral-1 text-neutral-8"
							placeholder="Enter your name task"
							iconInput={<ProjectOutlined className="text-20 text-blue-15  " />}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
									options={
										dataAssignMemberOption && dataAssignMemberOption?.flat()
									}
									className="basic-multi-select "
									classNamePrefix="select"
									value={selectedMembers}
									onChange={handleMemberSelectChange}
								/>
							)}
						</div>
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

					<div>
						<label
							htmlFor=""
							className="text-14 lg:text-16 text-neutral-8 leading-1-4 font-semibold "
						>
							Description <span className="text-red-1">*</span>
						</label>
						<Editor
							value={descriptionTask}
							onTextChange={(e: any) => setDescriptionTask(e.htmlValue)}
							className="border-[2px] border-blue-15  rounded-[10px] overflow-hidden mt-1 "
							name="description"
							placeholder="You can write description your project"
						/>
					</div>
					<Button
						isLoading={isLoading}
						onClick={(e) => handleFormSubmit(e)}
						disabled={!isValid}
						className={`border-0 max-w-[170px] lg:max-w-[300px] mx-auto`}
					>
						Create Task
					</Button>
				</form>
			</div>
		</div>
	);
}
