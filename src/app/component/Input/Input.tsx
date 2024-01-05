"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: any;
  classNameInput?: string;
  classNameError?: string;
  register?: UseFormRegister<any>;
  rules?: RegisterOptions;
  id?: string;
  nameLabel?: string;
  classNameLabel?: string;
  autocomplete?: string;
  placeholder?: string;
  isRequired?: boolean;
  iconInput?: ReactNode;
}

export default function Input({
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = "",
  classNameError = "mt-1 lg:min-h-[1.25rem] text-12 lg:text-14 text-red-1 ",
  id,
  nameLabel,
  autocomplete,
  placeholder,
  isRequired = true,
  iconInput,
  classNameLabel = "",
  ...restParams
}: Props) {
  const [visible, setVisible] = useState(false);
  const registerResult = register && name ? register(name, rules) : null;

  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };

  const handleType = () => {
    if (restParams.type === "password") {
      return visible ? "text" : "password";
    }
    return restParams.type;
  };

  return (
    <div className={className} data-te-input-wrapper-init>
      <div className="relative">
        <label
          htmlFor={id}
          className={`text-14 lg:text-16 font-normal text-neutral-1 leading-1-4 font-semibold ${classNameLabel} mb-1 block`}
        >
          {nameLabel} {isRequired && <span className="text-red-1">*</span>}
        </label>
        <div className="relative">
          <input
            className={`w-full md:h-12 h-11 rounded-[10px] pr-3 pl-10 outline-none transition-colors text-14 lg:text-16 border-[2px] border-blue-15 text-neutral-1 focus:border-blue-7 leading-1-4 bg-transparent ${classNameInput}  auto-fill-input ${
              errorMessage ? "border-red-1" : ""
            }`}
            {...registerResult}
            {...restParams}
            id={id}
            type={handleType()}
            placeholder={placeholder ? placeholder : " "}
            autoComplete={autocomplete}
          />
          <div className="absolute left-3 top-[52.5%] -translate-y-1/2">
            {iconInput}
          </div>

          {restParams.type === "password" && visible && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute right-3 top-[16px] h-5 w-5 cursor-pointer md:right-4 icon-eye-password"
              onClick={toggleVisible}
            >
              <g id="Property 1=View">
                <path
                  id="Vector (Stroke)"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.14663 11.5543C3.04928 11.6889 3 11.8444 3 12C3 12.1556 3.04928 12.3111 3.14663 12.4457C3.83003 13.3766 5.00157 14.7839 6.54301 15.951C8.08682 17.12 9.93661 18 12 18C14.0634 18 15.9132 17.12 17.457 15.951C18.9984 14.7839 20.17 13.3766 20.8534 12.4457C20.9507 12.3111 21 12.1556 21 12C21 11.8444 20.9507 11.6889 20.8534 11.5543C20.17 10.6234 18.9984 9.21609 17.457 8.04895C15.9132 6.88003 14.0634 6 12 6C9.93661 6 8.08682 6.88003 6.54301 8.04895C5.00157 9.21608 3.83003 10.6234 3.14663 11.5543ZM5.33571 6.45445C7.08746 5.12809 9.35325 4 12 4C14.6468 4 16.9125 5.12809 18.6643 6.45445C20.4172 7.78168 21.7205 9.35551 22.4674 10.3732L22.4702 10.377C22.8131 10.8489 23 11.4155 23 12C23 12.5845 22.8131 13.1511 22.4702 13.623L22.4674 13.6268C21.7205 14.6445 20.4172 16.2183 18.6643 17.5455C16.9125 18.8719 14.6468 20 12 20C9.35325 20 7.08746 18.8719 5.33571 17.5455C3.58283 16.2183 2.27948 14.6445 1.5326 13.6268L1.52984 13.623L1.52985 13.623C1.18689 13.1511 1 12.5845 1 12C1 11.4155 1.18689 10.8489 1.52985 10.377L1.53259 10.3732L1.5326 10.3732C2.27948 9.35551 3.58283 7.78168 5.33571 6.45445ZM12.0001 9.5C10.5076 9.5 9.36359 10.655 9.36359 12C9.36359 13.345 10.5076 14.5 12.0001 14.5C13.4925 14.5 14.6365 13.345 14.6365 12C14.6365 10.655 13.4925 9.5 12.0001 9.5ZM7.36359 12C7.36359 9.47901 9.47581 7.5 12.0001 7.5C14.5243 7.5 16.6365 9.47901 16.6365 12C16.6365 14.521 14.5243 16.5 12.0001 16.5C9.47581 16.5 7.36359 14.521 7.36359 12Z"
                  fill="#363636"
                />
              </g>
            </svg>
          )}

          {restParams.type === "password" && !visible && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute right-3 top-[16px] h-5 w-5 cursor-pointer md:right-4 icon-eye-password"
              onClick={toggleVisible}
            >
              <g id="Property 1=Hide">
                <path
                  id="Vector (Stroke)"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.8023 2.29647C22.1908 2.68895 22.1877 3.32211 21.7952 3.71066L18.9395 6.53765C20.5586 7.85513 21.7675 9.36258 22.4752 10.3545L22.4779 10.3583C22.8173 10.8386 23 11.4117 23 12C23 12.5883 22.8173 13.1614 22.4779 13.6417L22.4752 13.6455C21.7295 14.6907 20.4273 16.3083 18.6751 17.6729C16.9247 19.0361 14.6553 20.2 12 20.2C10.0027 20.2 8.22369 19.5415 6.71971 18.6349L3.6128 21.7107C3.22031 22.0992 2.58716 22.096 2.1986 21.7035C1.81005 21.311 1.81324 20.6779 2.20573 20.2893L5.06095 17.4628C3.44164 16.1452 2.23255 14.6375 1.52476 13.6455L1.52207 13.6418L1.52208 13.6417C1.18273 13.1614 1 12.5883 1 12C1 11.4117 1.18273 10.8386 1.52208 10.3583L1.52475 10.3545L1.52476 10.3545C2.2705 9.3093 3.57273 7.69169 5.32492 6.32708C7.07528 4.9639 9.34473 3.80001 12 3.80001C13.9975 3.80001 15.7767 4.45871 17.2808 5.36543L20.3881 2.28934C20.7806 1.90079 21.4137 1.90398 21.8023 2.29647ZM15.806 6.82546C14.6485 6.20116 13.3707 5.80001 12 5.80001C9.94513 5.80001 8.099 6.70161 6.5538 7.90501C5.01163 9.10605 3.83895 10.5548 3.15442 11.5139C3.05343 11.6575 3 11.8271 3 12C3 12.1729 3.05343 12.3425 3.15442 12.4861C3.82974 13.4323 4.98013 14.855 6.4917 16.0464L8.08626 14.4678C7.62902 13.7557 7.36363 12.9097 7.36363 12C7.36363 9.45004 9.44898 7.40002 12.0001 7.40002C12.9172 7.40002 13.7741 7.66494 14.4956 8.12278L15.806 6.82546ZM13.0073 9.59614C12.6976 9.46985 12.3576 9.40002 12.0001 9.40002C10.5345 9.40002 9.36363 10.5736 9.36363 12C9.36363 12.3543 9.43586 12.693 9.5669 13.002L13.0073 9.59614ZM10.9934 14.4041L14.4335 10.9985C14.5644 11.3074 14.6366 11.6459 14.6366 12C14.6366 13.4265 13.4657 14.6 12.0001 14.6C11.6428 14.6 11.303 14.5303 10.9934 14.4041ZM9.50504 15.8775C10.2264 16.3352 11.0832 16.6 12.0001 16.6C14.5512 16.6 16.6366 14.55 16.6366 12C16.6366 11.0905 16.3713 10.2446 15.9142 9.53264L17.5088 7.95405C19.0201 9.14529 20.1703 10.5678 20.8456 11.5139C20.9466 11.6575 21 11.8271 21 12C21 12.1729 20.9466 12.3425 20.8456 12.4861C20.161 13.4452 18.9884 14.894 17.4462 16.095C15.901 17.2984 14.0549 18.2 12 18.2C10.6296 18.2 9.35195 17.799 8.19455 17.1749L9.50504 15.8775Z"
                  fill="#363636"
                />
              </g>
            </svg>
          )}
        </div>
      </div>

      {errorMessage && <div className={classNameError}>{errorMessage}</div>}
    </div>
  );
}
