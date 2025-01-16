import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import { prisma } from '../../../../../prisma/prisma';

export async function POST() {

    const session: any = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    const { name, email, image } = session.user;

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ username: name }, { email }],
      },
    });

    if (userExists) {
      console.log('Usuario existente');
      return NextResponse.json({ registered: true });
    }


    await prisma.user.create({
      data: {
        username: name,
        email,
        ...(image && { image }),
      },
    });

    console.log('Usuario creado');
    return NextResponse.json({ registered: true });
 
}
