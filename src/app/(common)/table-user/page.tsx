"use client";
import { getUserList } from "@/app/api/getUserList.";
import { ColumnsProps } from "@/app/types/table";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Input, Space, Table, Tag, Popover } from "antd";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function TableUser() {
	const columns: ColumnsProps[] = [
		{
			title: <p className="text-18 md:text-20 text-gradient-red">ID</p>,
			dataIndex: "userId",
			key: "userId",
			sortDirections: ["descend"],
			sorter: (item2, item1) => +item2.userId - +item1.userId,
		},
		{
			title: <p className="text-18 md:text-20 text-gradient-red">Name</p>,
			dataIndex: "name",
			key: "name",
			sortDirections: ["descend"],
			sorter: (item2, item1) => {
				let name1 = item1.name?.toLocaleString().trim().toLowerCase();
				let name2 = item2.name?.toLocaleString().trim().toLowerCase();
				if (name2 < name1) {
					return -1;
				} else {
					return 1;
				}
			},
		},
		{
			title: <p className="text-18 md:text-20 text-gradient-red">Email</p>,
			dataIndex: "email",
			key: "email",
			sortDirections: ["descend"],
			sorter: (item2, item1) => {
				let email1 = item1.email?.trim().toLowerCase();
				let email2 = item2.email?.trim().toLowerCase();
				if (email1 < email2) {
					return -1;
				} else {
					return 1;
				}
			},
			responsive: ["sm"],
		},
		{
			title: (
				<p className="text-18 md:text-20 text-gradient-red">Phone number</p>
			),
			dataIndex: "phoneNumber",
			key: "phoneNumber",
			responsive: ["lg"],
		},
		{
			title: <p className="text-18 md:text-20 text-gradient-red">Action</p>,
			dataIndex: "action",
			key: "action",
			render: () => (
				<Space size="middle">
					<a title="Edit" className="text-green-1" style={{ fontSize: 20 }}>
						<EditOutlined />
					</a>
					<a title="Delete" className="text-red-1" style={{ fontSize: 20 }}>
						<DeleteOutlined />
					</a>
				</Space>
			),
		},
	];

	const tokenUser = getCookie("__token") as string;

	const [userData, setUserData] = useState();

	const { data, isLoading, status }: any = useQuery({
		queryKey: ["get-user-list"],
		queryFn: () => getUserList(tokenUser),
	});

	useEffect(() => {
		status && setUserData(data?.content);
	}, [status]);

	const [searchTerm, setSearchTerm] = useState("");

	const handleInputChange = (e: any) => {
		setSearchTerm(e.target.value);
		const filteredData = data?.content.filter((item: any) =>
			item.name.toLowerCase().includes(e.target.value.toLowerCase())
		);
		searchTerm.length > 0 && setUserData(filteredData);
	};

	return (
		<section>
			<div className="flex justify-between items-start sm:items-center p-3 rounded-lg mb-3 lg:mb-5 mt-3 md:mt-0 flex-col sm:flex-row bg-white bg-opacity-50">
				<h1 className="text-24 lg:text-32 text-gradient-red font-bold leading-1-4 ">
					User Management
				</h1>
				<div className="relative mt-2 md:mt-0">
					<Input
						name="search"
						type="text"
						id="search"
						className="py-2 pl-10 rounded-2xl min-w-[300px]  md:min-w-[250px] lg:min-w-[350px] text-neutral-8 font-medium text-16 leading-1-4"
						maxLength={255}
						placeholder="Search project name..."
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
				rowKey={"userId"}
				columns={columns}
				dataSource={userData}
				// rowSelection={{ ...rowSelection }}
				loading={isLoading}
				className="overflow-x-auto w-full"
			/>
		</section>
	);
}
