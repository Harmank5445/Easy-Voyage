import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  if (!location) {
    return NextResponse.json(
      { error: "Location is required" },
      { status: 400 }
    );
  }

  try {
    // First get location coordinates
    const geocodeResponse = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${process.env.OPENCAGE_API_KEY}`
    );

    const { lat, lng } = geocodeResponse.data.results[0].geometry;

    // Get hotels from Hotels API
    const response = await axios.get(
      `https://hotels-com-provider.p.rapidapi.com/v2/hotels/search`,
      {
        params: {
          latitude: lat,
          longitude: lng,
          locale: 'en_US',
          currency: 'USD',
          sort_order: 'STAR_RATING_HIGHEST_FIRST',
          checkout_date: checkOut || '2024-05-15',
          checkin_date: checkIn || '2024-05-14',
          adults_number: '2',
          region_id: geocodeResponse.data.results[0].components.country_code || 'IN'
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
      }
    );

    // Process and format hotel data
    const hotels = response.data.properties.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      address: hotel.address.fullAddress,
      price: hotel.price.lead.amount,
      image: hotel.propertyImage?.image?.url || null,
      rating: hotel.star,
      amenities: hotel.amenities || [],
      coordinates: {
        latitude: hotel.coordinates.latitude,
        longitude: hotel.coordinates.longitude
      }
    }));

    return NextResponse.json({ hotels });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json(
      { error: "Failed to fetch hotels" },
      { status: 500 }
    );
  }
}