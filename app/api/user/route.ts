import serverAuth from "@/app/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { error: "Method not supported" },
      {
        status: 405,
      }
    );
  }

  try {
    const { currentUser } = await serverAuth();
    return NextResponse.json(currentUser, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
