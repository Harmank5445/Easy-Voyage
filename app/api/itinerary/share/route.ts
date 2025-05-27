import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { itineraryId, email } = await req.json();
    
    const client = await clientPromise;
    const db = client.db("easyvoyage");
    
    const result = await db.collection("itineraries").updateOne(
      { _id: itineraryId },
      { 
        $set: { isShared: true },
        $addToSet: { sharedWith: email }
      }
    );
    
    return NextResponse.json({ message: "Itinerary shared successfully" });
  } catch (error) {
    console.error("Error sharing itinerary:", error);
    return NextResponse.json(
      { error: "Failed to share itinerary" },
      { status: 500 }
    );
  }
}