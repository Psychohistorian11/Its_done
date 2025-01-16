
import DashBoard from "@/components/dashboard";
import { auth } from "../../auth";

export default function DashBoardPage() {
    auth().then((res) => {

    })
    
    return (
        <div>
            DashboardPage
        </div>
    )
}