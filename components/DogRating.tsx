"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dog } from "@/lib/types";
import { useState } from "react";
import { DogCard } from "./DogCard";

interface DogRatingProps {
  dogs: Dog[];
  onRate: (dogId: string, rating: number) => void;
}

export function DogRating({ dogs, onRate }: DogRatingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [randomizedDogs] = useState(() =>
    [...dogs].sort(() => Math.random() - 0.5)
  );

  // Simulate loading state with cleanup
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  });

  const handleSwipe = (direction: number) => {
    const currentDog = randomizedDogs[currentIndex];
    if (currentDog) {
      onRate(currentDog.id, direction);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="relative w-full aspect-[4/5]">
          <Card className="p-4 md:p-6 w-full">
            <Skeleton className="aspect-square w-full mb-4 rounded-lg" />
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </Card>
        </div>
      </div>
    );
  }

  if (currentIndex >= randomizedDogs.length) {
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
        {/* Only show the current dog */}
        <DogCard
          key={randomizedDogs[currentIndex].id}
          dog={randomizedDogs[currentIndex]}
          onSwipe={handleSwipe}
        />
      </div>
    </div>
  );
}
