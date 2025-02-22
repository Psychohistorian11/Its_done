import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const count = searchParams.get("count") === "true";

    const session = await auth();

    console.log("session", session);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const userFound = await prismadb.user.findUnique({
      where: { email: session.user.email },
    });

    console.log("userFound: ", userFound);
    const userId = userFound!.id;

    if (!userFound) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (count) {
      const notificationCount = await prismadb.notification.count({
        where: { userId, read: false },
      });
      return NextResponse.json({ count: notificationCount });
    }

    const notifications = await prismadb.notification.findMany({
      where: { userId, read: false },

      orderBy: { createdAt: "desc" },
      include: {
        task: {
          select: {
            id: true,
            category: true,
            description: true,
          },
        },
      },
    });

    console.log("notifications", notifications);

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error getting notifications:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const notificationId = data.notificationId;
    console.log("notificationId", notificationId);

    if (!notificationId)
      return NextResponse.json(
        { error: "Id notifications not found. " },
        { status: 404 }
      );

    const response = await prismadb.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error("error pust notification ", error);
  }
}
