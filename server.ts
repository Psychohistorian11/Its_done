import { createServer } from "http";
import { WebSocketServer } from "ws";

const server = createServer();
const wss = new WebSocketServer({ server });

const clients = new Set<WebSocket>();

wss.on("connection", (ws: any) => {
  clients.add(ws);
  console.log("Client connected. Total clients:", clients.size);

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected. Total clients:", clients.size);
  });
});

// Función para enviar notificaciones a todos los clientes
export function broadcastMessage(message: any) {
  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

server.listen(3001, () => {
  console.log("WebSocket server running on ws://localhost:3001");
});
