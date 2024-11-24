"use client";

import { Card } from "@/components/ui/card";
import { Dog } from "@/lib/types";
import confetti from "canvas-confetti";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface DogCardProps {
  dog: Dog;
  onSwipe: (direction: number) => void;
}

export function DogCard({ dog, onSwipe }: DogCardProps) {
  const [exitX, setExitX] = useState<number>(0);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0, 1, 1, 1, 0]);

  // Like and Dislike Sound Effects
  const [likeSound, setLikeSound] = useState<HTMLAudioElement | null>(null);
  const [dislikeSound, setDislikeSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload sounds
    const like = new Audio("/sounds/like.wav");
    const dislike = new Audio("/sounds/dislike.wav");

    // Optional: Preload audio
    like.preload = "auto";
    dislike.preload = "auto";

    setLikeSound(like);
    setDislikeSound(dislike);

    return () => {
      like.remove();
      dislike.remove();
    };
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.6 },
      disableForReducedMotion: true,
    });
  };

  const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x > 100) {
      setExitX(200);
      likeSound?.play().catch(() => {});
      triggerConfetti();
      onSwipe(1);
    } else if (info.offset.x < -100) {
      setExitX(-200);
      dislikeSound?.play().catch(() => {});
      onSwipe(-1);
    }
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        position: "absolute",
        width: "100%",
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="p-4 md:p-6 cursor-grab active:cursor-grabbing">
        <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
          <Image
            src={dog.image}
            alt={dog.breed}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
          />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold">{dog.breed}</h2>
        <p className="text-muted-foreground">
          Life Expectancy: {dog.lifeExpectancy} years
        </p>
        <p className="text-muted-foreground">Origin: {dog.country}</p>

        <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12 pointer-events-none">
          <motion.div
            className="bg-destructive/80 text-destructive-foreground font-bold text-lg md:text-xl p-2 rounded-md"
            style={{ opacity: useTransform(x, [0, -100], [0, 1]) }}
          >
            NOPE
          </motion.div>
          <motion.div
            className="bg-green-500/80 text-white font-bold text-lg md:text-xl p-2 rounded-md"
            style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
          >
            LIKE
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
