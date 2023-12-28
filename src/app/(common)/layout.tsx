"use client";
import { type ReactNode } from "react";
import Sidebar from "../component/Sidebar";
import MainDashboard from "../component/MainDashboard";

interface CommonLayoutProps {
	children: ReactNode;
}
export default function AuthLayout({ children }: CommonLayoutProps) {
	return (
		<section
			className="flex gap-10 p-5 min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500"
			// style={{ backgroundImage: "url(./bg-dashboard.jpg)" }}
		>
			<Sidebar />
			<div className="flex-1 z-10">
				<MainDashboard />
				{children}
			</div>
		</section>
	);
}
