"use client";
import { getProjectList } from "@/app/api/getProjectList.ts";
import {
	SearchOutlined,
	EditOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
	Avatar,
	Button,
	Input,
	notification,
	Space,
	Table,
	Tag,
	Popover,
	AutoComplete,
} from "antd";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";

export default function TableProject() {
	const columns: any = [
		{
			title: <p>ID & Creator</p>,
			render: (record: any) => (
				<>
					{record.id}
					<br />
					<Tag color="green">{record.creator?.name}</Tag>
				</>
			),
			responsive: ["xs"],
		},
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			sortDirections: ["descend"],
			sorter: (item2: any, item1: any) => item2.id - +item1.id,
			responsive: ["sm"],
		},
		{
			title: "Project & Category",
			render: (record: any) => (
				<>
					<Link className="text-primary" href={`/project-detail/${record.id}`}>
						{record.projectName}
					</Link>
					<br />
					{record.categoryName}
				</>
			),
			responsive: ["xs"],
		},
		{
			title: "Project name",
			dataIndex: "projectName",
			key: "projectName",
			sortDirections: ["descend"],
			sorter: (item2: any, item1: any) => {
				let projectName1 = item1.projectName?.trim().toLowerCase();
				let projectName2 = item2.projectName?.trim().toLowerCase();
				if (projectName2 < projectName1) {
					return -1;
				} else {
					return 1;
				}
			},
			render: (text: any, record: any, index: any) => {
				return (
					<Link className="text-dark" href={`/project-detail/${record.id}`}>
						{text}
					</Link>
				);
			},
			responsive: ["sm"],
		},
		{
			title: "Category",
			dataIndex: "categoryName",
			key: "categoryName",
			sortDirections: ["descend"],
			sorter: (item2: any, item1: any) => {
				let categoryName1 = item1.categoryName?.trim().toLowerCase();
				let categoryName2 = item2.categoryName?.trim().toLowerCase();
				if (categoryName1 < categoryName2) {
					return -1;
				} else {
					return 1;
				}
			},
			responsive: ["sm"],
		},
		{
			title: "Creator",
			key: "creator",
			sortDirections: ["descend"],
			sorter: (item2: any, item1: any) => {
				let creator1 = item1.creator?.name.trim().toLowerCase();
				let creator2 = item2.creator?.name.trim().toLowerCase();
				if (creator1 < creator2) {
					return -1;
				} else {
					return 1;
				}
			},
			render: (_: any, record: any) => (
				<Tag color="green">{record.creator?.name}</Tag>
			),
			responsive: ["sm"],
		},
		{
			title: "Members",
			dataIndex: "members",
			key: "members",
			render: (_: any, record: any) => {
				return (
					<div>
						{record.members?.slice(0, 3).map((ele: any, index: any) => {
							return (
								<Popover
									key={index}
									placement="top"
									title={"Members"}
									content={() => {
										return (
											<table className="table">
												<thead>
													<tr>
														<th>UserId</th>
														<th>Avatar</th>
														<th>Name</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{record.members?.map((ele: any, index: any) => {
														return (
															<tr key={index}>
																<td>{ele.userId}</td>
																<td>
																	<Image
																		src={ele.avatar}
																		alt={ele.avatar}
																		width={30}
																		height={30}
																	/>
																</td>
																<td>{ele.name}</td>
																<td>
																	<a title="Delete" className="text-danger">
																		<DeleteOutlined />
																	</a>
																</td>
															</tr>
														);
													})}
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
						{/* <Popover
							placement="topLeft"
							title={<span>Add member</span>}
							content={() => {
								return (
									<div>
										<AutoComplete
											// lấy dữ liệu từ reducer hiển thị hộp thoại user cần tìm
											options={userSearch?.map((user: any, index: any) => {
												return {
													label: user.name,
													value: user.userId.toString(),
												};
											})}
											value={value}
											// set lại giá trị của hộp thoại khi chọn không hiển thị value mà thay bằng label
											onSelect={async (valueSelect, option) => {
												setValue(option.label);
												// gọi api gửi về backend
												try {
													await assignUserProjectApi({
														projectId: record.id,
														userId: Number(valueSelect),
													});
													notification.success({
														message: "Successfully !",
													});
													fetchGetAllProject();
												} catch (error: any) {
													notification.error({
														message: error?.response.data.content,
													});
												}
											}}
											onChange={(text) => {
												setValue(text);
											}}
											style={{ width: "100%" }}
										
										/>
									</div>
								);
							}}
							trigger="click"
						>
							<Button shape="circle">+</Button>
						</Popover> */}
					</div>
				);
			},
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (_: any, record: any) => (
				<Space size="middle">
					<a title="Edit" className="text-success" style={{ fontSize: 20 }}>
						<EditOutlined />
					</a>
					<a title="Delete" className="text-danger" style={{ fontSize: 20 }}>
						<DeleteOutlined />
					</a>
				</Space>
			),
		},
	];

	const { data, isLoading }: any = useQuery({
		queryKey: ["get-project-list"],
		queryFn: () => getProjectList(),
	});

	return (
		<div className="text-center">
			<h3 className="mb-3 font-weight-bold">Project management</h3>
			<Table
				rowKey={"id"}
				columns={columns}
				dataSource={data?.content}
				// rowSelection={{ ...rowSelection }}
				loading={isLoading}
				className="overflow-x-auto scrollbar-input  w-full"
			/>
		</div>
	);
}
