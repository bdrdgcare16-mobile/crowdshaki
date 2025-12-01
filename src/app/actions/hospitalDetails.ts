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
//       <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/hospitals" class="button approve-button">Approve</a>
//       <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/hospitals" class="button reject-button">Reject</a>
//       </div>
//       </body>
//       </html>
//       `;
// }
// export const hospitalDetails = async (formData: FormData) => {
//   console.log("Form Data:", formData);
//   const token = crypto.randomBytes(32).toString("hex");

//   const data = {
//     hospitalName: formData.get("hospitalName") as string,
//     address: formData.get("address") as string,
//     street: formData.get("street") as string,
//     city: formData.get("city") as string,
//     state: formData.get("state") as string,
//     pincode: formData.get("pincode") as string,
//     country: formData.get("country") as string,
//     phoneNumber: formData.get("phoneNumber") as string,
//     email: formData.get("email") as string,
//     website: formData.get("website") as string,
//     registrationNumber: formData.get("registrationNumber") as string,
//     dateOfRegistration: formData.get("dateOfRegistration") as string,
//     accreditationDetails: formData.get("accreditationDetails") as string,
//     medicalDirector: formData.get("medicalDirector") as string,
//     directorContact: formData.get("directorContact") as string,
//     directorEmail: formData.get("directorEmail") as string,
//     primaryContactName: formData.get("primaryContactName") as string,
//     primaryContactDesignation: formData.get(
//       "primaryContactDesignation"
//     ) as string,
//     primaryContactNumber: formData.get("primaryContactNumber") as string,
//     primaryContactEmail: formData.get("primaryContactEmail") as string,
//     totalBeds: formData.get("totalBeds") as string,
//     icuBeds: formData.get("icuBeds") as string,
//     emergencyBeds: formData.get("emergencyBeds") as string,
//     specialties: formData.getAll("specialties") as string[],
//     services: formData.getAll("services") as string[],
//     availability: formData.get("availability") as string,
//     emergencyContactNumber: formData.get("emergencyContactNumber") as string,
//     doctors: formData.get("doctors") as string,
//     specialists: formData.get("specialists") as string,
//     nurses: formData.get("nurses") as string,
//     residentDoctors: formData.get("residentDoctors") as string,
//     keySpecialists: {
//       specialty: formData.get("speciality") as string,
//       name: formData.get("name") as string,
//       qualification: formData.get("qualification") as string,
//       contact: formData.get("contact") as string,
//       email: formData.get("email") as string,
//     },
//     teleconsultationAvailable: formData.get(
//       "teleconsultationAvailable"
//     ) as string,
//     technologyDetails: formData.get("technologyDetails") as string,
//     diagnosticEquipment: formData.get("diagnosticEquipment") as string,
//     surgicalEquipment: formData.get("surgicalEquipment") as string,
//     isoCertified: formData.get("isoCertified") as string,
//     nabhAccredited: formData.get("nabhAccredited") as string,
//     otherCertifications: formData.get("otherCertifications") as string,
//     regulatoryCompliance: formData.get("regulatoryCompliance") as string,
//     complianceDetails: formData.get("complianceDetails") as string,
//     declarerName: formData.get("declarerName") as string,
//     declarerDesignation: formData.get("declarerDesignation") as string,
//     declarationDate: formData.get("declarationDate") as string,
//     additionalDocuments: formData.get("additionalDocuments") as string,
//   };

//   const response = await fetch("https://crowdshaki.vercel.app/api/hospitals", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

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

// // Validate environment variables
// const validateEnvVars = () => {
//   const required = {
//     EMAIL_USER: process.env.EMAIL_USER,
//     EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
//     FAST2SMS_API_KEY: process.env.FAST2SMS_API_KEY,
//     ADMIN_EMAIL: process.env.ADMIN_EMAIL,
//   };

//   const missing = Object.entries(required)
//     .filter(([key, value]) => !value)
//     .map(([key]) => key);

//   if (missing.length > 0) {
//     console.error(`Missing environment variables: ${missing.join(", ")}`);
//     return false;
//   }

//   return true;
// };

// // Create nodemailer transporter
// const createEmailTransporter = () => {
//   return nodemailer.createTransport({
//     host: process.env.EMAIL_HOST || "smtp.gmail.com",
//     port: parseInt(process.env.EMAIL_PORT || "587"),
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
//             .buttons {
//               margin-top: 40px;
//             }
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
//               transition: all 0.2s ease;
//             }
//             .approve-button {
//               background-color: #28a745;
//             }
//             .approve-button:hover {
//               background-color: #218838;
//             }
//             .reject-button {
//               background-color: #dc3545;
//             }
//             .reject-button:hover {
//               background-color: #c82333;
//             }
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
//           <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/Doctors" class="button approve-button">Approve</a>
//           <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/Doctors" class="button reject-button">Reject</a>
//         </div>
//       </body>
//     </html>
//   `;
// }

// export const doctorDetails = async (formData: FormData) => {
//   console.log("📝 Processing doctor registration form...");

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
//     const transporter = createEmailTransporter();
//     await transporter.sendMail({
//       from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL,
//       subject: "New Doctor Registration - Form Approval Required",
//       html: generateHtmlTable(data, token),
//     });

//     console.log("✅ Admin notification email sent");

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
// async function sendOTPSMS(otp: string, phone: string) {
//   try {
//     const apiKey = process.env.FAST2SMS_API_KEY;

//     if (!apiKey) {
//       throw new Error("Fast2SMS API key not configured");
//     }

//     // Remove +91 if present and ensure it's just the 10-digit number
//     const cleanPhone = phone.replace("+91", "").replace(/\s/g, "");

//     const message = `Your OTP for G Care Doctor Registration is: ${otp}. Valid for 5 minutes. Do not share this OTP with anyone.`;

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
//       return { otpSent: false, error: result.message || "Failed to send SMS" };
//     }
//   } catch (error: any) {
//     console.error("❌ Error sending SMS OTP:", error);
//     return { otpSent: false, error: error.message };
//   }
// }

// // Send OTP via Gmail
// async function sendOTPEmail(email: string, otp: string) {
//   try {
//     const transporter = createEmailTransporter();

//     const mailOptions = {
//       from: `"G Care Registration" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP for G Care Doctor Registration",
//       html: `
//         <html>
//           <head>
//             <style>
//               body {
//                 font-family: Arial, sans-serif;
//                 padding: 20px;
//                 background-color: #f4f4f4;
//               }
//               .container {
//                 background-color: white;
//                 padding: 30px;
//                 border-radius: 10px;
//                 max-width: 600px;
//                 margin: 0 auto;
//                 box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//               }
//               h2 {
//                 color: #333;
//                 margin-bottom: 20px;
//               }
//               .otp-box {
//                 background-color: #f8f9fa;
//                 padding: 20px;
//                 border-radius: 8px;
//                 text-align: center;
//                 margin: 20px 0;
//               }
//               .otp-code {
//                 color: #28a745;
//                 font-size: 36px;
//                 font-weight: bold;
//                 letter-spacing: 8px;
//                 margin: 10px 0;
//               }
//               .warning {
//                 color: #dc3545;
//                 font-weight: bold;
//                 margin-top: 20px;
//               }
//               .footer {
//                 margin-top: 30px;
//                 padding-top: 20px;
//                 border-top: 1px solid #e0e0e0;
//                 font-size: 12px;
//                 color: #666;
//               }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <h2>G Care Doctor Registration Verification</h2>
//               <p>Dear Doctor,</p>
//               <p>Thank you for registering with G Care. To complete your registration, please use the following OTP:</p>
              
//               <div class="otp-box">
//                 <p style="margin: 0; color: #666;">Your OTP is:</p>
//                 <div class="otp-code">${otp}</div>
//                 <p style="margin: 0; color: #666; font-size: 14px;">Valid for 5 minutes</p>
//               </div>
              
//               <p class="warning">⚠️ Do not share this OTP with anyone.</p>
              
//               <div class="footer">
//                 <p>If you did not request this OTP, please ignore this email or contact our support team.</p>
//                 <p>This is an automated email. Please do not reply to this message.</p>
//               </div>
//             </div>
//           </body>
//         </html>
//       `,
//       text: `Your OTP for G Care Doctor Registration is: ${otp}. This OTP is valid for 5 minutes. Do not share this OTP with anyone.`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("✅ Email OTP sent to:", email);
//     return { otpSent: true };
//   } catch (error: any) {
//     console.error("❌ Error sending email OTP:", error);
//     return { otpSent: false, error: error.message };
//   }
// }

// export async function sendOTP(email: any, phone: any) {
//   const phoneNumber = phone.startsWith("+91") ? phone : "+91" + phone;

//   try {
//     console.log("📤 Sending OTP to email:", email, "and phone:", phoneNumber);

//     if (!validateEnvVars()) {
//       return {
//         success: false,
//         error: "Email or SMS credentials not configured. Please contact administrator.",
//       };
//     }

//     const otp = generateOTP();
//     const expiresAt = new Date(Date.now() + OTP_EXPIRATION);

//     await storeOTP(email, otp, expiresAt);

//     // Send OTP via both Email and SMS
//     const [smsResult, emailResult] = await Promise.all([
//       sendOTPSMS(otp, phoneNumber),
//       sendOTPEmail(email, otp),
//     ]);

//     if (smsResult.otpSent || emailResult.otpSent) {
//       console.log("✅ OTP sent successfully");
//       return {
//         success: true,
//         message: "OTP sent successfully",
//         sentVia: {
//           sms: smsResult.otpSent,
//           email: emailResult.otpSent,
//         },
//       };
//     } else {
//       console.error("❌ Failed to send OTP via both channels");
//       return {
//         success: false,
//         error: "Failed to send OTP. Please check your credentials.",
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
//       console.log("❌ No OTP record found for email:", email);
//       return false;
//     }

//     const { otp: storedOTP, expiresAt } = record;

//     if (storedOTP === otp && new Date() < new Date(expiresAt)) {
//       console.log("✅ OTP validated successfully");
//       return true;
//     }

//     console.log("❌ OTP validation failed - incorrect or expired");
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

// export async function verifyOTP(email: any, otp: any) {
//   try {
//     console.log("🔍 Verifying OTP for email:", email);

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
//       message: "OTP verification successful",
//     };
//   } catch (error: any) {
//     console.error("❌ OTP verification error:", error);
//     return {
//       success: false,
//       error: "OTP verification failed. Please try again.",
//     };
//   }
// }



// "use server";

// import crypto from "crypto";
// import nodemailer from "nodemailer";
// import { connectToDatabase } from "@/app/lib/database";

// console.log("🔥 LOADING HOSPITAL DETAILS MODULE - Gmail + Fast2SMS!");

// // Validate environment variables
// const validateEnvVars = () => {
//   const required = {
//     EMAIL_USER: process.env.EMAIL_USER,
//     EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
//     FAST2SMS_API_KEY: process.env.FAST2SMS_API_KEY,
//     ADMIN_EMAIL: process.env.ADMIN_EMAIL,
//   };

//   const missing = Object.entries(required)
//     .filter(([key, value]) => !value)
//     .map(([key]) => key);

//   if (missing.length > 0) {
//     console.error(`❌ Missing environment variables: ${missing.join(", ")}`);
//     return false;
//   }

//   return true;
// };

// // Create nodemailer transporter
// function createEmailTransporter() {
//   return nodemailer.createTransport({
//     host: process.env.EMAIL_HOST || "smtp.gmail.com",
//     port: parseInt(process.env.EMAIL_PORT || "587"),
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_APP_PASSWORD,
//     },
//   });
// }

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
//             .buttons {
//               margin-top: 40px;
//             }
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
//               transition: all 0.2s ease;
//             }
//             .approve-button {
//               background-color: #28a745;
//             }
//             .approve-button:hover {
//               background-color: #218838;
//             }
//             .reject-button {
//               background-color: #dc3545;
//             }
//             .reject-button:hover {
//               background-color: #c82333;
//             }
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
//           <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/hospitals" class="button approve-button">Approve</a>
//           <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/hospitals" class="button reject-button">Reject</a>
//         </div>
//       </body>
//     </html>
//   `;
// }

// export const hospitalDetails = async (formData: FormData) => {
//   console.log("📝 Processing hospital registration form...");

//   try {
//     const token = crypto.randomBytes(32).toString("hex");

//     const data = {
//       hospitalName: formData.get("hospitalName") as string,
//       phoneNumber: formData.get("phoneNumber") as string,
//       email: formData.get("email") as string,
//       address: formData.get("address") as string,
//       city: formData.get("city") as string,
//       state: formData.get("state") as string,
//       pincode: formData.get("pincode") as string,
//       hospitalType: formData.get("hospitalType") as string,
//       registrationNumber: formData.get("registrationNumber") as string,
//       yearEstablished: formData.get("yearEstablished") as string,
//       numberOfBeds: formData.get("numberOfBeds") as string,
//       specialties: formData.getAll("specialties") as string[],
//       accreditation: formData.get("accreditation") as string,
//       emergencyServices: formData.get("emergencyServices") as string,
//       ambulanceServices: formData.get("ambulanceServices") as string,
//       contactPersonName: formData.get("contactPersonName") as string,
//       contactPersonDesignation: formData.get("contactPersonDesignation") as string,
//       signature: formData.get("signature") as string,
//       declarationDate: formData.get("declarationDate") as string,
//       token: token,
//       status: "pending",
//     };

//     console.log("🌐 Submitting to API...");
//     const response = await fetch("https://crowdshaki.vercel.app/api/hospitals", {
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
//         from: `"Hospital Registration" <${process.env.EMAIL_USER}>`,
//         to: process.env.ADMIN_EMAIL,
//         subject: "New Hospital Registration - Approval Required",
//         html: generateHtmlTable(data, token),
//       });
//       console.log("✅ Admin notification email sent");
//     } catch (emailError: any) {
//       console.error("❌ Failed to send admin email:", emailError.message);
//     }

//     return { success: true, apiResult, emailSent: true };
//   } catch (error: any) {
//     console.error("❌ Error in hospitalDetails:", error);
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

// // Send OTP via Fast2SMS (FIXED - using 'q' route)
// async function sendOTPSMS(otp: string, phone: string) {
//   try {
//     const apiKey = process.env.FAST2SMS_API_KEY;

//     if (!apiKey) {
//       console.warn("⚠️ Fast2SMS API key not configured");
//       return { otpSent: false, error: "SMS service not configured" };
//     }

//     // Remove +91 if present and ensure it's just the 10-digit number
//     const cleanPhone = phone.replace("+91", "").replace(/\s/g, "");
//     console.log("📱 Sending SMS to:", cleanPhone);

//     const message = `Your OTP for Hospital Registration is: ${otp}. Valid for 5 minutes. Do not share this OTP with anyone.`;

//     // ✅ Use 'q' route (Quick Transactional) - No website verification needed!
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
//       return { otpSent: false, error: result.message || "Failed to send SMS" };
//     }
//   } catch (error: any) {
//     console.error("❌ Error sending SMS OTP:", error);
//     return { otpSent: false, error: error.message };
//   }
// }

// // Send OTP via Gmail
// async function sendOTPEmail(email: string, otp: string) {
//   try {
//     console.log("📧 Sending email OTP to:", email);
//     const transporter = createEmailTransporter();

//     const mailOptions = {
//       from: `"Hospital Registration" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP for Hospital Registration",
//       html: `
//         <html>
//           <head>
//             <style>
//               body {
//                 font-family: Arial, sans-serif;
//                 padding: 20px;
//                 background-color: #f4f4f4;
//               }
//               .container {
//                 background-color: white;
//                 padding: 30px;
//                 border-radius: 10px;
//                 max-width: 600px;
//                 margin: 0 auto;
//                 box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//               }
//               h2 {
//                 color: #333;
//                 margin-bottom: 20px;
//               }
//               .otp-box {
//                 background-color: #f8f9fa;
//                 padding: 20px;
//                 border-radius: 8px;
//                 text-align: center;
//                 margin: 20px 0;
//               }
//               .otp-code {
//                 color: #28a745;
//                 font-size: 36px;
//                 font-weight: bold;
//                 letter-spacing: 8px;
//                 margin: 10px 0;
//               }
//               .warning {
//                 color: #dc3545;
//                 font-weight: bold;
//                 margin-top: 20px;
//               }
//               .footer {
//                 margin-top: 30px;
//                 padding-top: 20px;
//                 border-top: 1px solid #e0e0e0;
//                 font-size: 12px;
//                 color: #666;
//               }
//             </style>
//           </head>
//           <body>
//             <div class="container">
//               <h2>Hospital Registration Verification</h2>
//               <p>Dear Administrator,</p>
//               <p>Thank you for registering. To complete your registration, please use the following OTP:</p>
              
//               <div class="otp-box">
//                 <p style="margin: 0; color: #666;">Your OTP is:</p>
//                 <div class="otp-code">${otp}</div>
//                 <p style="margin: 0; color: #666; font-size: 14px;">Valid for 5 minutes</p>
//               </div>
              
//               <p class="warning">⚠️ Do not share this OTP with anyone.</p>
              
//               <div class="footer">
//                 <p>If you did not request this OTP, please ignore this email or contact our support team.</p>
//                 <p>This is an automated email. Please do not reply to this message.</p>
//               </div>
//             </div>
//           </body>
//         </html>
//       `,
//       text: `Your OTP for Hospital Registration is: ${otp}. This OTP is valid for 5 minutes. Do not share this OTP with anyone.`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("✅ Email OTP sent successfully");
//     return { otpSent: true };
//   } catch (error: any) {
//     console.error("❌ Error sending email OTP:", error);
//     return { otpSent: false, error: error.message };
//   }
// }

// export async function sendOTP(email: any, phone: any) {
//   console.log("🔥 Sending OTP via Gmail and Fast2SMS");
//   const phoneNumber = phone.startsWith("+91") ? phone : "+91" + phone;
//   console.log("📤 Email:", email, "Phone:", phoneNumber);

//   try {
//     if (!validateEnvVars()) {
//       return {
//         success: false,
//         error: "Email or SMS credentials not configured. Please contact administrator.",
//       };
//     }

//     const otp = generateOTP();
//     const expiresAt = new Date(Date.now() + OTP_EXPIRATION);

//     await storeOTP(email, otp, expiresAt);

//     // Send OTP via both Email and SMS
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
//       console.error("❌ Failed to send OTP via both channels");
//       return {
//         success: false,
//         error: "Failed to send OTP. Please check your credentials.",
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
//       console.log("❌ No OTP record found for email:", email);
//       return false;
//     }

//     const { otp: storedOTP, expiresAt } = record;

//     if (storedOTP === otp && new Date() < new Date(expiresAt)) {
//       console.log("✅ OTP validated successfully");
//       return true;
//     }

//     console.log("❌ OTP validation failed - incorrect or expired");
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

// export async function verifyOTP(email: any, otp: any) {
//   console.log("🔍 Verifying OTP for email:", email);

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
//       message: "OTP verification successful",
//     };
//   } catch (error: any) {
//     console.error("❌ OTP verification error:", error);
//     return {
//       success: false,
//       error: "OTP verification failed. Please try again.",
//     };
//   }
// }




"use server";

import crypto from "crypto";
import nodemailer from "nodemailer";
import { connectToDatabase } from "@/app/lib/database";

console.log("🔥 LOADING HOSPITAL DUAL OTP SYSTEM - Separate Email & Mobile OTP!");

// Validate environment variables
const validateEnvVars = () => {
  const required = {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
    FAST2SMS_API_KEY: process.env.FAST2SMS_API_KEY,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  };

  const missing = Object.entries(required)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error(`❌ Missing environment variables: ${missing.join(", ")}`);
    return false;
  }

  return true;
};

// Create nodemailer transporter
function createEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
}

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
          <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/hospitals" class="button approve-button">Approve</a>
          <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/hospitals" class="button reject-button">Reject</a>
        </div>
      </body>
    </html>
  `;
}

export const hospitalDetails = async (formData: FormData) => {
  console.log("📝 Processing hospital registration form...");

  try {
    const token = crypto.randomBytes(32).toString("hex");

    const data = {
      hospitalName: formData.get("hospitalName") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      pincode: formData.get("pincode") as string,
      hospitalType: formData.get("hospitalType") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      yearEstablished: formData.get("yearEstablished") as string,
      numberOfBeds: formData.get("numberOfBeds") as string,
      specialties: formData.getAll("specialties") as string[],
      accreditation: formData.get("accreditation") as string,
      emergencyServices: formData.get("emergencyServices") as string,
      ambulanceServices: formData.get("ambulanceServices") as string,
      contactPersonName: formData.get("contactPersonName") as string,
      contactPersonDesignation: formData.get("contactPersonDesignation") as string,
      signature: formData.get("signature") as string,
      declarationDate: formData.get("declarationDate") as string,
      token: token,
      status: "pending",
    };

    console.log("🌐 Submitting to API...");
    const response = await fetch("https://crowdshaki.vercel.app/api/hospitals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const apiResult = await response.json();
    console.log("✅ API submission successful");

    try {
      console.log("📧 Sending admin notification email...");
      const transporter = createEmailTransporter();
      await transporter.sendMail({
        from: `"Hospital Registration" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: "🏥 New Hospital Registration - Approval Required",
        html: generateHtmlTable(data, token),
      });
      console.log("✅ Admin notification email sent");
    } catch (emailError: any) {
      console.error("❌ Failed to send admin email:", emailError.message);
    }

    return { success: true, apiResult, emailSent: true };
  } catch (error: any) {
    console.error("❌ Error in hospitalDetails:", error);
    throw error;
  }
};

// ============================================
// DUAL OTP SYSTEM (Separate Email & Mobile OTP)
// ============================================

const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store BOTH email and mobile OTP
async function storeDualOTP(email: string, emailOTP: string, mobileOTP: string, expiresAt: Date) {
  try {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    await db
      .collection("otps")
      .updateOne(
        { email }, 
        { 
          $set: { 
            emailOTP: emailOTP,
            mobileOTP: mobileOTP,
            expiresAt: expiresAt 
          } 
        }, 
        { upsert: true }
      );
    console.log("✅ Both OTPs stored in database");
  } catch (error) {
    console.error("❌ Error storing OTPs:", error);
    throw error;
  }
}

// Send Email OTP
async function sendEmailOTP(email: string, otp: string) {
  try {
    console.log("📧 Sending email OTP to:", email);
    const transporter = createEmailTransporter();

    const mailOptions = {
      from: `"Hospital Registration" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Email OTP - Hospital Registration",
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                max-width: 600px;
                margin: 0 auto;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              h2 {
                color: #333;
                margin-bottom: 20px;
              }
              .otp-box {
                background-color: #e3f2fd;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin: 20px 0;
                border: 2px solid #2196f3;
              }
              .otp-code {
                color: #1976d2;
                font-size: 36px;
                font-weight: bold;
                letter-spacing: 8px;
                margin: 10px 0;
              }
              .warning {
                color: #dc3545;
                font-weight: bold;
                margin-top: 20px;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                font-size: 12px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>🏥 Hospital Registration - Email OTP</h2>
              <p>Dear Administrator,</p>
              <p>This is your <strong>EMAIL OTP</strong> for hospital registration:</p>
              
              <div class="otp-box">
                <p style="margin: 0; color: #666; font-size: 14px;">📧 Your EMAIL OTP is:</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 0; color: #666; font-size: 12px;">Enter this in the Email OTP field</p>
              </div>
              
              <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  ⚠️ <strong>Important:</strong> You will also receive a separate MOBILE OTP via SMS. Both OTPs are required. Valid for 5 minutes.
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
      text: `Your EMAIL OTP for Hospital Registration is: ${otp}. You will also receive a MOBILE OTP via SMS. Valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email OTP sent successfully");
    return { otpSent: true };
  } catch (error: any) {
    console.error("❌ Error sending email OTP:", error);
    return { otpSent: false, error: error.message };
  }
}

// Send Mobile OTP via SMS
async function sendMobileOTP(otp: string, phone: string) {
  try {
    const apiKey = process.env.FAST2SMS_API_KEY;

    if (!apiKey) {
      console.warn("⚠️ Fast2SMS API key not configured");
      return { otpSent: false, error: "SMS service not configured" };
    }

    const cleanPhone = phone.replace("+91", "").replace(/\s/g, "");
    console.log("📱 Sending mobile OTP to:", cleanPhone);

    const message = `Your MOBILE OTP for Hospital Registration is ${otp}. Enter this in the Mobile OTP field. Valid for 5 minutes.`;

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
      return { otpSent: false, error: result.message || "Failed to send SMS" };
    }
  } catch (error: any) {
    console.error("❌ Error sending SMS OTP:", error);
    return { otpSent: false, error: error.message };
  }
}

export async function sendOTP(email: any, phone: any) {
  console.log("🔥 Sending DUAL OTP - Separate codes for Email & Mobile");
  const phoneNumber = phone.startsWith("+91") ? phone : "+91" + phone;
  console.log("📤 Email:", email, "Phone:", phoneNumber);

  try {
    if (!validateEnvVars()) {
      return {
        success: false,
        error: "Email or SMS credentials not configured. Please contact administrator.",
      };
    }

    // Generate TWO different OTPs
    const emailOTP = generateOTP();  // e.g., 123456
    const mobileOTP = generateOTP(); // e.g., 789012
    
    console.log(`📧 Email OTP: ${emailOTP}`);
    console.log(`📱 Mobile OTP: ${mobileOTP}`);

    const expiresAt = new Date(Date.now() + OTP_EXPIRATION);

    await storeDualOTP(email, emailOTP, mobileOTP, expiresAt);

    // Send OTP via both Email and SMS with DIFFERENT codes
    const [emailResult, smsResult] = await Promise.all([
      sendEmailOTP(email, emailOTP),
      sendMobileOTP(mobileOTP, phoneNumber),
    ]);

    console.log("📊 Results - Email:", emailResult.otpSent, "SMS:", smsResult.otpSent);

    if (emailResult.otpSent && smsResult.otpSent) {
      return {
        success: true,
        message: "OTP sent successfully to both email and mobile",
        sentVia: {
          email: true,
          sms: true,
        },
      };
    } else if (emailResult.otpSent) {
      return {
        success: true,
        message: "Email OTP sent (SMS failed - check balance)",
        sentVia: {
          email: true,
          sms: false,
        },
      };
    } else {
      console.error("❌ Failed to send OTP via both channels");
      return {
        success: false,
        error: "Failed to send OTP. Please check your credentials.",
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

// Validate BOTH OTPs
async function validateDualOTP(email: string, emailOTP: string, mobileOTP: string) {
  try {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    const record = await db.collection("otps").findOne({ email });

    if (!record) {
      console.log("❌ No OTP record found for email:", email);
      return { valid: false, error: "No OTP found" };
    }

    const { emailOTP: storedEmailOTP, mobileOTP: storedMobileOTP, expiresAt } = record;

    // Check if expired
    if (new Date() >= new Date(expiresAt)) {
      console.log("❌ OTP expired");
      return { valid: false, error: "OTP expired" };
    }

    // Check email OTP
    if (storedEmailOTP !== emailOTP) {
      console.log("❌ Invalid email OTP");
      return { valid: false, error: "Invalid email OTP" };
    }

    // Check mobile OTP
    if (storedMobileOTP !== mobileOTP) {
      console.log("❌ Invalid mobile OTP");
      return { valid: false, error: "Invalid mobile OTP" };
    }

    console.log("✅ Both OTPs validated successfully");
    return { valid: true };
  } catch (error) {
    console.error("❌ Error validating OTP:", error);
    return { valid: false, error: "Validation error" };
  }
}

async function removeOTP(email: string) {
  try {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    await db.collection("otps").deleteOne({ email });
    console.log("✅ OTPs removed from database");
  } catch (error) {
    console.error("❌ Error removing OTP:", error);
  }
}

export async function verifyOTP(email: any, emailOTP: any, mobileOTP: any) {
  console.log("🔍 Verifying DUAL OTP for email:", email);

  try {
    const validation = await validateDualOTP(email, emailOTP, mobileOTP);

    if (!validation.valid) {
      return {
        success: false,
        error: validation.error || "Invalid OTP. Please try again.",
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
      error: "OTP verification failed. Please try again.",
    };
  }
}