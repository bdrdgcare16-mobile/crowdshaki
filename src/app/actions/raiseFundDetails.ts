// "use server"

// import { NextRequest } from "next/server"

// export const raiseFundDetails = async(formdata: FormData, userId: string|null) => {
//     console.log(formdata)
    
//     const firstName = formdata.get("firstName")
//     const lastName = formdata.get("lastName")
//     const email = formdata.get("email")
//     const mobile = formdata.get("mobile")
//     const address = formdata.get("address")
//     const pincode = formdata.get("pincode")
//     const block = formdata.get("block")
//     const center = formdata.get("center")
//     const chaName = formdata.get("chaName")
//     const chaPhoneNumber = formdata.get("chaPhoneNumber")
//     const chaLeader = formdata.get("chaLeader")
//     const documentsFinished = formdata.get("documentsFinished")
//     const aeStudentName = formdata.get("aeStudentName")
//     const aePhoneNumber = formdata.get("aePhoneNumber")
//     const hrName = formdata.get("hrName")
//     const beneficiaryName = formdata.get("beneficiaryName")
//     const relationship = formdata.get("relationship")
//     const amountForFund = formdata.get("amountForFund")
//     const reasonForFund = formdata.get("reasonForFund")
//     const situation = formdata.get("situation")
//     const category = formdata.get("category")
//     const accountNumber = formdata.get("accountNumber")
//     const accountHolder = formdata.get("accountHolder")
//     const accountType = formdata.get("accountType")
//     const ifscCode = formdata.get("ifscCode")

//     console.log(userId);
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/raiseFunds`, {  
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             firstName,
//             lastName,
//             email,
//             mobile,
//             address,
//             pincode,
//             block,
//             center,
//             chaName,
//             chaPhoneNumber,
//             chaLeader,
//             aeStudentName,
//             aePhoneNumber,
//             hrName,
//             documentsFinished,
//             beneficiaryName,
//             relationship,
//             amountForFund,
//             reasonForFund,
//             situation,
//             category,
//             accountHolder,
//             accountNumber,
//             accountType,
//             ifscCode,
//             userId
//         })
//     })
    
//     const data = await res.json()
//     console.log(data)
//     return data
// }





// "use server"

// import AWS from "aws-sdk";

// // Configure AWS SES for email
// const ses = new AWS.SES({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// // Send Campaign Submission Email to Admin
// async function sendCampaignSubmissionEmail(data: any) {
//   const htmlContent = `
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; color: #333; }
//           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//           .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
//           .content { background: #f9f9f9; padding: 30px; }
//           table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//           th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
//           th { background-color: #667eea; color: white; }
//           .button { background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 5px; }
//           .reject-button { background: #dc3545; }
//           .footer { background: #333; color: white; padding: 20px; text-align: center; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1>New Fundraising Campaign Submitted!</h1>
//           </div>
          
//           <div class="content">
//             <h2>Campaign Details:</h2>
            
//             <table>
//               <tr><th>Field</th><th>Value</th></tr>
//               <tr><td><strong>Fundraiser Name</strong></td><td>${data.firstName} ${data.lastName}</td></tr>
//               <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
//               <tr><td><strong>Mobile</strong></td><td>${data.mobile}</td></tr>
//               <tr><td><strong>Beneficiary</strong></td><td>${data.beneficiaryName}</td></tr>
//               <tr><td><strong>Relationship</strong></td><td>${data.relationship}</td></tr>
//               <tr><td><strong>Amount Needed</strong></td><td>₹${data.amountForFund}</td></tr>
//               <tr><td><strong>Category</strong></td><td>${data.category}</td></tr>
//               <tr><td><strong>Reason</strong></td><td>${data.reasonForFund}</td></tr>
//               <tr><td><strong>Situation</strong></td><td>${data.situation}</td></tr>
//               <tr><td><strong>Address</strong></td><td>${data.address}, ${data.pincode}</td></tr>
//               <tr><td><strong>Account Holder</strong></td><td>${data.accountHolder}</td></tr>
//               <tr><td><strong>Account Number</strong></td><td>${data.accountNumber}</td></tr>
//               <tr><td><strong>Account Type</strong></td><td>${data.accountType}</td></tr>
//               <tr><td><strong>IFSC Code</strong></td><td>${data.ifscCode}</td></tr>
//             </table>
            
//             <div style="text-align: center; margin: 30px 0;">
//               <p><strong>Please review and take action:</strong></p>
//               <a href="https://crowdshaki.vercel.app/admin/approve?id=${data.userId}" class="button">
//                 ✅ Approve Campaign
//               </a>
//               <a href="https://crowdshaki.vercel.app/admin/reject?id=${data.userId}" class="button reject-button">
//                 ❌ Reject Campaign
//               </a>
//             </div>
            
//             <p style="color: #666; font-size: 14px;">
//               <strong>Note:</strong> Please review the campaign within 24-48 hours.
//             </p>
//           </div>
          
//           <div class="footer">
//             <p>© 2025 CrowdShaki. All rights reserved.</p>
//             <p>Admin Dashboard | Support: support@crowdshaki.com</p>
//           </div>
//         </div>
//       </body>
//     </html>
//   `;

//   const params: any = {
//     Source: process.env.ADMIN_EMAIL,
//     Destination: {
//       ToAddresses: [process.env.ADMIN_EMAIL],
//     },
//     Message: {
//       Subject: {
//         Data: `New Campaign: ${data.beneficiaryName} - ₹${data.amountForFund}`,
//       },
//       Body: {
//         Html: {
//           Data: htmlContent,
//         },
//       },
//     },
//   };

//   try {
//     await ses.sendEmail(params).promise();
//     console.log("✅ Admin notification email sent");
//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error sending admin email:", error);
//     return { success: false, error };
//   }
// }

// // Send Confirmation Email to User
// async function sendUserConfirmationEmail(data: any) {
//   const htmlContent = `
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; color: #333; }
//           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//           .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
//           .content { background: #f9f9f9; padding: 30px; }
//           .footer { background: #333; color: white; padding: 20px; text-align: center; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1>Campaign Submitted Successfully!</h1>
//           </div>
          
//           <div class="content">
//             <h2>Thank you, ${data.firstName}! 🎉</h2>
            
//             <p style="font-size: 16px; line-height: 1.6;">
//               Your fundraising campaign for <strong>${data.beneficiaryName}</strong> has been submitted successfully.
//             </p>
            
//             <div style="background: #e3f2fd; padding: 20px; border-left: 4px solid #2196F3; margin: 20px 0;">
//               <h3 style="margin: 0 0 10px 0;">Campaign Details:</h3>
//               <p style="margin: 5px 0;"><strong>Amount Required:</strong> ₹${data.amountForFund}</p>
//               <p style="margin: 5px 0;"><strong>Category:</strong> ${data.category}</p>
//               <p style="margin: 5px 0;"><strong>Beneficiary:</strong> ${data.beneficiaryName}</p>
//             </div>
            
//             <h3>What's Next?</h3>
//             <ol style="line-height: 1.8;">
//               <li>Our team will review your campaign within 24-48 hours</li>
//               <li>We may contact you if additional information is needed</li>
//               <li>Once approved, your campaign will go LIVE</li>
//               <li>You'll receive an email and WhatsApp notification</li>
//             </ol>
            
//             <p style="font-size: 16px; line-height: 1.6;">
//               We'll keep you updated via email and WhatsApp at <strong>${data.mobile}</strong>
//             </p>
            
//             <p style="font-size: 14px; color: #666; margin-top: 30px;">
//               Need help? Contact us at <a href="mailto:support@crowdshaki.com">support@crowdshaki.com</a> 
//               or call <a href="tel:+919789420775">+91 9789420775</a>
//             </p>
//           </div>
          
//           <div class="footer">
//             <p>© 2025 CrowdShaki. All rights reserved.</p>
//             <p>
//               <a href="https://crowdshaki.vercel.app" style="color: #4CAF50; text-decoration: none;">Website</a> | 
//               <a href="mailto:support@crowdshaki.com" style="color: #4CAF50; text-decoration: none;">Email</a>
//             </p>
//           </div>
//         </div>
//       </body>
//     </html>
//   `;

//   const params: any = {
//     Source: process.env.ADMIN_EMAIL,
//     Destination: {
//       ToAddresses: [data.email],
//     },
//     Message: {
//       Subject: {
//         Data: "Campaign Submitted - Under Review",
//       },
//       Body: {
//         Html: {
//           Data: htmlContent,
//         },
//       },
//     },
//   };

//   try {
//     await ses.sendEmail(params).promise();
//     console.log("✅ User confirmation email sent");
//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error sending user email:", error);
//     return { success: false, error };
//   }
// }

// // Send WhatsApp to User
// async function sendUserWhatsApp(data: any) {
//   const apiKey = process.env.FAST2SMS_API_KEY || "UR3nUMJd70Pop2IDKBqVjEcORcZQZ1D0TgsfhDJPFLYmdES8XjqUihFSzSmB";
  
//   const cleanPhone = data.mobile.toString().replace(/^\+91/, "").replace(/\s+/g, "").trim();
  
//   if (!/^\d{10}$/.test(cleanPhone)) {
//     console.error("Invalid phone:", data.mobile);
//     return { success: false, error: "Invalid phone" };
//   }

//   const message = `Hi ${data.firstName}! Your campaign for ${data.beneficiaryName} (₹${data.amountForFund}) has been submitted successfully. Our team will review it within 24-48 hours. You'll be notified once approved. - CrowdShaki`;
  
//   const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=q&message=${encodeURIComponent(message)}&language=english&flash=0&numbers=${cleanPhone}`;

//   try {
//     const response = await fetch(url);
//     const result = await response.json();

//     if (result.return === true) {
//       console.log("✅ WhatsApp sent to user");
//       return { success: true };
//     } else {
//       console.error("Fast2SMS Error:", result.message);
//       return { success: false, error: result.message };
//     }
//   } catch (error: any) {
//     console.error("WhatsApp Error:", error);
//     return { success: false, error: error.message };
//   }
// }

// export const raiseFundDetails = async(formdata: FormData, userId: string|null) => {
//     console.log("📝 Processing fundraising campaign...");
    
//     const data = {
//         firstName: formdata.get("firstName"),
//         lastName: formdata.get("lastName"),
//         email: formdata.get("email"),
//         mobile: formdata.get("mobile"),
//         address: formdata.get("address"),
//         pincode: formdata.get("pincode"),
//         block: formdata.get("block"),
//         center: formdata.get("center"),
//         chaName: formdata.get("chaName"),
//         chaPhoneNumber: formdata.get("chaPhoneNumber"),
//         chaLeader: formdata.get("chaLeader"),
//         documentsFinished: formdata.get("documentsFinished"),
//         aeStudentName: formdata.get("aeStudentName"),
//         aePhoneNumber: formdata.get("aePhoneNumber"),
//         hrName: formdata.get("hrName"),
//         beneficiaryName: formdata.get("beneficiaryName"),
//         relationship: formdata.get("relationship"),
//         amountForFund: formdata.get("amountForFund"),
//         reasonForFund: formdata.get("reasonForFund"),
//         situation: formdata.get("situation"),
//         category: formdata.get("category"),
//         accountNumber: formdata.get("accountNumber"),
//         accountHolder: formdata.get("accountHolder"),
//         accountType: formdata.get("accountType"),
//         ifscCode: formdata.get("ifscCode"),
//         userId
//     };

//     console.log("User ID:", userId);
    
//     // Submit to database
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/raiseFunds`, {  
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     });
    
//     const result = await res.json();
//     console.log("Database response:", result);
    
//     // 🔥 NEW: Send notifications if submission successful
//     if (result.status === 200) {
//         console.log("✅ Campaign saved! Sending notifications...");
        
//         // Send email to admin
//         await sendCampaignSubmissionEmail(data);
        
//         // Send confirmation email to user
//         await sendUserConfirmationEmail(data);
        
//         // Send WhatsApp to user
//         await sendUserWhatsApp(data);
        
//         console.log("✅ All notifications sent!");
//     }
    
//     return result;
// }






// "use server"

// // ============================================
// // IMPORT BREVO INSTEAD OF AWS
// // ============================================
// const SibApiV3Sdk = require('@sendinblue/client');

// // ============================================
// // BREVO EMAIL CONFIGURATION
// // ============================================
// function getBrevoClient() {
//   const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
//   const apiKey = apiInstance.authentications['apiKey'];
//   apiKey.apiKey = process.env.BREVO_API_KEY;
//   return apiInstance;
// }

// // ============================================
// // Send Campaign Submission Email to Admin
// // ============================================
// async function sendCampaignSubmissionEmail(data: any) {
//   const htmlContent = `
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; color: #333; }
//           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//           .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
//           .content { background: #f9f9f9; padding: 30px; }
//           table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//           th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
//           th { background-color: #667eea; color: white; }
//           .button { background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 5px; }
//           .reject-button { background: #dc3545; }
//           .footer { background: #333; color: white; padding: 20px; text-align: center; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1>New Fundraising Campaign Submitted!</h1>
//           </div>
          
//           <div class="content">
//             <h2>Campaign Details:</h2>
            
//             <table>
//               <tr><th>Field</th><th>Value</th></tr>
//               <tr><td><strong>Fundraiser Name</strong></td><td>${data.firstName} ${data.lastName}</td></tr>
//               <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
//               <tr><td><strong>Mobile</strong></td><td>${data.mobile}</td></tr>
//               <tr><td><strong>Beneficiary</strong></td><td>${data.beneficiaryName}</td></tr>
//               <tr><td><strong>Relationship</strong></td><td>${data.relationship}</td></tr>
//               <tr><td><strong>Amount Needed</strong></td><td>₹${data.amountForFund}</td></tr>
//               <tr><td><strong>Category</strong></td><td>${data.category}</td></tr>
//               <tr><td><strong>Reason</strong></td><td>${data.reasonForFund}</td></tr>
//               <tr><td><strong>Situation</strong></td><td>${data.situation}</td></tr>
//               <tr><td><strong>Address</strong></td><td>${data.address}, ${data.pincode}</td></tr>
//               <tr><td><strong>Account Holder</strong></td><td>${data.accountHolder}</td></tr>
//               <tr><td><strong>Account Number</strong></td><td>${data.accountNumber}</td></tr>
//               <tr><td><strong>Account Type</strong></td><td>${data.accountType}</td></tr>
//               <tr><td><strong>IFSC Code</strong></td><td>${data.ifscCode}</td></tr>
//             </table>
            
//             <div style="text-align: center; margin: 30px 0;">
//               <p><strong>Please review and take action:</strong></p>
//               <a href="https://crowdshaki.vercel.app/admin/approve?id=${data.userId}" class="button">
//                 ✅ Approve Campaign
//               </a>
//               <a href="https://crowdshaki.vercel.app/admin/reject?id=${data.userId}" class="button reject-button">
//                 ❌ Reject Campaign
//               </a>
//             </div>
            
//             <p style="color: #666; font-size: 14px;">
//               <strong>Note:</strong> Please review the campaign within 24-48 hours.
//             </p>
//           </div>
          
//           <div class="footer">
//             <p>© 2025 CrowdShaki. All rights reserved.</p>
//             <p>Admin Dashboard | Support: support@crowdshaki.com</p>
//           </div>
//         </div>
//       </body>
//     </html>
//   `;

//   try {
//     const apiInstance = getBrevoClient();
//     const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

//     sendSmtpEmail.sender = {
//       name: "CrowdShaki",
//       email: process.env.ADMIN_EMAIL || "reenap21.ai@gmail.com"
//     };
//     sendSmtpEmail.to = [{
//       email: process.env.ADMIN_EMAIL || "reenap21.ai@gmail.com"
//     }];
//     sendSmtpEmail.subject = `New Campaign: ${data.beneficiaryName} - ₹${data.amountForFund}`;
//     sendSmtpEmail.htmlContent = htmlContent;

//     await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log("✅ Admin notification email sent via Brevo");
//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error sending admin email:", error);
//     return { success: false, error };
//   }
// }

// // ============================================
// // Send Confirmation Email to User
// // ============================================
// async function sendUserConfirmationEmail(data: any) {
//   const htmlContent = `
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; color: #333; }
//           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//           .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
//           .content { background: #f9f9f9; padding: 30px; }
//           .footer { background: #333; color: white; padding: 20px; text-align: center; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1>Campaign Submitted Successfully!</h1>
//           </div>
          
//           <div class="content">
//             <h2>Thank you, ${data.firstName}! 🎉</h2>
            
//             <p style="font-size: 16px; line-height: 1.6;">
//               Your fundraising campaign for <strong>${data.beneficiaryName}</strong> has been submitted successfully.
//             </p>
            
//             <div style="background: #e3f2fd; padding: 20px; border-left: 4px solid #2196F3; margin: 20px 0;">
//               <h3 style="margin: 0 0 10px 0;">Campaign Details:</h3>
//               <p style="margin: 5px 0;"><strong>Amount Required:</strong> ₹${data.amountForFund}</p>
//               <p style="margin: 5px 0;"><strong>Category:</strong> ${data.category}</p>
//               <p style="margin: 5px 0;"><strong>Beneficiary:</strong> ${data.beneficiaryName}</p>
//             </div>
            
//             <h3>What's Next?</h3>
//             <ol style="line-height: 1.8;">
//               <li>Our team will review your campaign within 24-48 hours</li>
//               <li>We may contact you if additional information is needed</li>
//               <li>Once approved, your campaign will go LIVE</li>
//               <li>You'll receive an email and WhatsApp notification</li>
//             </ol>
            
//             <p style="font-size: 16px; line-height: 1.6;">
//               We'll keep you updated via email and WhatsApp at <strong>${data.mobile}</strong>
//             </p>
            
//             <p style="font-size: 14px; color: #666; margin-top: 30px;">
//               Need help? Contact us at <a href="mailto:support@crowdshaki.com">support@crowdshaki.com</a> 
//               or call <a href="tel:+919789420775">+91 9789420775</a>
//             </p>
//           </div>
          
//           <div class="footer">
//             <p>© 2025 CrowdShaki. All rights reserved.</p>
//             <p>
//               <a href="https://crowdshaki.vercel.app" style="color: #4CAF50; text-decoration: none;">Website</a> | 
//               <a href="mailto:support@crowdshaki.com" style="color: #4CAF50; text-decoration: none;">Email</a>
//             </p>
//           </div>
//         </div>
//       </body>
//     </html>
//   `;

//   try {
//     const apiInstance = getBrevoClient();
//     const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

//     sendSmtpEmail.sender = {
//       name: "CrowdShaki Team",
//       email: process.env.ADMIN_EMAIL || "reenap21.ai@gmail.com"
//     };
//     sendSmtpEmail.to = [{
//       email: data.email,
//       name: `${data.firstName} ${data.lastName}`
//     }];
//     sendSmtpEmail.subject = "Campaign Submitted - Under Review";
//     sendSmtpEmail.htmlContent = htmlContent;

//     await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log("✅ User confirmation email sent via Brevo");
//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error sending user email:", error);
//     return { success: false, error };
//   }
// }

// // ============================================
// // Send WhatsApp to User (KEEP AS IS - Fast2SMS)
// // ============================================
// async function sendUserWhatsApp(data: any) {
//   const apiKey = process.env.FAST2SMS_API_KEY || "UR3nUMJd70Pop2IDKBqVjEcORcZQZ1D0TgsfhDJPFLYmdES8XjqUihFSzSmB";
  
//   const cleanPhone = data.mobile.toString().replace(/^\+91/, "").replace(/\s+/g, "").trim();
  
//   if (!/^\d{10}$/.test(cleanPhone)) {
//     console.error("Invalid phone:", data.mobile);
//     return { success: false, error: "Invalid phone" };
//   }

//   const message = `Hi ${data.firstName}! Your campaign for ${data.beneficiaryName} (₹${data.amountForFund}) has been submitted successfully. Our team will review it within 24-48 hours. You'll be notified once approved. - CrowdShaki`;
  
//   const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=q&message=${encodeURIComponent(message)}&language=english&flash=0&numbers=${cleanPhone}`;

//   try {
//     const response = await fetch(url);
//     const result = await response.json();

//     if (result.return === true) {
//       console.log("✅ WhatsApp sent to user via Fast2SMS");
//       return { success: true };
//     } else {
//       console.error("Fast2SMS Error:", result.message);
//       return { success: false, error: result.message };
//     }
//   } catch (error: any) {
//     console.error("WhatsApp Error:", error);
//     return { success: false, error: error.message };
//   }
// }

// // ============================================
// // MAIN FUNCTION (KEEP STRUCTURE SAME)
// // ============================================
// export const raiseFundDetails = async(formdata: FormData, userId: string|null) => {
//     console.log("📝 Processing fundraising campaign...");
    
//     const data = {
//         firstName: formdata.get("firstName"),
//         lastName: formdata.get("lastName"),
//         email: formdata.get("email"),
//         mobile: formdata.get("mobile"),
//         address: formdata.get("address"),
//         pincode: formdata.get("pincode"),
//         block: formdata.get("block"),
//         center: formdata.get("center"),
//         chaName: formdata.get("chaName"),
//         chaPhoneNumber: formdata.get("chaPhoneNumber"),
//         chaLeader: formdata.get("chaLeader"),
//         documentsFinished: formdata.get("documentsFinished"),
//         aeStudentName: formdata.get("aeStudentName"),
//         aePhoneNumber: formdata.get("aePhoneNumber"),
//         hrName: formdata.get("hrName"),
//         beneficiaryName: formdata.get("beneficiaryName"),
//         relationship: formdata.get("relationship"),
//         amountForFund: formdata.get("amountForFund"),
//         reasonForFund: formdata.get("reasonForFund"),
//         situation: formdata.get("situation"),
//         category: formdata.get("category"),
//         accountNumber: formdata.get("accountNumber"),
//         accountHolder: formdata.get("accountHolder"),
//         accountType: formdata.get("accountType"),
//         ifscCode: formdata.get("ifscCode"),
//         userId
//     };

//     console.log("User ID:", userId);
    
//     // Submit to database
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/raiseFunds`, {  
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     });
    
//     const result = await res.json();
//     console.log("Database response:", result);
    
//     // ✅ Send notifications if submission successful
//     if (result.status === 200) {
//         console.log("✅ Campaign saved! Sending notifications via Brevo + Fast2SMS...");
        
//         // Send emails via Brevo (instead of AWS SES)
//         await sendCampaignSubmissionEmail(data);
//         await sendUserConfirmationEmail(data);
        
//         // Send WhatsApp via Fast2SMS (keep as is)
//         await sendUserWhatsApp(data);
        
//         console.log("✅ All notifications sent!");
//     }
    
//     return result;
// }



"use server"

import nodemailer from 'nodemailer';

// ============================================
// GMAIL SMTP EMAIL (Using your existing setup!)
// ============================================
async function sendEmailViaGmail(to: string, subject: string, html: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"CrowdShaki" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
    });

    console.log("✅ Email sent via Gmail to:", to);
    return { success: true };
  } catch (error: any) {
    console.error("❌ Email error:", error);
    return { success: false, error: error.message };
  }
}

// ============================================
// Send WhatsApp
// ============================================
async function sendUserWhatsApp(mobile: string, name: string) {
  try {
    const apiKey = process.env.FAST2SMS_API_KEY;
    const cleanPhone = mobile.toString().replace(/^\+91/, "").replace(/\s+/g, "").trim();
    
    if (!/^\d{10}$/.test(cleanPhone)) {
      return { success: false, error: "Invalid phone" };
    }

    const message = `Hi ${name}! Your campaign has been submitted successfully. We'll review within 24-48 hours. - CrowdShaki`;
    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=q&message=${encodeURIComponent(message)}&language=english&flash=0&numbers=${cleanPhone}`;

    const response = await fetch(url);
    const result = await response.json();

    if (result.return === true) {
      console.log("✅ WhatsApp sent");
      return { success: true };
    } else {
      console.log("⚠️ WhatsApp failed:", result.message);
      return { success: false };
    }
  } catch (error: any) {
    console.log("⚠️ WhatsApp error:", error.message);
    return { success: false };
  }
}

// ============================================
// Main function
// ============================================
export const raiseFundDetails = async(formdata: FormData, userId: string|null) => {
    console.log("📝 Processing campaign...");
    
    const data = {
        firstName: formdata.get("firstName"),
        lastName: formdata.get("lastName"),
        email: formdata.get("email"),
        mobile: formdata.get("mobile"),
        address: formdata.get("address"),
        pincode: formdata.get("pincode"),
        block: formdata.get("block"),
        center: formdata.get("center"),
        chaName: formdata.get("chaName"),
        chaPhoneNumber: formdata.get("chaPhoneNumber"),
        chaLeader: formdata.get("chaLeader"),
        documentsFinished: formdata.get("documentsFinished"),
        aeStudentName: formdata.get("aeStudentName"),
        aePhoneNumber: formdata.get("aePhoneNumber"),
        hrName: formdata.get("hrName"),
        beneficiaryName: formdata.get("beneficiaryName"),
        relationship: formdata.get("relationship"),
        amountForFund: formdata.get("amountForFund"),
        reasonForFund: formdata.get("reasonForFund"),
        situation: formdata.get("situation"),
        category: formdata.get("category"),
        accountNumber: formdata.get("accountNumber"),
        accountHolder: formdata.get("accountHolder"),
        accountType: formdata.get("accountType"),
        ifscCode: formdata.get("ifscCode"),
        userId
    };

    console.log("📧 Email:", data.email);
    
    // Save to database
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/raiseFunds`, {  
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    
    const result = await res.json();
    
    // Send notifications
    if (result.status === 200) {
        console.log("✅ Saved! Sending notifications via Gmail...");
        
        const fullName = `${data.firstName} ${data.lastName}`;
        
        // Email HTML
        const emailHtml = `
          <html>
            <body style="font-family: Arial; padding: 20px; background: #f5f5f5;">
              <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
                <h2 style="color: #4CAF50; text-align: center;">✅ Campaign Submitted!</h2>
                
                <p>Hi <strong>${fullName}</strong>,</p>
                
                <p>Your fundraising campaign has been submitted successfully!</p>
                
                <div style="background: #e3f2fd; padding: 20px; border-radius: 5px; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0;">Campaign Details:</h3>
                  <p style="margin: 5px 0;"><strong>Beneficiary:</strong> ${data.beneficiaryName}</p>
                  <p style="margin: 5px 0;"><strong>Amount:</strong> ₹${data.amountForFund}</p>
                  <p style="margin: 5px 0;"><strong>Category:</strong> ${data.category}</p>
                  <p style="margin: 5px 0;"><strong>Campaign ID:</strong> ${result.campaignId}</p>
                </div>
                
                <h3>What's Next?</h3>
                <ul>
                  <li>Our team will review within 24-48 hours</li>
                  <li>We may contact you if needed</li>
                  <li>Once approved, campaign goes LIVE</li>
                  <li>You'll receive updates via email & WhatsApp</li>
                </ul>
                
                <hr style="margin: 30px 0;">
                
                <p style="color: gray; font-size: 12px; text-align: center;">
                  CrowdShaki Team<br>
                  support@crowdshaki.com | +91 9789420775
                </p>
              </div>
            </body>
          </html>
        `;
        
        // Send email
        await sendEmailViaGmail(
          data.email as string,
          "✅ Campaign Submitted Successfully - CrowdShaki",
          emailHtml
        );
        
        // Send WhatsApp (skip if no balance)
        await sendUserWhatsApp(data.mobile as string, data.firstName as string);
        
        console.log("✅ All done!");
        
        return {
            status: 200,
            success: true,
            message: "Campaign submitted successfully!",
            campaignId: result.campaignId
        };
    }
    
    return result;
}