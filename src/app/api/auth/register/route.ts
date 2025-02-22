import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const usernameFound = await prismadb.user.findUnique({
    where: { username: data.username },
  });

  if (usernameFound) {
    return NextResponse.json(
      { message: "username already exists" },
      { status: 400 }
    );
  }

  const emailFound = await prismadb.user.findUnique({
    where: { email: data.email },
  });

  if (emailFound) {
    return NextResponse.json(
      { message: "email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prismadb.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      ...(data.image && { image: data.image }),
    },
    select: {
      id: true,
      username: true,
      email: true,
      image: true,
      createdAt: true,
    },
  });

  return NextResponse.json(newUser);
}
