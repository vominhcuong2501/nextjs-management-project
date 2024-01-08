"use client";
import FormCreateEditTask from "@/app/component/FormCreateEditTask";
import useUpdateStatusModal from "@/lib/store/client/statusIsShowModal";
import React from "react";

export default function ProjectDetail() {
	const { isCreateTask, updateIsCreateTask } = useUpdateStatusModal();

	return (
		<div>
			<p onClick={() => updateIsCreateTask(true)}>Edit Task</p>
			{isCreateTask && (
				<div
					className={`w-screen h-screen fixed top-0 transition-all duration-300 bg-neutral-9 opacity-80 right-0 !z-30`}
					onClick={() => updateIsCreateTask(false)}
				></div>
			)}
			<div
				className={`fixed top-0 transition-all duration-300 ${
					isCreateTask ? "right-0 !z-50" : "-right-[150vw]"
				}`}
			>
				<FormCreateEditTask />
			</div>
		</div>
	);
}
