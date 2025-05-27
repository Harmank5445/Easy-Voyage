"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Star, MapPin, Wifi, Coffee, Utensils, Car } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const punjabHotels = [
  {
    id: "taj-amritsar",
    name: "Taj Amritsar",
    location: "Amritsar",
    price: 8500,
    rating: 4.8,
    image: "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg",
    amenities: ["Free WiFi", "Restaurant", "Spa", "Parking"],
    description: "Luxury hotel near Golden Temple"
  },
  {
    id: "hyatt-ludhiana",
    name: "Hyatt Regency",
    location: "Ludhiana",
    price: 7500,
    rating: 4.7,
    image: "https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg",
    amenities: ["Pool", "Restaurant", "Gym", "Parking"],
    description: "Modern luxury in the heart of Ludhiana"
  },
  {
    id: "radisson-jalandhar",
    name: "Radisson Jalandhar",
    location: "Jalandhar",
    price: 6500,
    rating: 4.6,
    image: "https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg",
    amenities: ["Free WiFi", "Restaurant", "Business Center", "Spa"],
    description: "Premium hotel with modern amenities"
  }
];

export default function HotelsPage() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [hotels, setHotels] = useState(punjabHotels);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Free WiFi":
        return <Wifi className="h-4 w-4" />;
      case "Restaurant":
        return <Utensils className="h-4 w-4" />;
      case "Parking":
        return <Car className="h-4 w-4" />;
      default:
        return <Coffee className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Hotels in Punjab</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience traditional Punjabi hospitality with modern luxury.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Input
          placeholder="Search location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <DatePicker
          selected={checkIn}
          onChange={setCheckIn}
          placeholderText="Check-in"
        />
        <DatePicker
          selected={checkOut}
          onChange={setCheckOut}
          placeholderText="Check-out"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden">
            <div 
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${hotel.image})` }}
            />
            <CardHeader>
              <CardTitle>{hotel.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {hotel.location}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(hotel.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {hotel.rating}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center text-sm bg-muted px-2 py-1 rounded"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="ml-1">{amenity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold">
                    {formatCurrency(hotel.price, "INR")}
                  </span>
                  <span className="text-sm text-muted-foreground"> / night</span>
                </div>
                <Button>Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}