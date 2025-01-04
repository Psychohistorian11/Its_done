import { auth } from "@/auth";
import DashBoard from "@/components/dashboard";

export default async function DashBoardPage() {
    const session = await auth()
    console.log("estamos here", session)
    if(!session) return <div>here not</div>

    return <div>
        <DashBoard/>
    </div>
}