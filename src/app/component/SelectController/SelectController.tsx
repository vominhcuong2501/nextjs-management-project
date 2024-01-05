"use client";
import React, { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { UnorderedListOutlined } from "@ant-design/icons";

export interface Option {
  value: number;
  label: string;
}

interface SelectControllerProps {
  name: string;
  control?: any;
  rules?: Record<string, any>;
  options: Option[];
  errors?: Record<string, any>;
  optionDefault?: string;
  classNameError?: string;
  errorMessage?: any;
  classNameSelect?: string;
  defaultValue?: number;
  onChange?: (selectedValue: string) => void;
  iconSelect?: ReactNode;
}

export default function SelectController({
  name,
  control,
  rules,
  options,
  optionDefault,
  defaultValue,
  errorMessage,
  classNameSelect = "",
  iconSelect,
  classNameError = "mt-1 lg:min-h-[1.25rem] text-12 lg:text-14 text-red-1 ",
  onChange,
}: SelectControllerProps) {
  return (
    <div>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => (
            <select
              {...field}
              onChange={(e) => {
                field.onChange(e);
                onChange && onChange(e.target.value);
              }}
              className={`w-full  pr-3 pl-9 md:h-12 h-11 rounded-[10px]  outline-none transition-colors text-14 lg:text-16 border-[2px] border-blue-15 text-neutral-8 focus:border-blue-7 leading-1-4 ${classNameSelect}`}
            >
              <option value={0}>{"Choose Project Category"}</option>

              {options?.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-14 lg:text-16 text-neutral-8 font-medium leading-1-4 "
                >
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
        <div className="absolute left-3 top-[52.5%] -translate-y-1/2">
          {iconSelect}
        </div>
      </div>
      {errorMessage && <div className={classNameError}>{errorMessage}</div>}
    </div>
  );
}
