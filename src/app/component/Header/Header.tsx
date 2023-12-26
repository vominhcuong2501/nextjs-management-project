import Image from "next/image";
import Logo from "../Logo";
import Link from "next/link";

export default function Header() {
	return (
		<div className="flex items-center justify-between gap-10 lg:rounded-[20px] h-[55px] lg:h-[70px] px-10 z-10 bg-blue-12 lg:bg-background-8 lg:border border-neutral-1 shadow-primary">
			<Link href={"/"} target="_self" title="Homepage">
				<Logo />
			</Link>
			<ul className="  items-center gap-7 hidden lg:flex">
				<li
					className={`py-1 relative before:absolute before:content-[""] before:h-0.5 before:w-0 before:bg-red-1 before:right-1/2 before:left-1/2 before:rounded before:bottom-0 before:transition-all before:duration-300  hover:before:w-full hover:before:right-0 hover:before:left-0`}
				>
					<Link
						href={"/dashboard"}
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
						href={"/profile"}
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
			<Link
				href={"/sign-in"}
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
				<p className="text-16 font-bold text-neutral-1 leading-1-4">SIGN IN</p>
			</Link>
			<Image
				src={"/icon-burger.svg"}
				alt="Sign In"
				title="Sign In"
				width={44}
				height={44}
				className="w-4 h-4 block lg:hidden"
			/>
		</div>
	);
}
