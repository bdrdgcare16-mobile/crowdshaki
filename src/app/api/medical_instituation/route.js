import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/database';

export const GET = async (req) => {
  try {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    const labs = await db.collection("medicalInstitutions").find().toArray();
    return NextResponse.json({ labs });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    const medicalInstitutions = await db.collection("medicalInstitutions").insertOne(data);
    return NextResponse.json({ message: "POST method handled", data });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
};



// import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/app/lib/database";

// console.log("🏥 MEDICAL INSTITUTIONS API ROUTE LOADED!");

// export async function GET(request) {
//   console.log("📥 GET request received");
//   try {
//     const client = await connectToDatabase();
//     const db = client.db("crowdshaki");
//     const institutions = await db.collection("medicalInstitutions").find().toArray();
    
//     return NextResponse.json({ 
//       success: true,
//       institutions 
//     });
//   } catch (error) {
//     console.error("❌ GET Error:", error);
//     return NextResponse.json({ 
//       success: false,
//       error: error.message 
//     }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   console.log("📥 ========== API REQUEST START ==========");
  
//   try {
//     console.log("📥 Received medical institution registration request");
    
//     // Parse request body
//     let body;
//     try {
//       body = await request.json();
//       console.log("✅ Request body parsed successfully");
//       console.log("📊 Data fields received:", Object.keys(body).length);
//     } catch (parseError) {
//       console.error("❌ Failed to parse request body:", parseError.message);
//       return NextResponse.json({
//         success: false,
//         error: "Invalid JSON in request body",
//       }, { status: 400 });
//     }
    
//     // Connect to MongoDB
//     console.log("🔌 Connecting to MongoDB...");
//     const client = await connectToDatabase();
//     const db = client.db("crowdshaki");
//     const collection = db.collection("medicalInstitutions");
//     console.log("✅ MongoDB connected");
    
//     // Insert data
//     console.log("💾 Inserting data into database...");
//     const result = await collection.insertOne({
//       ...body,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });
    
//     console.log("✅ Medical institution registered successfully!");
//     console.log("📊 Inserted ID:", result.insertedId);
//     console.log("📥 ========== API REQUEST END ==========");
    
//     // Return success response
//     return NextResponse.json({
//       success: true,
//       message: "Medical institution registered successfully",
//       id: result.insertedId.toString(),
//     }, { 
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
    
//   } catch (error) {
//     console.error("❌ ========== API ERROR ==========");
//     console.error("❌ Error type:", error.name);
//     console.error("❌ Error message:", error.message);
//     console.error("❌ Error stack:", error.stack);
//     console.error("❌ ========================================");
    
//     // Always return JSON response even on error
//     return NextResponse.json({
//       success: false,
//       error: error.message || "Failed to register medical institution",
//       errorType: error.name || "Unknown",
//     }, { 
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//   }
// }
