import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location');

  if (!location) {
    return NextResponse.json(
      { error: "Location is required" },
      { status: 400 }
    );
  }

  try {
    // First get location coordinates
    const geoResponse = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/geoname`,
      {
        params: {
          name: location,
          apikey: process.env.OPENTRIPMAP_API_KEY
        }
      }
    );

    const { lat, lon } = geoResponse.data;

    // Get nearby places
    const placesResponse = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/radius`,
      {
        params: {
          radius: 5000,
          lon,
          lat,
          rate: 3, // Only places with rating 3 or higher
          format: 'json',
          limit: 50,
          apikey: process.env.OPENTRIPMAP_API_KEY
        }
      }
    );

    return NextResponse.json(placesResponse.data);
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    return NextResponse.json(
      { error: "Failed to fetch nearby places" },
      { status: 500 }
    );
  }
}