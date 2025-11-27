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
//       <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}" class="button approve-button">Approve</a>
//       <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}" class="button reject-button">Reject</a>
//       </div>
//       </body>
//       </html>
//       `;
// }

// export const medicalInstitutionDetails = async (formdata: FormData) => {
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
//   await db.collection("otps").updateOne(
//     { email },
//     { $set: { otp, expiresAt } },
//     { upsert: true }
//   );
// }

// async function sendOTPSMS(email: string, otp: string, phone:string) {
//   const sourceEmail = process.env.ADMIN_EMAIL;

//   if (!sourceEmail) {
//     throw new Error("AWS_SES_FROM_EMAIL environment variable is not defined");
//   }

//   if (!email) {
//     throw new Error("Recipient email is not defined");
//   }

//   const params:any = {
//     Message: `Your OTP is: ${otp}`,
//     PhoneNumber: phone, // Ensure the mobile number is in E.164 format
//   };

//   try {
//     await sns.publish(params).promise();
//     return { otpSent: true };
//   } catch (error:any) {
//     console.error("Error sending OTP:", error);
//     return { otpSent: false, error: error.message };
//   }
// }


// export async function sendOTP(email:any, phone:any) {

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

// export async function verifyOTP(email:any, otp:any) {

//   try {
//     const isValid = await validateOTP(email, otp);

//     if (!isValid) {
//       console.log("Incorrect OTP")
//       return {
//         success: false,
//         error: "Invalid or expired OTP",
//       };
//     }

//     await removeOTP(email);

//     return {
//       success: true,
//       message: "OTP verification successful"
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

// Configure AWS SDK
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
          // Nested object handling
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
                              <td>${
                                Array.isArray(value) ? value.join(", ") : value
                              }</td>
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
      <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/pharmacies" class="button approve-button">Approve</a>
      <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/pharmacies" class="button reject-button">Reject</a>
      </div>
      </body>
      </html>
      `;
}

export const pharmaciesDetails = async(formdata: FormData) => {
    console.log("formdata:", formdata)
    const token = crypto.randomBytes(32).toString("hex");
    
    // Pharmacy License Number - accepts alphanumeric (e.g., TN2345, KA1234, etc.)
    const pharmacyLicenseNumber = formdata.get("pharmacyLicenseNumber");
    const licenseNumber = pharmacyLicenseNumber ? pharmacyLicenseNumber.toString().trim().toUpperCase() : "";
    
    const data = {
        pharmacyName: formdata.get("pharmacyName"),
        email: formdata.get("email"),
        mobile: formdata.get("mobile"),
        address: formdata.get("address"),
        pincode: formdata.get("pincode"),
        pharmacyType: formdata.get("pharmacyType"),
        yearsOfOperation: formdata.get("yearsOfOperation"),
        pharmacyLicenseNumber: licenseNumber,
        dateOfIssue: formdata.get("dateOfIssue"),
        issuingAuthority: formdata.get("issuingAuthority"),
        compliantOrnot: formdata.get("compliantOrnot")
    }

    const response = await fetch("https://crowdshaki.vercel.app/api/pharmacies", {  
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const apiResult = await response.json();
    
    const params: any = {
      Source: data.email,
      Destination: {
        ToAddresses: [process.env.ADMIN_EMAIL],
      },
      Message: {
        Subject: {
          Data: "Form Approval",
        },
        Body: {
          Html: {
            Data: generateHtmlTable(data, token),
          },
        },
      },
    };
    
     const result = await ses.sendEmail(params).promise();
      console.log("Email sent successfully:", result);
    
      console.log(apiResult);
      return { apiResult, emailSent: true };
    };
    
    const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes
    
    // Generate a random OTP
    function generateOTP(): string {
      return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    }
    
    async function storeOTP(email: string, otp: string, expiresAt: Date) {
      const client = await connectToDatabase();
      const db = client.db("crowdshaki");
      await db.collection("otps").updateOne(
        { email },
        { $set: { otp, expiresAt } },
        { upsert: true }
      );
    }
    
    // Send OTP via SMS
    async function sendOTPSMS(email: string, otp: string, phone: string) {
      const params: any = {
        Message: `Your OTP is: ${otp}. Valid for 5 minutes.`,
        PhoneNumber: phone,
      };
    
      try {
        await sns.publish(params).promise();
        console.log("SMS OTP sent successfully");
        return { otpSent: true };
      } catch (error: any) {
        console.error("Error sending SMS OTP:", error);
        return { otpSent: false, error: error.message };
      }
    }
    
    // Send OTP via Email
    async function sendOTPEmail(email: string, otp: string) {
      const sourceEmail = process.env.ADMIN_EMAIL;
    
      if (!sourceEmail) {
        throw new Error("ADMIN_EMAIL environment variable is not defined");
      }
    
      const params: any = {
        Source: sourceEmail,
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Subject: {
            Data: "Your OTP Verification Code",
          },
          Body: {
            Html: {
              Data: `
                <html>
                  <head>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                      }
                      .container {
                        background-color: white;
                        padding: 30px;
                        border-radius: 10px;
                        max-width: 500px;
                        margin: 0 auto;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                      }
                      .otp-code {
                        font-size: 32px;
                        font-weight: bold;
                        color: #28a745;
                        text-align: center;
                        padding: 20px;
                        background-color: #f8f9fa;
                        border-radius: 8px;
                        margin: 20px 0;
                        letter-spacing: 5px;
                      }
                      .warning {
                        color: #dc3545;
                        font-size: 14px;
                        margin-top: 20px;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <h2 style="color: #333;">OTP Verification</h2>
                      <p>Your One-Time Password (OTP) for verification is:</p>
                      <div class="otp-code">${otp}</div>
                      <p>This OTP is valid for <strong>5 minutes</strong>.</p>
                      <p class="warning">⚠️ Do not share this OTP with anyone.</p>
                      <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                      <p style="font-size: 12px; color: #666;">
                        If you did not request this OTP, please ignore this email.
                      </p>
                    </div>
                  </body>
                </html>
              `,
            },
          },
        },
      };
    
      try {
        await ses.sendEmail(params).promise();
        console.log("Email OTP sent successfully");
        return { otpSent: true };
      } catch (error: any) {
        console.error("Error sending Email OTP:", error);
        return { otpSent: false, error: error.message };
      }
    }
    
    // Send OTP to both Email and Mobile
    export async function sendOTP(email: any, phone: any) {
      const phoneNumber = "+91" + phone;
      
      try {
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + OTP_EXPIRATION);
    
        // Store OTP in database
        await storeOTP(email, otp, expiresAt);
    
        // Send OTP via both SMS and Email
        const smsResult = await sendOTPSMS(email, otp, phoneNumber);
        const emailResult = await sendOTPEmail(email, otp);
    
        // Check if at least one method succeeded
        if (smsResult.otpSent || emailResult.otpSent) {
          return {
            success: true,
            message: "OTP sent successfully to your email and mobile",
            smsStatus: smsResult.otpSent ? "sent" : "failed",
            emailStatus: emailResult.otpSent ? "sent" : "failed",
          };
        } else {
          return {
            success: false,
            error: "Failed to send OTP via both email and SMS",
          };
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
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
    
    // Remove OTP after successful validation
    async function removeOTP(email: string) {
      const client = await connectToDatabase();
      const db = client.db("crowdshaki");
      await db.collection("otps").deleteOne({ email });
    }
    
    export async function verifyOTP(email: any, otp: any) {
      try {
        const isValid = await validateOTP(email, otp);
    
        if (!isValid) {
          console.log("Incorrect OTP");
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
      } catch (error) {
        console.error("OTP verification error:", error);
        return {
          success: false,
          error: "OTP verification failed",
        };
      }
    }