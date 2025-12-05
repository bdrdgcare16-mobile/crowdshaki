// app/lib/notifications.ts
import axios from 'axios';

const SibApiV3Sdk = require('@sendinblue/client');

// ============================================
// BREVO EMAIL FUNCTIONS
// ============================================

export async function sendBrevoEmail(
  recipientEmail: string,
  recipientName: string,
  templateId: number,
  params?: Record<string, any>
) {
  try {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    // Configure API key
    const apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    sendSmtpEmail.sender = {
      name: "CrowdShaki Team",
      email: "reenap21.ai@gmail.com" // Your verified email
    };
    sendSmtpEmail.to = [
      {
        email: recipientEmail,
        name: recipientName
      }
    ];
    sendSmtpEmail.templateId = templateId;
    sendSmtpEmail.params = params || {};

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Brevo email sent successfully');
    return { success: true, data: result };
    
  } catch (error: any) {
    console.error('❌ Brevo email error:', error.response?.body || error.message);
    return { success: false, error: error.message };
  }
}

// ============================================
// WATI WHATSAPP FUNCTIONS (OPTIONAL FOR NOW)
// ============================================

export async function sendWatiWhatsApp(
  phoneNumber: string,
  templateName: string,
  parameters: Array<{ name: string }>
) {
  // Skip if Wati not configured yet
  if (!process.env.WATI_API_KEY || !process.env.WATI_ENDPOINT) {
    console.log('⚠️ Wati not configured - skipping WhatsApp');
    return { success: false, message: 'Wati not configured' };
  }

  try {
    // Format phone number
    let formattedPhone = phoneNumber.replace(/\s+/g, '');
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+91' + formattedPhone;
    }

    const response = await axios.post(
      `${process.env.WATI_ENDPOINT}/api/v1/sendTemplateMessage`,
      {
        whatsappNumber: formattedPhone,
        template_name: templateName,
        broadcast_name: "Campaign Update",
        parameters: parameters
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WATI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Wati WhatsApp sent successfully');
    return { success: true, data: response.data };
    
  } catch (error: any) {
    console.error('❌ Wati WhatsApp error:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
}

// ============================================
// COMBINED NOTIFICATION FUNCTION
// ============================================

export async function sendCampaignNotifications(
  email: string,
  name: string,
  phone: string,
  notificationType: 'submitted' | 'approved' | 'rejected',
  campaignDetails?: {
    campaignId?: string;
    amountForFund?: string;
    reasonForFund?: string;
    campaignLink?: string;
  }
) {
  const results: any = {
    email: { sent: false },
    whatsapp: { sent: false }
  };

  // Template IDs - UPDATE THESE WITH YOUR ACTUAL IDs
  const emailTemplates = {
    submitted: 2,  // campaign_submitted template ID
    approved: 1,   // campaign_approved template ID
    rejected: 3    // campaign_rejected template ID
  };

  // WhatsApp template names
  const whatsappTemplates = {
    submitted: 'campaign_submitted',
    approved: 'campaign_approved',
    rejected: 'campaign_rejected'
  };

  // Send Email via Brevo
  try {
    const emailParams = {
      NAME: name,
      CAMPAIGN_ID: campaignDetails?.campaignId || 'N/A',
      AMOUNT: campaignDetails?.amountForFund || 'N/A',
      REASON: campaignDetails?.reasonForFund || 'N/A',
      CAMPAIGN_LINK: campaignDetails?.campaignLink || 'https://crowdshaki.com'
    };

    const emailResult = await sendBrevoEmail(
      email,
      name,
      emailTemplates[notificationType],
      emailParams
    );
    
    results.email = emailResult;
  } catch (error) {
    console.error('Email sending failed:', error);
  }

  // Send WhatsApp via Wati (if configured)
  try {
    const whatsappParams = [
      { name: name },
      { name: campaignDetails?.campaignLink || 'https://crowdshaki.com' }
    ];

    const whatsappResult = await sendWatiWhatsApp(
      phone,
      whatsappTemplates[notificationType],
      whatsappParams
    );
    
    results.whatsapp = whatsappResult;
  } catch (error) {
    console.error('WhatsApp sending failed:', error);
  }

  return results;
}