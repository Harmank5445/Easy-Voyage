"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: "golden-temple",
    name: "Golden Temple",
    city: "Amritsar",
    image: "https://images.pexels.com/photos/2161936/pexels-photo-2161936.jpeg",
    description: "The holiest Gurdwara of Sikhism, known for its stunning golden architecture",
    tags: ["Religious", "Historical"]
  },
  {
    id: "jallianwala-bagh",
    name: "Jallianwala Bagh",
    city: "Amritsar",
    image: "https://images.pexels.com/photos/18869798/pexels-photo-18869798.jpeg",
    description: "Historic garden and memorial of national importance",
    tags: ["Historical", "Memorial"]
  },
  {
    id: "wagah-border",
    name: "Wagah Border",
    city: "Amritsar",
    image: "https://images.pexels.com/photos/2387866/pexels-photo-2387866.jpeg",
    description: "Famous border ceremony between India and Pakistan",
    tags: ["Patriotic", "Cultural"]
  },
  {
    id: "kapurthala-palace",
    name: "Jagatjit Palace",
    city: "Kapurthala",
    image: "https://images.pexels.com/photos/3689859/pexels-photo-3689859.jpeg",
    description: "French-style palace showcasing royal heritage",
    tags: ["Heritage", "Architecture"]
  },
  {
    id: "qila-mubarak",
    name: "Qila Mubarak",
    city: "Patiala",
    image: "https://images.pexels.com/photos/6143369/pexels-photo-6143369.jpeg",
    description: "Historic fort complex with Mughal and Rajput architecture",
    tags: ["Heritage", "Fort"]
  },
  {
    id: "virasat-e-khalsa",
    name: "Virasat-e-Khalsa",
    city: "Anandpur Sahib",
    image: "https://images.pexels.com/photos/6175334/pexels-photo-6175334.jpeg",
    description: "Museum celebrating Sikh heritage and culture",
    tags: ["Cultural", "Museum"]
  }
];

export default function DestinationsPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Explore Punjab</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the rich cultural heritage, historical landmarks, and spiritual destinations of Punjab.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Link href={`/destinations/${destination.id}`} key={destination.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${destination.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                  <p className="text-white/90 text-sm mb-2">{destination.city}</p>
                  <div className="flex gap-2">
                    {destination.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/20 text-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-muted-foreground">{destination.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}