import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");

  if (!location) {
    return NextResponse.json(
      { error: "Location is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/geoname`,
      {
        params: {
          name: location,
          apikey: process.env.OPENTRIPMAP_API_KEY
        }
      }
    );

    const { lat, lon } = response.data;

    // Get activities and attractions
    const activities = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/radius`,
      {
        params: {
          radius: 5000,
          lon: lon,
          lat: lat,
          kinds: 'cultural,historic,natural,architecture',
          apikey: process.env.OPENTRIPMAP_API_KEY
        }
      }
    );

    return NextResponse.json(activities.data);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}