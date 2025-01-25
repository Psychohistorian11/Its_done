import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.title) {
      return NextResponse.json(
        { error: "name is required field." },
        { status: 400 }
      );
    }

    if (!data.dueTime) {
      return NextResponse.json(
        { error: "dueTime is required field." },
        { status: 400 }
      );
    }

    if (!data.category) {
      return NextResponse.json(
        { error: "dueTime is required field." },
        { status: 400 }
      );
    }

    const session = await auth();
    const userFound = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    if (!userFound) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const newTask = await prismadb.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueTime: data.dueTime,
        itsDone: false,
        userId: userFound.id,
        categoryId: data.category.id,
        ...(data.createdAt && { createdAt: data.createdAt }),
      },
    });

    console.log("dataaaaa: ", newTask);
    return NextResponse.json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    const userFound = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    if (!userFound) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const categories = await prismadb.task.findMany({
      where: {
        userId: userFound.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        dueTime: true,
        itsDone: true,
        priority: true,
        createdAt: true,
        category: true,
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching tasks." },
      { status: 500 }
    );
  }
}
