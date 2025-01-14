import { NextResponse } from 'next/server';
import { signIn, auth } from '@/auth';
import prismadb from '@/lib/prismadb';

export async function POST() {

    console.log("estoy en el POST")
    const session: any = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    const { name, email, image } = session.user;

    const userExists = await prismadb.user.findFirst({
      where: {
        OR: [{ username: name }, { email }],
      },
    });

    if (userExists) {
      console.log('Usuario existente');
      return NextResponse.json({ registered: true });
    }


    await prismadb.user.create({
      data: {
        username: name,
        email,
        ...(image && { image }),
      },
    });

    console.log('Usuario creado');
    return NextResponse.json({ registered: true });
 
}
