"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Input from "@/app/components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema, schema } from "@/app/utils/shema";
import Link from "next/link";

export interface LoginProps {}

type FormLoginData = Omit<Schema, "username">;
const loginSchema = schema.omit(["username"]);

export default function Login(props: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="relative h-full w-full bg-[url(/images/hero.jpg)] bg-cover bg-no-repeat bg-center bg-fixed">
      <div className="bg-black h-full w-full lg:bg-opacity-50">
        <nav className="py-5 px-12">
          <Image src="/images/logo.png" width={120} height={120} alt="logo" />
        </nav>
        <form className="flex justify-center" onSubmit={onSubmit} noValidate>
          <div className="bg-black bg-opacity-70 p-14 self-center mt-2 lg:w-2/5 lg:max-w-md w-full">
            <h2 className="text-white text-3xl font-bold mb-6">Sign in</h2>
            <div className="flex flex-col gap-1">
              <Input id="email" label="Email" type="email" register={register} name="email" errors={errors.email?.message} />
              <Input id="password" label="Password" type="password" register={register} name="password" errors={errors.password?.message} />
            </div>
            <button type="submit" className="bg-red-600 text-white py-3 w-full rounded-md mt-6 hover:bg-red-700 transition">
              login
            </button>
            <p className="text-neutral-500 mt-12">
              First time using Netflix?
              <Link href="/auth/register" className="text-white ml-1 hover:underline cursor-pointer">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
