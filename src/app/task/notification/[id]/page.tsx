"use client";

import { NotificationListDemo } from "@/components/notification/notification-list";
import { useParams } from "next/navigation";

export default function NotificationPage() {
  const { id } = useParams();
  console.log("date: ", id);

  return (
    <div>
      <NotificationListDemo />
    </div>
  );
}
