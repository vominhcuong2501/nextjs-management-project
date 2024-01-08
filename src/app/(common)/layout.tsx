"use client";
import { useState, type ReactNode } from "react";
import Sidebar from "../component/Sidebar";
import Logo from "../component/Logo";
import PATH_NAME from "../constans/pathname";
import Link from "next/link";
import SidebarMobile from "../component/SidebarMobile";
import FormCreateEditTask from "../component/FormCreateEditTask";
import useUpdateStatusModal from "@/lib/store/client/statusIsShowModal";

interface CommonLayoutProps {
	children: ReactNode;
}

export default function AuthLayout({ children }: CommonLayoutProps) {
	const [isShow, setIsShow] = useState(false);

	const handleCloseSidebarMobi = () => {
		setIsShow(false);
	};

	return (
		<section
			className="flex gap-3 lg:gap-5 p-3 lg:p-5 min-h-screen "
			style={{
				backgroundImage: "url(/bg-management.png)",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="hidden md:block">
				<div className="sticky top-0 ">
					<Sidebar />
					<div
						className="p-4 pb-6 rounded-2xl overflow-hidden mt-4"
						style={{
							backgroundImage: "url(/bg-need-help.jpg)",
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
						}}
					>
						<div className="bg-neutral-1 p-2 rounded-lg inline-block">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="25"
								viewBox="0 0 24 25"
								fill="none"
							>
								<path
									d="M12 3.49994C7.03125 3.49994 3 7.53119 3 12.4999C3 17.4687 7.03125 21.4999 12 21.4999C16.9687 21.4999 21 17.4687 21 12.4999C21 7.53119 16.9687 3.49994 12 3.49994ZM11.7187 17.7499C11.5333 17.7499 11.3521 17.695 11.1979 17.5919C11.0437 17.4889 10.9236 17.3425 10.8526 17.1712C10.7817 16.9999 10.7631 16.8114 10.7993 16.6295C10.8354 16.4477 10.9247 16.2806 11.0558 16.1495C11.1869 16.0184 11.354 15.9291 11.5359 15.893C11.7177 15.8568 11.9062 15.8753 12.0775 15.9463C12.2488 16.0173 12.3952 16.1374 12.4983 16.2916C12.6013 16.4458 12.6562 16.627 12.6562 16.8124C12.6562 17.0611 12.5575 17.2995 12.3817 17.4754C12.2058 17.6512 11.9674 17.7499 11.7187 17.7499ZM13.2862 12.9687C12.5264 13.4787 12.4219 13.946 12.4219 14.3749C12.4219 14.549 12.3527 14.7159 12.2297 14.839C12.1066 14.962 11.9397 15.0312 11.7656 15.0312C11.5916 15.0312 11.4247 14.962 11.3016 14.839C11.1785 14.7159 11.1094 14.549 11.1094 14.3749C11.1094 13.3479 11.5819 12.5313 12.5541 11.8784C13.4578 11.2718 13.9687 10.8874 13.9687 10.0423C13.9687 9.4676 13.6406 9.03119 12.9614 8.70822C12.8016 8.63228 12.4458 8.55822 12.008 8.56338C11.4586 8.57041 11.032 8.70166 10.7034 8.96603C10.0837 9.46478 10.0312 10.0076 10.0312 10.0156C10.0271 10.1017 10.006 10.1863 9.96919 10.2643C9.93237 10.3423 9.88054 10.4123 9.81666 10.4703C9.75279 10.5283 9.67811 10.5732 9.5969 10.6023C9.51569 10.6315 9.42954 10.6443 9.34336 10.6402C9.25718 10.636 9.17266 10.6149 9.09463 10.5781C9.0166 10.5413 8.94659 10.4895 8.88859 10.4256C8.83059 10.3617 8.78574 10.287 8.75659 10.2058C8.72745 10.1246 8.71459 10.0385 8.71875 9.95228C8.72391 9.83838 8.80312 8.81228 9.87984 7.94603C10.4381 7.49697 11.1483 7.26353 11.9892 7.25322C12.5845 7.24619 13.1437 7.34697 13.523 7.52603C14.6578 8.06275 15.2812 8.9576 15.2812 10.0423C15.2812 11.6281 14.2214 12.3401 13.2862 12.9687Z"
									fill="#0075FF"
								/>
							</svg>
						</div>
						<h3 className="text-neutral-1 text-16 font-semibold leading-1-4">
							Need Help?
						</h3>
						<p className="text-neutral-1 text-14 font-semibold leading-1-4 mb-5">
							Please check our docs
						</p>
						<Link
							href="https://nextjs.org/docs"
							title="Documentation"
							target="_blank"
							className="text-neutral-1 text-center rounded-full bg-background-9 p-3"
						>
							DOCUMENTATION
						</Link>
					</div>
				</div>
			</div>

			<div className="flex-1 z-10">
				<div className="fixed top-0 left-0 w-full z-50 px-3 py-2 md:px-0 md:py-0 backdrop-blur-2xl bg-gradient-to-b from-[#7fe2f3] to-[#5f88c9]">
					<div className="flex items-center justify-between md:hidden ">
						<Link href={PATH_NAME.HOME} target="_self" title="Homepage">
							<Logo />
						</Link>
						<div
							className="border border-neutral-1 rounded-lg cursor-pointer"
							onClick={() => setIsShow(true)}
						>
							<svg
								width="44"
								height="44"
								viewBox="0 0 44 44"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="icon-burger"
							>
								<path
									d="M15.3333 27H28.6667C29.125 27 29.5 26.625 29.5 26.1667C29.5 25.7083 29.125 25.3333 28.6667 25.3333H15.3333C14.875 25.3333 14.5 25.7083 14.5 26.1667C14.5 26.625 14.875 27 15.3333 27ZM15.3333 22.8333H28.6667C29.125 22.8333 29.5 22.4583 29.5 22C29.5 21.5417 29.125 21.1667 28.6667 21.1667H15.3333C14.875 21.1667 14.5 21.5417 14.5 22C14.5 22.4583 14.875 22.8333 15.3333 22.8333ZM14.5 17.8333C14.5 18.2917 14.875 18.6667 15.3333 18.6667H28.6667C29.125 18.6667 29.5 18.2917 29.5 17.8333C29.5 17.375 29.125 17 28.6667 17H15.3333C14.875 17 14.5 17.375 14.5 17.8333Z"
									fill="#262626"
								/>
							</svg>
						</div>
					</div>
				</div>
				<div className="mt-[60px] md:mt-0">{children}</div>
			</div>
		</section>
	);
}
