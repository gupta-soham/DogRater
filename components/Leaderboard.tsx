"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Country, Dog } from "@/lib/types";
import { Award, Medal, ThumbsDown, Trophy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const COUNTRIES: Country[] = [
  "ALL",
  "Germany",
  "Japan",
  "United States",
  "Russia",
  "United Kingdom",
  "Scotland",
  "Wales",
];

const RankBadge = ({ rank }: { rank: number | "last" }) => {
  const badges = {
    1: { icon: Trophy, color: "bg-yellow-500", label: "1st" },
    2: { icon: Medal, color: "bg-gray-400", label: "2nd" },
    3: { icon: Award, color: "bg-amber-600", label: "3rd" },
    last: { icon: ThumbsDown, color: "bg-red-500", label: "Last" },
  };

  const BadgeIcon =
    rank === "last" ? badges.last.icon : badges[rank as 1 | 2 | 3].icon;
  const badgeColor =
    rank === "last" ? badges.last.color : badges[rank as 1 | 2 | 3].color;
  const label =
    rank === "last" ? badges.last.label : badges[rank as 1 | 2 | 3].label;

  return (
    <Badge variant="secondary" className={`${badgeColor} gap-1 ml-2 text-xs`}>
      <BadgeIcon className="h-3 w-3" />
      {label}
    </Badge>
  );
};

interface LeaderboardProps {
  dogs: Dog[];
}

export function Leaderboard({ dogs }: LeaderboardProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredDogs = dogs
    .filter((dog) =>
      selectedCountry === "ALL" ? true : dog.country === selectedCountry
    )
    .sort((a, b) => b.rating - a.rating);

  const getDogRank = (index: number, total: number) => {
    if (index < 3) return index + 1;
    if (index === total - 1 && total > 3) return "last";
    return null;
  };

  return (
    <Card className="h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b gap-4 sm:gap-2">
        <h2 className="text-xl sm:text-2xl font-bold">Leaderboard</h2>
        <Select
          value={selectedCountry}
          onValueChange={(value) => setSelectedCountry(value as Country)}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                >
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-grow space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="flex-shrink-0 space-y-1">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              ))
            : filteredDogs.map((dog, index, array) => {
                const rank = getDogRank(index, array.length);

                return (
                  <div
                    key={dog.id}
                    className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-semibold text-muted-foreground">
                      {index + 1}
                    </div>

                    <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={dog.image}
                        alt={dog.breed}
                        className="w-full h-full object-cover"
                        width={40}
                        height={40}
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold truncate">{dog.breed}</h3>
                        {rank && <RankBadge rank={rank} />}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                        <Badge variant="outline" className="font-normal">
                          {dog.country}
                        </Badge>
                        <span className="truncate">
                          {dog.lifeExpectancy} years
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right ml-auto">
                      <div className="text-lg font-bold tabular-nums">
                        {(dog.rating ?? 0) > 0 ? "+" : ""}
                        {(dog.rating ?? 0).toFixed(1)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Rating
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </ScrollArea>
    </Card>
  );
}
