export type Property = {
  id: string;
  title: string;
  locality: string;
  city: string;
  price: number;
  rent?: number;
  beds: number;
  baths: number;
  area: number;
  type: "Apartment" | "Villa" | "Penthouse";
  image: string;
  imageAlt: string;
  tags: string[];
  score: number;
  commute: number;
  verified: boolean;
  coordinates: [number, number];
};

export type Neighborhood = {
  id: string;
  name: string;
  city: string;
  averagePrice: number;
  averageRent: number;
  growth: number;
  demand: "High" | "Very high" | "Moderate";
  score: number;
  color: string;
  position: { left: string; top: string };
  summary: string;
  tags: string[];
};

