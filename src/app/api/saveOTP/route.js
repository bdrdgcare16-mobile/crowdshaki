// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '../../lib/database';


// export const GET = async (req) => {
//   try {
//     const client = await connectToDatabase();
//     const db = client.db("crowdshaki");
//     const labs = await db.collection("OTP").find().toArray();
//     return NextResponse.json({ labs });
//   } catch (error) {
//     return NextResponse.json({ status: 500, error: "Internal Server Error" });
//   }
// };

// export const POST = async (req) => {
//   try {
//     const data = await req.json();
//     console.log(data)
//     const client = await connectToDatabase();
//     const db = client.db("crowdshaki");
//     const labs = await db.collection("OTP").insertOne(data);
//     return NextResponse.json({ message: "Labs added succesfully", data });
//   } catch (error) {
//     return NextResponse.json({ status: 500, error: "Internal Server Error" });
//   }
// };




import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/database';

export const GET = async (req) => {
  try {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    const labs = await db.collection("OTP").find().toArray();
    return NextResponse.json({ labs });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    console.log("📝 Received data:", data);
    
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    
    // Save OTP to database
    const labs = await db.collection("OTP").insertOne(data);
    console.log("💾 OTP saved to database");

    // 🔥 NEW: Send SMS if phone number is provided
    if (data.phone && data.otp) {
      console.log(`📱 Sending SMS to ${data.phone}...`);
      
      try {
        // Your Fast2SMS API Key
        const apiKey = "UR3nUMJd70Pop2IDKBqVjEcORcZQZ1D0TgsfhDJPFLYmdES8XjqUihFSzSmB";
        
        // Clean phone number
        const cleanPhone = data.phone.toString().replace(/^\+91/, "").replace(/\s+/g, "").trim();
        
        // Validate phone
        if (!/^\d{10}$/.test(cleanPhone)) {
          console.error("❌ Invalid phone number:", cleanPhone);
          return NextResponse.json({ 
            message: "OTP saved but SMS failed - Invalid phone number", 
            data,
            smsStatus: "failed" 
          });
        }

        // Create message
        const message = `Your CrowdShaki OTP is ${data.otp}. Valid for 5 minutes. Do not share with anyone.`;

        // 🔥 Use route=q (No verification needed!)
        const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=q&message=${encodeURIComponent(message)}&language=english&flash=0&numbers=${cleanPhone}`;

        console.log("🌐 Calling Fast2SMS API...");

        // Call Fast2SMS
        const response = await fetch(url);
        const smsData = await response.json();

        console.log("📨 Fast2SMS Response:", smsData);

        if (smsData.return === true || smsData.status_code === 200) {
          console.log("✅ SMS sent successfully!");
          return NextResponse.json({ 
            message: "OTP saved and SMS sent successfully", 
            data,
            smsStatus: "success",
            smsRequestId: smsData.request_id
          });
        } else {
          console.error("❌ Fast2SMS Error:", smsData.message);
          return NextResponse.json({ 
            message: "OTP saved but SMS failed", 
            data,
            smsStatus: "failed",
            smsError: smsData.message
          });
        }
      } catch (smsError) {
        console.error("💥 SMS Error:", smsError);
        return NextResponse.json({ 
          message: "OTP saved but SMS failed", 
          data,
          smsStatus: "failed",
          smsError: smsError.message
        });
      }
    }

    // If no phone number provided, just save OTP
    return NextResponse.json({ message: "OTP saved successfully", data });
    
  } catch (error) {
    console.error("💥 Error:", error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
};