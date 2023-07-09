import React, { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  errors?: string;
}

export default function Input({ id, label, register, name, errors, ...rest }: InputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
        {...register(name as string)}
        {...rest}
      />
      <label
        htmlFor={id}
        className="absolute top-4 left-6 text-md text-zinc-400 duration-150 -translate-y-3 scale-75 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
      <p className="mt-1 text-red-600 min-h-[1.25rem] text-sm">{errors}</p>
    </div>
  );
}
