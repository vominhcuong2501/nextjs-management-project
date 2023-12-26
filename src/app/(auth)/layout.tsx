import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import Header from "../component/Header";

interface CommonLayoutProps {
	children: ReactNode;
}
export default async function AuthLayout({ children }: CommonLayoutProps) {
	return (
		<section className="relative bg-background-9">
			<div className="fixed top-0 lg:top-10 left-1/2 -translate-x-1/2 w-full lg:min-w-[992px] max-w-[992px] z-10">
				<Header />
			</div>
			<div className="grid  lg:grid-cols-2 items-center">
				<div className="relative hidden lg:block">
					<div className="absolute text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full">
						<p className="text-20 font-normal text-neutral-1 tracking-wider">
							INSPIRED BY THE FUTURE:
						</p>
						<h2 className="text-36 font-semibold text-gradient-gray  mt-4 tracking-wider">
							THE VISION UI DASHBOARD
						</h2>
					</div>
					<Image
						src={"/image-sign-in.jpg"}
						width={960}
						height={1300}
						title="Sign In"
						alt="Sign In"
						className="w-full h-screen"
						priority
					/>
				</div>

				<div className="h-screen lg:h-auto relative">
					<Image
						src={"/image-sign-in.jpg"}
						width={960}
						height={1300}
						title="Sign In"
						alt="Sign In"
						className="w-full h-screen block lg:hidden"
						priority
					/>
					{children}
				</div>
			</div>
		</section>
	);
}
