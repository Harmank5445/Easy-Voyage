"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";

interface Experience {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
  category: string;
}

const experiences: Experience[] = [
  {
    id: "paris-louvre",
    title: "Skip-the-Line Louvre Museum Tour",
    location: "Paris, France",
    price: 69,
    duration: "3 hours",
    rating: 4.8,
    image: "https://images.pexels.com/photos/3214989/pexels-photo-3214989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "cultural",
  },
  {
    id: "bali-volcano",
    title: "Mount Batur Sunrise Trekking",
    location: "Bali, Indonesia",
    price: 45,
    duration: "10 hours",
    rating: 4.9,
    image: "https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "adventure",
  },
  {
    id: "santorini-cruise",
    title: "Sunset Catamaran Cruise",
    location: "Santorini, Greece",
    price: 95,
    duration: "5 hours",
    rating: 4.9,
    image: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "relaxation",
  },
  {
    id: "tokyo-food",
    title: "Tokyo Street Food Night Tour",
    location: "Tokyo, Japan",
    price: 75,
    duration: "3 hours",
    rating: 4.7,
    image: "https://images.pexels.com/photos/161154/tokyo-japan-temple-landmark-161154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "food",
  },
  {
    id: "nyc-helicopter",
    title: "Manhattan Helicopter Tour",
    location: "New York, USA",
    price: 219,
    duration: "30 minutes",
    rating: 4.8,
    image: "https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "sightseeing",
  },
  {
    id: "swiss-paragliding",
    title: "Paragliding in the Swiss Alps",
    location: "Interlaken, Switzerland",
    price: 175,
    duration: "2 hours",
    rating: 4.9,
    image: "https://images.pexels.com/photos/144361/pexels-photo-144361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "adventure",
  },
];

const categories = [
  { id: "all", label: "All Experiences" },
  { id: "adventure", label: "Adventure" },
  { id: "cultural", label: "Cultural" },
  { id: "food", label: "Food & Drink" },
  { id: "relaxation", label: "Relaxation" },
  { id: "sightseeing", label: "Sightseeing" },
];

export function TravelExperiences() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredExperiences, setFilteredExperiences] = useState(experiences);

  useEffect(() => {
    setFilteredExperiences(
      selectedCategory === "all"
        ? experiences
        : experiences.filter((exp) => exp.category === selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Unforgettable Experiences</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover unique activities and tours that will make your trip truly memorable. From adrenaline-pumping adventures to cultural immersions.
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedCategory}>
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filteredExperiences.map((experience) => (
                  <Card key={experience.id} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="relative h-48">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${experience.image})` }}
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{experience.duration}</Badge>
                        <div className="flex items-center text-yellow-500">
                          <span className="text-sm font-medium">★ {experience.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{experience.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{experience.location}</p>
                      <div className="flex justify-between items-center">
                        <div className="font-medium">
                          {formatCurrency(experience.price)}
                          <span className="text-muted-foreground text-sm"> / person</span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/activities/${experience.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link href="/activities">Explore All Experiences</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}