import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb'

export async function POST(request: NextRequest){
    const data = await request.json()
    console.log("data front: ", data)

    const usernameFound = await prismadb.user.findUnique({
        where: {
            username: data.username
        }
    })
    if(usernameFound){
        return NextResponse.json({
            message: "username already exist"
        }, 
        {
            status: 400
        })
    }

    const emailFound = await prismadb.user.findUnique({
        where: {
            email: data.email
        }
    })

    if(emailFound){
        return NextResponse.json({
            message: "email already exist"
        },{
            status: 400
        })
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = await prismadb.user.create({
        data : {
            username: data.username,
            email: data.email,
            password: hashedPassword,
            ...(data.image && { image: data.image })
        }
    })

    const {password: _, ...user} = newUser

    return NextResponse.json(user)
}