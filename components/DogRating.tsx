"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DogCard } from "./DogCard";
import { Dog } from "@/lib/types";

interface DogRatingProps {
  dogs: Dog[];
  onRate: (dogId: string, rating: number) => void;
}

export function DogRating({ dogs, onRate }: DogRatingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: number) => {
    if (currentIndex < dogs.length) {
      onRate(dogs[currentIndex].id, direction);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 200);
    }
  };

  if (currentIndex >= dogs.length) {
    return (
      <Card className="h-full flex flex-col items-center justify-center p-6">
        <h3 className="text-xl font-semibold">No more dogs to rate!</h3>
        <Button className="mt-4" onClick={() => setCurrentIndex(0)}>
          Start Over
        </Button>
      </Card>
    );
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative w-full aspect-[4/5]">
        {dogs
          .slice(currentIndex, currentIndex + 3)
          .map((dog) => (
            <DogCard key={dog.id} dog={dog} onSwipe={handleSwipe} />
          ))
          .reverse()}
      </div>
    </div>
  );
}
