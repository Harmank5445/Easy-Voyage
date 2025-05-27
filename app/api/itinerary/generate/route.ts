import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      destination,
      startDate,
      endDate,
      travelers,
      travelerType,
      budget,
      preferences,
      additionalInfo,
    } = body;

    if (!destination || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Construct prompt for OpenAI
    const prompt = `
Generate a detailed ${travelerType} travel itinerary for ${travelers} traveler(s) to ${destination} from ${startDate} to ${endDate}.
Budget per person: $${budget}.
Preferences: ${preferences.join(", ")}.
Additional info: ${additionalInfo || "None"}.
Provide day-wise activities, accommodations, and estimated costs.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful travel assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1500,
    });

    const itineraryText = completion.choices[0].message.content;

    return NextResponse.json({ itinerary: itineraryText });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate itinerary" },
      { status: 500 }
    );
  }
}
