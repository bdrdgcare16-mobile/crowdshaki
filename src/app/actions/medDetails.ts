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
//   <html>
//     <head>
//       <style>
//           .buttons {
//     margin-top: 40px;
//   }

//   .button {
//     display: inline-block;
//     padding: 16px 32px;
//     margin-right: 16px;
//     font-size: 16px;
//     font-weight: 500;
//     border-radius: 8px;
//     text-decoration: none;
//     color: white;
//     text-align: center;
//     transition: all 0.2s ease;
//   }

//   .approve-button {
//     background-color: #28a745;
//   }

//   .approve-button:hover {
//     background-color: #218838;
//   }

//   .reject-button {
//     background-color: #dc3545;
//   }

//   .reject-button:hover {
//     background-color: #c82333;
//   }
//       </style>
//     </head>
//     <body>
//     <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
//     <thead>
//     <tr style="background-color: #f2f2f2;">
//     <th style="text-align: left;">Field</th>
//     <th style="text-align: left;">Value</th>
//     </tr>
//     </thead>
//     <tbody>
//     ${generateRows(data)}
//     </tbody>
    
//     </table>
//     <div class="buttons">
//     <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/medicalInstitutions" class="button approve-button">Approve</a>
//     <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/medicalInstitutions" class="button reject-button">Reject</a>
//     </div>
//     </body>
//     </html>
//     `;
// }


// export const medDetails = async (formdata: FormData) => {
//   console.log("formdata:", formdata);
//     const token = crypto.randomBytes(32).toString("hex");

//   const data = {
//     collegeName: formdata.get("collegeName"),
//     abbreviation: formdata.get("abbreviation"),
//     street: formdata.get("street"),
//     city: formdata.get("city"),
//     state: formdata.get("state"),
//     postalCode: formdata.get("postalCode"),
//     country: formdata.get("country"),
//     phoneNumber: formdata.get("phoneNumber"),
//     email: formdata.get("email"),
//     website: formdata.get("website"),
//     registrationNumber: formdata.get("registrationNumber"),
//     dateOfRegistration: formdata.get("dateOfRegistration"),
//     accreditationDetails: formdata.get("accreditationDetails"),
//     principalName: formdata.get("principalName"),
//     principalContact: formdata.get("principalContact"),
//     principalEmail: formdata.get("principalEmail"),
//     primaryContactName: formdata.get("primaryContactName"),
//     primaryContactDesignation: formdata.get("primaryContactDesignation"),
//     primaryContactNumber: formdata.get("primaryContactNumber"),
//     primaryContactEmail: formdata.get("primaryContactEmail"),
//     totalBeds: formdata.get("totalBeds"),
//     icuBeds: formdata.get("icuBeds"),
//     emergencyBeds: formdata.get("emergencyBeds"),
//     speciality: formdata.get("speciality"),
//     otherSpecialties: formdata.get("otherSpecialties"),
//     services: formdata.get("services"),
//     otherServices: formdata.get("otherServices"),
//     emergencyAvailable: formdata.get("emergencyAvailable"),
//     emergencyContact: formdata.get("emergencyContact"),
//     totalDoctors: formdata.get("totalDoctors"),
//     specialists: formdata.get("specialists"),
//     residentDoctors: formdata.get("residentDoctors"),
//     nurses: formdata.get("nurses"),
//     keySpecialistSpecialty: formdata.get("keySpecialistSpecialty"),
//     keySpecialistName: formdata.get("keySpecialistName"),
//     keySpecialistQualification: formdata.get("keySpecialistQualification"),
//     keySpecialistContact: formdata.get("keySpecialistContact"),
//     keySpecialistEmail: formdata.get("keySpecialistEmail"),
//     teleconsultationDetails: formdata.get("teleconsultationDetails"),
//     diagnosticEquipment: formdata.get("diagnosticEquipment"),
//     surgicalEquipment: formdata.get("surgicalEquipment"),
//     otherCertifications: formdata.get("otherCertifications"),
//     hasTeleconsultation: formdata.get("hasTeleconsultation"),
//     isoCertified: formdata.get("isoCertified"),
//     nabhAccredited: formdata.get("nabhAccredited"),
//     compliantWithStandards: formdata.get("compliantWithStandards"),
//     complianceDetails: formdata.get("complianceDetails"),
//     signature: formdata.get("signature"),
//     date: formdata.get("date"),
//   };

//   const response = await fetch(
//     "https://crowdshaki.vercel.app/api/medical_insitutions",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }
//   );

//    const apiResult = await response.json();
//     const params: any = {
//       Source: data.email, // Use the email from environment variables
//       Destination: {
//         ToAddresses: [process.env.ADMIN_EMAIL], // Admin's email from environment variables
//       },
//       Message: {
//         Subject: {
//           Data: "Form Approval",
//         },
//         Body: {
//           Html: {
//             Data: generateHtmlTable(data, token), // Send the static HTML content as a string
//           },
//         },
//       },
//     };
  
//     const result = await ses.sendEmail(params).promise();
//     console.log("Email sent successfully:", result);
  
//     console.log(apiResult);
//     return { apiResult, emailSent: true };
//   };
  
//   const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes
  
//   // Generate a random OTP
//   function generateOTP(): string {
//     return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
//   }
  
//   async function storeOTP(email: string, otp: string, expiresAt: Date) {
//     const client = await connectToDatabase();
//     const db = client.db("crowdshaki");
//     await db
//       .collection("otps")
//       .updateOne({ email }, { $set: { otp, expiresAt } }, { upsert: true });
//   }
  
//   async function sendOTPSMS(email: string, otp: string, phone: string) {
//     const sourceEmail = process.env.ADMIN_EMAIL;
  
//     if (!sourceEmail) {
//       throw new Error("AWS_SES_FROM_EMAIL environment variable is not defined");
//     }
  
//     if (!email) {
//       throw new Error("Recipient email is not defined");
//     }
  
//     const params: any = {
//       Message: `Your OTP is: ${otp}`,
//       PhoneNumber: phone, // Ensure the mobile number is in E.164 format
//     };
  
//     try {
//       await sns.publish(params).promise();
//       return { otpSent: true };
//     } catch (error: any) {
//       console.error("Error sending OTP:", error);
//       return { otpSent: false, error: error.message };
//     }
//   }
  
//   export async function sendOTP(email: any, phone: any) {
//     const phoneNumber = "+91" + phone;
//     try {
//       const otp = generateOTP();
//       const expiresAt = new Date(Date.now() + OTP_EXPIRATION);
  
//       await storeOTP(email, otp, expiresAt);
//       await sendOTPSMS(email, otp, phoneNumber);
  
//       return {
//         success: true,
//         message: "OTP sent successfully",
//       };
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       return {
//         success: false,
//         error: "Failed to send OTP",
//       };
//     }
//   }
  
//   async function validateOTP(email: string, otp: string) {
//     const client = await connectToDatabase();
//     const db = client.db("crowdshaki");
//     const record = await db.collection("otps").findOne({ email });
  
//     if (!record) return false;
  
//     const { otp: storedOTP, expiresAt } = record;
  
//     if (storedOTP === otp && new Date() < new Date(expiresAt)) {
//       return true;
//     }
//     return false;
//   }
  
//   // Remove OTP after successful validation
//   async function removeOTP(email: string) {
//     const client = await connectToDatabase();
//     const db = client.db("crowdshaki");
//     await db.collection("otps").deleteOne({ email });
//   }
  
//   export async function verifyOTP(email: any, otp: any) {
//     try {
//       const isValid = await validateOTP(email, otp);
  
//       if (!isValid) {
//         console.log("Incorrect OTP");
//         return {
//           success: false,
//           error: "Invalid or expired OTP",
//         };
//       }
  
//       await removeOTP(email);
  
//       return {
//         success: true,
//         message: "OTP verification successful",
//       };
//     } catch (error) {
//       console.error("OTP verification error:", error);
//       return {
//         success: false,
//         error: "OTP verification failed",
//       };
//     }
//   }






// "use server";

// import crypto from "crypto";
// import nodemailer from "nodemailer";
// import { connectToDatabase } from "@/app/lib/database";

// console.log("🔥 LOADING MEDICAL INSTITUTIONS MODULE - Gmail + Fast2SMS!");

// // Create nodemailer transporter for Gmail
// function createEmailTransporter() {
//   return nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_APP_PASSWORD,
//     },
//   });
// }

// function generateHtmlTable(data: any, token: any): string {
//   const generateRows = (obj: any, depth: number = 0): string => {
//     if (!obj || typeof obj !== 'object') {
//       return '';
//     }

//     return Object.entries(obj)
//       .filter(([key, value]) => value !== null && value !== undefined)
//       .map(([key, value]) => {
//         if (typeof value === "object" && !Array.isArray(value) && value !== null) {
//           return `
//             <tr>
//                 <td style="font-weight: bold; padding-left: ${depth * 20}px;" colspan="2">${key}</td>
//             </tr>
//             ${generateRows(value, depth + 1)}
//           `;
//         } else if (Array.isArray(value)) {
//           const displayValue = value.length > 0 ? value.join(", ") : "None";
//           return `
//             <tr>
//                 <td style="font-weight: bold; padding-left: ${depth * 20}px;">${key}</td>
//                 <td>${displayValue}</td>
//             </tr>
//           `;
//         } else {
//           return `
//             <tr>
//                 <td style="font-weight: bold; padding-left: ${depth * 20}px;">${key}</td>
//                 <td>${value || "N/A"}</td>
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
//             table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
//             th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//             th { background-color: #f2f2f2; }
//             .buttons { margin-top: 40px; }
//             .button {
//               display: inline-block;
//               padding: 16px 32px;
//               margin-right: 16px;
//               font-size: 16px;
//               font-weight: 500;
//               border-radius: 8px;
//               text-decoration: none;
//               color: white;
//               text-align: center;
//             }
//             .approve-button { background-color: #28a745; }
//             .reject-button { background-color: #dc3545; }
//         </style>
//       </head>
//       <body>
//         <h2>New Medical Institution Registration - Awaiting Approval</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Field</th>
//               <th>Value</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${generateRows(data)}
//           </tbody>
//         </table>
//         <div class="buttons">
//           <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/MedicalInstitutions" class="button approve-button">Approve</a>
//           <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/MedicalInstitutions" class="button reject-button">Reject</a>
//         </div>
//       </body>
//     </html>
//   `;
// }

// export const medDetails = async (formData: FormData) => {
//   console.log("📝 Processing medical institution registration...");

//   try {
//     const token = crypto.randomBytes(32).toString("hex");

//     const data = {
//       collegeName: formData.get("collegeName") as string,
//       abbreviation: formData.get("abbreviation") as string,
//       street: formData.get("street") as string,
//       city: formData.get("city") as string,
//       state: formData.get("state") as string,
//       postalCode: formData.get("postalCode") as string,
//       country: formData.get("country") as string,
//       phoneNumber: formData.get("phoneNumber") as string,
//       email: formData.get("email") as string,
//       website: formData.get("website") as string,
//       registrationNumber: formData.get("registrationNumber") as string,
//       dateOfRegistration: formData.get("dateOfRegistration") as string,
//       accreditationDetails: formData.get("accreditationDetails") as string,
//       principalName: formData.get("principalName") as string,
//       principalContact: formData.get("principalContact") as string,
//       principalEmail: formData.get("principalEmail") as string,
//       primaryContactName: formData.get("primaryContactName") as string,
//       primaryContactDesignation: formData.get("primaryContactDesignation") as string,
//       primaryContactNumber: formData.get("primaryContactNumber") as string,
//       primaryContactEmail: formData.get("primaryContactEmail") as string,
//       totalBeds: formData.get("totalBeds") as string,
//       icuBeds: formData.get("icuBeds") as string,
//       emergencyBeds: formData.get("emergencyBeds") as string,
//       specialties: formData.getAll("specialties") as string[],
//       otherSpecialties: formData.get("otherSpecialties") as string,
//       services: formData.getAll("services") as string[],
//       otherServices: formData.get("otherServices") as string,
//       emergencyAvailable: formData.get("emergencyAvailable") as string,
//       emergencyContact: formData.get("emergencyContact") as string,
//       totalDoctors: formData.get("totalDoctors") as string,
//       specialists: formData.get("specialists") as string,
//       residentDoctors: formData.get("residentDoctors") as string,
//       nurses: formData.get("nurses") as string,
//       keySpecialistSpecialty: formData.get("keySpecialistSpecialty") as string,
//       keySpecialistName: formData.get("keySpecialistName") as string,
//       keySpecialistQualification: formData.get("keySpecialistQualification") as string,
//       keySpecialistContact: formData.get("keySpecialistContact") as string,
//       keySpecialistEmail: formData.get("keySpecialistEmail") as string,
//       hasTeleconsultation: formData.get("hasTeleconsultation") as string,
//       teleconsultationDetails: formData.get("teleconsultationDetails") as string,
//       diagnosticEquipment: formData.get("diagnosticEquipment") as string,
//       surgicalEquipment: formData.get("surgicalEquipment") as string,
//       isoCertified: formData.get("isoCertified") as string,
//       nabhAccredited: formData.get("nabhAccredited") as string,
//       otherCertifications: formData.get("otherCertifications") as string,
//       compliantWithStandards: formData.get("compliantWithStandards") as string,
//       complianceDetails: formData.get("complianceDetails") as string,
//       signature: formData.get("signature") as string,
//       date: formData.get("date") as string,
//     };

//     console.log("🌐 Submitting to API...");
//     const response = await fetch("https://crowdshaki.vercel.app/api/medicalInstitutions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const apiResult = await response.json();
//     console.log("✅ API submission successful");

//     try {
//       console.log("📧 Sending admin notification email...");
//       const transporter = createEmailTransporter();
//       await transporter.sendMail({
//         from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
//         to: process.env.ADMIN_EMAIL,
//         subject: "New Medical Institution Registration - Approval Required",
//         html: generateHtmlTable(data, token),
//       });
//       console.log("✅ Admin notification sent successfully");
//     } catch (emailError: any) {
//       console.error("❌ Failed to send admin email:", emailError.message);
//     }

//     return { success: true, apiResult, emailSent: true };
//   } catch (error: any) {
//     console.error("❌ Error in medDetails:", error);
//     throw error;
//   }
// };

// const OTP_EXPIRATION = 5 * 60 * 1000;

// function generateOTP(): string {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// async function storeOTP(email: string, otp: string, expiresAt: Date) {
//   try {
//     const client = await connectToDatabase();
//     const db = client.db("crowdshaki");
//     await db
//       .collection("otps")
//       .updateOne({ email }, { $set: { otp, expiresAt } }, { upsert: true });
//     console.log("✅ OTP stored in database");
//   } catch (error) {
//     console.error("❌ Error storing OTP:", error);
//     throw error;
//   }
// }

// async function sendOTPSMS(otp: string, phone: string): Promise<{ otpSent: boolean; error?: string }> {
//   try {
//     const apiKey = process.env.FAST2SMS_API_KEY;
//     if (!apiKey) {
//       console.warn("⚠️ Fast2SMS API key not configured");
//       return { otpSent: false, error: "SMS service not configured" };
//     }

//     const cleanPhone = phone.replace("+91", "").replace(/\s/g, "");
//     console.log("📱 Sending SMS to:", cleanPhone);

//     // Use 'q' route instead of 'otp' route (doesn't need website verification)
//     const message = `Your OTP for G Care Medical Institution Registration is ${otp}. Valid for 5 minutes. Do not share with anyone.`;

//     const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
//       method: "POST",
//       headers: {
//         "authorization": apiKey,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         route: "q",  // Changed from 'otp' to 'q' (quick transactional)
//         message: message,
//         language: "english",
//         flash: 0,
//         numbers: cleanPhone,
//       }),
//     });

//     const result = await response.json();

//     if (result.return === true) {
//       console.log("✅ SMS OTP sent successfully");
//       return { otpSent: true };
//     } else {
//       console.error("❌ Fast2SMS error:", result);
//       return { otpSent: false, error: result.message || "SMS failed" };
//     }
//   } catch (error: any) {
//     console.error("❌ Error sending SMS:", error);
//     return { otpSent: false, error: error.message };
//   }
// }

// async function sendOTPEmail(email: string, otp: string): Promise<{ otpSent: boolean; error?: string }> {
//   try {
//     console.log("📧 Sending email OTP to:", email);
//     const transporter = createEmailTransporter();

//     await transporter.sendMail({
//       from: `"G Care Medical Institution Registration" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP for Medical Institution Registration",
//       html: `
//         <html>
//           <head>
//             <style>
//               body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; }
//               .container { background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
//               h2 { color: #333; margin-bottom: 20px; }
//               .otp-box { background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
//               .otp-code { color: #28a745; font-size: 36px; font-weight: bold; letter-spacing: 8px; margin: 10px 0; }
//               .warning { color: #dc3545; font-weight: bold; margin-top: 20px; }
//               .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <h2>G Care Medical Institution Registration</h2>
//               <p>Dear Administrator,</p>
//               <p>Your OTP for registration verification:</p>
//               <div class="otp-box">
//                 <p style="margin: 0; color: #666;">Your OTP is:</p>
//                 <div class="otp-code">${otp}</div>
//                 <p style="margin: 0; color: #666; font-size: 14px;">Valid for 5 minutes</p>
//               </div>
//               <p class="warning">⚠️ Do not share this OTP with anyone.</p>
//               <div class="footer">
//                 <p>If you did not request this, please ignore this email.</p>
//               </div>
//             </div>
//           </body>
//         </html>
//       `,
//       text: `Your OTP for G Care Medical Institution Registration is: ${otp}. Valid for 5 minutes.`,
//     });

//     console.log("✅ Email OTP sent successfully");
//     return { otpSent: true };
//   } catch (error: any) {
//     console.error("❌ Error sending email:", error.message);
//     return { otpSent: false, error: error.message };
//   }
// }

// export async function sendOTP(email: string, phone: string) {
//   console.log("🔥 Sending OTP via Gmail and Fast2SMS");
//   console.log("📤 Email:", email, "Phone:", phone);

//   try {
//     const otp = generateOTP();
//     const expiresAt = new Date(Date.now() + OTP_EXPIRATION);

//     await storeOTP(email, otp, expiresAt);

//     const phoneNumber = phone.startsWith("+91") ? phone : "+91" + phone;

//     const [smsResult, emailResult] = await Promise.all([
//       sendOTPSMS(otp, phoneNumber),
//       sendOTPEmail(email, otp),
//     ]);

//     console.log("📊 Results - SMS:", smsResult.otpSent, "Email:", emailResult.otpSent);

//     if (smsResult.otpSent || emailResult.otpSent) {
//       return {
//         success: true,
//         message: "OTP sent successfully",
//         sentVia: {
//           sms: smsResult.otpSent,
//           email: emailResult.otpSent,
//         },
//       };
//     } else {
//       return {
//         success: false,
//         error: "Failed to send OTP via both channels",
//       };
//     }
//   } catch (error: any) {
//     console.error("❌ Error in sendOTP:", error);
//     return {
//       success: false,
//       error: error.message || "Failed to send OTP",
//     };
//   }
// }

// async function validateOTP(email: string, otp: string) {
//   try {
//     const client = await connectToDatabase();
//     const db = client.db("crowdshaki");
//     const record = await db.collection("otps").findOne({ email });

//     if (!record) {
//       console.log("❌ No OTP found for:", email);
//       return false;
//     }

//     const { otp: storedOTP, expiresAt } = record;

//     if (storedOTP === otp && new Date() < new Date(expiresAt)) {
//       console.log("✅ OTP validated successfully");
//       return true;
//     }

//     console.log("❌ OTP invalid or expired");
//     return false;
//   } catch (error) {
//     console.error("❌ Error validating OTP:", error);
//     return false;
//   }
// }

// async function removeOTP(email: string) {
//   try {
//     const client = await connectToDatabase();
//     const db = client.db("crowdshaki");
//     await db.collection("otps").deleteOne({ email });
//     console.log("✅ OTP removed from database");
//   } catch (error) {
//     console.error("❌ Error removing OTP:", error);
//   }
// }

// export async function verifyOTP(email: string, otp: string) {
//   console.log("🔍 Verifying OTP for:", email);

//   try {
//     const isValid = await validateOTP(email, otp);

//     if (!isValid) {
//       return {
//         success: false,
//         error: "Invalid or expired OTP. Please try again.",
//       };
//     }

//     await removeOTP(email);

//     return {
//       success: true,
//       message: "OTP verified successfully",
//     };
//   } catch (error: any) {
//     console.error("❌ OTP verification error:", error);
//     return {
//       success: false,
//       error: "Verification failed. Please try again.",
//     };
//   }
// }




"use server";

import crypto from "crypto";
import nodemailer from "nodemailer";

console.log("🔥 LOADING MEDICAL INSTITUTIONS - COMPLETE SYSTEM WITH GLOBAL OTP STORE!");

// ============================================
// GLOBAL OTP STORE - SINGLETON PATTERN
// This fixes the persistence issue across server action calls
// ============================================

declare global {
  var otpStore: Map<string, { otp: string; expiresAt: Date }> | undefined;
}

const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

// Use global to persist the Map across server action calls
const otpStore = global.otpStore || new Map<string, { otp: string; expiresAt: Date }>();

if (process.env.NODE_ENV !== "production") {
  global.otpStore = otpStore;
}

// ============================================
// EMAIL TRANSPORTER
// ============================================

function createEmailTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
}

// ============================================
// HTML TABLE GENERATOR FOR ADMIN EMAIL
// ============================================

function generateHtmlTable(data: any, token: any): string {
  const generateRows = (obj: any, depth: number = 0): string => {
    if (!obj || typeof obj !== 'object') {
      return '';
    }

    return Object.entries(obj)
      .filter(([key, value]) => value !== null && value !== undefined)
      .map(([key, value]) => {
        if (typeof value === "object" && !Array.isArray(value) && value !== null) {
          return `
            <tr>
                <td style="font-weight: bold; padding-left: ${depth * 20}px;" colspan="2">${key}</td>
            </tr>
            ${generateRows(value, depth + 1)}
          `;
        } else if (Array.isArray(value)) {
          const displayValue = value.length > 0 ? value.join(", ") : "None";
          return `
            <tr>
                <td style="font-weight: bold; padding-left: ${depth * 20}px;">${key}</td>
                <td>${displayValue}</td>
            </tr>
          `;
        } else {
          return `
            <tr>
                <td style="font-weight: bold; padding-left: ${depth * 20}px;">${key}</td>
                <td>${value || "N/A"}</td>
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
            table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
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
            }
            .approve-button { background-color: #28a745; }
            .reject-button { background-color: #dc3545; }
        </style>
      </head>
      <body>
        <h2>🏥 New Medical Institution Registration - Awaiting Approval</h2>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            ${generateRows(data)}
          </tbody>
        </table>
        <div class="buttons">
          <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/MedicalInstitutions" class="button approve-button">Approve</a>
          <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/MedicalInstitutions" class="button reject-button">Reject</a>
        </div>
      </body>
    </html>
  `;
}

// ============================================
// OTP HELPER FUNCTIONS
// ============================================

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function storeOTP(email: string, otp: string, expiresAt: Date) {
  try {
    // Normalize email to lowercase to prevent case-sensitivity issues
    const normalizedEmail = email.toLowerCase().trim();
    
    otpStore.set(normalizedEmail, { otp, expiresAt });
    console.log("✅ OTP stored in GLOBAL memory");
    console.log("📊 Email (normalized):", normalizedEmail);
    console.log("📊 OTP:", otp);
    console.log("📊 Expires at:", expiresAt);
    console.log("📊 Total OTPs in memory:", otpStore.size);
  } catch (error) {
    console.error("❌ Error storing OTP:", error);
    throw error;
  }
}

function validateOTP(email: string, otp: string) {
  try {
    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();
    
    console.log("🔍 Looking for OTP in GLOBAL memory for:", normalizedEmail);
    console.log("📊 Current store size:", otpStore.size);
    console.log("📊 Available emails:", Array.from(otpStore.keys()));
    
    const record = otpStore.get(normalizedEmail);

    if (!record) {
      console.log("❌ No OTP found in memory for:", normalizedEmail);
      return { valid: false, error: "No OTP found or OTP expired" };
    }

    const { otp: storedOTP, expiresAt } = record;
    console.log("✅ Found OTP in memory");
    console.log("📊 Stored OTP:", storedOTP);
    console.log("📊 Provided OTP:", otp);
    console.log("📊 Expires at:", expiresAt);
    console.log("📊 Current time:", new Date());

    // Check if OTP expired
    if (new Date() >= new Date(expiresAt)) {
      console.log("❌ OTP expired");
      otpStore.delete(normalizedEmail);
      return { valid: false, error: "OTP expired. Please request a new one." };
    }

    // Check if OTP matches
    if (storedOTP !== otp.trim()) {
      console.log("❌ Invalid OTP - does not match");
      return { valid: false, error: "Invalid OTP. Please check and try again." };
    }

    console.log("✅ OTP validated successfully!");
    return { valid: true };
  } catch (error) {
    console.error("❌ Error validating OTP:", error);
    return { valid: false, error: "Validation error" };
  }
}

function removeOTP(email: string) {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const wasDeleted = otpStore.delete(normalizedEmail);
    if (wasDeleted) {
      console.log("✅ OTP removed from memory for:", normalizedEmail);
    } else {
      console.log("⚠️ No OTP found to remove for:", normalizedEmail);
    }
    console.log("📊 Remaining OTPs in memory:", otpStore.size);
  } catch (error) {
    console.error("❌ Error removing OTP:", error);
  }
}

function cleanupExpiredOTPs() {
  try {
    const now = new Date();
    let cleanedCount = 0;
    
    for (const [email, record] of otpStore.entries()) {
      if (now >= new Date(record.expiresAt)) {
        otpStore.delete(email);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} expired OTP(s)`);
    }
  } catch (error) {
    console.error("❌ Error cleaning up OTPs:", error);
  }
}

// ============================================
// EMAIL & SMS SENDING FUNCTIONS
// ============================================

async function sendEmailOTP(email: string, otp: string): Promise<{ otpSent: boolean; error?: string }> {
  try {
    console.log("📧 Sending email OTP to:", email);
    const transporter = createEmailTransporter();

    await transporter.sendMail({
      from: `"Medical Institution Registration" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP - Medical Institution Registration",
      html: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; }
              .container { background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              h2 { color: #333; margin-bottom: 20px; }
              .otp-box { background-color: #e3f2fd; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 2px solid #2196f3; }
              .otp-code { color: #1976d2; font-size: 42px; font-weight: bold; letter-spacing: 8px; margin: 10px 0; }
              .info { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
              .warning { color: #dc3545; font-weight: bold; margin-top: 20px; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>🏥 Medical Institution Registration - OTP Verification</h2>
              <p>Dear Administrator,</p>
              <p>Your One-Time Password (OTP) for registration verification:</p>
              <div class="otp-box">
                <p style="margin: 0; color: #666; font-size: 14px;">Your OTP is:</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 0; color: #666; font-size: 12px;">Valid for 5 minutes</p>
              </div>
              <div class="info">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  ℹ️ <strong>Note:</strong> The same OTP has been sent to your registered mobile number via SMS.
                </p>
              </div>
              <p class="warning">🔒 Do not share this OTP with anyone.</p>
              <div class="footer">
                <p>If you did not request this, please ignore this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Your OTP for Medical Institution Registration is: ${otp}. Valid for 5 minutes. The same OTP has been sent to your mobile.`,
    });

    console.log("✅ Email OTP sent successfully");
    return { otpSent: true };
  } catch (error: any) {
    console.error("❌ Error sending email:", error.message);
    return { otpSent: false, error: error.message };
  }
}

async function sendMobileOTP(otp: string, phone: string): Promise<{ otpSent: boolean; error?: string }> {
  try {
    const apiKey = process.env.FAST2SMS_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ Fast2SMS API key not configured");
      return { otpSent: false, error: "SMS service not configured" };
    }

    const cleanPhone = phone.replace("+91", "").replace(/\s/g, "");
    console.log("📱 Sending mobile OTP to:", cleanPhone);

    const message = `Your OTP for Medical Institution Registration is ${otp}. Valid for 5 minutes. Do not share with anyone.`;

    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        "authorization": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: "q",
        message: message,
        language: "english",
        flash: 0,
        numbers: cleanPhone,
      }),
    });

    const result = await response.json();
    console.log("📊 Fast2SMS Response:", result);

    if (result.return === true || result.status_code === 200) {
      console.log("✅ Mobile OTP sent successfully");
      return { otpSent: true };
    } else {
      console.error("❌ Fast2SMS error:", result);
      return { otpSent: false, error: result.message || "SMS failed" };
    }
  } catch (error: any) {
    console.error("❌ Error sending SMS:", error);
    return { otpSent: false, error: error.message };
  }
}

// ============================================
// EXPORTED FUNCTION 1: SEND OTP
// ============================================

export async function sendOTP(email: string, phone: string) {
  console.log("🔥 Sending SAME OTP to Both Email & Mobile");
  console.log("📤 Email:", email, "Phone:", phone);

  try {
    // Clean up expired OTPs first
    cleanupExpiredOTPs();

    // Generate ONE OTP for both
    const otp = generateOTP();
    console.log(`🔑 Generated OTP: ${otp}`);

    const expiresAt = new Date(Date.now() + OTP_EXPIRATION);

    // Store in GLOBAL memory
    storeOTP(email, otp, expiresAt);

    const phoneNumber = phone.startsWith("+91") ? phone : "+91" + phone;

    // Send SAME OTP to both email and mobile
    const [emailResult, smsResult] = await Promise.all([
      sendEmailOTP(email, otp),
      sendMobileOTP(otp, phoneNumber),
    ]);

    console.log("📊 Results - Email:", emailResult.otpSent, "SMS:", smsResult.otpSent);

    if (emailResult.otpSent && smsResult.otpSent) {
      return {
        success: true,
        message: "OTP sent successfully to both email and mobile",
      };
    } else if (emailResult.otpSent) {
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

// ============================================
// EXPORTED FUNCTION 2: VERIFY OTP
// ============================================

export async function verifyOTP(email: string, otp: string) {
  console.log("🔍 Verifying OTP for:", email);
  console.log("📊 Received OTP:", otp);

  try {
    // Validate from GLOBAL memory
    const validation = validateOTP(email, otp);

    if (!validation.valid) {
      return {
        success: false,
        error: validation.error || "Invalid OTP. Please try again.",
      };
    }

    // Remove from memory after successful validation
    removeOTP(email);

    return {
      success: true,
      message: "OTP verification successful",
    };
  } catch (error: any) {
    console.error("❌ OTP verification error:", error);
    return {
      success: false,
      error: "Verification failed. Please try again.",
    };
  }
}

// ============================================
// EXPORTED FUNCTION 3: SUBMIT FORM
// ============================================

export const medDetails = async (formData: FormData) => {
  console.log("📝 Processing medical institution registration...");

  try {
    const token = crypto.randomBytes(32).toString("hex");

    const data = {
      collegeName: formData.get("collegeName") as string,
      abbreviation: formData.get("abbreviation") as string,
      street: formData.get("street") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      email: formData.get("email") as string,
      website: formData.get("website") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      dateOfRegistration: formData.get("dateOfRegistration") as string,
      accreditationDetails: formData.get("accreditationDetails") as string,
      principalName: formData.get("principalName") as string,
      principalContact: formData.get("principalContact") as string,
      principalEmail: formData.get("principalEmail") as string,
      primaryContactName: formData.get("primaryContactName") as string,
      primaryContactDesignation: formData.get("primaryContactDesignation") as string,
      primaryContactNumber: formData.get("primaryContactNumber") as string,
      primaryContactEmail: formData.get("primaryContactEmail") as string,
      totalBeds: formData.get("totalBeds") as string,
      icuBeds: formData.get("icuBeds") as string,
      emergencyBeds: formData.get("emergencyBeds") as string,
      specialties: formData.getAll("specialties") as string[],
      otherSpecialties: formData.get("otherSpecialties") as string,
      services: formData.getAll("services") as string[],
      otherServices: formData.get("otherServices") as string,
      emergencyAvailable: formData.get("emergencyAvailable") as string,
      emergencyContact: formData.get("emergencyContact") as string,
      totalDoctors: formData.get("totalDoctors") as string,
      specialists: formData.get("specialists") as string,
      residentDoctors: formData.get("residentDoctors") as string,
      nurses: formData.get("nurses") as string,
      keySpecialistSpecialty: formData.get("keySpecialistSpecialty") as string,
      keySpecialistName: formData.get("keySpecialistName") as string,
      keySpecialistQualification: formData.get("keySpecialistQualification") as string,
      keySpecialistContact: formData.get("keySpecialistContact") as string,
      keySpecialistEmail: formData.get("keySpecialistEmail") as string,
      hasTeleconsultation: formData.get("hasTeleconsultation") as string,
      teleconsultationDetails: formData.get("teleconsultationDetails") as string,
      diagnosticEquipment: formData.get("diagnosticEquipment") as string,
      surgicalEquipment: formData.get("surgicalEquipment") as string,
      isoCertified: formData.get("isoCertified") as string,
      nabhAccredited: formData.get("nabhAccredited") as string,
      otherCertifications: formData.get("otherCertifications") as string,
      compliantWithStandards: formData.get("compliantWithStandards") as string,
      complianceDetails: formData.get("complianceDetails") as string,
      signature: formData.get("signature") as string,
      date: formData.get("date") as string,
    };

    console.log("🌐 Submitting to API...");
    const response = await fetch("https://crowdshaki.vercel.app/api/medicalInstitutions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const apiResult = await response.json();
    console.log("✅ API submission successful:", apiResult);

    // Send admin notification email
    try {
      console.log("📧 Sending admin notification email...");
      const transporter = createEmailTransporter();
      await transporter.sendMail({
        from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: "New Medical Institution Registration - Approval Required",
        html: generateHtmlTable(data, token),
      });
      console.log("✅ Admin notification sent successfully");
    } catch (emailError: any) {
      console.error("❌ Failed to send admin email:", emailError.message);
    }

    return { 
      success: true, 
      apiResult, 
      emailSent: true,
      message: "Registration submitted successfully"
    };
  } catch (error: any) {
    console.error("❌ Error in medDetails:", error);
    return {
      success: false,
      error: error.message || "Failed to submit registration"
    };
  }
};