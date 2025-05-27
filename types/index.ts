export interface User {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  createdAt?: Date;
}

export interface Destination {
  _id?: string;
  name: string;
  country: string;
  description: string;
  image: string;
  highlights: string[];
  bestTimeToVisit: string[];
}

export interface Activity {
  _id?: string;
  name: string;
  description: string;
  location: string;
  price: number;
  duration: string;
  image: string;
  tags: string[];
  rating?: number;
}

export interface Hotel {
  _id?: string;
  name: string;
  location: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
  rating?: number;
}

export interface ItineraryDay {
  day: number;
  activities: Activity[];
  accommodation: Hotel | null;
  notes?: string;
}

export interface Itinerary {
  _id?: string;
  userId: string;
  name: string;
  destination: string | Destination;
  startDate: Date;
  endDate: Date;
  days: ItineraryDay[];
  budget: number;
  totalCost?: number;
  createdAt?: Date;
  isShared?: boolean;
  collaborators?: string[];
}

export type TravelPreference = 
  | 'adventure' 
  | 'relaxation' 
  | 'culture' 
  | 'food' 
  | 'nature' 
  | 'budget' 
  | 'luxury';

export type TravelerType = 
  | 'solo' 
  | 'couple' 
  | 'family' 
  | 'friends' 
  | 'business';