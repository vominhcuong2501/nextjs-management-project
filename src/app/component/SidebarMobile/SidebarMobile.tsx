"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import { Layout, Menu } from "antd";
import { deleteCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import PATH_NAME from "@/app/constans/pathname";
import useDataUser from "@/lib/store/client/infomationUser";
import { useReverseModifyObject } from "@/lib/utils/modifyContent";
import { useMounted } from "@/lib/hooks/useMounted";

interface SidebarMobileProps {
  handleCloseSidebarMobi: () => void;
}

export default function SidebarMobile({
  handleCloseSidebarMobi,
}: SidebarMobileProps) {
  const { Sider } = Layout;

  function getItem(label?: any, key?: any, icon?: any, children?: any) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const router = useRouter();

  const pathname = usePathname();

  const dataPathname = [
    { path: PATH_NAME.DASHBOARD, key: "1" },
    { path: PATH_NAME.TABLE_PROJECT, key: "2" },
    { path: PATH_NAME.TABLE_USER, key: "3" },
    { path: PATH_NAME.CREATE_PROJECT, key: "4" },
    { path: PATH_NAME.PROFILE, key: "5" },
  ];

  const currentPath = dataPathname.find((item) => item.path === pathname);

  const activePath = currentPath ? currentPath.key : "0";

  const handleLogOut = () => {
    deleteCookie("__token");
    router.push(PATH_NAME.SIGN_IN);
  };

  const { userInfo } = useDataUser();

  const convertUserInfo = useReverseModifyObject(userInfo, false);

  const isClient = useMounted();

  const items = [
    getItem(
      <p
        className="text-neutral-8 font-semibold"
        onClick={handleCloseSidebarMobi}
      >
        {isClient && (
          <Link href={PATH_NAME.PROFILE} title="Profile" target="_self">
            Hi {convertUserInfo?.name} !!!
          </Link>
        )}
      </p>,
      "5",
      <div className="bg-background-10  shadow-black6 text-center p-2 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M10.2453 2.39175C9.67522 1.77622 8.87893 1.43726 8.00003 1.43726C7.11643 1.43726 6.31751 1.77417 5.75003 2.38589C5.1764 3.00435 4.8969 3.84487 4.96253 4.75249C5.09261 6.54311 6.4552 7.99975 8.00003 7.99975C9.54485 7.99975 10.9051 6.54341 11.0372 4.75307C11.1037 3.85366 10.8225 3.01489 10.2453 2.39175Z"
            fill="#0075FF"
          />
          <path
            d="M13.1564 14.5616H2.84392C2.70894 14.5634 2.57526 14.535 2.45262 14.4786C2.32997 14.4222 2.22145 14.3392 2.13493 14.2355C1.9445 14.0079 1.86775 13.6971 1.92458 13.3827C2.17185 12.011 2.94353 10.8588 4.15642 10.0499C5.23396 9.33183 6.5989 8.93661 8.00016 8.93661C9.40143 8.93661 10.7664 9.33212 11.8439 10.0499C13.0568 10.8585 13.8285 12.0107 14.0757 13.3824C14.1326 13.6968 14.0558 14.0076 13.8654 14.2352C13.7789 14.3389 13.6704 14.422 13.5478 14.4785C13.4251 14.5349 13.2914 14.5633 13.1564 14.5616Z"
            fill="#0075FF"
          />
        </svg>
      </div>
    ),
    getItem(
      <p
        className="text-neutral-8 font-semibold"
        onClick={handleCloseSidebarMobi}
      >
        <Link href={PATH_NAME.DASHBOARD} title="Dashboard" target="_self">
          Dashboard
        </Link>
      </p>,
      "1",
      <div className="bg-background-10  shadow-black6 text-center p-2 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clipPath="url(#clip0_580_3772)">
            <path
              d="M8.16289 3.46748C8.11927 3.42575 8.06124 3.40247 8.00088 3.40247C7.94052 3.40247 7.88248 3.42575 7.83887 3.46748L2.44531 8.61992C2.42241 8.64183 2.40418 8.66816 2.39175 8.69731C2.37931 8.72647 2.37291 8.75785 2.37295 8.78955L2.37207 13.6253C2.37207 13.8739 2.47084 14.1124 2.64666 14.2882C2.82247 14.464 3.06093 14.5628 3.30957 14.5628H6.125C6.24932 14.5628 6.36855 14.5134 6.45645 14.4255C6.54436 14.3376 6.59375 14.2184 6.59375 14.094V10.1097C6.59375 10.0475 6.61844 9.98789 6.6624 9.94393C6.70635 9.89998 6.76596 9.87529 6.82812 9.87529H9.17187C9.23403 9.87529 9.29365 9.89998 9.3376 9.94393C9.38156 9.98789 9.40625 10.0475 9.40625 10.1097V14.094C9.40625 14.2184 9.45563 14.3376 9.54354 14.4255C9.63145 14.5134 9.75068 14.5628 9.875 14.5628H12.6893C12.9379 14.5628 13.1764 14.464 13.3522 14.2882C13.528 14.1124 13.6268 13.8739 13.6268 13.6253V8.78955C13.6268 8.75785 13.6204 8.72647 13.608 8.69731C13.5955 8.66816 13.5773 8.64183 13.5544 8.61992L8.16289 3.46748Z"
              fill="#0075FF"
            />
            <path
              d="M14.8821 7.65369L12.6907 5.5572V2.37585C12.6907 2.25153 12.6413 2.13231 12.5534 2.0444C12.4655 1.95649 12.3463 1.9071 12.222 1.9071H10.8157C10.6914 1.9071 10.5722 1.95649 10.4843 2.0444C10.3964 2.13231 10.347 2.25153 10.347 2.37585V3.31335L8.65011 1.69089C8.49132 1.53035 8.25518 1.43835 8.00001 1.43835C7.74571 1.43835 7.51016 1.53035 7.35138 1.69119L1.11993 7.6531C0.937706 7.82888 0.914855 8.11804 1.08068 8.30847C1.12232 8.35654 1.1733 8.39563 1.23053 8.42337C1.28776 8.4511 1.35003 8.4669 1.41356 8.46981C1.47709 8.47271 1.54054 8.46266 1.60006 8.44026C1.65958 8.41787 1.71392 8.38359 1.75978 8.33952L7.83888 2.53054C7.88249 2.48882 7.94053 2.46553 8.00089 2.46553C8.06125 2.46553 8.11928 2.48882 8.1629 2.53054L14.2426 8.33952C14.3321 8.42541 14.4521 8.47228 14.5762 8.46986C14.7002 8.46745 14.8183 8.41594 14.9044 8.32663C15.0843 8.14031 15.0693 7.83269 14.8821 7.65369Z"
              fill="#0075FF"
            />
          </g>
          <defs>
            <clipPath id="clip0_580_3772">
              <rect
                width="15"
                height="15"
                fill="white"
                transform="translate(0.5 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    ),
    getItem(
      <p
        className="text-neutral-8 font-semibold"
        onClick={handleCloseSidebarMobi}
      >
        <Link
          href={PATH_NAME.TABLE_PROJECT}
          title="Project List"
          target="_self"
        >
          Project List
        </Link>
      </p>,
      "2",
      <div className="bg-background-10  shadow-black6 text-center p-2 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clipPath="url(#clip0_580_4324)">
            <path
              d="M3.54687 15.0316H2.60937C2.42289 15.0316 2.24405 14.9575 2.11219 14.8257C1.98033 14.6938 1.90625 14.515 1.90625 14.3285V10.1097C1.90625 9.92326 1.98033 9.74442 2.11219 9.61256C2.24405 9.4807 2.42289 9.40662 2.60937 9.40662H3.54687C3.73335 9.40662 3.9122 9.4807 4.04406 9.61256C4.17592 9.74442 4.25 9.92326 4.25 10.1097V14.3285C4.25 14.515 4.17592 14.6938 4.04406 14.8257C3.9122 14.9575 3.73335 15.0316 3.54687 15.0316Z"
              fill="#0075FF"
            />
            <path
              d="M10.1094 15.0308H9.17187C8.98539 15.0308 8.80655 14.9567 8.67469 14.8249C8.54283 14.693 8.46875 14.5142 8.46875 14.3277V7.29645C8.46875 7.10997 8.54283 6.93112 8.67469 6.79926C8.80655 6.6674 8.98539 6.59332 9.17187 6.59332H10.1094C10.2959 6.59332 10.4747 6.6674 10.6066 6.79926C10.7384 6.93112 10.8125 7.10997 10.8125 7.29645V14.3277C10.8125 14.5142 10.7384 14.693 10.6066 14.8249C10.4747 14.9567 10.2959 15.0308 10.1094 15.0308Z"
              fill="#0075FF"
            />
            <path
              d="M13.3906 15.0311H12.4531C12.2666 15.0311 12.0878 14.957 11.9559 14.8252C11.8241 14.6933 11.75 14.5145 11.75 14.328V4.0155C11.75 3.82902 11.8241 3.65018 11.9559 3.51832C12.0878 3.38646 12.2666 3.31238 12.4531 3.31238H13.3906C13.5771 3.31238 13.7559 3.38646 13.8878 3.51832C14.0197 3.65018 14.0937 3.82902 14.0937 4.0155V14.328C14.0937 14.5145 14.0197 14.6933 13.8878 14.8252C13.7559 14.957 13.5771 15.0311 13.3906 15.0311Z"
              fill="#0075FF"
            />
            <path
              d="M6.82812 15.031H5.89062C5.70414 15.031 5.5253 14.9569 5.39344 14.8251C5.26158 14.6932 5.1875 14.5144 5.1875 14.3279V1.67163C5.1875 1.48515 5.26158 1.30631 5.39344 1.17445C5.5253 1.04258 5.70414 0.968506 5.89062 0.968506H6.82812C7.01461 0.968506 7.19345 1.04258 7.32531 1.17445C7.45717 1.30631 7.53125 1.48515 7.53125 1.67163V14.3279C7.53125 14.5144 7.45717 14.6932 7.32531 14.8251C7.19345 14.9569 7.01461 15.031 6.82812 15.031Z"
              fill="#0075FF"
            />
          </g>
          <defs>
            <clipPath id="clip0_580_4324">
              <rect
                width="15"
                height="15"
                fill="white"
                transform="translate(0.5 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    ),
    getItem(
      <p
        className="text-neutral-8 font-semibold"
        onClick={handleCloseSidebarMobi}
      >
        <Link href={PATH_NAME.TABLE_USER} title="User List" target="_self">
          User List
        </Link>
      </p>,
      "3",
      <div className="bg-background-10  shadow-black6 text-center p-2 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M1.4375 11.5152C1.4375 11.9503 1.61035 12.3676 1.91803 12.6753C2.2257 12.983 2.643 13.1558 3.07812 13.1558H12.9219C13.357 13.1558 13.7743 12.983 14.082 12.6753C14.3896 12.3676 14.5625 11.9503 14.5625 11.5152V7.00348H1.4375V11.5152ZM3.37109 9.28864C3.37109 9.05553 3.46369 8.83198 3.62852 8.66715C3.79335 8.50233 4.0169 8.40973 4.25 8.40973H5.65625C5.88935 8.40973 6.1129 8.50233 6.27773 8.66715C6.44256 8.83198 6.53515 9.05553 6.53515 9.28864V9.87457C6.53515 10.1077 6.44256 10.3312 6.27773 10.4961C6.1129 10.6609 5.88935 10.7535 5.65625 10.7535H4.25C4.0169 10.7535 3.79335 10.6609 3.62852 10.4961C3.46369 10.3312 3.37109 10.1077 3.37109 9.87457V9.28864Z"
            fill="#0075FF"
          />
          <path
            d="M12.9219 2.84296H3.07812C2.643 2.84296 2.2257 3.01581 1.91803 3.32348C1.61035 3.63116 1.4375 4.04846 1.4375 4.48358V5.2453H14.5625V4.48358C14.5625 4.04846 14.3896 3.63116 14.082 3.32348C13.7743 3.01581 13.357 2.84296 12.9219 2.84296Z"
            fill="#0075FF"
          />
        </svg>
      </div>
    ),
    getItem(
      <p
        className="text-neutral-8 font-semibold"
        onClick={handleCloseSidebarMobi}
      >
        <Link
          href={PATH_NAME.CREATE_PROJECT}
          title="Create Project"
          target="_self"
        >
          Create Project
        </Link>
      </p>,
      "4",
      <div className="bg-background-10  shadow-black6 text-center p-2 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M13.0391 7.06262H8.9375C8.56454 7.06262 8.20685 6.91446 7.94313 6.65074C7.67941 6.38702 7.53125 6.02933 7.53125 5.65637V1.55481C7.53125 1.52373 7.5189 1.49392 7.49693 1.47195C7.47495 1.44997 7.44514 1.43762 7.41406 1.43762H4.71875C4.22147 1.43762 3.74456 1.63517 3.39292 1.9868C3.04129 2.33843 2.84375 2.81534 2.84375 3.31262V12.6876C2.84375 13.1849 3.04129 13.6618 3.39292 14.0134C3.74456 14.3651 4.22147 14.5626 4.71875 14.5626H11.2812C11.7785 14.5626 12.2554 14.3651 12.6071 14.0134C12.9587 13.6618 13.1562 13.1849 13.1562 12.6876V7.17981C13.1562 7.14873 13.1439 7.11892 13.1219 7.09694C13.0999 7.07497 13.0701 7.06262 13.0391 7.06262Z"
            fill="#0075FF"
          />
          <path
            d="M12.7818 6.02594L8.56865 1.81275C8.56046 1.80461 8.55004 1.79907 8.53871 1.79683C8.52737 1.79459 8.51563 1.79575 8.50495 1.80016C8.49428 1.80458 8.48514 1.81205 8.4787 1.82164C8.47226 1.83123 8.4688 1.84251 8.46875 1.85406V5.65709C8.46875 5.78141 8.51814 5.90064 8.60604 5.98855C8.69395 6.07646 8.81318 6.12584 8.9375 6.12584H12.7405C12.7521 6.12579 12.7634 6.12233 12.773 6.11589C12.7825 6.10945 12.79 6.10031 12.7944 6.08964C12.7988 6.07896 12.8 6.06722 12.7978 6.05588C12.7955 6.04455 12.79 6.03413 12.7818 6.02594Z"
            fill="#0075FF"
          />
        </svg>
      </div>
    ),

    getItem(
      <p
        className="text-neutral-8 font-semibold"
        onClick={() => {
          handleLogOut();
          handleCloseSidebarMobi();
        }}
      >
        Sign Out
      </p>,
      "6",
      <div className="bg-background-10  shadow-black6 text-center p-2 rounded-xl">
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M14.4933 1.62154C14.4879 1.59562 14.4753 1.57178 14.4569 1.55278C14.4384 1.53379 14.415 1.52045 14.3892 1.51431C12.6733 1.09478 8.70859 2.5898 6.56054 4.73696C6.17742 5.11699 5.82815 5.52968 5.5167 5.97036C4.85429 5.91177 4.19189 5.96069 3.62734 6.20679C2.03447 6.90786 1.5707 8.73716 1.4415 9.52407C1.43417 9.56714 1.43694 9.61133 1.44958 9.65315C1.46222 9.69497 1.48439 9.73329 1.51434 9.76509C1.5443 9.79689 1.58123 9.82131 1.62222 9.83643C1.66321 9.85154 1.70715 9.85694 1.75058 9.8522L4.30849 9.57007C4.31032 9.76292 4.32196 9.95555 4.34336 10.1472C4.35623 10.2803 4.41531 10.4047 4.51035 10.4988L5.50087 11.487C5.59503 11.5819 5.71938 11.6409 5.85244 11.654C6.04303 11.6753 6.23459 11.6869 6.42636 11.6888L6.1457 14.2435C6.14102 14.2869 6.14646 14.3308 6.16159 14.3718C6.17673 14.4128 6.20115 14.4497 6.23294 14.4796C6.26472 14.5095 6.30302 14.5317 6.34481 14.5444C6.3866 14.557 6.43076 14.5598 6.47382 14.5526C7.25927 14.4266 9.09179 13.9628 9.78876 12.37C10.0349 11.8054 10.0852 11.1462 10.0284 10.4871C10.4702 10.1756 10.8839 9.82622 11.265 9.44292C13.4198 7.29897 14.9063 3.42271 14.4933 1.62154ZM9.11523 6.8853C8.91847 6.68867 8.78445 6.4381 8.73011 6.16529C8.67578 5.89248 8.70357 5.60968 8.80998 5.35267C8.91639 5.09566 9.09663 4.87598 9.3279 4.72142C9.55918 4.56686 9.8311 4.48436 10.1093 4.48436C10.3874 4.48436 10.6594 4.56686 10.8906 4.72142C11.1219 4.87598 11.3022 5.09566 11.4086 5.35267C11.515 5.60968 11.5428 5.89248 11.4884 6.16529C11.4341 6.4381 11.3001 6.68867 11.1033 6.8853C10.9728 7.01596 10.8179 7.11962 10.6473 7.19034C10.4768 7.26106 10.2939 7.29746 10.1093 7.29746C9.92462 7.29746 9.74179 7.26106 9.57122 7.19034C9.40065 7.11962 9.2457 7.01596 9.11523 6.8853Z"
            fill="#0075FF"
          />
          <path
            d="M5.43359 12.2028C5.27305 12.3636 5.01553 12.4263 4.70557 12.4799C4.00918 12.5986 3.39424 11.9968 3.51934 11.2928C3.56709 11.0259 3.7083 10.6518 3.79619 10.5639C3.8154 10.5451 3.82819 10.5207 3.83274 10.4941C3.83728 10.4676 3.83336 10.4403 3.82152 10.4162C3.80968 10.392 3.79053 10.3722 3.76679 10.3595C3.74305 10.3469 3.71592 10.342 3.68926 10.3457C3.29983 10.3933 2.93754 10.5699 2.66006 10.8472C1.97129 11.5366 1.90625 14.0945 1.90625 14.0945C1.90625 14.0945 4.46562 14.0294 5.15439 13.3401C5.43261 13.0628 5.60939 12.7 5.65625 12.31C5.66709 12.1875 5.51797 12.1146 5.43359 12.2028Z"
            fill="#0075FF"
          />
        </svg>
      </div>
    ),
  ];

  return (
    <Sider
      className=" min-w-100px h-screen !w-screen"
      
    >
      <div className="flex items-center justify-between bg-gradient-to-b from-[#7fe2f3] to-[#5f88c9] p-2">
        <Link
          href="/"
          target="_self"
          title="Homepage"
          className="block pl-2"
          onClick={handleCloseSidebarMobi}
        >
          <Logo />
        </Link>
        <svg
          onClick={handleCloseSidebarMobi}
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer border border-neutral-1 rounded-lg icon-burger"
        >
          <path
            d="M27.9952 17.3475C28.366 16.9767 28.366 16.3755 27.9952 16.0047C27.6243 15.6339 27.0231 15.6339 26.6523 16.0047L21.9999 20.6571L17.3475 16.0047C16.9767 15.6339 16.3755 15.6339 16.0047 16.0047C15.6339 16.3755 15.6339 16.9767 16.0047 17.3475L20.6571 21.9999L16.0047 26.6523C15.6339 27.0231 15.6339 27.6243 16.0047 27.9952C16.3755 28.366 16.9767 28.366 17.3475 27.9952L21.9999 23.3428L26.6523 27.9952C27.0231 28.366 27.6243 28.366 27.9952 27.9952C28.366 27.6243 28.366 27.0231 27.9952 26.6523L23.3428 21.9999L27.9952 17.3475Z"
            fill="#262626"
          />
        </svg>
      </div>

      <Menu
        defaultSelectedKeys={[activePath]}
        mode="inline"
        items={items}
        style={{
          background: "transparent",
          marginTop: "16px",
        }}
      ></Menu>
    </Sider>
  );
}
