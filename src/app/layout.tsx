import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BaseComponent from "./component/BaseComponent";
import NextTopLoaderClient from "./component/NextNProgress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Management Project",
	description: "Management Project",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NextTopLoaderClient />
				<BaseComponent />
				{children}
			</body>
		</html>
	);
}
