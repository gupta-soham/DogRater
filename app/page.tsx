"use client";

import { Chat } from "@/components/Chat";
import { DogRating } from "@/components/DogRating";
import { Leaderboard } from "@/components/Leaderboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dog } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [username] = useState(`User${Math.floor(Math.random() * 1000)}`);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    try {
      const response = await axios.get("/api/dogs");
      setDogs(response.data);
      toast.success("Dogs fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch dogs. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async (dogId: string, rating: number) => {
    try {
      const response = await axios.post(`/api/dogs/rate`, { rating, dogId });

      setDogs((prev) =>
        prev.map((dog) =>
          dog.id === dogId ? { ...dog, rating: response.data.rating } : dog
        )
      );
    } catch (error) {
      toast.error("Failed to submit rating. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="max-w-md mx-auto h-screen flex flex-col p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Rate My Dog</h1>

        <Tabs defaultValue="rate" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rate">Rate</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="rate" className="h-full">
              <DogRating dogs={dogs} onRate={handleRate} />
            </TabsContent>

            <TabsContent value="leaderboard" className="h-full">
              <Leaderboard dogs={dogs} />
            </TabsContent>

            <TabsContent value="chat" className="h-full">
              <Chat username={username} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
