import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const itineraryId = searchParams.get('id');
    
    const client = await clientPromise;
    const db = client.db("easyvoyage");
    
    const itinerary = await db.collection("itineraries").findOne(
      { _id: itineraryId }
    );
    
    // Format itinerary for export
    const exportData = {
      ...itinerary,
      exportedAt: new Date(),
      format: "pdf" // or any other format
    };
    
    return NextResponse.json(exportData);
  } catch (error) {
    console.error("Error exporting itinerary:", error);
    return NextResponse.json(
      { error: "Failed to export itinerary" },
      { status: 500 }
    );
  }
}