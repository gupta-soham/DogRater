export interface Dog {
  id: string;
  breed: string;
  lifeExpectancy: number;
  country: string;
  image: string;
  rating: number;
}

export interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: string;
}

export type Country = "ALL" | "Germany" | "Japan" | "United States" | "Russia" | "United Kingdom" | "Scotland" | "Wales";