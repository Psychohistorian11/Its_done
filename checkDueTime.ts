import dayjs from "dayjs";
import prismadb from "./src/lib/prismadb";

async function checkDueTasks() {
  const now = dayjs().toISOString();

  const expiredTasks = await prismadb.task.findMany({
    where: {
      dueTime: { lt: now },
      itsDone: false,
    },
  });

  if (expiredTasks.length > 0) {
    const { notifyDueTimeExpired } = await import("./server");
    for (const task of expiredTasks) {
      const notification = await prismadb.notification.create({
        data: {
          message: `The task: ${
            task.title
          } due on date ${task.dueTime.toISOString()}`,
          userId: task.userId,
          taskId: task.id,
        },
      });

      await prismadb.task.update({
        where: { id: task.id },
        data: { itsDone: true },
      }); 

      notifyDueTimeExpired(notification, task);
    }
  }
}

setInterval(checkDueTasks, 15000);

console.log("🔎 Revisión de dueTime activa cada 30 segundos.");
