// "use server";

// import crypto from "crypto";
// import AWS from "aws-sdk";
// import { connectToDatabase } from "@/app/lib/database";

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
//           // Nested object handling
//           return `
//                           <tr>
//                               <td style="font-weight: bold;" colspan="2">${key}</td>
//                           </tr>
//                           ${generateRows(value)}
//                       `;
//         } else {
//           return `
//                           <tr>
//                               <td style="font-weight: bold;">${key}</td>
//                               <td>${
//                                 Array.isArray(value) ? value.join(", ") : value
//                               }</td>
//                           </tr>
//                       `;
//         }
//       })
//       .join("");
//   };

//   return `
//     <html>
//       <head>
//         <style>
//             .buttons {
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
//         </style>
//       </head>
//       <body>
//       <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
//       <thead>
//       <tr style="background-color: #f2f2f2;">
//       <th style="text-align: left;">Field</th>
//       <th style="text-align: left;">Value</th>
//       </tr>
//       </thead>
//       <tbody>
//       ${generateRows(data)}
//       </tbody>
      
//       </table>
//       <div class="buttons">
//       <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/gpa" class="button approve-button">Approve</a>
//       <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/gpa" class="button reject-button">Reject</a>
//       </div>
//       </body>
//       </html>
//       `;
// }

// export const gpaDetails = async (formData: FormData) => {
//   console.log("Form Data:", formData);
//   const token = crypto.randomBytes(32).toString("hex");

//   const data = {
//     firstName: formData.get("firstName") as string,
//     lastName: formData.get("lastName") as string,
//     phoneNumber: formData.get("phoneNumber") as string,
//     email: formData.get("email") as string,
//     residentialAddress: formData.get("residentialAddress") as string,
//     clinicAddress: formData.get("clinicAddress") as string,
//     dob: formData.get("dob") as string,
//     medicalRegNumber: formData.get("medicalRegNumber") as string,
//     medicalCouncil: formData.get("medicalCouncil") as string,
//     dateOfReg: formData.get("dateOfReg") as string,
//     qualification: formData.get("qualification") as string,
//     institution: formData.get("institution") as string,
//     yearOfPassing: formData.get("yearOfPassing") as string,
//     totalExperience: formData.get("totalExperience") as string,
//     gpExperience: formData.get("gpExperience") as string,
//     hospitalName: formData.get("hospitalName") as string,
//     designation: formData.get("designation") as string,
//     affiliations: formData.get("affiliations") as string,
//     teleconsultationExperience:
//       formData.get("teleconsultationExperience") === "true",
//     teleconsultationDetails: formData.get("teleconsultationDetails") as string,
//     preferredDays: formData.getAll("preferredDays") as string[],
//     preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
//     hasComputer: formData.get("hasComputer") === "true",
//     hasInternet: formData.get("hasInternet") === "true",
//     platformUsed: formData.get("platformUsed") as string,
//     certifications: formData.get("certifications") as string,
//     compliantWithGuidelines: formData.get("compliantWithGuidelines") === "true",
//     signature: formData.get("signature") as string,
//     date: formData.get("date") as string,
//   };

//   const response = await fetch("https://crowdshaki.vercel.app/api/gpa", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const apiResult = await response.json();
//   const params: any = {
//     Source: data.email, // Use the email from environment variables
//     Destination: {
//       ToAddresses: [process.env.ADMIN_EMAIL], // Admin's email from environment variables
//     },
//     Message: {
//       Subject: {
//         Data: "Form Approval",
//       },
//       Body: {
//         Html: {
//           Data: generateHtmlTable(data, token), // Send the static HTML content as a string
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

// async function sendOTPSMS(email: string, otp: string, phone: string) {
//   const sourceEmail = process.env.ADMIN_EMAIL;

//   if (!sourceEmail) {
//     throw new Error("AWS_SES_FROM_EMAIL environment variable is not defined");
//   }

//   if (!email) {
//     throw new Error("Recipient email is not defined");
//   }

//   const params: any = {
//     Message: `Your OTP is: ${otp}`,
//     PhoneNumber: phone, // Ensure the mobile number is in E.164 format
//   };

//   try {
//     await sns.publish(params).promise();
//     return { otpSent: true };
//   } catch (error: any) {
//     console.error("Error sending OTP:", error);
//     return { otpSent: false, error: error.message };
//   }
// }

// export async function sendOTP(email: any, phone: any) {
//   const phoneNumber = "+91" + phone;
//   try {
//     const otp = generateOTP();
//     const expiresAt = new Date(Date.now() + OTP_EXPIRATION);

//     await storeOTP(email, otp, expiresAt);
//     await sendOTPSMS(email, otp, phoneNumber);

//     return {
//       success: true,
//       message: "OTP sent successfully",
//     };
//   } catch (error) {
//     console.error("Error sending OTP:", error);
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

// // Remove OTP after successful validation
// async function removeOTP(email: string) {
//   const client = await connectToDatabase();
//   const db = client.db("crowdshaki");
//   await db.collection("otps").deleteOne({ email });
// }

// export async function verifyOTP(email: any, otp: any) {
//   try {
//     const isValid = await validateOTP(email, otp);

//     if (!isValid) {
//       console.log("Incorrect OTP");
//       return {
//         success: false,
//         error: "Invalid or expired OTP",
//       };
//     }

//     await removeOTP(email);

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





// "use server";

// import crypto from "crypto";
// import { connectToDatabase } from "@/app/lib/database";
// import nodemailer from "nodemailer";

// // ============================================
// // ADMIN EMAIL NOTIFICATION
// // ============================================

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
//           <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/gpa" class="button approve-button">Approve</a>
//           <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/gpa" class="button reject-button">Reject</a>
//         </div>
//       </body>
//     </html>
//   `;
// }

// export const gpaDetails = async (formData: FormData) => {
//   console.log("📝 Processing General Physician registration...");
//   const token = crypto.randomBytes(32).toString("hex");

//   const data = {
//     firstName: formData.get("firstName") as string,
//     lastName: formData.get("lastName") as string,
//     phoneNumber: formData.get("phoneNumber") as string,
//     email: formData.get("email") as string,
//     residentialAddress: formData.get("residentialAddress") as string,
//     clinicAddress: formData.get("clinicAddress") as string,
//     dob: formData.get("dob") as string,
//     medicalRegNumber: formData.get("medicalRegNumber") as string,
//     medicalCouncil: formData.get("medicalCouncil") as string,
//     dateOfReg: formData.get("dateOfReg") as string,
//     qualification: formData.get("qualification") as string,
//     institution: formData.get("institution") as string,
//     yearOfPassing: formData.get("yearOfPassing") as string,
//     totalExperience: formData.get("totalExperience") as string,
//     gpExperience: formData.get("gpExperience") as string,
//     hospitalName: formData.get("hospitalName") as string,
//     designation: formData.get("designation") as string,
//     affiliations: formData.get("affiliations") as string,
//     teleconsultationExperience: formData.get("teleconsultationExperience") === "true",
//     teleconsultationDetails: formData.get("teleconsultationDetails") as string,
//     preferredDays: formData.getAll("preferredDays") as string[],
//     preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
//     hasComputer: formData.get("hasComputer") === "true",
//     hasInternet: formData.get("hasInternet") === "true",
//     platformUsed: formData.get("platformUsed") as string,
//     certifications: formData.get("certifications") as string,
//     compliantWithGuidelines: formData.get("compliantWithGuidelines") === "true",
//     signature: formData.get("signature") as string,
//     date: formData.get("date") as string,
//     token: token,
//     status: "pending",
//   };

//   try {
//     // Save to database
//     console.log("💾 Saving to database...");
//     const response = await fetch("https://crowdshaki.vercel.app/api/gpa", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const apiResult = await response.json();
//     console.log("✅ Data saved to database:", apiResult);

//     // Send admin notification email using Gmail
//     console.log("📧 Sending admin notification email...");
    
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
//       from: `"CrowdShaki Registration" <${process.env.EMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL,
//       subject: `🩺 New General Physician Registration - Dr. ${data.firstName} ${data.lastName}`,
//       html: generateHtmlTable(data, token),
//     };

//     const emailResult = await transporter.sendMail(mailOptions);
//     console.log("✅ Admin notification email sent successfully!");
//     console.log(`📧 Message ID: ${emailResult.messageId}`);

//     return {
//       success: true,
//       apiResult,
//       emailSent: true,
//       message: "General Physician registered successfully",
//     };
//   } catch (error: any) {
//     console.error("❌ Error in registration:", error);
//     return {
//       success: false,
//       apiResult: null,
//       emailSent: false,
//       error: error.message,
//     };
//   }
// };

// // ============================================
// // OTP FUNCTIONS (EMAIL + MOBILE)
// // ============================================

// const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

// function generateOTP(): string {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// async function storeOTP(email: string, otp: string, expiresAt: Date) {
//   const client = await connectToDatabase();
//   const db = client.db("crowdshaki");
//   await db
//     .collection("otps")
//     .updateOne({ email }, { $set: { otp, expiresAt } }, { upsert: true });
// }

// // Send Email OTP using Gmail
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
//       subject: 'Your OTP - CrowdShaki General Physician Registration',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
//           <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
//             <h1 style="color: white; margin: 0; font-size: 28px;">CrowdShaki</h1>
//           </div>
          
//           <div style="padding: 40px 30px; background: #f9f9f9;">
//             <h2 style="color: #333; margin-top: 0;">Your OTP Code</h2>
            
//             <p style="font-size: 16px; color: #666; line-height: 1.6;">
//               Thank you for registering as a General Physician with CrowdShaki. Use the OTP below to verify your account:
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
//           </div>
//         </div>
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`✅ Email OTP sent successfully to ${email}`);
//     console.log(`📧 Message ID: ${info.messageId}`);
//     return { success: true };
    
//   } catch (error: any) {
//     console.error('❌ Error sending email OTP:', error);
//     return { success: false, error: error.message };
//   }
// }

// // Send SMS OTP using Fast2SMS
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

// // MAIN: Send OTP to BOTH Email and Mobile
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
//     console.log(`🔍 Verifying OTP for: ${email}`);
//     const isValid = await validateOTP(email, otp);

//     if (!isValid) {
//       console.log("❌ Invalid or expired OTP");
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
//   } catch (error: any) {
//     console.error("💥 OTP verification error:", error);
//     return {
//       success: false,
//       error: error.message || "OTP verification failed",
//     };
//   }
// }



// "use server";

// import crypto from "crypto";
// import { connectToDatabase } from "@/app/lib/database";
// import nodemailer from "nodemailer";

// // ============================================
// // ADMIN EMAIL NOTIFICATION
// // ============================================

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
//           <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/gpa" class="button approve-button">Approve</a>
//           <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/gpa" class="button reject-button">Reject</a>
//         </div>
//       </body>
//     </html>
//   `;
// }

// export const gpaDetails = async (formData: FormData) => {
//   console.log("📝 Processing General Physician registration...");
//   const token = crypto.randomBytes(32).toString("hex");

//   const data = {
//     firstName: formData.get("firstName") as string,
//     lastName: formData.get("lastName") as string,
//     phoneNumber: formData.get("phoneNumber") as string,
//     email: formData.get("email") as string,
//     residentialAddress: formData.get("residentialAddress") as string,
//     clinicAddress: formData.get("clinicAddress") as string,
//     dob: formData.get("dob") as string,
//     medicalRegNumber: formData.get("medicalRegNumber") as string,
//     medicalCouncil: formData.get("medicalCouncil") as string,
//     dateOfReg: formData.get("dateOfReg") as string,
//     qualification: formData.get("qualification") as string,
//     institution: formData.get("institution") as string,
//     yearOfPassing: formData.get("yearOfPassing") as string,
//     totalExperience: formData.get("totalExperience") as string,
//     gpExperience: formData.get("gpExperience") as string,
//     hospitalName: formData.get("hospitalName") as string,
//     designation: formData.get("designation") as string,
//     affiliations: formData.get("affiliations") as string,
//     teleconsultationExperience: formData.get("teleconsultationExperience") === "true",
//     teleconsultationDetails: formData.get("teleconsultationDetails") as string,
//     preferredDays: formData.getAll("preferredDays") as string[],
//     preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
//     hasComputer: formData.get("hasComputer") === "true",
//     hasInternet: formData.get("hasInternet") === "true",
//     platformUsed: formData.get("platformUsed") as string,
//     certifications: formData.get("certifications") as string,
//     compliantWithGuidelines: formData.get("compliantWithGuidelines") === "true",
//     signature: formData.get("signature") as string,
//     date: formData.get("date") as string,
//     token: token,
//     status: "pending",
//   };

//   try {
//     // Save to database
//     console.log("💾 Saving to database...");
//     const response = await fetch("https://crowdshaki.vercel.app/api/gpa", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const apiResult = await response.json();
//     console.log("✅ Data saved to database:", apiResult);

//     // Send admin notification email using Gmail
//     console.log("📧 Sending admin notification email...");
    
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
//       from: `"CrowdShaki Registration" <${process.env.EMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL,
//       subject: `🩺 New General Physician Registration - Dr. ${data.firstName} ${data.lastName}`,
//       html: generateHtmlTable(data, token),
//     };

//     const emailResult = await transporter.sendMail(mailOptions);
//     console.log("✅ Admin notification email sent successfully!");
//     console.log(`📧 Message ID: ${emailResult.messageId}`);

//     return {
//       success: true,
//       apiResult,
//       emailSent: true,
//       message: "General Physician registered successfully",
//     };
//   } catch (error: any) {
//     console.error("❌ Error in registration:", error);
//     return {
//       success: false,
//       apiResult: null,
//       emailSent: false,
//       error: error.message,
//     };
//   }
// };

// // ============================================
// // OTP FUNCTIONS (EMAIL + MOBILE)
// // ============================================

// const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

// function generateOTP(): string {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// async function storeOTP(email: string, otp: string, expiresAt: Date) {
//   const client = await connectToDatabase();
//   const db = client.db("crowdshaki");
//   await db
//     .collection("otps")
//     .updateOne({ email }, { $set: { otp, expiresAt } }, { upsert: true });
// }

// // Send Email OTP using Gmail
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
//       subject: 'Your OTP - CrowdShaki General Physician Registration',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
//           <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
//             <h1 style="color: white; margin: 0; font-size: 28px;">CrowdShaki</h1>
//           </div>
          
//           <div style="padding: 40px 30px; background: #f9f9f9;">
//             <h2 style="color: #333; margin-top: 0;">Your OTP Code</h2>
            
//             <p style="font-size: 16px; color: #666; line-height: 1.6;">
//               Thank you for registering as a General Physician with CrowdShaki. Use the OTP below to verify your account:
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
//           </div>
//         </div>
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`✅ Email OTP sent successfully to ${email}`);
//     console.log(`📧 Message ID: ${info.messageId}`);
//     return { success: true };
    
//   } catch (error: any) {
//     console.error('❌ Error sending email OTP:', error);
//     return { success: false, error: error.message };
//   }
// }

// // Send SMS OTP using Fast2SMS
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

// // MAIN: Send OTP to BOTH Email and Mobile
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
//     console.log(`🔍 Verifying OTP for: ${email}`);
//     const isValid = await validateOTP(email, otp);

//     if (!isValid) {
//       console.log("❌ Invalid or expired OTP");
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
//   } catch (error: any) {
//     console.error("💥 OTP verification error:", error);
//     return {
//       success: false,
//       error: error.message || "OTP verification failed",
//     };
//   }
// }




// "use server";

// import crypto from "crypto";
// import { connectToDatabase } from "@/app/lib/database";
// import nodemailer from "nodemailer";

// // ============================================
// // ADMIN EMAIL NOTIFICATION
// // ============================================

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
//           <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/gpa" class="button approve-button">Approve</a>
//           <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/gpa" class="button reject-button">Reject</a>
//         </div>
//       </body>
//     </html>
//   `;
// }

// export const gpaDetails = async (formData: FormData) => {
//   console.log("📝 Processing General Physician registration...");
//   const token = crypto.randomBytes(32).toString("hex");

//   const data = {
//     firstName: formData.get("firstName") as string,
//     lastName: formData.get("lastName") as string,
//     phoneNumber: formData.get("phoneNumber") as string,
//     email: formData.get("email") as string,
//     residentialAddress: formData.get("residentialAddress") as string,
//     clinicAddress: formData.get("clinicAddress") as string,
//     dob: formData.get("dob") as string,
//     medicalRegNumber: formData.get("medicalRegNumber") as string,
//     medicalCouncil: formData.get("medicalCouncil") as string,
//     dateOfReg: formData.get("dateOfReg") as string,
//     qualification: formData.get("qualification") as string,
//     institution: formData.get("institution") as string,
//     yearOfPassing: formData.get("yearOfPassing") as string,
//     totalExperience: formData.get("totalExperience") as string,
//     gpExperience: formData.get("gpExperience") as string,
//     hospitalName: formData.get("hospitalName") as string,
//     designation: formData.get("designation") as string,
//     affiliations: formData.get("affiliations") as string,
//     teleconsultationExperience: formData.get("teleconsultationExperience") === "true",
//     teleconsultationDetails: formData.get("teleconsultationDetails") as string,
//     preferredDays: formData.getAll("preferredDays") as string[],
//     preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
//     hasComputer: formData.get("hasComputer") === "true",
//     hasInternet: formData.get("hasInternet") === "true",
//     platformUsed: formData.get("platformUsed") as string,
//     certifications: formData.get("certifications") as string,
//     compliantWithGuidelines: formData.get("compliantWithGuidelines") === "true",
//     signature: formData.get("signature") as string,
//     date: formData.get("date") as string,
//     token: token,
//     status: "pending",
//   };

//   try {
//     // Save to database
//     console.log("💾 Saving to database...");
//     const response = await fetch("https://crowdshaki.vercel.app/api/gpa", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const apiResult = await response.json();
//     console.log("✅ Data saved to database:", apiResult);

//     // Send admin notification email using Gmail
//     console.log("📧 Sending admin notification email...");
    
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
//       from: `"CrowdShaki Registration" <${process.env.EMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL,
//       subject: `🩺 New General Physician Registration - Dr. ${data.firstName} ${data.lastName}`,
//       html: generateHtmlTable(data, token),
//     };

//     const emailResult = await transporter.sendMail(mailOptions);
//     console.log("✅ Admin notification email sent successfully!");
//     console.log(`📧 Message ID: ${emailResult.messageId}`);

//     return {
//       success: true,
//       apiResult,
//       emailSent: true,
//       message: "General Physician registered successfully",
//     };
//   } catch (error: any) {
//     console.error("❌ Error in registration:", error);
//     return {
//       success: false,
//       apiResult: null,
//       emailSent: false,
//       error: error.message,
//     };
//   }
// };

// // ============================================
// // OTP FUNCTIONS (EMAIL + MOBILE)
// // ============================================

// const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

// function generateOTP(): string {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// async function storeOTP(email: string, otp: string, expiresAt: Date) {
//   const client = await connectToDatabase();
//   const db = client.db("crowdshaki");
//   await db
//     .collection("otps")
//     .updateOne({ email }, { $set: { otp, expiresAt } }, { upsert: true });
// }

// // Send Email OTP using Gmail
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
//       subject: 'Your OTP - CrowdShaki General Physician Registration',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
//           <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
//             <h1 style="color: white; margin: 0; font-size: 28px;">CrowdShaki</h1>
//           </div>
          
//           <div style="padding: 40px 30px; background: #f9f9f9;">
//             <h2 style="color: #333; margin-top: 0;">Your OTP Code</h2>
            
//             <p style="font-size: 16px; color: #666; line-height: 1.6;">
//               Thank you for registering as a General Physician with CrowdShaki. Use the OTP below to verify your account:
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
//           </div>
//         </div>
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`✅ Email OTP sent successfully to ${email}`);
//     console.log(`📧 Message ID: ${info.messageId}`);
//     return { success: true };
    
//   } catch (error: any) {
//     console.error('❌ Error sending email OTP:', error);
//     return { success: false, error: error.message };
//   }
// }

// // Send SMS OTP using Fast2SMS
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

// // MAIN: Send OTP to BOTH Email and Mobile
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
//         message: "OTP sent to email. Please check your email inbox and use the OTP.",
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
//     console.log(`🔍 Verifying OTP for: ${email}`);
//     const isValid = await validateOTP(email, otp);

//     if (!isValid) {
//       console.log("❌ Invalid or expired OTP");
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
//   } catch (error: any) {
//     console.error("💥 OTP verification error:", error);
//     return {
//       success: false,
//       error: error.message || "OTP verification failed",
//     };
//   }
// }



"use server";

import crypto from "crypto";
import { connectToDatabase } from "@/app/lib/database";
import nodemailer from "nodemailer";

console.log("🔥 LOADING GPA DETAILS MODULE - Gmail + Fast2SMS!");

// ============================================
// EMAIL TRANSPORTER
// ============================================

function createEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
}

// ============================================
// ADMIN EMAIL NOTIFICATION
// ============================================

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
          <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/gpa" class="button approve-button">Approve</a>
          <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/gpa" class="button reject-button">Reject</a>
        </div>
      </body>
    </html>
  `;
}

export const gpaDetails = async (formData: FormData) => {
  console.log("📝 Processing General Physician registration...");
  const token = crypto.randomBytes(32).toString("hex");

  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    email: formData.get("email") as string,
    residentialAddress: formData.get("residentialAddress") as string,
    clinicAddress: formData.get("clinicAddress") as string,
    dob: formData.get("dob") as string,
    medicalRegNumber: formData.get("medicalRegNumber") as string,
    medicalCouncil: formData.get("medicalCouncil") as string,
    dateOfReg: formData.get("dateOfReg") as string,
    qualification: formData.get("qualification") as string,
    institution: formData.get("institution") as string,
    yearOfPassing: formData.get("yearOfPassing") as string,
    totalExperience: formData.get("totalExperience") as string,
    gpExperience: formData.get("gpExperience") as string,
    hospitalName: formData.get("hospitalName") as string,
    designation: formData.get("designation") as string,
    affiliations: formData.get("affiliations") as string,
    teleconsultationExperience: formData.get("teleconsultationExperience") === "true",
    teleconsultationDetails: formData.get("teleconsultationDetails") as string,
    preferredDays: formData.getAll("preferredDays") as string[],
    preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
    hasComputer: formData.get("hasComputer") === "true",
    hasInternet: formData.get("hasInternet") === "true",
    platformUsed: formData.get("platformUsed") as string,
    certifications: formData.get("certifications") as string,
    compliantWithGuidelines: formData.get("compliantWithGuidelines") === "true",
    signature: formData.get("signature") as string,
    date: formData.get("date") as string,
    token: token,
    status: "pending",
  };

  try {
    // Save to database
    console.log("💾 Saving to database...");
    const response = await fetch("https://crowdshaki.vercel.app/api/gpa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const apiResult = await response.json();
    console.log("✅ Data saved to database");

    // Send admin notification email using Gmail
    console.log("📧 Sending admin notification email...");
    const transporter = createEmailTransporter();
    await transporter.sendMail({
      from: `"CrowdShaki Registration" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🩺 New General Physician Registration - Dr. ${data.firstName} ${data.lastName}`,
      html: generateHtmlTable(data, token),
    });
    console.log("✅ Admin notification email sent");

    return {
      success: true,
      apiResult,
      emailSent: true,
      message: "General Physician registered successfully",
    };
  } catch (error: any) {
    console.error("❌ Error in registration:", error);
    return {
      success: false,
      apiResult: null,
      emailSent: false,
      error: error.message,
    };
  }
};

// ============================================
// OTP FUNCTIONS (EMAIL + MOBILE)
// ============================================

const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function storeOTP(email: string, otp: string, expiresAt: Date) {
  try {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    await db
      .collection("otps")
      .updateOne({ email }, { $set: { otp, expiresAt } }, { upsert: true });
    console.log("✅ OTP stored in database");
  } catch (error) {
    console.error("❌ Error storing OTP:", error);
    throw error;
  }
}

// Send Email OTP using Gmail
async function sendEmailOTP(email: string, otp: string): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("📧 Sending email OTP to:", email);
    const transporter = createEmailTransporter();

    await transporter.sendMail({
      from: `"CrowdShaki GPA Registration" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP - CrowdShaki General Physician Registration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🩺 CrowdShaki</h1>
          </div>
          
          <div style="padding: 40px 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-top: 0;">Your OTP Code</h2>
            
            <p style="font-size: 16px; color: #666; line-height: 1.6;">
              Thank you for registering as a General Physician with CrowdShaki. Use the OTP below to verify your account:
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
          </div>
        </div>
      `,
    });

    console.log("✅ Email OTP sent successfully");
    return { success: true };
  } catch (error: any) {
    console.error("❌ Error sending email:", error.message);
    return { success: false, error: error.message };
  }
}

// Send SMS OTP using Fast2SMS (FIXED - POST method with 'q' route)
async function sendOTPSMS(otp: string, phone: string): Promise<{ otpSent: boolean; error?: string }> {
  try {
    const apiKey = process.env.FAST2SMS_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ Fast2SMS API key not configured");
      return { otpSent: false, error: "SMS service not configured" };
    }

    const cleanPhone = phone.replace(/^\+91/, "").replace(/\s+/g, "").trim();

    if (!/^\d{10}$/.test(cleanPhone)) {
      console.error(`❌ Invalid phone number: ${phone}`);
      return { otpSent: false, error: `Invalid phone number: ${phone}` };
    }

    const message = `Your CrowdShaki General Physician Registration OTP is ${otp}. Valid for 5 minutes. Do not share with anyone.`;

    console.log(`📱 Sending SMS OTP to ${cleanPhone}...`);

    // ✅ Use POST method with 'q' route - No website verification needed!
    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        "authorization": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: "q",  // Quick transactional route
        message: message,
        language: "english",
        flash: 0,
        numbers: cleanPhone,
      }),
    });

    const data = await response.json();
    console.log("📊 Fast2SMS Response:", data);

    if (data.return === true || data.status_code === 200) {
      console.log("✅ SMS OTP sent successfully");
      return { otpSent: true };
    } else {
      console.error("❌ Fast2SMS error:", data);
      return { otpSent: false, error: data.message || "SMS failed" };
    }
  } catch (error: any) {
    console.error("❌ Error sending SMS:", error);
    return { otpSent: false, error: error.message };
  }
}

// MAIN: Send OTP to BOTH Email and Mobile
export async function sendOTP(email: string, phone: string) {
  console.log("🔥 Sending OTP via Gmail and Fast2SMS");
  console.log("📤 Email:", email, "Phone:", phone);

  try {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION);

    await storeOTP(email, otp, expiresAt);

    const phoneNumber = phone.startsWith("+91") ? phone : "+91" + phone;

    const [smsResult, emailResult] = await Promise.all([
      sendOTPSMS(otp, phoneNumber),
      sendEmailOTP(email, otp),
    ]);

    console.log("📊 Results - SMS:", smsResult.otpSent, "Email:", emailResult.success);

    if (smsResult.otpSent && emailResult.success) {
      return {
        success: true,
        message: "OTP sent successfully to both email and mobile",
      };
    } else if (emailResult.success) {
      return {
        success: true,
        message: "OTP sent to email (SMS failed - check balance)",
      };
    } else {
      return {
        success: false,
        error: "Failed to send OTP",
      };
    }
  } catch (error: any) {
    console.error("❌ Error in sendOTP:", error);
    return {
      success: false,
      error: error.message || "Failed to send OTP",
    };
  }
}

async function validateOTP(email: string, otp: string) {
  try {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    const record = await db.collection("otps").findOne({ email });

    if (!record) {
      console.log("❌ No OTP found for:", email);
      return false;
    }

    const { otp: storedOTP, expiresAt } = record;

    if (storedOTP === otp && new Date() < new Date(expiresAt)) {
      console.log("✅ OTP validated successfully");
      return true;
    }

    console.log("❌ OTP invalid or expired");
    return false;
  } catch (error) {
    console.error("❌ Error validating OTP:", error);
    return false;
  }
}

async function removeOTP(email: string) {
  try {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    await db.collection("otps").deleteOne({ email });
    console.log("✅ OTP removed from database");
  } catch (error) {
    console.error("❌ Error removing OTP:", error);
  }
}

export async function verifyOTP(email: string, otp: string) {
  console.log("🔍 Verifying OTP for:", email);

  try {
    const isValid = await validateOTP(email, otp);

    if (!isValid) {
      return {
        success: false,
        error: "Invalid or expired OTP",
      };
    }

    await removeOTP(email);

    return {
      success: true,
      message: "OTP verification successful",
    };
  } catch (error: any) {
    console.error("❌ OTP verification error:", error);
    return {
      success: false,
      error: error.message || "OTP verification failed",
    };
  }
}