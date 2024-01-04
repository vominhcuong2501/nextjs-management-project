/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getProjectList } from "@/app/api/getProjectList.ts";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	Avatar,
	Input,
	Space,
	Table,
	Tag,
	Popover,
	Breakpoint,
	notification,
	Button,
	AutoComplete,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";
import { ColumnsProps } from "../../types/table";
import { AddMemberProjectProps, MemberProject } from "@/app/types/project";
import { deleteProject } from "@/app/api/deleteProject";
import { getCookie } from "cookies-next";
import { getUserList } from "@/app/api/getUserList";
import { addMemberProject } from "@/app/api/addMemberProject";
import { getUserKeyword } from "@/app/api/getUserKeyword";
import { deleteMemberProject } from "@/app/api/deleteMemberProject";

export default function TableProject() {
	const [valuePopupMember, setValuePopupMember] = useState("");

	const [searchTerm, setSearchTerm] = useState("");

	const [userData, setUserData] = useState([]);

	const [projectData, setProjectData] = useState();

	const tokenUser = getCookie("__token") as string;

	const queryClient = useQueryClient();

	// search project name
	const handleInputChange = (e: any) => {
		setSearchTerm(e.target.value);
		const filteredData = data?.content.filter((item: any) =>
			item.projectName.toLowerCase().includes(e.target.value.toLowerCase())
		);
		searchTerm.length > 0 && setProjectData(filteredData);
	};

	// call api get project list
	const { data, isLoading, status }: any = useQuery({
		queryKey: ["get-project-list"],
		queryFn: () => getProjectList(),
	});

	// call api get user list
	const dataUser = useQuery({
		queryKey: ["get-user-list"],
		queryFn: () => getUserList(tokenUser),
	});

	// sau khi call api set vao state render UI
	useEffect(() => {
		status && setProjectData(data?.content);
		dataUser?.status && setUserData(dataUser?.data?.content);
	}, [data?.content]);

	// delete project;
	const deleteProjectMutation = useMutation({
		mutationFn: (id: number | string) => deleteProject(id, tokenUser),
		onSuccess: (data, id) => {
			console.log(data, id);

			if (data?.statusCode === 200) {
				notification.success({
					message: `Delete successfully with ID: ${id} !`,
				});

				queryClient.invalidateQueries({
					queryKey: ["get-project-list"],
					exact: true,
				});
			} else {
				notification.error({
					message: data?.response.data.content,
				});
			}
		},
	});

	const handleDeleteProject = async (id: number) => {
		deleteProjectMutation.mutate(id);
	};

	// add member project
	const addMemberMutation = useMutation({
		mutationFn: (data: AddMemberProjectProps) =>
			addMemberProject(data, tokenUser),

		onSuccess: (data) => {
			if (data?.statusCode === 200) {
				notification.success({
					message: "Add member successfully !",
				});

				queryClient.invalidateQueries({
					queryKey: ["get-project-list"],
					exact: true,
				});
			} else {
				notification.error({
					message: data?.response.data.content,
				});
			}
		},
	});

	const handleAddMemberProject = (data: AddMemberProjectProps) => {
		addMemberMutation.mutate(data);
	};

	// remove member project
	const deleteMemberMutation = useMutation({
		mutationFn: (data: AddMemberProjectProps) =>
			deleteMemberProject(data, tokenUser),

		onSuccess: (data) => {
			if (data?.statusCode === 200) {
				notification.success({
					message: `Remove member successfully !`,
				});

				queryClient.invalidateQueries({
					queryKey: ["get-project-list"],
					exact: true,
				});
			} else {
				notification.error({
					message: data?.response.data.content,
				});
			}
		},
	});

	const handleDeleteMember = (data: AddMemberProjectProps) => {
		deleteMemberMutation.mutate(data);
	};

	// search member to add project
	const dataSearchMemberMutation = useMutation({
		mutationFn: (keyword: string) => getUserKeyword(keyword, tokenUser),
		onSuccess: (data) => {
			setUserData(data?.content);
		},
	});

	const handleSearchMemberAdd = (keyword: string) => {
		dataSearchMemberMutation.mutate(keyword);
	};

	const columns: ColumnsProps[] = [
		{
			title: <p className="text-18 md:text-20 text-gradient-red">ID</p>,
			dataIndex: "id",
			key: "id",
			sortDirections: ["descend"],
			sorter: (item2, item1) => +item2.id - +item1.id,
		},
		{
			title: (
				<p className="text-18 md:text-20 text-gradient-red">Project name</p>
			),
			dataIndex: "projectName",
			key: "projectName",
			sortDirections: ["descend"],
			sorter: (item2, item1) => {
				let projectName1 = item1.projectName
					?.toLocaleString()
					.trim()
					.toLowerCase();
				let projectName2 = item2.projectName
					?.toLocaleString()
					.trim()
					.toLowerCase();
				if (projectName2 < projectName1) {
					return -1;
				} else {
					return 1;
				}
			},
			render: (text, _) => {
				return <p className="text-neutral-8 text-not-long">{text}</p>;
			},
		},
		{
			title: <p className="text-18 md:text-20 text-gradient-red">Category</p>,
			dataIndex: "categoryName",
			key: "categoryName",
			sortDirections: ["descend"],
			sorter: (item2, item1) => {
				let categoryName1 = item1.categoryName
					?.toLocaleString()
					.trim()
					.toLowerCase();
				let categoryName2 = item2.categoryName
					?.toLocaleString()
					.trim()
					.toLowerCase();
				if (categoryName1 < categoryName2) {
					return -1;
				} else {
					return 1;
				}
			},
			responsive: ["sm"],
		},
		{
			title: <p className="text-18 md:text-20 text-gradient-red">Creator</p>,
			key: "creator",
			sortDirections: ["descend"],
			sorter: (item2, item1) => {
				let creator1 = item1.creator?.name
					.toLocaleString()
					.trim()
					.toLowerCase();
				let creator2 = item2.creator?.name
					.toLocaleString()
					.trim()
					.toLowerCase();
				if (creator1 < creator2) {
					return -1;
				} else {
					return 1;
				}
			},
			render: (_, record) => <Tag color="green">{record.creator?.name}</Tag>,
			responsive: ["lg"],
		},
		{
			title: <p className="text-18 md:text-20 text-gradient-red">Members</p>,
			dataIndex: "members",
			key: "members",
			render: (_, record) => {
				return (
					<div>
						{record.members
							?.slice(0, 3)
							.map((ele: MemberProject, index: number) => {
								return (
									// hiển thị table members
									<Popover
										key={index}
										placement="top"
										title={"Team Members"}
										content={() => {
											return (
												<table className="table border-t border-dashed border-red-1">
													<thead>
														<tr>
															<th className="px-2 py-1 text-left">ID</th>
															<th className="px-2 py-1 text-left">Name</th>
															<th className="px-2 py-1 text-left">Action</th>
														</tr>
													</thead>
													<tbody>
														{record.members?.map(
															(ele: MemberProject, index: number) => {
																return (
																	<tr key={index}>
																		<td className="px-2 py-1">{ele.userId}</td>
																		<td className="px-2 py-1">{ele.name}</td>
																		<td className="px-2 py-1 text-center">
																			<p
																				title="Delete member"
																				className="text-red-1 hover:text-blue-4 cursor-pointer"
																				onClick={() =>
																					handleDeleteMember({
																						projectId: record.id,
																						userId: Number(ele.userId),
																					})
																				}
																			>
																				<DeleteOutlined />
																			</p>
																		</td>
																	</tr>
																);
															}
														)}
													</tbody>
												</table>
											);
										}}
									>
										<Avatar src={ele.avatar} />
									</Popover>
								);
							})}

						{record.members?.length > 3 ? <Avatar>...</Avatar> : ""}

						<Popover
							placement="topLeft"
							title={<span>Add member</span>}
							content={() => {
								return (
									<AutoComplete
										// lấy dữ liệu từ reducer hiển thị hộp thoại user cần tìm
										options={userData?.map(
											(user: { name: string; userId: string }) => {
												return {
													label: user.name,
													value: user.userId.toString(),
												};
											}
										)}
										value={valuePopupMember}
										// set lại giá trị của hộp thoại khi chọn không hiển thị value mà thay bằng label
										onSelect={(valueSelect, option) => {
											setValuePopupMember(option?.label);
											handleAddMemberProject({
												projectId: record?.id,
												userId: Number(valueSelect),
											});
										}}
										onChange={(text) => {
											setValuePopupMember(text);
										}}
										className="w-full"
										onSearch={(keyword) => handleSearchMemberAdd(keyword)}
									/>
								);
							}}
							trigger="click"
						>
							<Button shape="circle">+</Button>
						</Popover>
					</div>
				);
			},
			responsive: ["lg"],
		},
		{
			title: <p className="text-18 md:text-20 text-gradient-red">Action</p>,
			dataIndex: "action",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<Link
						href={`/project/${record?.id}`}
						title="Edit Project"
						className="text-blue-4 text-20"
						target="_self"
					>
						<EditOutlined />
					</Link>
					<p
						title="Delete Project"
						className="text-red-1 text-20 cursor-pointer"
						onClick={() => handleDeleteProject(record?.id)}
					>
						<DeleteOutlined />
					</p>
					<Link
						target="_self"
						title="View Detail"
						href={`/project-detail/${record?.id}`}
						className="text-green-1 text-20"
					>
						<EyeOutlined />
					</Link>
				</Space>
			),
		},
	];

	return (
		<section>
			<div className="flex justify-between items-start sm:items-center p-3 rounded-lg mb-3 lg:mb-5 mt-3 md:mt-0 flex-col sm:flex-row bg-white bg-opacity-50">
				<h1 className="text-24 lg:text-32 text-gradient-red font-bold leading-1-4 ">
					Management Project
				</h1>
				<div className="relative mt-2 md:mt-0">
					<Input
						name="search"
						type="text"
						id="search"
						className="py-2 pl-10 rounded-2xl min-w-[300px]  md:min-w-[250px] lg:min-w-[350px] text-neutral-8 font-medium text-16 leading-1-4"
						maxLength={255}
						placeholder="Search Project Name..."
						value={searchTerm}
						onChange={handleInputChange}
					/>
					<svg
						width="44"
						height="44"
						viewBox="0 0 44 44"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="absolute top-1/2 -translate-y-1/2 left-0"
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
			<Table
				rowKey={"id"}
				columns={columns}
				dataSource={projectData}
				loading={isLoading}
				className="overflow-x-auto w-full"
			/>
		</section>
	);
}
