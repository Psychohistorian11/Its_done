import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const getUserById = async (id: string) => {
    try{
        const user = await prismadb.user.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        return user
    } catch (err){
        console.log(err)
        return null
        
    }
}

export async function GET(){
    try{
        const session = await auth()
        return NextResponse.json(session!.user!)
    } catch (err){
        console.log(err)
        return null
    }
}