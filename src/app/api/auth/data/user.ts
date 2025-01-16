import prismadb from '@/lib/prismadb';

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