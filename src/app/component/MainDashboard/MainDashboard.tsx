import Image from "next/image";
import Logo from "../Logo";
import Link from "next/link";

import PATH_NAME from "../../constans/pathname";
import { getCookie } from "cookies-next";

export default function Header() {
	return (
		<div
			className="flex items-center justify-between gap-10 lg:rounded-[20px] h-[55px] lg:h-[70px] px-10 z-10  lg:border border-neutral-1 shadow-primary backdrop-blur-lg"
			style={{
				background:
					"linear-gradient(124deg, rgba(255, 255, 255, 0.00) -22.38%, rgba(255, 255, 255, 0.04) 70.38%)",
			}}
		>
			<Link href={PATH_NAME.HOME} target="_self" title="Homepage">
				<Logo />
			</Link>
			<ul className="  items-center gap-7 hidden lg:flex">
				<li
					className={`py-1 relative before:absolute before:content-[""] before:h-0.5 before:w-0 before:bg-red-1 before:right-1/2 before:left-1/2 before:rounded before:bottom-0 before:transition-all before:duration-300  hover:before:w-full hover:before:right-0 hover:before:left-0`}
				>
					<Link
						href={PATH_NAME.DASHBOARD}
						title="Dashboard"
						target="_self"
						className="flex items-center gap-2 "
					>
						<Image
							src={"/icon-dashboard.svg"}
							alt="Dashboard"
							title="Dashboard"
							width={11}
							height={11}
							className="w-4 h-4"
						/>
						<p className="text-16 font-bold text-neutral-1 leading-1-4">
							DASHBOARD
						</p>
					</Link>
				</li>
				<li
					className={`py-1 relative before:absolute before:content-[""] before:h-0.5 before:w-0 before:bg-red-1 before:right-1/2 before:left-1/2 before:rounded before:bottom-0 before:transition-all before:duration-300  hover:before:w-full hover:before:right-0 hover:before:left-0`}
				>
					<Link
						href={PATH_NAME.PROFILE}
						title="Profile"
						target="_self"
						className="flex items-center gap-2 "
					>
						<Image
							src={"/icon-profile.svg"}
							alt="Profile"
							title="Profile"
							width={11}
							height={11}
							className="w-4 h-4"
						/>
						<p className="text-16 font-bold text-neutral-1 leading-1-4">
							PROFILE
						</p>
					</Link>
				</li>
			</ul>
			{getCookie("__token") ? (
				<Link
					href={PATH_NAME.PROFILE}
					title="Sign In"
					target="_self"
					className="bg-blue-12 px-4 py-2 rounded-xl text-neutral-1 font-medium text-16  items-center gap-2 border border-neutral-1 lg:border-blue-12  hidden lg:flex"
				>
					<Image
						src={"/icon-sign-in.svg"}
						alt="Sign In"
						title="Sign In"
						width={11}
						height={11}
						className="w-4 h-4 hidden ms:block"
					/>
					<p className="text-16 font-bold text-neutral-1 leading-1-4">
						SIGN IN
					</p>
				</Link>
			) : (
				<Link
					href={PATH_NAME.SIGN_IN}
					title="Sign In"
					target="_self"
					className="bg-blue-12 px-4 py-2 rounded-xl text-neutral-1 font-medium text-16  items-center gap-2 border border-neutral-1 lg:border-blue-12  hidden lg:flex"
				>
					<Image
						src={"/icon-sign-in.svg"}
						alt="Sign In"
						title="Sign In"
						width={11}
						height={11}
						className="w-4 h-4 hidden ms:block"
					/>
					<p className="text-16 font-bold text-neutral-1 leading-1-4">
						SIGN IN
					</p>
				</Link>
			)}
			<Image
				src={"/icon-burger.svg"}
				alt="Sign In"
				title="Sign In"
				width={44}
				height={44}
				className="block lg:hidden icon-eye-password"
			/>
		</div>
	);
}
