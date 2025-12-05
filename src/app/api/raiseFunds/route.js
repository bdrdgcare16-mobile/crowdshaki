// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/app/lib/database';
// // import crypto from 'crypto';
// // import CryptoJS from 'crypto-js';

// export const POST = async (req, res) => {
//   if (req.method === 'POST') {
//     try {
//       const data = await req.json();
//       const {
//         firstName,
//         lastName,
//         email,
//         mobile,
//         address,
//         pincode,
//         beneficiaryName,
//         relationship,
//         amountForFund,
//         reasonForFund,
//         situation,
//         category,
//         accountHolder,
//         accountNumber,
//         accountType,
//         ifscCode,
//         userId, // Assuming userId is passed in the request body
//       } = data;
//       // Check if any required field is null or undefined
//       const requiredFields = {
//         firstName,
//         lastName,
//         email,
//         mobile,
//         address,
//         pincode,
//         beneficiaryName,
//         relationship,
//         amountForFund,
//         reasonForFund,
//         situation,
//         category,
//         accountHolder,
//         accountNumber,
//         accountType,
//         ifscCode,
//         userId,
//       };

//       const missingFields = Object.entries(requiredFields)
//         .filter(([key, value]) => value === null || value === undefined)
//         .map(([key]) => key);

//       if (missingFields.length > 0) {
//         return NextResponse.json({
//           status: 400,
//           error: `Missing or invalid fields: ${missingFields.join(', ')}`,
//         });
//       }

//       // Connect to MongoDB
//       const client = await connectToDatabase();
//       const db = client.db('crowdshaki');

//       // const latestEntry = await db.collection('raisedFunds')
//       //   .find({}, { sort: { i: 1 }, limit: 1 })
//       //   .toArray();
//       //   console.log("latest")


//       // let i = 1;
//       // if (latestEntry.length > 0) {
//       //   i = latestEntry[0]._id + 1; // Increment `i` by 1
//       // }
//       // const fundID = CryptoJS.SHA256('crowdshaki' + i).toString(CryptoJS.enc.Hex);
//       // console.log("fund ID: ",fundID)

//       // Add user data to MongoDB
//       const insert = await db.collection('raisedFunds').insertOne({
//         firstName,
//         lastName,
//         email,
//         mobile,
//         address,
//         pincode,
//         beneficiaryName,
//         relationship,
//         amountForFund,
//         reasonForFund,
//         situation,
//         category,
//         accountHolder,
//         accountNumber,
//         accountType,
//         ifscCode,
//         userId,
//       });
//       console.log(insert);

//       return NextResponse.json({
//         status: 200,
//         message: 'Fund Details added successfully',
//       });
//     } catch (error) {
//       console.error(error);
//       return NextResponse.json({
//         status: 500,
//         error: 'Internal server error',
//       });
//     }
//   } else {
//     return NextResponse.json({
//       status: 405,
//       error: 'Method not allowed',
//     });
//   }
// };




import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/database';

export const POST = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = await req.json();
      const {
        firstName,
        lastName,
        email,
        mobile,
        address,
        pincode,
        beneficiaryName,
        relationship,
        amountForFund,
        reasonForFund,
        situation,
        category,
        accountHolder,
        accountNumber,
        accountType,
        ifscCode,
        userId,
      } = data;

      // ✅ userId is now optional (removed from required)
      const requiredFields = {
        firstName,
        lastName,
        email,
        mobile,
        address,
        pincode,
        beneficiaryName,
        relationship,
        amountForFund,
        reasonForFund,
        situation,
        category,
        accountHolder,
        accountNumber,
        accountType,
        ifscCode,
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => value === null || value === undefined)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        return NextResponse.json({
          status: 400,
          error: `Missing or invalid fields: ${missingFields.join(', ')}`,
        });
      }

      const client = await connectToDatabase();
      const db = client.db('crowdshaki');

      // ✅ userId can be null if user not logged in
      const insert = await db.collection('raisedFunds').insertOne({
        firstName,
        lastName,
        email,
        mobile,
        address,
        pincode,
        beneficiaryName,
        relationship,
        amountForFund,
        reasonForFund,
        situation,
        category,
        accountHolder,
        accountNumber,
        accountType,
        ifscCode,
        userId: userId || null,
        createdAt: new Date(),
      });

      console.log('✅ Campaign saved:', insert.insertedId);

      return NextResponse.json({
        status: 200,
        message: 'Fund Details added successfully',
        campaignId: insert.insertedId,
      });
    } catch (error) {
      console.error('❌ Error:', error);
      return NextResponse.json({
        status: 500,
        error: 'Internal server error',
      });
    }
  } else {
    return NextResponse.json({
      status: 405,
      error: 'Method not allowed',
    });
  }
};