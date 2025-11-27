// "use server";

// import crypto from "crypto";
// import AWS from "aws-sdk";
// import { connectToDatabase } from "@/app/lib/database";
// import nodemailer from "nodemailer";

// // Configure AWS SDK
// const ses = new AWS.SES({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const sns = new AWS.SNS({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// function generateHtmlTable(data: any, token: any): string {
//   const generateRows = (obj: any): string => {
//     return Object.entries(obj)
//       .map(([key, value]) => {
//         if (typeof value === "object" && !Array.isArray(value)) {
//           return `
//             <tr>
//               <td style="font-weight: bold;" colspan="2">${key}</td>
//             </tr>
//             ${generateRows(value)}
//           `;
//         } else {
//           return `
//             <tr>
//               <td style="font-weight: bold;">${key}</td>
//               <td>${Array.isArray(value) ? value.join(", ") : value}</td>
//             </tr>
//           `;
//         }
//       })
//       .join("");
//   };

//   return `
//     <html>
//       <head>
//         <style>
//           .buttons { margin-top: 40px; }
//           .button {
//             display: inline-block;
//             padding: 16px 32px;
//             margin-right: 16px;
//             font-size: 16px;
//             font-weight: 500;
//             border-radius: 8px;
//             text-decoration: none;
//             color: white;
//             text-align: center;
//             transition: all 0.2s ease;
//           }
//           .approve-button { background-color: #28a745; }
//           .approve-button:hover { background-color: #218838; }
//           .reject-button { background-color: #dc3545; }
//           .reject-button:hover { background-color: #c82333; }
//         </style>
//       </head>
//       <body>
//         <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
//           <thead>
//             <tr style="background-color: #f2f2f2;">
//               <th style="text-align: left;">Field</th>
//               <th style="text-align: left;">Value</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${generateRows(data)}
//           </tbody>
//         </table>
//         <div class="buttons">
//           <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/Labs" class="button approve-button">Approve</a>
//           <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/Labs" class="button reject-button">Reject</a>
//         </div>
//       </body>
//     </html>
//   `;
// }

// export const labDetails = async (formdata: FormData) => {
//   console.log("formdata:", formdata);
//   const token = crypto.randomBytes(32).toString("hex");

//   const data = {
//     labName: formdata.get("labName"),
//     ownerName: formdata.get("ownerName"),
//     email: formdata.get("email"),
//     mobile: formdata.get("mobile"),
//     address: formdata.get("address"),
//     pincode: formdata.get("pincode"),
//     labType: formdata.get("labType"),
//     yearsOfOperation: formdata.get("yearsOfOperation"),
//     labLicenseNumber: formdata.get("labLicenseNumber"),
//     dateOfIssue: formdata.get("dateOfIssue"),
//     issuingAuthority: formdata.get("issuingAuthority"),
//     pathologistCount: formdata.get("pathologistCount"),
//     technicianCount: formdata.get("technicianCount"),
//     compliantOrnot: formdata.get("compliantOrnot"),
//     token: token,
//     status: "pending",
//   };

//   const response = await fetch("https://crowdshaki.vercel.app/api/labs", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const apiResult = await response.json();
//   const params: any = {
//     Source: data.email,
//     Destination: {
//       ToAddresses: [process.env.ADMIN_EMAIL],
//     },
//     Message: {
//       Subject: {
//         Data: "Form Approval",
//       },
//       Body: {
//         Html: {
//           Data: generateHtmlTable(data, token),
//         },
//       },
//     },
//   };

//   const result = await ses.sendEmail(params).promise();
//   console.log("Email sent successfully:", result);

//   console.log(apiResult);
//   return { apiResult, emailSent: true };
// };

// const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

// // Generate a random OTP
// function generateOTP(): string {
//   return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
// }

// async function storeOTP(email: string, otp: string, expiresAt: Date) {
//   const client = await connectToDatabase();
//   const db = client.db("crowdshaki");
//   await db
//     .collection("otps")
//     .updateOne({ email }, { $set: { otp, expiresAt } }, { upsert: true });
// }

// // 🔥 NEW: Send Email OTP using Gmail
// async function sendEmailOTP(email: string, otp: string) {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST || 'smtp.gmail.com',
//       port: parseInt(process.env.EMAIL_PORT || '587'),
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_APP_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: `"CrowdShaki" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Your Email OTP - CrowdShaki Registration',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
//           <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
//             <h1 style="color: white; margin: 0; font-size: 28px;">CrowdShaki</h1>
//           </div>
          
//           <div style="padding: 40px 30px; background: #f9f9f9;">
//             <h2 style="color: #333; margin-top: 0;">Your OTP Code</h2>
            
//             <p style="font-size: 16px; color: #666; line-height: 1.6;">
//               Thank you for registering with CrowdShaki. Use the OTP below to verify your email address:
//             </p>
            
//             <div style="background: white; padding: 30px; text-align: center; border-radius: 10px; margin: 30px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
//               <p style="color: #999; font-size: 14px; margin: 0 0 10px 0;">Your OTP is:</p>
//               <h1 style="color: #667eea; font-size: 42px; letter-spacing: 10px; margin: 10px 0; font-weight: bold;">
//                 ${otp}
//               </h1>
//             </div>
            
//             <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
//               <p style="margin: 0; color: #856404; font-size: 14px;">
//                 ⚠️ <strong>Important:</strong> This OTP is valid for 5 minutes only. Do not share it with anyone.
//               </p>
//             </div>
            
//             <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 30px;">
//               If you didn't request this OTP, please ignore this email.
//             </p>
//           </div>
          
//           <div style="background: #333; color: white; padding: 20px 30px; text-align: center;">
//             <p style="margin: 0; font-size: 12px;">© 2025 CrowdShaki. All rights reserved.</p>
//             <p style="margin: 10px 0 0 0; font-size: 12px;">
//               <a href="https://crowdshaki.vercel.app" style="color: #4CAF50; text-decoration: none;">Visit Website</a>
//             </p>
//           </div>
//         </div>
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`✅ Email OTP sent successfully to ${email}`);
//     console.log(`Message ID: ${info.messageId}`);
//     return { success: true };
    
//   } catch (error: any) {
//     console.error('❌ Error sending email OTP:', error);
//     console.error('Error details:', error.message);
//     return { success: false, error: error.message };
//   }
// }

// // 🔥 Send SMS OTP using Fast2SMS
// async function sendOTPSMS(email: string, otp: string, phone: string) {
//   const apiKey = process.env.FAST2SMS_API_KEY || "UR3nUMJd70Pop2IDKBqVjEcORcZQZ1D0TgsfhDJPFLYmdES8XjqUihFSzSmB";

//   if (!apiKey) {
//     throw new Error("FAST2SMS_API_KEY not configured");
//   }

//   const cleanPhone = phone.replace(/^\+91/, "").replace(/\s+/g, "").trim();

//   if (!/^\d{10}$/.test(cleanPhone)) {
//     throw new Error(`Invalid phone number: ${phone}`);
//   }

//   const message = `Your CrowdShaki OTP is ${otp}. Valid for 5 minutes. Do not share with anyone.`;

//   const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=q&message=${encodeURIComponent(message)}&language=english&flash=0&numbers=${cleanPhone}`;

//   console.log(`📱 Sending SMS OTP to ${cleanPhone}...`);

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     console.log("Fast2SMS Response:", data);

//     if (data.return === true || data.status_code === 200) {
//       console.log("✅ SMS OTP sent successfully!");
//       return { otpSent: true };
//     } else {
//       console.error("Fast2SMS Error:", data.message);
//       return { otpSent: false, error: data.message };
//     }
//   } catch (error: any) {
//     console.error("Error sending SMS OTP:", error);
//     return { otpSent: false, error: error.message };
//   }
// }

// // 🔥 MAIN: Send OTP to BOTH Email and Mobile
// export async function sendOTP(email: any, phone: any) {
//   const phoneNumber = "+91" + phone;
  
//   try {
//     const otp = generateOTP();
//     const expiresAt = new Date(Date.now() + OTP_EXPIRATION);

//     console.log(`\n🔐 Generating OTP: ${otp}`);
//     console.log(`📧 Email: ${email}`);
//     console.log(`📱 Phone: ${phoneNumber}\n`);

//     // Store OTP in database
//     await storeOTP(email, otp, expiresAt);
//     console.log("✅ OTP stored in database");

//     // Send Email OTP
//     console.log("📧 Sending Email OTP...");
//     const emailResult = await sendEmailOTP(email, otp);
    
//     // Send SMS OTP
//     console.log("📱 Sending SMS OTP...");
//     const smsResult = await sendOTPSMS(email, otp, phoneNumber);

//     // Check results
//     const emailSuccess = emailResult.success;
//     const smsSuccess = smsResult.otpSent;

//     console.log(`\n📊 Results:`);
//     console.log(`Email: ${emailSuccess ? '✅ Sent' : '❌ Failed'}`);
//     console.log(`SMS: ${smsSuccess ? '✅ Sent' : '❌ Failed'}\n`);

//     if (emailSuccess && smsSuccess) {
//       console.log("🎉 Both Email and SMS OTP sent successfully!");
//       return {
//         success: true,
//         message: "OTP sent successfully to both email and mobile",
//       };
//     } else if (emailSuccess || smsSuccess) {
//       console.log("⚠️ OTP sent partially (one method succeeded)");
//       return {
//         success: true,
//         message: "OTP sent successfully",
//       };
//     } else {
//       console.error("❌ Both Email and SMS failed");
//       return {
//         success: false,
//         error: "Failed to send OTP via both methods",
//       };
//     }
//   } catch (error: any) {
//     console.error("💥 Error in sendOTP:", error);
//     return {
//       success: false,
//       error: "Failed to send OTP",
//     };
//   }
// }

// async function validateOTP(email: string, otp: string) {
//   const client = await connectToDatabase();
//   const db = client.db("crowdshaki");
//   const record = await db.collection("otps").findOne({ email });

//   if (!record) return false;

//   const { otp: storedOTP, expiresAt } = record;

//   if (storedOTP === otp && new Date() < new Date(expiresAt)) {
//     return true;
//   }
//   return false;
// }

// async function removeOTP(email: string) {
//   const client = await connectToDatabase();
//   const db = client.db("crowdshaki");
//   await db.collection("otps").deleteOne({ email });
// }

// export async function verifyOTP(email: any, otp: any) {
//   try {
//     const isValid = await validateOTP(email, otp);

//     if (!isValid) {
//       console.log("❌ Incorrect OTP");
//       return {
//         success: false,
//         error: "Invalid or expired OTP",
//       };
//     }

//     await removeOTP(email);
//     console.log("✅ OTP verified and removed");

//     return {
//       success: true,
//       message: "OTP verification successful",
//     };
//   } catch (error) {
//     console.error("OTP verification error:", error);
//     return {
//       success: false,
//       error: "OTP verification failed",
//     };
//   }
// }



"use server";

import crypto from "crypto";
import AWS from "aws-sdk";
import { connectToDatabase } from "@/app/lib/database";
import nodemailer from "nodemailer";

// Configure AWS SDK (keeping for compatibility, but not using for admin email)
const ses = new AWS.SES({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sns = new AWS.SNS({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

function generateHtmlTable(data: any, token: any): string {
  const generateRows = (obj: any): string => {
    return Object.entries(obj)
      .map(([key, value]) => {
        if (typeof value === "object" && !Array.isArray(value)) {
          return `
            <tr>
              <td style="font-weight: bold;" colspan="2">${key}</td>
            </tr>
            ${generateRows(value)}
          `;
        } else {
          return `
            <tr>
              <td style="font-weight: bold;">${key}</td>
              <td>${Array.isArray(value) ? value.join(", ") : value}</td>
            </tr>
          `;
        }
      })
      .join("");
  };

  return `
    <html>
      <head>
        <style>
          .buttons { margin-top: 40px; }
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
          .approve-button { background-color: #28a745; }
          .approve-button:hover { background-color: #218838; }
          .reject-button { background-color: #dc3545; }
          .reject-button:hover { background-color: #c82333; }
        </style>
      </head>
      <body>
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="text-align: left;">Field</th>
              <th style="text-align: left;">Value</th>
            </tr>
          </thead>
          <tbody>
            ${generateRows(data)}
          </tbody>
        </table>
        <div class="buttons">
          <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/Labs" class="button approve-button">Approve</a>
          <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/Labs" class="button reject-button">Reject</a>
        </div>
      </body>
    </html>
  `;
}

// 🔥 UPDATED: Using Gmail instead of AWS SES
export const labDetails = async (formdata: FormData) => {
  console.log("📝 Processing lab registration form...");
  const token = crypto.randomBytes(32).toString("hex");

  const data = {
    labName: formdata.get("labName"),
    ownerName: formdata.get("ownerName"),
    email: formdata.get("email"),
    mobile: formdata.get("mobile"),
    address: formdata.get("address"),
    pincode: formdata.get("pincode"),
    labType: formdata.get("labType"),
    yearsOfOperation: formdata.get("yearsOfOperation"),
    labLicenseNumber: formdata.get("labLicenseNumber"),
    dateOfIssue: formdata.get("dateOfIssue"),
    issuingAuthority: formdata.get("issuingAuthority"),
    pathologistCount: formdata.get("pathologistCount"),
    technicianCount: formdata.get("technicianCount"),
    compliantOrnot: formdata.get("compliantOrnot"),
    token: token,
    status: "pending",
  };

  try {
    // Save to database
    console.log("💾 Saving to database...");
    const response = await fetch("https://crowdshaki.vercel.app/api/labs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const apiResult = await response.json();
    console.log("✅ Data saved to database:", apiResult);

    // 🔥 Send admin notification email using Gmail (NOT AWS SES!)
    console.log("📧 Sending admin notification email...");
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"CrowdShaki Registration" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🏥 New Lab Registration - ${data.labName}`,
      html: generateHtmlTable(data, token),
    };

    const emailResult = await transporter.sendMail(mailOptions);
    console.log("✅ Admin notification email sent successfully!");
    console.log(`📧 Message ID: ${emailResult.messageId}`);

    return { 
      success: true,
      apiResult, 
      emailSent: true,
      message: "Lab registration submitted successfully" 
    };

  } catch (error: any) {
    console.error("❌ Error in lab registration:", error);
    return { 
      success: false,
      apiResult: null, 
      emailSent: false, 
      error: error.message 
    };
  }
};

const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

// Generate a random OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function storeOTP(email: string, otp: string, expiresAt: Date) {
  const client = await connectToDatabase();
  const db = client.db("crowdshaki");
  await db
    .collection("otps")
    .updateOne({ email }, { $set: { otp, expiresAt } }, { upsert: true });
}

// 🔥 Send Email OTP using Gmail
async function sendEmailOTP(email: string, otp: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"CrowdShaki" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Email OTP - CrowdShaki Registration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">CrowdShaki</h1>
          </div>
          
          <div style="padding: 40px 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-top: 0;">Your OTP Code</h2>
            
            <p style="font-size: 16px; color: #666; line-height: 1.6;">
              Thank you for registering with CrowdShaki. Use the OTP below to verify your email address:
            </p>
            
            <div style="background: white; padding: 30px; text-align: center; border-radius: 10px; margin: 30px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <p style="color: #999; font-size: 14px; margin: 0 0 10px 0;">Your OTP is:</p>
              <h1 style="color: #667eea; font-size: 42px; letter-spacing: 10px; margin: 10px 0; font-weight: bold;">
                ${otp}
              </h1>
            </div>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                ⚠️ <strong>Important:</strong> This OTP is valid for 5 minutes only. Do not share it with anyone.
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 30px;">
              If you didn't request this OTP, please ignore this email.
            </p>
          </div>
          
          <div style="background: #333; color: white; padding: 20px 30px; text-align: center;">
            <p style="margin: 0; font-size: 12px;">© 2025 CrowdShaki. All rights reserved.</p>
            <p style="margin: 10px 0 0 0; font-size: 12px;">
              <a href="https://crowdshaki.vercel.app" style="color: #4CAF50; text-decoration: none;">Visit Website</a>
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email OTP sent successfully to ${email}`);
    console.log(`📧 Message ID: ${info.messageId}`);
    return { success: true };
    
  } catch (error: any) {
    console.error('❌ Error sending email OTP:', error);
    console.error('Error details:', error.message);
    return { success: false, error: error.message };
  }
}

// 🔥 Send SMS OTP using Fast2SMS
async function sendOTPSMS(email: string, otp: string, phone: string) {
  const apiKey = process.env.FAST2SMS_API_KEY || "UR3nUMJd70Pop2IDKBqVjEcORcZQZ1D0TgsfhDJPFLYmdES8XjqUihFSzSmB";

  if (!apiKey) {
    throw new Error("FAST2SMS_API_KEY not configured");
  }

  const cleanPhone = phone.replace(/^\+91/, "").replace(/\s+/g, "").trim();

  if (!/^\d{10}$/.test(cleanPhone)) {
    throw new Error(`Invalid phone number: ${phone}`);
  }

  const message = `Your CrowdShaki OTP is ${otp}. Valid for 5 minutes. Do not share with anyone.`;

  const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=q&message=${encodeURIComponent(message)}&language=english&flash=0&numbers=${cleanPhone}`;

  console.log(`📱 Sending SMS OTP to ${cleanPhone}...`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Fast2SMS Response:", data);

    if (data.return === true || data.status_code === 200) {
      console.log("✅ SMS OTP sent successfully!");
      return { otpSent: true };
    } else {
      console.error("Fast2SMS Error:", data.message);
      return { otpSent: false, error: data.message };
    }
  } catch (error: any) {
    console.error("Error sending SMS OTP:", error);
    return { otpSent: false, error: error.message };
  }
}

// 🔥 MAIN: Send OTP to BOTH Email and Mobile
export async function sendOTP(email: any, phone: any) {
  const phoneNumber = "+91" + phone;
  
  try {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION);

    console.log(`\n🔐 Generating OTP: ${otp}`);
    console.log(`📧 Email: ${email}`);
    console.log(`📱 Phone: ${phoneNumber}\n`);

    // Store OTP in database
    await storeOTP(email, otp, expiresAt);
    console.log("✅ OTP stored in database");

    // Send Email OTP
    console.log("📧 Sending Email OTP...");
    const emailResult = await sendEmailOTP(email, otp);
    
    // Send SMS OTP
    console.log("📱 Sending SMS OTP...");
    const smsResult = await sendOTPSMS(email, otp, phoneNumber);

    // Check results
    const emailSuccess = emailResult.success;
    const smsSuccess = smsResult.otpSent;

    console.log(`\n📊 Results:`);
    console.log(`Email: ${emailSuccess ? '✅ Sent' : '❌ Failed'}`);
    console.log(`SMS: ${smsSuccess ? '✅ Sent' : '❌ Failed'}\n`);

    if (emailSuccess && smsSuccess) {
      console.log("🎉 Both Email and SMS OTP sent successfully!");
      return {
        success: true,
        message: "OTP sent successfully to both email and mobile",
      };
    } else if (emailSuccess || smsSuccess) {
      console.log("⚠️ OTP sent partially (one method succeeded)");
      return {
        success: true,
        message: "OTP sent successfully",
      };
    } else {
      console.error("❌ Both Email and SMS failed");
      return {
        success: false,
        error: "Failed to send OTP via both methods",
      };
    }
  } catch (error: any) {
    console.error("💥 Error in sendOTP:", error);
    return {
      success: false,
      error: "Failed to send OTP",
    };
  }
}

async function validateOTP(email: string, otp: string) {
  const client = await connectToDatabase();
  const db = client.db("crowdshaki");
  const record = await db.collection("otps").findOne({ email });

  if (!record) return false;

  const { otp: storedOTP, expiresAt } = record;

  if (storedOTP === otp && new Date() < new Date(expiresAt)) {
    return true;
  }
  return false;
}

async function removeOTP(email: string) {
  const client = await connectToDatabase();
  const db = client.db("crowdshaki");
  await db.collection("otps").deleteOne({ email });
}

export async function verifyOTP(email: any, otp: any) {
  try {
    console.log(`🔍 Verifying OTP for: ${email}`);
    const isValid = await validateOTP(email, otp);

    if (!isValid) {
      console.log("❌ Invalid or expired OTP");
      return {
        success: false,
        error: "Invalid or expired OTP",
      };
    }

    await removeOTP(email);
    console.log("✅ OTP verified and removed");

    return {
      success: true,
      message: "OTP verification successful",
    };
  } catch (error: any) {
    console.error("💥 OTP verification error:", error);
    return {
      success: false,
      error: error.message || "OTP verification failed",
    };
  }
}