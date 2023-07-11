import { NextResponse } from "next/server";

import prismadb from "@/app/lib/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "Method not supported" },
      {
        status: 405,
      }
    );
  }
  try {
    const { name, email, password } = await req.json();
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exist" },
        {
          status: 422,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    NextResponse.json(
      { error: "Error" },
      {
        status: 400,
      }
    );
  }
}
