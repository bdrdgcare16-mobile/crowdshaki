// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/app/lib/database";
// import bcrypt from "bcrypt";
// import AWS from "aws-sdk";

// // Configure AWS SDK
// const ses = new AWS.SES({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// export const POST = async (req) => {
//   try {
//     const { data, token } = await req.json();
//     const hashedPassword = await bcrypt.hash(data.password, 10);

//     // Connect to DB
//     const client = await connectToDatabase();
//     const db = client.db("crowdshaki");

//     // Check if user already exists
//     const existingUser = await db
//       .collection("users")
//       .findOne({ token: token });

//     if (existingUser) {
//       return new NextResponse(
//         JSON.stringify({ error: "User already exists in the database" }),
//         { status: 409 } // Conflict status code
//       );
//     }

//     // Create a new user object
//     const newUser = {
//       name: data.name,
//       organizationName: data.orgName,
//       email: data.email,
//       password: hashedPassword, // Store the hashed password
//       status: "pending", // Default status is pending
//       phone: data.phone,
//       token: token, // Store the token for verification
//     };

//     //  // Insert the new user into the database
//     await db.collection("users").insertOne(newUser);

//     // Send email to the admin for approval
//     const htmlContent = `
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>User Signup Approval</title>
//   <style>
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

//     body {
//       font-family: 'Poppins', sans-serif;
//       margin: 0;
//       padding: 0;
//       background-color: #000000;
//       color: #ffffff;
//     }

//     .container {
//       max-width: 600px;
//       margin: 0 auto;
//       background-color: #000000;
//       padding: 40px 20px;
//     }

//     .header {
//       padding: 20px 0;
//     }

//     .logo {
//       font-size: 32px;
//       color: #ffffff;
//       font-weight: 700;
//     }

//     .content {
//       padding: 40px 0;
//     }

//     .content h1 {
//       font-size: 48px;
//       color: #ffffff;
//       margin-bottom: 20px;
//       line-height: 1.2;
//       font-weight: 600;
//     }

//     .content p {
//       font-size: 16px;
//       color: #cccccc;
//       margin-bottom: 30px;
//       line-height: 1.5;
//     }

//     .user-details {
//       background-color: #111111;
//       padding: 24px;
//       border-radius: 12px;
//       margin: 30px 0;
//     }

//     .user-details p {
//       margin: 12px 0;
//       color: #ffffff;
//       font-size: 15px;
//     }

//     .buttons {
//       margin-top: 40px;
//     }

//     .button {
//       display: inline-block;
//       padding: 16px 32px;
//       margin-right: 16px;
//       font-size: 16px;
//       font-weight: 500;
//       border-radius: 8px;
//       text-decoration: none;
//       color: white;
//       text-align: center;
//       transition: all 0.2s ease;
//     }

//     .approve-button {
//       background-color: #28a745;
//     }

//     .approve-button:hover {
//       background-color: #218838;
//     }

//     .reject-button {
//       background-color: #dc3545;
//     }

//     .reject-button:hover {
//       background-color: #c82333;
//     }

//     .footer {
//       padding: 20px 0;
//       font-size: 14px;
//       color: #666666;
//       border-top: 1px solid #222222;
//       margin-top: 40px;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <div class="logo">Crowdshaki.</div>
//     </div>
//     <div class="content">
//       <h1>New User Signup Approval</h1>
//       <p>A new user has signed up and is awaiting approval. Please review their request below:</p>
//       <div class="user-details">
//         <p><strong>Name:</strong> ${data.name}</p>
//         <p><strong>Organization:</strong> ${data.orgName}</p>
//         <p><strong>Email:</strong> ${data.email}</p>
//         <p><strong>Phone:</strong> ${data.phone}</p>
//       </div>
//       <div class="buttons">
//         <a href="https://crowdshaki.vercel.app/api/approveUser/approve/${token}" class="button approve-button">Approve</a>
//         <a href="https://crowdshaki.vercel.app/api/approveUser/reject/${token}" class="button reject-button">Reject</a>
//       </div>
//     </div>
//     <div class="footer">
//       <p>If you did not request this, please ignore this email.</p>
//     </div>
//   </div>
// </body>
// </html>
// `;

//     const params = {
//       Source: process.env.SES_VERIFIED_EMAIL, // Use the email from environment variables
//       Destination: {
//         ToAddresses: [process.env.ADMIN_EMAIL], // Admin's email from environment variables
//       },
//       Message: {
//         Subject: {
//           Data: "User Signup Approval",
//         },
//         Body: {
//           Html: {
//             Data: htmlContent, // Send the static HTML content as a string
//           },
//         },
//       },
//     };

//     const result = await ses.sendEmail(params).promise();
//     console.log("Email sent successfully:", result);

//     // Return a success response
//     return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
//   } catch (error) {
//     console.error("Error in createUser:", error);
//     return new NextResponse(
//       JSON.stringify({ error: "Internal Server Error" }),
//       { status: 500 } // Internal server error status code
//     );
//   }
// };








import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/database";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const { data, token } = await req.json();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Connect to DB
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");

    // Check if user already exists
    const existingUser = await db
      .collection("users")
      .findOne({ email: data.email });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: "User already exists in the database" }),
        { status: 409 } // Conflict status code
      );
    }

    // Create a new user object
    const newUser = {
      name: data.name,
      organizationName: data.orgName,
      email: data.email,
      password: hashedPassword, // Store the hashed password
      status: "pending", // Default status is pending
      phone: data.phone,
      token: token, // Store the token for verification
      createdAt: new Date(),
    };

    // Insert the new user into the database
    await db.collection("users").insertOne(newUser);

    // Send email to the admin for approval using BREVO
    const htmlContent = `
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>User Signup Approval</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

    body {
      font-family: 'Poppins', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #000000;
      color: #ffffff;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #000000;
      padding: 40px 20px;
    }

    .header {
      padding: 20px 0;
    }

    .logo {
      font-size: 32px;
      color: #ffffff;
      font-weight: 700;
    }

    .content {
      padding: 40px 0;
    }

    .content h1 {
      font-size: 48px;
      color: #ffffff;
      margin-bottom: 20px;
      line-height: 1.2;
      font-weight: 600;
    }

    .content p {
      font-size: 16px;
      color: #cccccc;
      margin-bottom: 30px;
      line-height: 1.5;
    }

    .user-details {
      background-color: #111111;
      padding: 24px;
      border-radius: 12px;
      margin: 30px 0;
    }

    .user-details p {
      margin: 12px 0;
      color: #ffffff;
      font-size: 15px;
    }

    .buttons {
      margin-top: 40px;
    }

    .button {
      display: inline-block;
      padding: 16px 32px;
      margin-right: 16px;
      font-size: 16px;
      font-weight: 500;
      border-radius: 8px;
      text-decoration: none;
      color: white;
      text-align: center;
      transition: all 0.2s ease;
    }

    .approve-button {
      background-color: #28a745;
    }

    .approve-button:hover {
      background-color: #218838;
    }

    .reject-button {
      background-color: #dc3545;
    }

    .reject-button:hover {
      background-color: #c82333;
    }

    .footer {
      padding: 20px 0;
      font-size: 14px;
      color: #666666;
      border-top: 1px solid #222222;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Crowdshaki.</div>
    </div>
    <div class="content">
      <h1>New User Signup Approval</h1>
      <p>A new user has signed up and is awaiting approval. Please review their request below:</p>
      <div class="user-details">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Organization:</strong> ${data.orgName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
      </div>
      <div class="buttons">
        <a href="https://crowdshaki.vercel.app/api/approveUser/approve/${token}" class="button approve-button">Approve</a>
        <a href="https://crowdshaki.vercel.app/api/approveUser/reject/${token}" class="button reject-button">Reject</a>
      </div>
    </div>
    <div class="footer">
      <p>If you did not request this, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
`;

    // Send email using Brevo API
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "Crowdshaki",
          email: process.env.EMAIL_USER, // Use your Gmail from .env
        },
        to: [
          {
            email: process.env.ADMIN_EMAIL,
            name: "Admin",
          },
        ],
        subject: "User Signup Approval",
        htmlContent: htmlContent,
      }),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      console.error("Brevo email error:", errorText);
      throw new Error("Failed to send email");
    }

    console.log("Email sent successfully via Brevo");

    // Return a success response
    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error in createUser:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 } // Internal server error status code
    );
  }
};