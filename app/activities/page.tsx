"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Tag, Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const punjabActivities = [
  {
    id: "golden-temple-tour",
    name: "Golden Temple Guided Tour",
    location: "Amritsar",
    price: 1500,
    duration: "3 hours",
    image: "https://images.pexels.com/photos/2161936/pexels-photo-2161936.jpeg",
    category: "Religious",
    rating: 4.9,
    description: "Experience the spiritual atmosphere of the Golden Temple with a knowledgeable guide"
  },
  {
    id: "punjabi-cooking",
    name: "Traditional Punjabi Cooking Class",
    location: "Amritsar",
    price: 2500,
    duration: "4 hours",
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    category: "Cultural",
    rating: 4.8,
    description: "Learn to cook authentic Punjabi dishes from local experts"
  },
  {
    id: "rural-punjab",
    name: "Rural Punjab Village Tour",
    location: "Ludhiana",
    price: 3000,
    duration: "Full day",
    image: "https://images.pexels.com/photos/2389473/pexels-photo-2389473.jpeg",
    category: "Cultural",
    rating: 4.7,
    description: "Experience traditional Punjab village life and farming"
  },
  {
    id: "bhangra-class",
    name: "Bhangra Dance Workshop",
    location: "Jalandhar",
    price: 1000,
    duration: "2 hours",
    image: "https://images.pexels.com/photos/2228559/pexels-photo-2228559.jpeg",
    category: "Cultural",
    rating: 4.8,
    description: "Learn the energetic traditional dance of Punjab"
  }
];

export default function ActivitiesPage() {
  const [location, setLocation] = useState("");
  const [activities, setActivities] = useState(punjabActivities);

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Discover Punjab's Culture</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Immerse yourself in the vibrant culture, traditions, and experiences of Punjab.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Search by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="max-w-md"
        />
        <Button>Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="overflow-hidden">
            <div 
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${activity.image})` }}
            />
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{activity.name}</CardTitle>
                <Badge>{activity.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {activity.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {activity.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {activity.duration}
                  </div>
                </div>

                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(activity.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {activity.rating}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-bold text-lg">
                    {formatCurrency(activity.price, "INR")}
                  </div>
                  <Button>Book Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}