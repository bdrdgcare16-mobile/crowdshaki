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

// function generateHtmlTable(data: any, token:any): string {
//   const generateRows = (obj: any): string => {
//     return Object.entries(obj)
//       .map(([key, value]) => {
//         if (typeof value === "object" && !Array.isArray(value)) {
//           // Nested object handling
//           return `
//                         <tr>
//                             <td style="font-weight: bold;" colspan="2">${key}</td>
//                         </tr>
//                         ${generateRows(value)}
//                     `;
//         } else {
//           return `
//                         <tr>
//                             <td style="font-weight: bold;">${key}</td>
//                             <td>${
//                               Array.isArray(value) ? value.join(", ") : value
//                             }</td>
//                         </tr>
//                     `;
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
//       <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/Doctors" class="button approve-button">Approve</a>
//       <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/Doctors" class="button reject-button">Reject</a>
//       </div>
//       </body>
//       </html>
//       `;
// }

// export const doctorDetails = async (formData: FormData) => {
//   console.log("Form Data:", formData);
//   const token = crypto.randomBytes(32).toString("hex");

//   const data = {
//     // firstName: formData.get("firstName") as string,
//     doctorName: formData.get("doctorName") as string,
//     phoneNumber: formData.get("phoneNumber") as string,
//     email: formData.get("email") as string,
//     residentialAddress: formData.get("residentialAddress") as string,
//     clinicAddress: formData.get("clinicAddress") as string,
//     dateOfBirth: formData.get("dateOfBirth") as string,
//     primarySpecialty: formData.get("primarySpecialty") as string,
//     subSpecialties: formData.get("subSpecialties") as string,
//     medicalRegistrationNumber: formData.get(
//       "medicalRegistrationNumber"
//     ) as string,
//     medicalCouncil: formData.get("medicalCouncil") as string,
//     registrationDate: formData.get("registrationDate") as string,
//     degree: formData.get("degree") as string,
//     institution: formData.get("institution") as string,
//     yearOfPassing: formData.get("yearOfPassing") as string,
//     totalExperience: formData.get("totalExperience") as string,
//     specializationExperience: formData.get(
//       "specializationExperience"
//     ) as string,
//     clinicHospitalName: formData.get("clinicHospitalName") as string,
//     designation: formData.get("designation") as string,
//     medicalAssociations: formData.get("medicalAssociations") as string,
//     teleconsultationExperience: formData.get(
//       "teleconsultationExperience"
//     ) as string,
//     teleconsultationDetails: formData.get("teleconsultationDetails") as string,
//     preferredDays: formData.getAll("preferredDays") as string[],
//     preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
//     infrastructure: {
//       computerSmartphone: formData.get("computerSmartphone") as string,
//       internetConnection: formData.get("internetConnection") as string,
//       platformUsed: formData.get("platformUsed") as string,
//     },
//     additionalCertifications: formData.get(
//       "additionalCertifications"
//     ) as string,
//     compliance: formData.get("compliance") as string,
//     signature: formData.get("signature") as string,
//     declarationDate: formData.get("declarationDate") as string,
//     // medicalRegistrationCertificate: formData.get("medicalRegistrationCertificate") as File | null,
//     // qualificationCertificates: formData.getAll("qualificationCertificates") as File[],
//     // proofOfExperience: formData.get("proofOfExperience") as File | null,
//     // additionalCertificationsFile: formData.get("additionalCertificationsFile") as File | null,
//     // otherDocuments: formData.getAll("otherDocuments") as File[],
//   };

//   const response = await fetch("https://crowdshaki.vercel.app/api/doctors", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//  const apiResult = await response.json();
//    const params: any = {
//      Source: data.email, // Use the email from environment variables
//      Destination: {
//        ToAddresses: [process.env.ADMIN_EMAIL], // Admin's email from environment variables
//      },
//      Message: {
//        Subject: {
//          Data: "Form Approval",
//        },
//        Body: {
//          Html: {
//            Data: generateHtmlTable(data, token), // Send the static HTML content as a string
//          },
//        },
//      },
//    };
 
//    const result = await ses.sendEmail(params).promise();
//    console.log("Email sent successfully:", result);
 
//    console.log(apiResult);
//    return { apiResult, emailSent: true };
//  };
 
//  const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes
 
//  // Generate a random OTP
//  function generateOTP(): string {
//    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
//  }
 
//  async function storeOTP(email: string, otp: string, expiresAt: Date) {
//    const client = await connectToDatabase();
//    const db = client.db("crowdshaki");
//    await db
//      .collection("otps")
//      .updateOne({ email }, { $set: { otp, expiresAt } }, { upsert: true });
//  }
 
//  async function sendOTPSMS(email: string, otp: string, phone: string) {
//    const sourceEmail = process.env.ADMIN_EMAIL;
 
//    if (!sourceEmail) {
//      throw new Error("AWS_SES_FROM_EMAIL environment variable is not defined");
//    }
 
//    if (!email) {
//      throw new Error("Recipient email is not defined");
//    }
 
//    const params: any = {
//      Message: `Your OTP is: ${otp}`,
//      PhoneNumber: phone, // Ensure the mobile number is in E.164 format
//    };
 
//    try {
//      await sns.publish(params).promise();
//      return { otpSent: true };
//    } catch (error: any) {
//      console.error("Error sending OTP:", error);
//      return { otpSent: false, error: error.message };
//    }
//  }
 
//  export async function sendOTP(email: any, phone: any) {
//    const phoneNumber = "+91" + phone;
//    try {
//      const otp = generateOTP();
//      const expiresAt = new Date(Date.now() + OTP_EXPIRATION);
 
//      await storeOTP(email, otp, expiresAt);
//      await sendOTPSMS(email, otp, phoneNumber);
 
//      return {
//        success: true,
//        message: "OTP sent successfully",
//      };
//    } catch (error) {
//      console.error("Error sending OTP:", error);
//      return {
//        success: false,
//        error: "Failed to send OTP",
//      };
//    }
//  }
 
//  async function validateOTP(email: string, otp: string) {
//    const client = await connectToDatabase();
//    const db = client.db("crowdshaki");
//    const record = await db.collection("otps").findOne({ email });
 
//    if (!record) return false;
 
//    const { otp: storedOTP, expiresAt } = record;
 
//    if (storedOTP === otp && new Date() < new Date(expiresAt)) {
//      return true;
//    }
//    return false;
//  }
 
//  // Remove OTP after successful validation
//  async function removeOTP(email: string) {
//    const client = await connectToDatabase();
//    const db = client.db("crowdshaki");
//    await db.collection("otps").deleteOne({ email });
//  }
 
//  export async function verifyOTP(email: any, otp: any) {
//    try {
//      const isValid = await validateOTP(email, otp);
 
//      if (!isValid) {
//        console.log("Incorrect OTP");
//        return {
//          success: false,
//          error: "Invalid or expired OTP",
//        };
//      }
 
//      await removeOTP(email);
 
//      return {
//        success: true,
//        message: "OTP verification successful",
//      };
//    } catch (error) {
//      console.error("OTP verification error:", error);
//      return {
//        success: false,
//        error: "OTP verification failed",
//      };
//    }
//  }
 


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

// function generateHtmlTable(data: any, token:any): string {
//   const generateRows = (obj: any): string => {
//     return Object.entries(obj)
//       .map(([key, value]) => {
//         if (typeof value === "object" && !Array.isArray(value)) {
//           // Nested object handling
//           return `
//                         <tr>
//                             <td style="font-weight: bold;" colspan="2">${key}</td>
//                         </tr>
//                         ${generateRows(value)}
//                     `;
//         } else {
//           return `
//                         <tr>
//                             <td style="font-weight: bold;">${key}</td>
//                             <td>${
//                               Array.isArray(value) ? value.join(", ") : value
//                             }</td>
//                         </tr>
//                     `;
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
//       <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/Doctors" class="button approve-button">Approve</a>
//       <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/Doctors" class="button reject-button">Reject</a>
//       </div>
//       </body>
//       </html>
//       `;
// }

// export const doctorDetails = async (formData: FormData) => {
//   console.log("Form Data:", formData);
//   const token = crypto.randomBytes(32).toString("hex");

//   const data = {
//     doctorName: formData.get("doctorName") as string,
//     phoneNumber: formData.get("phoneNumber") as string,
//     email: formData.get("email") as string,
//     residentialAddress: formData.get("residentialAddress") as string,
//     clinicAddress: formData.get("clinicAddress") as string,
//     dateOfBirth: formData.get("dateOfBirth") as string,
//     primarySpecialty: formData.get("primarySpecialty") as string,
//     subSpecialties: formData.get("subSpecialties") as string,
//     medicalRegistrationNumber: formData.get(
//       "medicalRegistrationNumber"
//     ) as string,
//     medicalCouncil: formData.get("medicalCouncil") as string,
//     registrationDate: formData.get("registrationDate") as string,
//     degree: formData.get("degree") as string,
//     institution: formData.get("institution") as string,
//     yearOfPassing: formData.get("yearOfPassing") as string,
//     totalExperience: formData.get("totalExperience") as string,
//     specializationExperience: formData.get(
//       "specializationExperience"
//     ) as string,
//     clinicHospitalName: formData.get("clinicHospitalName") as string,
//     designation: formData.get("designation") as string,
//     medicalAssociations: formData.get("medicalAssociations") as string,
//     teleconsultationExperience: formData.get(
//       "teleconsultationExperience"
//     ) as string,
//     teleconsultationDetails: formData.get("teleconsultationDetails") as string,
//     preferredDays: formData.getAll("preferredDays") as string[],
//     preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
//     infrastructure: {
//       computerSmartphone: formData.get("computerSmartphone") as string,
//       internetConnection: formData.get("internetConnection") as string,
//       platformUsed: formData.get("platformUsed") as string,
//     },
//     additionalCertifications: formData.get(
//       "additionalCertifications"
//     ) as string,
//     compliance: formData.get("compliance") as string,
//     signature: formData.get("signature") as string,
//     declarationDate: formData.get("declarationDate") as string,
//   };

//   const response = await fetch("https://crowdshaki.vercel.app/api/doctors", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const apiResult = await response.json();
//   const params: any = {
//     Source: process.env.ADMIN_EMAIL, // Use admin email from environment variables
//     Destination: {
//       ToAddresses: [process.env.ADMIN_EMAIL], // Admin's email from environment variables
//     },
//     Message: {
//       Subject: {
//         Data: "New Doctor Registration - Form Approval Required",
//       },
//       Body: {
//         Html: {
//           Data: generateHtmlTable(data, token), // Send the static HTML content as a string
//         },
//       },
//     },
//   };

//   const result = await ses.sendEmail(params).promise();
//   console.log("Email sent successfully to admin:", result);

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

// // Send OTP via SMS
// async function sendOTPSMS(otp: string, phone: string) {
//   const params: any = {
//     Message: `Your OTP for G Care Doctor Registration is: ${otp}. This OTP is valid for 5 minutes. Do not share this OTP with anyone.`,
//     PhoneNumber: phone, // Ensure the mobile number is in E.164 format
//   };

//   try {
//     await sns.publish(params).promise();
//     console.log("SMS OTP sent successfully to:", phone);
//     return { otpSent: true };
//   } catch (error: any) {
//     console.error("Error sending SMS OTP:", error);
//     return { otpSent: false, error: error.message };
//   }
// }

// // Send OTP via Email
// async function sendOTPEmail(email: string, otp: string) {
//   const sourceEmail = process.env.ADMIN_EMAIL;

//   if (!sourceEmail) {
//     throw new Error("ADMIN_EMAIL environment variable is not defined");
//   }

//   if (!email) {
//     throw new Error("Recipient email is not defined");
//   }

//   const params: any = {
//     Source: sourceEmail,
//     Destination: {
//       ToAddresses: [email],
//     },
//     Message: {
//       Subject: {
//         Data: "Your OTP for G Care Doctor Registration",
//       },
//       Body: {
//         Html: {
//           Data: `
//             <html>
//               <head>
//                 <style>
//                   body {
//                     font-family: Arial, sans-serif;
//                     padding: 20px;
//                     background-color: #f4f4f4;
//                   }
//                   .container {
//                     background-color: white;
//                     padding: 30px;
//                     border-radius: 10px;
//                     max-width: 600px;
//                     margin: 0 auto;
//                     box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//                   }
//                   h2 {
//                     color: #333;
//                     margin-bottom: 20px;
//                   }
//                   .otp-box {
//                     background-color: #f8f9fa;
//                     padding: 20px;
//                     border-radius: 8px;
//                     text-align: center;
//                     margin: 20px 0;
//                   }
//                   .otp-code {
//                     color: #28a745;
//                     font-size: 36px;
//                     font-weight: bold;
//                     letter-spacing: 8px;
//                     margin: 10px 0;
//                   }
//                   .warning {
//                     color: #dc3545;
//                     font-weight: bold;
//                     margin-top: 20px;
//                   }
//                   .footer {
//                     margin-top: 30px;
//                     padding-top: 20px;
//                     border-top: 1px solid #e0e0e0;
//                     font-size: 12px;
//                     color: #666;
//                   }
//                 </style>
//               </head>
//               <body>
//                 <div class="container">
//                   <h2>G Care Doctor Registration Verification</h2>
//                   <p>Dear Doctor,</p>
//                   <p>Thank you for registering with G Care. To complete your registration, please use the following OTP:</p>
                  
//                   <div class="otp-box">
//                     <p style="margin: 0; color: #666;">Your OTP is:</p>
//                     <div class="otp-code">${otp}</div>
//                     <p style="margin: 0; color: #666; font-size: 14px;">Valid for 5 minutes</p>
//                   </div>
                  
//                   <p class="warning">⚠️ Do not share this OTP with anyone.</p>
                  
//                   <div class="footer">
//                     <p>If you did not request this OTP, please ignore this email or contact our support team.</p>
//                     <p>This is an automated email. Please do not reply to this message.</p>
//                   </div>
//                 </div>
//               </body>
//             </html>
//           `,
//         },
//         Text: {
//           Data: `Your OTP for G Care Doctor Registration is: ${otp}. This OTP is valid for 5 minutes. Do not share this OTP with anyone.`,
//         },
//       },
//     },
//   };

//   try {
//     await ses.sendEmail(params).promise();
//     console.log("Email OTP sent successfully to:", email);
//     return { otpSent: true };
//   } catch (error: any) {
//     console.error("Error sending email OTP:", error);
//     return { otpSent: false, error: error.message };
//   }
// }

// // Send OTP to both Email and Mobile
// export async function sendOTP(email: any, phone: any) {
//   const phoneNumber = "+91" + phone;
  
//   try {
//     const otp = generateOTP();
//     const expiresAt = new Date(Date.now() + OTP_EXPIRATION);

//     // Store OTP in database
//     await storeOTP(email, otp, expiresAt);
    
//     // Send OTP via both SMS and Email
//     const [smsResult, emailResult] = await Promise.all([
//       sendOTPSMS(otp, phoneNumber),
//       sendOTPEmail(email, otp)
//     ]);

//     // Check if at least one method succeeded
//     if (smsResult.otpSent || emailResult.otpSent) {
//       return {
//         success: true,
//         message: "OTP sent successfully",
//         sentVia: {
//           sms: smsResult.otpSent,
//           email: emailResult.otpSent
//         }
//       };
//     } else {
//       return {
//         success: false,
//         error: "Failed to send OTP via both SMS and Email",
//       };
//     }
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
// import nodemailer from "nodemailer";
// import { connectToDatabase } from "@/app/lib/database";

// console.log("🔥 LOADING NEW DOCTOR DETAILS MODULE - NO AWS!");

// // Create nodemailer transporter for Gmail
// const createEmailTransporter = () => {
//   return nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_APP_PASSWORD,
//     },
//   });
// };

// function generateHtmlTable(data: any, token: any): string {
//   const generateRows = (obj: any): string => {
//     return Object.entries(obj)
//       .map(([key, value]) => {
//         if (typeof value === "object" && !Array.isArray(value)) {
//           return `
//             <tr>
//                 <td style="font-weight: bold;" colspan="2">${key}</td>
//             </tr>
//             ${generateRows(value)}
//           `;
//         } else {
//           return `
//             <tr>
//                 <td style="font-weight: bold;">${key}</td>
//                 <td>${Array.isArray(value) ? value.join(", ") : value}</td>
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
//         <h2>New Doctor Registration</h2>
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
//           <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/Doctors" class="button approve-button">Approve</a>
//           <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/Doctors" class="button reject-button">Reject</a>
//         </div>
//       </body>
//     </html>
//   `;
// }

// export const doctorDetails = async (formData: FormData) => {
//   console.log("📝 Processing doctor registration...");

//   try {
//     const token = crypto.randomBytes(32).toString("hex");

//     const data = {
//       doctorName: formData.get("doctorName") as string,
//       phoneNumber: formData.get("phoneNumber") as string,
//       email: formData.get("email") as string,
//       residentialAddress: formData.get("residentialAddress") as string,
//       clinicAddress: formData.get("clinicAddress") as string,
//       dateOfBirth: formData.get("dateOfBirth") as string,
//       primarySpecialty: formData.get("primarySpecialty") as string,
//       subSpecialties: formData.get("subSpecialties") as string,
//       medicalRegistrationNumber: formData.get("medicalRegistrationNumber") as string,
//       medicalCouncil: formData.get("medicalCouncil") as string,
//       registrationDate: formData.get("registrationDate") as string,
//       degree: formData.get("degree") as string,
//       institution: formData.get("institution") as string,
//       yearOfPassing: formData.get("yearOfPassing") as string,
//       totalExperience: formData.get("totalExperience") as string,
//       specializationExperience: formData.get("specializationExperience") as string,
//       clinicHospitalName: formData.get("clinicHospitalName") as string,
//       designation: formData.get("designation") as string,
//       medicalAssociations: formData.get("medicalAssociations") as string,
//       teleconsultationExperience: formData.get("teleconsultationExperience") as string,
//       teleconsultationDetails: formData.get("teleconsultationDetails") as string,
//       preferredDays: formData.getAll("preferredDays") as string[],
//       preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
//       infrastructure: {
//         computerSmartphone: formData.get("computerSmartphone") as string,
//         internetConnection: formData.get("internetConnection") as string,
//         platformUsed: formData.get("platformUsed") as string,
//       },
//       additionalCertifications: formData.get("additionalCertifications") as string,
//       compliance: formData.get("compliance") as string,
//       signature: formData.get("signature") as string,
//       declarationDate: formData.get("declarationDate") as string,
//     };

//     // Submit to API
//     const response = await fetch("https://crowdshaki.vercel.app/api/doctors", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const apiResult = await response.json();
//     console.log("✅ API submission successful");

//     // Send email to admin using Gmail
//     try {
//       const transporter = createEmailTransporter();
//       await transporter.sendMail({
//         from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
//         to: process.env.ADMIN_EMAIL,
//         subject: "New Doctor Registration - Approval Required",
//         html: generateHtmlTable(data, token),
//       });
//       console.log("✅ Admin notification sent");
//     } catch (emailError) {
//       console.error("❌ Failed to send admin email:", emailError);
//     }

//     return { apiResult, emailSent: true };
//   } catch (error) {
//     console.error("❌ Error in doctorDetails:", error);
//     throw error;
//   }
// };

// const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

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

// // Send OTP via Fast2SMS
// async function sendOTPSMS(otp: string, phone: string): Promise<{ otpSent: boolean; error?: string }> {
//   try {
//     const apiKey = process.env.FAST2SMS_API_KEY;
//     if (!apiKey) {
//       console.warn("⚠️ Fast2SMS API key not configured");
//       return { otpSent: false, error: "SMS service not configured" };
//     }

//     const cleanPhone = phone.replace("+91", "").replace(/\s/g, "");

//     const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
//       method: "POST",
//       headers: {
//         "authorization": apiKey,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         route: "otp",
//         variables_values: otp,
//         flash: 0,
//         numbers: cleanPhone,
//       }),
//     });

//     const result = await response.json();

//     if (result.return === true) {
//       console.log("✅ SMS OTP sent to:", phone);
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

// // Send OTP via Gmail
// async function sendOTPEmail(email: string, otp: string): Promise<{ otpSent: boolean; error?: string }> {
//   try {
//     const transporter = createEmailTransporter();

//     await transporter.sendMail({
//       from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP for G Care Doctor Registration",
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
//               <h2>G Care Doctor Registration</h2>
//               <p>Dear Doctor,</p>
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
//       text: `Your OTP for G Care Doctor Registration is: ${otp}. Valid for 5 minutes.`,
//     });

//     console.log("✅ Email OTP sent to:", email);
//     return { otpSent: true };
//   } catch (error: any) {
//     console.error("❌ Error sending email:", error);
//     return { otpSent: false, error: error.message };
//   }
// }

// export async function sendOTP(email: string, phone: string) {
//   console.log("🔥 NEW CODE: Sending OTP via Gmail and Fast2SMS");
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
//       console.log("✅ OTP validated");
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
//     console.log("✅ OTP removed");
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
//         error: "Invalid or expired OTP",
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
//       error: "Verification failed",
//     };
//   }
// }



// "use server";

// import crypto from "crypto";
// import nodemailer from "nodemailer";
// import { connectToDatabase } from "@/app/lib/database";

// console.log("🔥 LOADING NEW DOCTOR DETAILS MODULE - NO AWS!");

// // Create nodemailer transporter for Gmail
// const createEmailTransporter = () => {
//   return nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_APP_PASSWORD,
//     },
//   });
// };

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
//         <h2>New Doctor Registration - Awaiting Approval</h2>
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
//           <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/Doctors" class="button approve-button">Approve</a>
//           <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/Doctors" class="button reject-button">Reject</a>
//         </div>
//       </body>
//     </html>
//   `;
// }

// export const doctorDetails = async (formData: FormData) => {
//   console.log("📝 Processing doctor registration...");

//   try {
//     const token = crypto.randomBytes(32).toString("hex");

//     const data = {
//       doctorName: formData.get("doctorName") as string,
//       phoneNumber: formData.get("phoneNumber") as string,
//       email: formData.get("email") as string,
//       residentialAddress: formData.get("residentialAddress") as string,
//       clinicAddress: formData.get("clinicAddress") as string,
//       dateOfBirth: formData.get("dateOfBirth") as string,
//       primarySpecialty: formData.get("primarySpecialty") as string,
//       subSpecialties: formData.get("subSpecialties") as string,
//       medicalRegistrationNumber: formData.get("medicalRegistrationNumber") as string,
//       medicalCouncil: formData.get("medicalCouncil") as string,
//       registrationDate: formData.get("registrationDate") as string,
//       degree: formData.get("degree") as string,
//       institution: formData.get("institution") as string,
//       yearOfPassing: formData.get("yearOfPassing") as string,
//       totalExperience: formData.get("totalExperience") as string,
//       specializationExperience: formData.get("specializationExperience") as string,
//       clinicHospitalName: formData.get("clinicHospitalName") as string,
//       designation: formData.get("designation") as string,
//       medicalAssociations: formData.get("medicalAssociations") as string,
//       teleconsultationExperience: formData.get("teleconsultationExperience") as string,
//       teleconsultationDetails: formData.get("teleconsultationDetails") as string,
//       preferredDays: formData.getAll("preferredDays") as string[],
//       preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
//       infrastructure: {
//         computerSmartphone: formData.get("computerSmartphone") as string,
//         internetConnection: formData.get("internetConnection") as string,
//         platformUsed: formData.get("platformUsed") as string,
//       },
//       additionalCertifications: formData.get("additionalCertifications") as string,
//       compliance: formData.get("compliance") as string,
//       signature: formData.get("signature") as string,
//       declarationDate: formData.get("declarationDate") as string,
//     };

//     // Submit to API
//     console.log("🌐 Submitting to API...");
//     const response = await fetch("https://crowdshaki.vercel.app/api/doctors", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const apiResult = await response.json();
//     console.log("✅ API submission successful");

//     // Send email to admin using Gmail
//     try {
//       console.log("📧 Sending admin notification email...");
//       const transporter = createEmailTransporter();
//       await transporter.sendMail({
//         from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
//         to: process.env.ADMIN_EMAIL,
//         subject: "New Doctor Registration - Approval Required",
//         html: generateHtmlTable(data, token),
//       });
//       console.log("✅ Admin notification sent successfully");
//     } catch (emailError: any) {
//       console.error("❌ Failed to send admin email:", emailError.message);
//     }

//     return { success: true, apiResult, emailSent: true };
//   } catch (error: any) {
//     console.error("❌ Error in doctorDetails:", error);
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

//     const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
//       method: "POST",
//       headers: {
//         "authorization": apiKey,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         route: "otp",
//         variables_values: otp,
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
//       from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP for G Care Doctor Registration",
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
//               <h2>G Care Doctor Registration</h2>
//               <p>Dear Doctor,</p>
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
//       text: `Your OTP for G Care Doctor Registration is: ${otp}. Valid for 5 minutes.`,
//     });

//     console.log("✅ Email OTP sent successfully");
//     return { otpSent: true };
//   } catch (error: any) {
//     console.error("❌ Error sending email:", error.message);
//     return { otpSent: false, error: error.message };
//   }
// }

// export async function sendOTP(email: string, phone: string) {
//   console.log("🔥 NEW CODE: Sending OTP via Gmail and Fast2SMS");
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



// "use server";

// import crypto from "crypto";
// import nodemailer from "nodemailer";
// import { connectToDatabase } from "@/app/lib/database";

// console.log("🔥 LOADING DOCTOR DETAILS MODULE - Gmail + Fast2SMS!");

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
//         <h2>New Doctor Registration - Awaiting Approval</h2>
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
//           <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/Doctors" class="button approve-button">Approve</a>
//           <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/Doctors" class="button reject-button">Reject</a>
//         </div>
//       </body>
//     </html>
//   `;
// }

// export const doctorDetails = async (formData: FormData) => {
//   console.log("📝 Processing doctor registration...");

//   try {
//     const token = crypto.randomBytes(32).toString("hex");

//     const data = {
//       doctorName: formData.get("doctorName") as string,
//       phoneNumber: formData.get("phoneNumber") as string,
//       email: formData.get("email") as string,
//       residentialAddress: formData.get("residentialAddress") as string,
//       clinicAddress: formData.get("clinicAddress") as string,
//       dateOfBirth: formData.get("dateOfBirth") as string,
//       primarySpecialty: formData.get("primarySpecialty") as string,
//       subSpecialties: formData.get("subSpecialties") as string,
//       medicalRegistrationNumber: formData.get("medicalRegistrationNumber") as string,
//       medicalCouncil: formData.get("medicalCouncil") as string,
//       registrationDate: formData.get("registrationDate") as string,
//       degree: formData.get("degree") as string,
//       institution: formData.get("institution") as string,
//       yearOfPassing: formData.get("yearOfPassing") as string,
//       totalExperience: formData.get("totalExperience") as string,
//       specializationExperience: formData.get("specializationExperience") as string,
//       clinicHospitalName: formData.get("clinicHospitalName") as string,
//       designation: formData.get("designation") as string,
//       medicalAssociations: formData.get("medicalAssociations") as string,
//       teleconsultationExperience: formData.get("teleconsultationExperience") as string,
//       teleconsultationDetails: formData.get("teleconsultationDetails") as string,
//       preferredDays: formData.getAll("preferredDays") as string[],
//       preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
//       infrastructure: {
//         computerSmartphone: formData.get("computerSmartphone") as string,
//         internetConnection: formData.get("internetConnection") as string,
//         platformUsed: formData.get("platformUsed") as string,
//       },
//       additionalCertifications: formData.get("additionalCertifications") as string,
//       compliance: formData.get("compliance") as string,
//       signature: formData.get("signature") as string,
//       declarationDate: formData.get("declarationDate") as string,
//     };

//     console.log("🌐 Submitting to API...");
//     const response = await fetch("https://crowdshaki.vercel.app/api/doctors", {
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
//         subject: "New Doctor Registration - Approval Required",
//         html: generateHtmlTable(data, token),
//       });
//       console.log("✅ Admin notification sent successfully");
//     } catch (emailError: any) {
//       console.error("❌ Failed to send admin email:", emailError.message);
//     }

//     return { success: true, apiResult, emailSent: true };
//   } catch (error: any) {
//     console.error("❌ Error in doctorDetails:", error);
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

//     // ✅ Use 'q' route (Quick Transactional) - No website verification needed!
//     const message = `Your G Care Doctor Registration OTP is ${otp}. Valid for 5 minutes. Do not share with anyone.`;

//     const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
//       method: "POST",
//       headers: {
//         "authorization": apiKey,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         route: "q",  // Changed from 'otp' to 'q'
//         message: message,
//         language: "english",
//         flash: 0,
//         numbers: cleanPhone,
//       }),
//     });

//     const result = await response.json();
//     console.log("📊 Fast2SMS Response:", result);

//     if (result.return === true || result.status_code === 200) {
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
//       from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP for G Care Doctor Registration",
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
//               <h2>G Care Doctor Registration</h2>
//               <p>Dear Doctor,</p>
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
//       text: `Your OTP for G Care Doctor Registration is: ${otp}. Valid for 5 minutes.`,
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

//     if (smsResult.otpSent && emailResult.otpSent) {
//       return {
//         success: true,
//         message: "OTP sent successfully to both email and mobile",
//         sentVia: {
//           sms: true,
//           email: true,
//         },
//       };
//     } else if (emailResult.otpSent) {
//       return {
//         success: true,
//         message: "OTP sent to email (SMS failed - check balance)",
//         sentVia: {
//           sms: false,
//           email: true,
//         },
//       };
//     } else {
//       return {
//         success: false,
//         error: "Failed to send OTP",
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





// "use server";

// import crypto from "crypto";
// import nodemailer from "nodemailer";

// console.log("🔥 LOADING DOCTOR DETAILS - DUAL OTP SYSTEM!");

// // ============================================
// // GLOBAL DUAL OTP STORE - SINGLETON PATTERN
// // ============================================

// declare global {
//   var doctorOtpStore: Map<string, { emailOtp: string; mobileOtp: string; expiresAt: Date }> | undefined;
// }

// const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

// const otpStore = global.doctorOtpStore || new Map<string, { emailOtp: string; mobileOtp: string; expiresAt: Date }>();

// if (process.env.NODE_ENV !== "production") {
//   global.doctorOtpStore = otpStore;
// }

// // ============================================
// // EMAIL TRANSPORTER
// // ============================================

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

// // ============================================
// // HTML TABLE GENERATOR
// // ============================================

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
//         <h2>New Doctor Registration - Awaiting Approval</h2>
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
//           <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/Doctors" class="button approve-button">Approve</a>
//           <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/Doctors" class="button reject-button">Reject</a>
//         </div>
//       </body>
//     </html>
//   `;
// }

// // ============================================
// // DUAL OTP HELPER FUNCTIONS
// // ============================================

// function generateOTP(): string {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// function storeDualOTP(email: string, emailOtp: string, mobileOtp: string, expiresAt: Date) {
//   try {
//     const normalizedEmail = email.toLowerCase().trim();
    
//     otpStore.set(normalizedEmail, { emailOtp, mobileOtp, expiresAt });
//     console.log("✅ DUAL OTPs stored in GLOBAL memory");
//     console.log("📊 Email:", normalizedEmail);
//     console.log("📊 Email OTP:", emailOtp);
//     console.log("📊 Mobile OTP:", mobileOtp);
//     console.log("📊 Store size:", otpStore.size);
//   } catch (error) {
//     console.error("❌ Error storing OTPs:", error);
//     throw error;
//   }
// }

// function validateDualOTP(email: string, emailOtp: string, mobileOtp: string) {
//   try {
//     const normalizedEmail = email.toLowerCase().trim();
    
//     console.log("🔍 Validating DUAL OTPs for:", normalizedEmail);
//     console.log("📊 Store size:", otpStore.size);
    
//     const record = otpStore.get(normalizedEmail);

//     if (!record) {
//       console.log("❌ No OTPs found");
//       return { valid: false, error: "No OTPs found or OTPs expired" };
//     }

//     const { emailOtp: storedEmailOtp, mobileOtp: storedMobileOtp, expiresAt } = record;

//     if (new Date() >= new Date(expiresAt)) {
//       console.log("❌ OTPs expired");
//       otpStore.delete(normalizedEmail);
//       return { valid: false, error: "OTPs expired. Please request new OTPs." };
//     }

//     if (storedEmailOtp !== emailOtp.trim()) {
//       console.log("❌ Invalid Email OTP");
//       return { valid: false, error: "Invalid Email OTP. Please check and try again." };
//     }

//     if (storedMobileOtp !== mobileOtp.trim()) {
//       console.log("❌ Invalid Mobile OTP");
//       return { valid: false, error: "Invalid Mobile OTP. Please check and try again." };
//     }

//     console.log("✅ Both OTPs validated successfully!");
//     return { valid: true };
//   } catch (error) {
//     console.error("❌ Error validating OTPs:", error);
//     return { valid: false, error: "Validation error" };
//   }
// }

// function removeOTP(email: string) {
//   try {
//     const normalizedEmail = email.toLowerCase().trim();
//     otpStore.delete(normalizedEmail);
//     console.log("✅ OTPs removed from memory");
//   } catch (error) {
//     console.error("❌ Error removing OTPs:", error);
//   }
// }

// function cleanupExpiredOTPs() {
//   try {
//     const now = new Date();
//     let cleanedCount = 0;
    
//     for (const [email, record] of otpStore.entries()) {
//       if (now >= new Date(record.expiresAt)) {
//         otpStore.delete(email);
//         cleanedCount++;
//       }
//     }
    
//     if (cleanedCount > 0) {
//       console.log(`🧹 Cleaned up ${cleanedCount} expired OTP entry/entries`);
//     }
//   } catch (error) {
//     console.error("❌ Error cleaning up OTPs:", error);
//   }
// }

// // ============================================
// // EMAIL & SMS FUNCTIONS
// // ============================================

// async function sendEmailOTP(email: string, otp: string): Promise<{ otpSent: boolean; error?: string }> {
//   try {
//     console.log("📧 Sending email OTP to:", email);
//     const transporter = createEmailTransporter();

//     await transporter.sendMail({
//       from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your Email OTP for Doctor Registration",
//       html: `
//         <html>
//           <head>
//             <style>
//               body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; }
//               .container { background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
//               h2 { color: #333; margin-bottom: 20px; }
//               .otp-box { background-color: #e3f2fd; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 2px solid #2196f3; }
//               .otp-code { color: #1976d2; font-size: 42px; font-weight: bold; letter-spacing: 8px; margin: 10px 0; }
//               .info { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
//               .warning { color: #dc3545; font-weight: bold; margin-top: 20px; }
//               .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <h2>🏥 G Care Doctor Registration - Email OTP</h2>
//               <p>Dear Doctor,</p>
//               <p>Your <strong>EMAIL OTP</strong> for registration verification:</p>
//               <div class="otp-box">
//                 <p style="margin: 0; color: #666; font-size: 14px;">Your EMAIL OTP is:</p>
//                 <div class="otp-code">${otp}</div>
//                 <p style="margin: 0; color: #666; font-size: 12px;">Valid for 5 minutes</p>
//               </div>
//               <div class="info">
//                 <p style="margin: 0; color: #856404; font-size: 14px;">
//                   ℹ️ <strong>Note:</strong> You will also receive a different OTP on your mobile via SMS. Both OTPs are required for verification.
//                 </p>
//               </div>
//               <p class="warning">🔒 Do not share this OTP with anyone.</p>
//               <div class="footer">
//                 <p>If you did not request this, please ignore this email.</p>
//               </div>
//             </div>
//           </body>
//         </html>
//       `,
//       text: `Your EMAIL OTP for G Care Doctor Registration is: ${otp}. Valid for 5 minutes. You will also receive a different OTP on your mobile.`,
//     });

//     console.log("✅ Email OTP sent successfully");
//     return { otpSent: true };
//   } catch (error: any) {
//     console.error("❌ Error sending email:", error.message);
//     return { otpSent: false, error: error.message };
//   }
// }

// async function sendMobileOTP(otp: string, phone: string): Promise<{ otpSent: boolean; error?: string }> {
//   try {
//     const apiKey = process.env.FAST2SMS_API_KEY;
//     if (!apiKey) {
//       console.warn("⚠️ Fast2SMS API key not configured");
//       return { otpSent: false, error: "SMS service not configured" };
//     }

//     const cleanPhone = phone.replace("+91", "").replace(/\s/g, "");
//     console.log("📱 Sending mobile OTP to:", cleanPhone);

//     const message = `Your MOBILE OTP for G Care Doctor Registration is ${otp}. Valid for 5 minutes. Do not share with anyone.`;

//     const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
//       method: "POST",
//       headers: {
//         "authorization": apiKey,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         route: "q",
//         message: message,
//         language: "english",
//         flash: 0,
//         numbers: cleanPhone,
//       }),
//     });

//     const result = await response.json();
//     console.log("📊 Fast2SMS Response:", result);

//     if (result.return === true || result.status_code === 200) {
//       console.log("✅ Mobile OTP sent successfully");
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

// // ============================================
// // EXPORTED FUNCTION 1: SEND DUAL OTP
// // ============================================

// export async function sendOTP(email: string, phone: string) {
//   console.log("🔥 Sending DUAL OTPs for Doctor Registration");
//   console.log("📤 Email:", email, "Phone:", phone);

//   try {
//     cleanupExpiredOTPs();

//     // Generate TWO DIFFERENT OTPs
//     const emailOtp = generateOTP();
//     const mobileOtp = generateOTP();
    
//     console.log(`🔑 Generated Email OTP: ${emailOtp}`);
//     console.log(`🔑 Generated Mobile OTP: ${mobileOtp}`);

//     const expiresAt = new Date(Date.now() + OTP_EXPIRATION);
//     storeDualOTP(email, emailOtp, mobileOtp, expiresAt);

//     const phoneNumber = phone.startsWith("+91") ? phone : "+91" + phone;

//     const [emailResult, smsResult] = await Promise.all([
//       sendEmailOTP(email, emailOtp),
//       sendMobileOTP(mobileOtp, phoneNumber),
//     ]);

//     console.log("📊 Results - Email:", emailResult.otpSent, "SMS:", smsResult.otpSent);

//     if (emailResult.otpSent && smsResult.otpSent) {
//       return {
//         success: true,
//         message: "Different OTPs sent successfully to email and mobile",
//         sentVia: {
//           email: true,
//           sms: true,
//         },
//       };
//     } else if (emailResult.otpSent) {
//       return {
//         success: true,
//         message: "OTP sent to email (SMS failed - check balance)",
//         sentVia: {
//           email: true,
//           sms: false,
//         },
//       };
//     } else if (smsResult.otpSent) {
//       return {
//         success: true,
//         message: "OTP sent to mobile (Email failed - check configuration)",
//         sentVia: {
//           email: false,
//           sms: true,
//         },
//       };
//     } else {
//       return {
//         success: false,
//         error: "Failed to send OTPs",
//       };
//     }
//   } catch (error: any) {
//     console.error("❌ Error in sendOTP:", error);
//     return {
//       success: false,
//       error: error.message || "Failed to send OTPs",
//     };
//   }
// }

// // ============================================
// // EXPORTED FUNCTION 2: VERIFY DUAL OTP
// // ============================================

// export async function verifyOTP(email: string, emailOtp: string, mobileOtp: string) {
//   console.log("🔍 Verifying DUAL OTPs for:", email);
//   console.log("📊 Email OTP:", emailOtp);
//   console.log("📊 Mobile OTP:", mobileOtp);

//   try {
//     const validation = validateDualOTP(email, emailOtp, mobileOtp);

//     if (!validation.valid) {
//       return {
//         success: false,
//         error: validation.error || "Invalid OTPs. Please try again.",
//       };
//     }

//     removeOTP(email);

//     return {
//       success: true,
//       message: "Both OTPs verified successfully",
//     };
//   } catch (error: any) {
//     console.error("❌ OTP verification error:", error);
//     return {
//       success: false,
//       error: "Verification failed. Please try again.",
//     };
//   }
// }

// // ============================================
// // EXPORTED FUNCTION 3: SUBMIT FORM
// // ============================================

// export const doctorDetails = async (formData: FormData) => {
//   console.log("📝 Processing doctor registration...");

//   try {
//     const token = crypto.randomBytes(32).toString("hex");

//     const data = {
//       doctorName: formData.get("doctorName") as string,
//       phoneNumber: formData.get("phoneNumber") as string,
//       email: formData.get("email") as string,
//       residentialAddress: formData.get("residentialAddress") as string,
//       clinicAddress: formData.get("clinicAddress") as string,
//       dateOfBirth: formData.get("dateOfBirth") as string,
//       primarySpecialty: formData.get("primarySpecialty") as string,
//       subSpecialties: formData.get("subSpecialties") as string,
//       medicalRegistrationNumber: formData.get("medicalRegistrationNumber") as string,
//       medicalCouncil: formData.get("medicalCouncil") as string,
//       registrationDate: formData.get("registrationDate") as string,
//       degree: formData.get("degree") as string,
//       institution: formData.get("institution") as string,
//       yearOfPassing: formData.get("yearOfPassing") as string,
//       totalExperience: formData.get("totalExperience") as string,
//       specializationExperience: formData.get("specializationExperience") as string,
//       clinicHospitalName: formData.get("clinicHospitalName") as string,
//       designation: formData.get("designation") as string,
//       medicalAssociations: formData.get("medicalAssociations") as string,
//       teleconsultationExperience: formData.get("teleconsultationExperience") as string,
//       teleconsultationDetails: formData.get("teleconsultationDetails") as string,
//       preferredDays: formData.getAll("preferredDays") as string[],
//       preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
//       infrastructure: {
//         computerSmartphone: formData.get("computerSmartphone") as string,
//         internetConnection: formData.get("internetConnection") as string,
//         platformUsed: formData.get("platformUsed") as string,
//       },
//       additionalCertifications: formData.get("additionalCertifications") as string,
//       compliance: formData.get("compliance") as string,
//       signature: formData.get("signature") as string,
//       declarationDate: formData.get("declarationDate") as string,
//     };

//     console.log("🌐 Submitting to API...");
//     const response = await fetch("https://crowdshaki.vercel.app/api/doctors", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}`);
//     }

//     const apiResult = await response.json();
//     console.log("✅ API submission successful");

//     try {
//       console.log("📧 Sending admin notification email...");
//       const transporter = createEmailTransporter();
//       await transporter.sendMail({
//         from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
//         to: process.env.ADMIN_EMAIL,
//         subject: "New Doctor Registration - Approval Required",
//         html: generateHtmlTable(data, token),
//       });
//       console.log("✅ Admin notification sent successfully");
//     } catch (emailError: any) {
//       console.error("❌ Failed to send admin email:", emailError.message);
//     }

//     return { success: true, apiResult, emailSent: true };
//   } catch (error: any) {
//     console.error("❌ Error in doctorDetails:", error);
//     return {
//       success: false,
//       error: error.message || "Failed to submit registration"
//     };
//   }
// };





// "use server";

// import crypto from "crypto";
// import nodemailer from "nodemailer";

// console.log("🔥 LOADING DOCTOR DETAILS - DUAL OTP SYSTEM!");

// // ============================================
// // GLOBAL DUAL OTP STORE - SINGLETON PATTERN
// // ============================================

// declare global {
//   var doctorOtpStore: Map<string, { emailOtp: string; mobileOtp: string; expiresAt: Date }> | undefined;
// }

// const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

// const otpStore = global.doctorOtpStore || new Map<string, { emailOtp: string; mobileOtp: string; expiresAt: Date }>();

// if (process.env.NODE_ENV !== "production") {
//   global.doctorOtpStore = otpStore;
// }

// // ============================================
// // EMAIL TRANSPORTER
// // ============================================

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

// // ============================================
// // HTML TABLE GENERATOR
// // ============================================

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
//         <h2>New Doctor Registration - Awaiting Approval</h2>
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
//           <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/Doctors" class="button approve-button">Approve</a>
//           <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/Doctors" class="button reject-button">Reject</a>
//         </div>
//       </body>
//     </html>
//   `;
// }

// // ============================================
// // DUAL OTP HELPER FUNCTIONS
// // ============================================

// function generateOTP(): string {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// function storeDualOTP(email: string, emailOtp: string, mobileOtp: string, expiresAt: Date) {
//   try {
//     const normalizedEmail = email.toLowerCase().trim();
    
//     otpStore.set(normalizedEmail, { emailOtp, mobileOtp, expiresAt });
//     console.log("✅ DUAL OTPs stored in GLOBAL memory");
//     console.log("📊 Email:", normalizedEmail);
//     console.log("📊 Email OTP:", emailOtp);
//     console.log("📊 Mobile OTP:", mobileOtp);
//     console.log("📊 Store size:", otpStore.size);
//   } catch (error) {
//     console.error("❌ Error storing OTPs:", error);
//     throw error;
//   }
// }

// function validateDualOTP(email: string, emailOtp: string, mobileOtp: string) {
//   try {
//     const normalizedEmail = email.toLowerCase().trim();
    
//     console.log("🔍 Validating DUAL OTPs for:", normalizedEmail);
//     console.log("📊 Store size:", otpStore.size);
    
//     const record = otpStore.get(normalizedEmail);

//     if (!record) {
//       console.log("❌ No OTPs found");
//       return { valid: false, error: "No OTPs found or OTPs expired" };
//     }

//     const { emailOtp: storedEmailOtp, mobileOtp: storedMobileOtp, expiresAt } = record;

//     if (new Date() >= new Date(expiresAt)) {
//       console.log("❌ OTPs expired");
//       otpStore.delete(normalizedEmail);
//       return { valid: false, error: "OTPs expired. Please request new OTPs." };
//     }

//     if (storedEmailOtp !== emailOtp.trim()) {
//       console.log("❌ Invalid Email OTP");
//       return { valid: false, error: "Invalid Email OTP. Please check and try again." };
//     }

//     if (storedMobileOtp !== mobileOtp.trim()) {
//       console.log("❌ Invalid Mobile OTP");
//       return { valid: false, error: "Invalid Mobile OTP. Please check and try again." };
//     }

//     console.log("✅ Both OTPs validated successfully!");
//     return { valid: true };
//   } catch (error) {
//     console.error("❌ Error validating OTPs:", error);
//     return { valid: false, error: "Validation error" };
//   }
// }

// function removeOTP(email: string) {
//   try {
//     const normalizedEmail = email.toLowerCase().trim();
//     otpStore.delete(normalizedEmail);
//     console.log("✅ OTPs removed from memory");
//   } catch (error) {
//     console.error("❌ Error removing OTPs:", error);
//   }
// }

// function cleanupExpiredOTPs() {
//   try {
//     const now = new Date();
//     let cleanedCount = 0;
    
//     // ✅ FIXED: Array.from() add panniten
//     for (const [email, record] of Array.from(otpStore.entries())) {
//       if (now >= new Date(record.expiresAt)) {
//         otpStore.delete(email);
//         cleanedCount++;
//       }
//     }
    
//     if (cleanedCount > 0) {
//       console.log(`🧹 Cleaned up ${cleanedCount} expired OTP entry/entries`);
//     }
//   } catch (error) {
//     console.error("❌ Error cleaning up OTPs:", error);
//   }
// }

// // ============================================
// // EMAIL & SMS FUNCTIONS
// // ============================================

// async function sendEmailOTP(email: string, otp: string): Promise<{ otpSent: boolean; error?: string }> {
//   try {
//     console.log("📧 Sending email OTP to:", email);
//     const transporter = createEmailTransporter();

//     await transporter.sendMail({
//       from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your Email OTP for Doctor Registration",
//       html: `
//         <html>
//           <head>
//             <style>
//               body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; }
//               .container { background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
//               h2 { color: #333; margin-bottom: 20px; }
//               .otp-box { background-color: #e3f2fd; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 2px solid #2196f3; }
//               .otp-code { color: #1976d2; font-size: 42px; font-weight: bold; letter-spacing: 8px; margin: 10px 0; }
//               .info { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
//               .warning { color: #dc3545; font-weight: bold; margin-top: 20px; }
//               .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <h2>🏥 G Care Doctor Registration - Email OTP</h2>
//               <p>Dear Doctor,</p>
//               <p>Your <strong>EMAIL OTP</strong> for registration verification:</p>
//               <div class="otp-box">
//                 <p style="margin: 0; color: #666; font-size: 14px;">Your EMAIL OTP is:</p>
//                 <div class="otp-code">${otp}</div>
//                 <p style="margin: 0; color: #666; font-size: 12px;">Valid for 5 minutes</p>
//               </div>
//               <div class="info">
//                 <p style="margin: 0; color: #856404; font-size: 14px;">
//                   ℹ️ <strong>Note:</strong> You will also receive a different OTP on your mobile via SMS. Both OTPs are required for verification.
//                 </p>
//               </div>
//               <p class="warning">🔒 Do not share this OTP with anyone.</p>
//               <div class="footer">
//                 <p>If you did not request this, please ignore this email.</p>
//               </div>
//             </div>
//           </body>
//         </html>
//       `,
//       text: `Your EMAIL OTP for G Care Doctor Registration is: ${otp}. Valid for 5 minutes. You will also receive a different OTP on your mobile.`,
//     });

//     console.log("✅ Email OTP sent successfully");
//     return { otpSent: true };
//   } catch (error: any) {
//     console.error("❌ Error sending email:", error.message);
//     return { otpSent: false, error: error.message };
//   }
// }

// async function sendMobileOTP(otp: string, phone: string): Promise<{ otpSent: boolean; error?: string }> {
//   try {
//     const apiKey = process.env.FAST2SMS_API_KEY;
//     if (!apiKey) {
//       console.warn("⚠️ Fast2SMS API key not configured");
//       return { otpSent: false, error: "SMS service not configured" };
//     }

//     const cleanPhone = phone.replace("+91", "").replace(/\s/g, "");
//     console.log("📱 Sending mobile OTP to:", cleanPhone);

//     const message = `Your MOBILE OTP for G Care Doctor Registration is ${otp}. Valid for 5 minutes. Do not share with anyone.`;

//     const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
//       method: "POST",
//       headers: {
//         "authorization": apiKey,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         route: "q",
//         message: message,
//         language: "english",
//         flash: 0,
//         numbers: cleanPhone,
//       }),
//     });

//     const result = await response.json();
//     console.log("📊 Fast2SMS Response:", result);

//     if (result.return === true || result.status_code === 200) {
//       console.log("✅ Mobile OTP sent successfully");
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

// // ============================================
// // EXPORTED FUNCTION 1: SEND DUAL OTP
// // ============================================

// export async function sendOTP(email: string, phone: string) {
//   console.log("🔥 Sending DUAL OTPs for Doctor Registration");
//   console.log("📤 Email:", email, "Phone:", phone);

//   try {
//     cleanupExpiredOTPs();

//     // Generate TWO DIFFERENT OTPs
//     const emailOtp = generateOTP();
//     const mobileOtp = generateOTP();
    
//     console.log(`🔑 Generated Email OTP: ${emailOtp}`);
//     console.log(`🔑 Generated Mobile OTP: ${mobileOtp}`);

//     const expiresAt = new Date(Date.now() + OTP_EXPIRATION);
//     storeDualOTP(email, emailOtp, mobileOtp, expiresAt);

//     const phoneNumber = phone.startsWith("+91") ? phone : "+91" + phone;

//     const [emailResult, smsResult] = await Promise.all([
//       sendEmailOTP(email, emailOtp),
//       sendMobileOTP(mobileOtp, phoneNumber),
//     ]);

//     console.log("📊 Results - Email:", emailResult.otpSent, "SMS:", smsResult.otpSent);

//     if (emailResult.otpSent && smsResult.otpSent) {
//       return {
//         success: true,
//         message: "Different OTPs sent successfully to email and mobile",
//         sentVia: {
//           email: true,
//           sms: true,
//         },
//       };
//     } else if (emailResult.otpSent) {
//       return {
//         success: true,
//         message: "OTP sent to email (SMS failed - check balance)",
//         sentVia: {
//           email: true,
//           sms: false,
//         },
//       };
//     } else if (smsResult.otpSent) {
//       return {
//         success: true,
//         message: "OTP sent to mobile (Email failed - check configuration)",
//         sentVia: {
//           email: false,
//           sms: true,
//         },
//       };
//     } else {
//       return {
//         success: false,
//         error: "Failed to send OTPs",
//       };
//     }
//   } catch (error: any) {
//     console.error("❌ Error in sendOTP:", error);
//     return {
//       success: false,
//       error: error.message || "Failed to send OTPs",
//     };
//   }
// }

// // ============================================
// // EXPORTED FUNCTION 2: VERIFY DUAL OTP
// // ============================================

// export async function verifyOTP(email: string, emailOtp: string, mobileOtp: string) {
//   console.log("🔍 Verifying DUAL OTPs for:", email);
//   console.log("📊 Email OTP:", emailOtp);
//   console.log("📊 Mobile OTP:", mobileOtp);

//   try {
//     const validation = validateDualOTP(email, emailOtp, mobileOtp);

//     if (!validation.valid) {
//       return {
//         success: false,
//         error: validation.error || "Invalid OTPs. Please try again.",
//       };
//     }

//     removeOTP(email);

//     return {
//       success: true,
//       message: "Both OTPs verified successfully",
//     };
//   } catch (error: any) {
//     console.error("❌ OTP verification error:", error);
//     return {
//       success: false,
//       error: "Verification failed. Please try again.",
//     };
//   }
// }

// // ============================================
// // EXPORTED FUNCTION 3: SUBMIT FORM
// // ============================================

// export const doctorDetails = async (formData: FormData) => {
//   console.log("📝 Processing doctor registration...");

//   try {
//     const token = crypto.randomBytes(32).toString("hex");

//     const data = {
//       doctorName: formData.get("doctorName") as string,
//       phoneNumber: formData.get("phoneNumber") as string,
//       email: formData.get("email") as string,
//       residentialAddress: formData.get("residentialAddress") as string,
//       clinicAddress: formData.get("clinicAddress") as string,
//       dateOfBirth: formData.get("dateOfBirth") as string,
//       primarySpecialty: formData.get("primarySpecialty") as string,
//       subSpecialties: formData.get("subSpecialties") as string,
//       medicalRegistrationNumber: formData.get("medicalRegistrationNumber") as string,
//       medicalCouncil: formData.get("medicalCouncil") as string,
//       registrationDate: formData.get("registrationDate") as string,
//       degree: formData.get("degree") as string,
//       institution: formData.get("institution") as string,
//       yearOfPassing: formData.get("yearOfPassing") as string,
//       totalExperience: formData.get("totalExperience") as string,
//       specializationExperience: formData.get("specializationExperience") as string,
//       clinicHospitalName: formData.get("clinicHospitalName") as string,
//       designation: formData.get("designation") as string,
//       medicalAssociations: formData.get("medicalAssociations") as string,
//       teleconsultationExperience: formData.get("teleconsultationExperience") as string,
//       teleconsultationDetails: formData.get("teleconsultationDetails") as string,
//       preferredDays: formData.getAll("preferredDays") as string[],
//       preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
//       infrastructure: {
//         computerSmartphone: formData.get("computerSmartphone") as string,
//         internetConnection: formData.get("internetConnection") as string,
//         platformUsed: formData.get("platformUsed") as string,
//       },
//       additionalCertifications: formData.get("additionalCertifications") as string,
//       compliance: formData.get("compliance") as string,
//       signature: formData.get("signature") as string,
//       declarationDate: formData.get("declarationDate") as string,
//     };

//     console.log("🌐 Submitting to API...");
//     const response = await fetch("https://crowdshaki.vercel.app/api/doctors", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}`);
//     }

//     const apiResult = await response.json();
//     console.log("✅ API submission successful");

//     try {
//       console.log("📧 Sending admin notification email...");
//       const transporter = createEmailTransporter();
//       await transporter.sendMail({
//         from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
//         to: process.env.ADMIN_EMAIL,
//         subject: "New Doctor Registration - Approval Required",
//         html: generateHtmlTable(data, token),
//       });
//       console.log("✅ Admin notification sent successfully");
//     } catch (emailError: any) {
//       console.error("❌ Failed to send admin email:", emailError.message);
//     }

//     return { success: true, apiResult, emailSent: true };
//   } catch (error: any) {
//     console.error("❌ Error in doctorDetails:", error);
//     return {
//       success: false,
//       error: error.message || "Failed to submit registration"
//     };
//   }
// };



"use server";

import crypto from "crypto";
import nodemailer from "nodemailer";

console.log("🔥 LOADING DOCTOR DETAILS - DUAL OTP SYSTEM!");

// ============================================
// GLOBAL DUAL OTP STORE - SINGLETON PATTERN
// ============================================

declare global {
  var doctorOtpStore: Map<string, { emailOtp: string; mobileOtp: string; expiresAt: Date }> | undefined;
}

const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

const otpStore = global.doctorOtpStore || new Map<string, { emailOtp: string; mobileOtp: string; expiresAt: Date }>();

if (process.env.NODE_ENV !== "production") {
  global.doctorOtpStore = otpStore;
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
// HTML TABLE GENERATOR
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
        <h2>New Doctor Registration - Awaiting Approval</h2>
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
          <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/Doctors" class="button approve-button">Approve</a>
          <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/Doctors" class="button reject-button">Reject</a>
        </div>
      </body>
    </html>
  `;
}

// ============================================
// DUAL OTP HELPER FUNCTIONS
// ============================================

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function storeDualOTP(email: string, emailOtp: string, mobileOtp: string, expiresAt: Date) {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    
    otpStore.set(normalizedEmail, { emailOtp, mobileOtp, expiresAt });
    console.log("✅ DUAL OTPs stored in GLOBAL memory");
    console.log("📊 Email:", normalizedEmail);
    console.log("📊 Email OTP:", emailOtp);
    console.log("📊 Mobile OTP:", mobileOtp);
    console.log("📊 Store size:", otpStore.size);
  } catch (error) {
    console.error("❌ Error storing OTPs:", error);
    throw error;
  }
}

function validateDualOTP(email: string, emailOtp: string, mobileOtp: string) {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    
    console.log("🔍 Validating DUAL OTPs for:", normalizedEmail);
    console.log("📊 Store size:", otpStore.size);
    
    const record = otpStore.get(normalizedEmail);

    if (!record) {
      console.log("❌ No OTPs found");
      return { valid: false, error: "No OTPs found or OTPs expired" };
    }

    const { emailOtp: storedEmailOtp, mobileOtp: storedMobileOtp, expiresAt } = record;

    if (new Date() >= new Date(expiresAt)) {
      console.log("❌ OTPs expired");
      otpStore.delete(normalizedEmail);
      return { valid: false, error: "OTPs expired. Please request new OTPs." };
    }

    if (storedEmailOtp !== emailOtp.trim()) {
      console.log("❌ Invalid Email OTP");
      return { valid: false, error: "Invalid Email OTP. Please check and try again." };
    }

    if (storedMobileOtp !== mobileOtp.trim()) {
      console.log("❌ Invalid Mobile OTP");
      return { valid: false, error: "Invalid Mobile OTP. Please check and try again." };
    }

    console.log("✅ Both OTPs validated successfully!");
    return { valid: true };
  } catch (error) {
    console.error("❌ Error validating OTPs:", error);
    return { valid: false, error: "Validation error" };
  }
}

function removeOTP(email: string) {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    otpStore.delete(normalizedEmail);
    console.log("✅ OTPs removed from memory");
  } catch (error) {
    console.error("❌ Error removing OTPs:", error);
  }
}

function cleanupExpiredOTPs() {
  try {
    const now = new Date();
    let cleanedCount = 0;
    
    // ✅ FIXED: Array.from() added to fix TypeScript iteration error
    for (const [email, record] of Array.from(otpStore.entries())) {
      if (now >= new Date(record.expiresAt)) {
        otpStore.delete(email);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} expired OTP entry/entries`);
    }
  } catch (error) {
    console.error("❌ Error cleaning up OTPs:", error);
  }
}

// ============================================
// EMAIL & SMS FUNCTIONS
// ============================================

async function sendEmailOTP(email: string, otp: string): Promise<{ otpSent: boolean; error?: string }> {
  try {
    console.log("📧 Sending email OTP to:", email);
    const transporter = createEmailTransporter();

    await transporter.sendMail({
      from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Email OTP for Doctor Registration",
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
              <h2>🏥 G Care Doctor Registration - Email OTP</h2>
              <p>Dear Doctor,</p>
              <p>Your <strong>EMAIL OTP</strong> for registration verification:</p>
              <div class="otp-box">
                <p style="margin: 0; color: #666; font-size: 14px;">Your EMAIL OTP is:</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 0; color: #666; font-size: 12px;">Valid for 5 minutes</p>
              </div>
              <div class="info">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  ℹ️ <strong>Note:</strong> You will also receive a different OTP on your mobile via SMS. Both OTPs are required for verification.
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
      text: `Your EMAIL OTP for G Care Doctor Registration is: ${otp}. Valid for 5 minutes. You will also receive a different OTP on your mobile.`,
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

    const message = `Your MOBILE OTP for G Care Doctor Registration is ${otp}. Valid for 5 minutes. Do not share with anyone.`;

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
// EXPORTED FUNCTION 1: SEND DUAL OTP
// ============================================

export async function sendOTP(email: string, phone: string) {
  console.log("🔥 Sending DUAL OTPs for Doctor Registration");
  console.log("📤 Email:", email, "Phone:", phone);

  try {
    cleanupExpiredOTPs();

    // Generate TWO DIFFERENT OTPs
    const emailOtp = generateOTP();
    const mobileOtp = generateOTP();
    
    console.log(`🔑 Generated Email OTP: ${emailOtp}`);
    console.log(`🔑 Generated Mobile OTP: ${mobileOtp}`);

    const expiresAt = new Date(Date.now() + OTP_EXPIRATION);
    storeDualOTP(email, emailOtp, mobileOtp, expiresAt);

    const phoneNumber = phone.startsWith("+91") ? phone : "+91" + phone;

    const [emailResult, smsResult] = await Promise.all([
      sendEmailOTP(email, emailOtp),
      sendMobileOTP(mobileOtp, phoneNumber),
    ]);

    console.log("📊 Results - Email:", emailResult.otpSent, "SMS:", smsResult.otpSent);

    if (emailResult.otpSent && smsResult.otpSent) {
      return {
        success: true,
        message: "Different OTPs sent successfully to email and mobile",
        sentVia: {
          email: true,
          sms: true,
        },
      };
    } else if (emailResult.otpSent) {
      return {
        success: true,
        message: "OTP sent to email (SMS failed - check balance)",
        sentVia: {
          email: true,
          sms: false,
        },
      };
    } else if (smsResult.otpSent) {
      return {
        success: true,
        message: "OTP sent to mobile (Email failed - check configuration)",
        sentVia: {
          email: false,
          sms: true,
        },
      };
    } else {
      return {
        success: false,
        error: "Failed to send OTPs",
      };
    }
  } catch (error: any) {
    console.error("❌ Error in sendOTP:", error);
    return {
      success: false,
      error: error.message || "Failed to send OTPs",
    };
  }
}

// ============================================
// EXPORTED FUNCTION 2: VERIFY DUAL OTP
// ============================================

export async function verifyOTP(email: string, emailOtp: string, mobileOtp: string) {
  console.log("🔍 Verifying DUAL OTPs for:", email);
  console.log("📊 Email OTP:", emailOtp);
  console.log("📊 Mobile OTP:", mobileOtp);

  try {
    const validation = validateDualOTP(email, emailOtp, mobileOtp);

    if (!validation.valid) {
      return {
        success: false,
        error: validation.error || "Invalid OTPs. Please try again.",
      };
    }

    removeOTP(email);

    return {
      success: true,
      message: "Both OTPs verified successfully",
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

export const doctorDetails = async (formData: FormData) => {
  console.log("📝 Processing doctor registration...");

  try {
    const token = crypto.randomBytes(32).toString("hex");

    const data = {
      doctorName: formData.get("doctorName") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      email: formData.get("email") as string,
      residentialAddress: formData.get("residentialAddress") as string,
      clinicAddress: formData.get("clinicAddress") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
      primarySpecialty: formData.get("primarySpecialty") as string,
      subSpecialties: formData.get("subSpecialties") as string,
      medicalRegistrationNumber: formData.get("medicalRegistrationNumber") as string,
      medicalCouncil: formData.get("medicalCouncil") as string,
      registrationDate: formData.get("registrationDate") as string,
      degree: formData.get("degree") as string,
      institution: formData.get("institution") as string,
      yearOfPassing: formData.get("yearOfPassing") as string,
      totalExperience: formData.get("totalExperience") as string,
      specializationExperience: formData.get("specializationExperience") as string,
      clinicHospitalName: formData.get("clinicHospitalName") as string,
      designation: formData.get("designation") as string,
      medicalAssociations: formData.get("medicalAssociations") as string,
      teleconsultationExperience: formData.get("teleconsultationExperience") as string,
      teleconsultationDetails: formData.get("teleconsultationDetails") as string,
      preferredDays: formData.getAll("preferredDays") as string[],
      preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
      infrastructure: {
        computerSmartphone: formData.get("computerSmartphone") as string,
        internetConnection: formData.get("internetConnection") as string,
        platformUsed: formData.get("platformUsed") as string,
      },
      additionalCertifications: formData.get("additionalCertifications") as string,
      compliance: formData.get("compliance") as string,
      signature: formData.get("signature") as string,
      declarationDate: formData.get("declarationDate") as string,
    };

    console.log("🌐 Submitting to API...");
    const response = await fetch("https://crowdshaki.vercel.app/api/doctors", {
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
    console.log("✅ API submission successful");

    try {
      console.log("📧 Sending admin notification email...");
      const transporter = createEmailTransporter();
      await transporter.sendMail({
        from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: "New Doctor Registration - Approval Required",
        html: generateHtmlTable(data, token),
      });
      console.log("✅ Admin notification sent successfully");
    } catch (emailError: any) {
      console.error("❌ Failed to send admin email:", emailError.message);
    }

    return { success: true, apiResult, emailSent: true };
  } catch (error: any) {
    console.error("❌ Error in doctorDetails:", error);
    return {
      success: false,
      error: error.message || "Failed to submit registration"
    };
  }
};