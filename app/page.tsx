"use client";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main className="text-white">
      Netflix
      <button onClick={() => signOut()}>Log out</button>
    </main>
  );
}
