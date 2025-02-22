import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.name) {
      return NextResponse.json(
        { error: "name is required field." },
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

export async function GET() {
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

    const categories = await prismadb.category.findMany({
      where: {
        userId: userFound.id,
      },
      select: {
        id: true,
        name: true,
        color: true,
        icon: true,
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching categories." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.id || !data.name) {
      return NextResponse.json(
        { error: "'id' and 'name' are required fields." },
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

    const updatedCategory = await prismadb.category.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        color: data.color || null,
        icon: data.icon || null,
      },
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the category." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json(
        { error: "'id' is a required field for deletion." },
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

    await prismadb.task.deleteMany({
      where: {
        categoryId: data.id,
      },
    });

    const deletedCategory = await prismadb.category.delete({
      where: {
        id: data.id,
      },
    });

    return NextResponse.json(
      {
        message: "Category and associated tasks deleted successfully.",
        deletedCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category and tasks:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the category and tasks." },
      { status: 500 }
    );
  }
}

