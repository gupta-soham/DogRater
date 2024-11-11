const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();
const wss = new WebSocket.Server({
  server,
  // Enable CORS for all origins in development
  // In production, specify your frontend domain
  cors: {
    origin: process.env.FRONTEND_URL || "*",
  },
});

const messages = [];
const MESSAGES_LIMIT = 20;

// Basic rate limiting
const rateLimiter = new Map();
const RATE_LIMIT = 5; // messages
const RATE_WINDOW = 30000; // 30 seconds

function isRateLimited(userId) {
  const now = Date.now();
  const userRateLimit = rateLimiter.get(userId) || { count: 0, timestamp: now };

  if (now - userRateLimit.timestamp > RATE_WINDOW) {
    userRateLimit.count = 1;
    userRateLimit.timestamp = now;
  } else if (userRateLimit.count >= RATE_LIMIT) {
    return true;
  } else {
    userRateLimit.count++;
  }

  rateLimiter.set(userId, userRateLimit);
  return false;
}

wss.on("connection", (ws) => {
  console.log("New client connected");

  // Send existing messages to new client
  ws.send(JSON.stringify({ type: "history", messages }));

  ws.on("message", (data) => {
    try {
      const message = JSON.parse(data);

      if (message.type === "chat" && message.user && message.content) {
        // Rate limiting check
        if (isRateLimited(message.user)) {
          ws.send(
            JSON.stringify({
              type: "error",
              message:
                "Rate limit exceeded. Please wait before sending more messages.",
            })
          );
          return;
        }

        const newMessage = {
          id: Date.now(),
          user: message.user.slice(0, 20), // Limit username length
          content: message.content.slice(0, 225), // Limit message length
          timestamp: new Date().toLocaleTimeString(),
        };

        messages.push(newMessage);
        if (messages.length > MESSAGES_LIMIT) {
          messages.shift();
        }

        // Broadcast to all clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({ type: "message", message: newMessage })
            );
          }
        });
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
