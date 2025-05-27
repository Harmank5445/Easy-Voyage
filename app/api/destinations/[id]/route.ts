import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get destination details from OpenTripMap API
    const response = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/xid/${params.id}?apikey=${process.env.OPENTRIPMAP_API_KEY}`
    );

    // Get nearby places
    const { lat, lon } = response.data.point;
    const nearbyPlaces = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&kinds=interesting_places&apikey=${process.env.OPENTRIPMAP_API_KEY}`
    );

    return NextResponse.json({
      destination: response.data,
      nearbyPlaces: nearbyPlaces.data.features
    });
  } catch (error) {
    console.error("Error fetching destination:", error);
    return NextResponse.json(
      { error: "Failed to fetch destination" },
      { status: 500 }
    );
  }
}