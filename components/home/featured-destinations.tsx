"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  tag: string;
  rating: number;
}

const destinations: Destination[] = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tag: "Cultural",
    rating: 4.8,
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: "https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tag: "Beach",
    rating: 4.7,
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    image: "https://images.pexels.com/photos/1010641/pexels-photo-1010641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tag: "Island",
    rating: 4.9,
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    image: "https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tag: "City",
    rating: 4.8,
  },
  {
    id: "new-york",
    name: "New York",
    country: "USA",
    image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tag: "Urban",
    rating: 4.6,
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tag: "Adventure",
    rating: 4.9,
  },
];

// Available filters for destinations
const filters = [
  { id: "all", label: "All" },
  { id: "beach", label: "Beach" },
  { id: "city", label: "City" },
  { id: "culture", label: "Cultural" },
  { id: "adventure", label: "Adventure" },
  { id: "island", label: "Island" },
];

export function FeaturedDestinations() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredDestinations = 
    activeFilter === "all" 
      ? destinations 
      : destinations.filter(d => d.tag.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our handpicked destinations for your next adventure. From pristine beaches to vibrant cities, find your perfect getaway.
            </p>
          </div>
          <Link href="/destinations" className="hidden md:flex items-center text-primary font-medium mt-4 md:mt-0 hover:text-primary/90 transition-colors">
            View all destinations
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className="rounded-full"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Destinations grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <Link 
              href={`/destinations/${destination.id}`} 
              key={destination.id}
              className="group block"
            >
              <div className="rounded-xl overflow-hidden h-80 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${destination.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary" className="backdrop-blur-sm bg-white/20">
                      {destination.tag}
                    </Badge>
                    <div className="flex items-center text-yellow-300 text-sm font-medium">
                      <span className="mr-1">★</span>
                      {destination.rating}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                  <p className="text-white/80">{destination.country}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline">
            <Link href="/destinations" className="flex items-center">
              View all destinations
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}