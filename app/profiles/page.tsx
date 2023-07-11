"use client";
import Image from "next/image";
import * as React from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/navigation";

export interface ProfilesProps {}

export default function Profiles(props: ProfilesProps) {
  const { data: user } = useCurrentUser();
  console.log(user);
  const router = useRouter();
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-white text-3xl md:text-6xl text-center">Who is watching?</h1>
        <div className="flex justify-center items-center gap-8 mt-10">
          <div onClick={() => router.push("/")}>
            <div className="group w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:border-white group-hover:cursor-pointer overflow-hidden relative">
                <Image src="/images/default-blue.png" fill alt="profiles" />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{user?.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
