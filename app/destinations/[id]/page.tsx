"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Info, Star } from "lucide-react";

export default function DestinationPage() {
  const params = useParams();
  const [destination, setDestination] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`/api/destinations/${params.id}`);
        setDestination(response.data.destination);
        setNearbyPlaces(response.data.nearbyPlaces);
      } catch (error) {
        console.error("Error fetching destination:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchDestination();
    }
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{destination?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>{destination?.description}</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Nearby Places</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nearbyPlaces.map((place) => (
                <Card key={place.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{place.properties.name}</h3>
                    <p className="text-sm text-gray-600">
                      {place.properties.kinds.split(",")[0]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Plan Your Visit</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-4">Book Hotels</Button>
              <Button className="w-full mb-4" variant="outline">
                Find Activities
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}