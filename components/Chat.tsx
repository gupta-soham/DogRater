"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Message } from "@/lib/types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ChatProps {
  username: string;
}

export function Chat({ username }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connectionError, setConnectionError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (!wsUrl) {
      console.error("WebSocket URL is not defined");
      setConnectionError(true);
      return;
    }
    const socket = new WebSocket(
      `${wsUrl}?user-agent=${encodeURIComponent(navigator.userAgent)}`
    );

    socket.onopen = () => {
      console.log("Connected to WebSocket");
      setConnectionError(false);
      // Simulate loading state
      setTimeout(() => setIsLoading(false), 1000);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "history") {
        setMessages(data.messages);
      } else if (data.type === "message") {
        setMessages((prev) => [...prev, data.message]);
      } else if (data.type === "error") {
        toast.error(data.message);
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket");
      setConnectionError(true);
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (wsUrl) {
          setWs(new WebSocket(wsUrl));
        } else {
          console.error("WebSocket URL is not defined");
          setConnectionError(true);
        }
      }, 5000);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !ws) return;

    ws.send(
      JSON.stringify({
        type: "chat",
        user: username,
        content: newMessage,
      })
    );

    setNewMessage("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (connectionError) {
        toast.error("The WebSocket Server is down! 😔 ", {
          duration: 10000,
        });
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [connectionError]);

  return (
    <Card className="h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] flex flex-col">
      {connectionError && (
        <div className="bg-destructive/10 text-destructive px-4 py-2 text-sm shrink-0">
          Connection lost. Attempting to reconnect...
        </div>
      )}
      <ScrollArea className="flex-1 p-4">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-16 w-[200px] rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.user === username ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${message.user}`}
                    alt={message.user}
                  />
                </Avatar>
                <div
                  className={`rounded-lg p-3 max-w-[80%] break-words ${
                    message.user === username
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm font-medium">{message.user}</p>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-70">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t shrink-0">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            maxLength={500}
            disabled={connectionError || isLoading}
          />
          <Button
            type="submit"
            className="px-3 md:px-4"
            disabled={connectionError || isLoading}
          >
            <Send className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Send</span>
          </Button>
        </div>
      </form>
    </Card>
  );
}
