"use client";
import { type ReactNode } from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";

interface CommonLayoutProps {
	children: ReactNode;
}
export default function AuthLayout({ children }: CommonLayoutProps) {
	return (
		<section
			className="flex gap-5 p-3 h-screen"
			// style={{ backgroundImage: "url(./bg-dashboard.jpg)" }}
		>
			<Sidebar />
			<div className="flex-1 z-10">{children}</div>
		</section>
	);
}
