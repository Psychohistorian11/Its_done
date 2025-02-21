import { AppNotification } from "@/interfaces/notification";
import { Scroll } from "lucide-react";
import { useEffect, useState } from "react";

export function NotificationListDemo() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notification?count=${false}`);

        if (!response.ok) {
          console.error("Error fetching notifications");
          return;
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleTaskClick = async (notification: AppNotification) => {
    try {
      const response = await fetch(`/api/notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId: notification.id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Notification updated", data.response);
        setNotifications((prev) =>
          prev.filter((n) => n.id !== data.response.id)
        );
      }
    } catch (error) {
      console.error("Error updating notification", error);
    }
    console.log("Redirigiendo a la tarea con ID:", notification.task!.id);
  };

  return (
    <div className="w-full shadow-md">
      <div className="p-4 border-b font-semibold text-lg text-white">
        Notifications
      </div>
      <div className="divide-y">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start p-4 gap-3 ${
                notification.task ? "cursor-pointer " : ""
              }`}
              onClick={() => notification.task && handleTaskClick(notification)}
            >
              {/* Ícono de la tarea si existe */}
              {notification.task?.category ? (
                <div
                  className="w-10 h-10 flex items-center justify-center text-xl font-semibold rounded-full"
                  style={{ backgroundColor: notification.task.category!.color }}
                >
                  {notification.task.category!.icon}
                </div>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center text-xl font-semibold rounded-full bg-primary">
                  <Scroll className="text-white" />
                </div>
              )}

              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {notification.message}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>

                {/* Información de la tarea si existe */}
                {notification.task && (
                  <div className="mt-2 p-2  rounded-md bg-primary">
                    <p className="text-sm font-semibold text-white">
                      {notification.task.category &&
                        notification.task.category!.name}
                    </p>
                    <p className="text-xs text-gray-400 ">
                      {notification.task.description || "No description"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center p-4">
            There is no notification
          </p>
        )}
      </div>
    </div>
  );
}
