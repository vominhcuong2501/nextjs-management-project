"use client";
import { useState, type ReactNode } from "react";
import Sidebar from "../component/Sidebar";
import Logo from "../component/Logo";
import PATH_NAME from "../constans/pathname";
import Link from "next/link";
import SidebarMobile from "../component/SidebarMobile";

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
      className="flex gap-3 lg:gap-5 p-3 lg:p-5 min-h-screen bg-gradient-to-r from-[#7fe2f3] to-[#5f88c9] "
      // style={{ backgroundImage: "url(./bg-dashboard.jpg)" }}
    >
      <div className="hidden md:block">
        <div className="sticky top-0 !z-20">
          <Sidebar />
        </div>
      </div>
      <div className="flex-1 z-10">
        <div className="flex items-center justify-between md:hidden">
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

        {children}
      </div>

      <div
        className={`fixed top-0 transition-all duration-300 ${
          isShow ? "right-0 z-50" : "-right-[110vw]"
        } backdrop-blur `}
      >
        <SidebarMobile handleCloseSidebarMobi={handleCloseSidebarMobi} />
      </div>
    </section>
  );
}
