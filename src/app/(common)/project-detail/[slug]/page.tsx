"use client";
import { deleteTaskApi } from "@/app/api/deleteTaskId";
import { getProjectIdDetailApi } from "@/app/api/getProjectIdDetail";
import { updateStatusApi } from "@/app/api/updateStatus";
import Button from "@/app/component/Button";
import FormEditTask from "@/app/component/FormEditTask";
import Input from "@/app/component/Input";
import { MemberProject } from "@/app/types/project";
import useUpdateTaskDetail from "@/lib/store/client/flagUpdateTask";
import useUpdateStatusModal from "@/lib/store/client/statusIsShowModal";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { Avatar, notification } from "antd";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function ProjectDetail() {
	const { updateIsCreateTask, isEditTask, updateIsEditTask } =
		useUpdateStatusModal();

	const queryClient = useQueryClient();

	const tokenUser = getCookie("__token") as string;

	const { isChange, updateIsChange } = useUpdateTaskDetail();

	const params = useParams();

	const projectDetail = useQuery({
		queryKey: ["get-project-detail", params?.slug, isChange],
		queryFn: () => getProjectIdDetailApi(params?.slug as string, tokenUser),
		placeholderData: keepPreviousData,
	});

	const listMember = projectDetail?.data?.content?.members.map(
		(mem: MemberProject) => {
			return (
				<div key={mem.userId}>
					<Avatar
						src={`${mem.avatar}`}
						alt={mem.name ? mem.name : "Name"}
						className="h-8 w-8 lg:h-10 lg:w-10"
					/>
				</div>
			);
		}
	);

	const handleDragEnd = async (result: any) => {
		const { source, destination, draggableId } = result;
		if (!destination) {
			return;
		}
		if (
			source.index === destination.index &&
			source.droppableId === destination.droppableId
		) {
			return;
		}

		const responseDragDrop = await updateStatusApi(
			{
				taskId: Number(draggableId),
				statusId: destination.droppableId,
			},
			tokenUser
		);

		if (responseDragDrop?.statusCode === 200) {
			queryClient.invalidateQueries({
				queryKey: ["get-project-detail", params?.slug],
				exact: true,
			});

			updateIsChange(!isChange);
		}
	};

	const deleteTaskMutation = useMutation({
		mutationFn: (taskId: number | string) => deleteTaskApi(taskId, tokenUser),
		onSuccess: (responseApi) => {
			if (responseApi?.statusCode === 200) {
				notification.success({
					message: `Delete Task Successfully!`,
				});

				queryClient.invalidateQueries({
					queryKey: ["get-project-detail", params?.slug],
					exact: true,
				});

				updateIsChange(!isChange);
			} else {
				notification.error({
					message: responseApi?.response.data.content,
				});
			}
		},
	});

	const handleDeleteTask = (taskId: number | string) => {
		deleteTaskMutation.mutate(taskId);
	};

	const renderCardTaskList = () => {
		return (
			<DragDropContext onDragEnd={handleDragEnd}>
				{projectDetail?.data?.content?.lstTask?.map((task: any) => {
					return (
						<Droppable droppableId={task.statusId} key={task.statusId}>
							{(provided: any) => {
								return (
									<div className="card p-3 rounded-lg bg-white bg-opacity-50 xl:min-h-[50vh]">
										<h4 className="card-header text-18 md:text-20 text-neutral-8 font-bold leading-1-4">
											{task.statusName}
										</h4>
										<div
											className="list-group list-group-flush mt-4 h-full"
											ref={provided.innerRef}
											{...provided.droppableProps}
										>
											{task.lstTaskDeTail.map((ele: any, index: number) => {
												return (
													<Draggable
														key={ele.taskName}
														draggableId={ele.taskId.toString()}
														index={index}
													>
														{(provided: any) => {
															return (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	className="list-group-item bg-neutral-1 p-5 rounded-2xl  grid grid-cols-1 gap-2 mt-4  transition-all duration-300 hover:shadow-primary group"
																	data-toggle="modal"
																	data-target="#infoModal"
																	onClick={() => updateIsEditTask(true)}
																	// 	dispatch(
																	// 		getTaskDetailAction(result.data.content)
																	// 	);
																	// }}
																>
																	<div className=" flex items-center justify-between ">
																		<h5 className="text-16 md:text-18 font-bold leading-1-4 text-gradient-blue ">
																			{ele.taskName}
																		</h5>
																		<div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-start gap-1">
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width="24"
																				height="24"
																				viewBox="0 0 24 24"
																				fill="none"
																			>
																				<path
																					fillRule="evenodd"
																					clipRule="evenodd"
																					d="M3.25 22C3.25 21.5858 3.58579 21.25 4 21.25H20C20.4142 21.25 20.75 21.5858 20.75 22C20.75 22.4142 20.4142 22.75 20 22.75H4C3.58579 22.75 3.25 22.4142 3.25 22Z"
																					fill="#46ff3f"
																				/>
																				<path
																					d="M11.5201 14.929L11.5201 14.9289L17.4368 9.01225C16.6315 8.6771 15.6777 8.12656 14.7757 7.22455C13.8736 6.32238 13.323 5.36846 12.9879 4.56312L7.07106 10.4799L7.07101 10.48C6.60932 10.9417 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.04356 16.8833C3.94194 17.1882 4.02128 17.5243 4.2485 17.7515C4.47573 17.9787 4.81182 18.0581 5.11667 17.9564L8.38334 16.8676C9.00281 16.6611 9.31256 16.5578 9.60398 16.4189C9.94775 16.2551 10.2727 16.0543 10.5729 15.8201C10.8275 15.6215 11.0584 15.3907 11.5201 14.929Z"
																					fill="#46ff3f"
																				/>
																				<path
																					d="M19.0786 7.37044C20.3071 6.14188 20.3071 4.14999 19.0786 2.92142C17.85 1.69286 15.8581 1.69286 14.6296 2.92142L13.9199 3.63105C13.9296 3.6604 13.9397 3.69015 13.9502 3.72028C14.2103 4.47 14.701 5.45281 15.6243 6.37602C16.5475 7.29923 17.5303 7.78999 18.28 8.05009C18.31 8.0605 18.3396 8.07054 18.3688 8.08021L19.0786 7.37044Z"
																					fill="#46ff3f"
																				/>
																			</svg>
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width="18"
																				height="20"
																				viewBox="0 0 18 20"
																				fill="none"
																				onClick={() =>
																					handleDeleteTask(ele.taskId)
																				}
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
																		</div>
																	</div>
																	<p className="text-14 md:text-16 leading-1-4 text-neutral-8 font-semibold">
																		Priority:{" "}
																		<span className="text-red-1 font-normal">
																			{ele.priorityTask.priority}
																		</span>
																	</p>
																	{ele.description.length > 0 && (
																		<p className="text-14 md:text-16 leading-1-4 text-neutral-8 font-semibold ">
																			Description:{" "}
																			<span
																				className="text-12 md:text-14 font-normal text-limit-3-line"
																				dangerouslySetInnerHTML={{
																					__html: ele.description,
																				}}
																			></span>
																		</p>
																	)}

																	<div className="flex items-center">
																		{ele.assigness.map((member: any) => {
																			return (
																				<div key={member.id}>
																					<Avatar
																						src={member.avatar}
																						alt={member.avatar}
																					/>
																				</div>
																			);
																		})}
																	</div>
																</div>
															);
														}}
													</Draggable>
												);
											})}
											{provided.placeholder}
										</div>
									</div>
								);
							}}
						</Droppable>
					);
				})}
			</DragDropContext>
		);
	};

	return (
		<section className="grid grid-cols-1 gap-3 lg:gap-5">
			<div className="flex justify-between items-start sm:items-center p-3 rounded-lg  mt-3 md:mt-0 flex-col sm:flex-row bg-white bg-opacity-50">
				<h1 className="text-24 lg:text-32 text-gradient-red font-bold leading-1-4 ">
					{projectDetail?.data?.content?.projectName}
				</h1>
				<div className="relative mt-2 md:mt-0">
					<Input
						name="search"
						type="text"
						id="search"
						className="py-2  rounded-2xl min-w-[300px]  md:min-w-[250px] lg:min-w-[350px] text-neutral-8 font-medium text-16 leading-1-4"
						maxLength={255}
						placeholder="Search task..."
						isRequired={false}
					/>
					<svg
						width="44"
						height="44"
						viewBox="0 0 44 44"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="absolute top-1/2 -translate-y-1/2 left-0"
						style={{
							filter:
								"invert(65%) sepia(88%) saturate(426%) hue-rotate(126deg) brightness(86%) contrast(84%)",
						}}
					>
						<g clipPath="url(#clip0_161_5736)">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M24.6103 15.614C22.4356 14.1286 19.5726 14.1286 17.3978 15.614C16.3218 16.3486 15.4868 17.3848 14.9977 18.5923L14.9974 18.5931C14.5029 19.8105 14.3736 21.1457 14.6254 22.4354L14.6255 22.4362C14.8749 23.7206 15.4958 24.9035 16.4112 25.8382L16.4127 25.8397C17.6194 27.078 19.2751 27.7764 21.0041 27.7764C22.7254 27.7764 24.374 27.0842 25.5793 25.8562C25.6196 25.7472 25.6836 25.6449 25.7711 25.5572C25.837 25.4912 25.9113 25.4385 25.9905 25.3992C26.691 24.5446 27.1708 23.527 27.3826 22.4362L27.3827 22.4354C27.6345 21.1457 27.5052 19.8105 27.0107 18.5931L27.0104 18.5923C26.5213 17.3848 25.6863 16.3486 24.6103 15.614ZM26.4073 27.3698L29.8055 30.762C30.1313 31.0871 30.6589 31.0867 30.9841 30.761C31.3092 30.4352 31.3087 29.9076 30.983 29.5824L27.5295 26.1351C28.2692 25.1374 28.7799 23.9832 29.0185 22.7547C29.3323 21.1474 29.1712 19.4835 28.555 17.9663C27.9427 16.4545 26.8973 15.1573 25.5502 14.2376C22.8086 12.3652 19.1995 12.3652 16.4579 14.2376M26.4073 27.3698C24.9289 28.7004 23.0055 29.4431 21.0041 29.4431C18.8258 29.4431 16.74 28.5634 15.2196 27.0035C14.0764 25.8359 13.301 24.3584 12.9895 22.7543C12.6758 21.147 12.837 19.4831 13.4533 17.9659C14.0656 16.4543 15.111 15.1572 16.4579 14.2376M23.3315 19.0683C22.9841 18.2476 22.1407 17.7508 21.2545 17.8447C20.7968 17.8932 20.3865 17.5615 20.338 17.1038C20.2895 16.6461 20.6212 16.2358 21.0789 16.1873C22.6949 16.016 24.2328 16.922 24.8663 18.4185C25.0457 18.8423 24.8476 19.3314 24.4238 19.5108C24 19.6902 23.5109 19.4921 23.3315 19.0683Z"
								fill="#363636"
							/>
						</g>
						<defs>
							<clipPath id="clip0_161_5736">
								<rect
									width="20"
									height="20"
									fill="white"
									transform="translate(12 12)"
								/>
							</clipPath>
						</defs>
					</svg>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-white bg-opacity-50">
				<h3 className="flex items-center gap-2 text-16 md:text-18 leading-1-4">
					<p className="font-bold text-gradient-red">Creator:</p>
					{projectDetail?.data?.content?.creator.name}
				</h3>
				<h3 className="flex items-center text-16 md:text-18 leading-1-4 font-bold text-gradient-red">
					<span className="mr-2">Members:</span> {listMember}
				</h3>
				<div className="flex items-center gap-2">
					<h3 className="text-16 md:text-18 leading-1-4 font-bold text-gradient-red">
						Description:
					</h3>
					<div
						dangerouslySetInnerHTML={{
							__html: projectDetail?.data?.content?.description,
						}}
					></div>
				</div>
				<h3 className="flex items-center gap-2 text-16 md:text-18 leading-1-4">
					<p className="font-bold text-gradient-red">Category:</p>
					{projectDetail?.data?.content?.projectCategory.name}
				</h3>
			</div>

			<Button
				className={`max-w-[170px] flex items-center justify-center gap-2`}
				onClick={() => updateIsCreateTask(true)}
			>
				<PlusCircleOutlined className="text-24" /> Create Task
			</Button>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
				{renderCardTaskList()}
			</div>

			{isEditTask && (
				<div
					className={`w-screen h-screen fixed inset-0 transition-all duration-300 bg-neutral-9 opacity-80  !z-30`}
					onClick={() => updateIsEditTask(false)}
				></div>
			)}
			<div
				className={`fixed transition-all duration-300 ${
					isEditTask ? "scale-100 !z-50" : "scale-0"
				}`}
			>
				{isEditTask && (
					<FormEditTask
						projectData={
							projectDetail?.data?.content && projectDetail?.data?.content
						}
					/>
				)}
			</div>
		</section>
	);
}
