export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    
    const client = await clientPromise;
    const db = client.db("easyvoyage");
    
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10);
    
    // Create user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });
    
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}