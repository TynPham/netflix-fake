"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Input from "@/app/components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema, schema } from "@/app/utils/shema";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export interface RegisterProps {}

type FormRegisterData = Schema;
const registerSchema = schema;

export default function Register(props: RegisterProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="relative h-full w-full bg-[url(/images/hero.jpg)] bg-cover bg-no-repeat bg-center bg-fixed">
      <div className="bg-black h-full w-full lg:bg-opacity-50">
        <nav className="py-5 px-12">
          <Image src="/images/logo.png" width={120} height={120} alt="logo" />
        </nav>
        <form className="flex justify-center" onSubmit={onSubmit} noValidate>
          <div className="bg-black bg-opacity-70 p-14 self-center mt-2 lg:w-2/5 lg:max-w-md w-full">
            <h2 className="text-white text-3xl font-bold mb-6">Register</h2>
            <div className="flex flex-col gap-1">
              <Input id="username" label="Username" type="text" register={register} name="name" errors={errors.name?.message} />
              <Input id="email" label="Email" type="email" register={register} name="email" errors={errors.email?.message} />
              <Input id="password" label="Password" type="password" register={register} name="password" errors={errors.password?.message} />
            </div>
            <button className="bg-red-600 text-white py-3 w-full rounded-md mt-6 hover:bg-red-700 transition">Sign up</button>
            <div className="flex justify-center items-center gap-6 mt-8">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              Already have an account?
              <Link href="/auth/login" className="text-white ml-1 hover:underline cursor-pointer">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
