import Image from "next/image";
import { type ReactNode } from "react";
import Logo from "../component/Logo";
import Link from "next/link";

interface CommonLayoutProps {
  children: ReactNode;
}
export default async function AuthLayout({ children }: CommonLayoutProps) {
  return (
    <section className="relative bg-background-9">
      <div className="fixed lg:top-10 lg:left-10 top-5 left-5 z-10 border border-neutral-1 shadow-primary backdrop-blur-lg px-5 py-3 rounded-2xl">
        <Link href={"/"} target="_self" title="Homepage">
          <Logo />
        </Link>
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
            src={"/image-sign-in-1.jpg"}
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
