import { type ReactNode } from "react";
import Header from "../component/Header";

interface CommonLayoutProps {
	children: ReactNode;
}
export default async function AuthLayout({ children }: CommonLayoutProps) {
	return (
		<section className="relative">
			<div className="fixed top-0 lg:top-10 left-1/2 -translate-x-1/2 w-full lg:min-w-[992px] max-w-[992px] z-10">
				<Header />
			</div>
			{children}
		</section>
	);
}
