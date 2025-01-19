import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    console.log("data received:", data);

    if (!data.name) {
      return NextResponse.json(
        { error: "name is required field." },
        { status: 400 }
      );
    }

    const session = await auth()
    const userFound = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    if (!userFound) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    const newCategory = await prismadb.category.create({
      data: {
        name: data.name,
        color: data.color || null,
        icon: data.icon || null,
        userId: userFound.id, 
      },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
