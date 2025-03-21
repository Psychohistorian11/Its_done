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

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const userFound = await prismadb.user.findUnique({
      where: { email: session.user.email },
    });

    if (!userFound) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    const newTask = await prismadb.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueTime: data.dueTime,
        priority: data.priority,
        itsDone: false,
        userId: userFound.id,
        categoryId: data.category ? data.category.id : null,
        ...(data.createdAt && { createdAt: data.createdAt }),
      },
    });

    return NextResponse.json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const userFound = await prismadb.user.findUnique({
      where: { email: session.user.email },
    });

    if (!userFound) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId") || null;
    const date = searchParams.get("date");
    const itsDone = searchParams.get("itsDone");

    const filters: {
      userId: string;
      categoryId?: string | null;
      createdAt?: { gte: Date; lt: Date };
      itsDone?: boolean;
    } = { userId: userFound.id };

    if (categoryId) {
      filters.categoryId = categoryId;
    }

    if (date) {
      const selectedDate = new Date(date);
      const startOfDay = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      const endOfDay = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + 1
      );

      filters.createdAt = {
        gte: startOfDay,
        lt: endOfDay,
      };
    }

    if (itsDone !== null) {
      filters.itsDone = itsDone === "true";
    }

    const tasks = await prismadb.task.findMany({
      where: filters,
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

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching tasks." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    if (data.itsDone === undefined) {
      return NextResponse.json(
        { error: "'itsDone' field is required." },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const userFound = await prismadb.user.findUnique({
      where: { email: session.user.email },
    });

    if (!userFound) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const taskToUpdate = await prismadb.task.findUnique({
      where: { id: data.id },
    });

    if (!taskToUpdate || taskToUpdate.userId !== userFound.id) {
      return NextResponse.json(
        { error: "Task not found or unauthorized." },
        { status: 404 }
      );
    }

    const updatedTask = await prismadb.task.update({
      where: { id: data.id },
      data: {
        itsDone: data.itsDone,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
