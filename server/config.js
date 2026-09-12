/**
 * 2M Pictures - Notification Server Configuration
 * ----------------------------------------------------
 * Enter your phone number and notification credentials below.
 */

export const config = {
  // Your phone number to receive booking alerts (Include country code, e.g. '918248149082' or '+918248149082')
  ADMIN_PHONE_NUMBER: '918248149082',

  // Admin Login Authentication Credentials
  ADMIN_AUTH: {
    EMAIL: process.env.ADMIN_EMAIL || 'admin@2mpictures.com',
    USERNAME: process.env.ADMIN_USERNAME || 'admin',
    PASSWORD: process.env.ADMIN_PASSWORD || 'pratheep@217'
  },

  // Select Notification Provider:
  // Options: 'WHATSAPP_LINK' | 'CALLMEBOT' | 'TWILIO_SMS' | 'TWILIO_WHATSAPP' | 'FAST2SMS'
  PROVIDER: 'WHATSAPP_LINK',

  // =========================================================================
  // PROVIDER CREDENTIALS
  // =========================================================================

  // 1. CallMeBot (Simplest Free WhatsApp Notification Service)
  // How to get API Key: Send "I allow callmebot to send me messages" on WhatsApp to +34 644 10 55 84
  CALLMEBOT_API_KEY: '', // <--- Enter CallMeBot API key here

  // 2. Twilio (SMS & WhatsApp API)
  TWILIO: {
    ACCOUNT_SID: '',     // <--- Enter Twilio Account SID
    AUTH_TOKEN: '',      // <--- Enter Twilio Auth Token
    FROM_NUMBER: ''      // <--- Enter Twilio Phone Number (e.g. '+1234567890' or 'whatsapp:+14155238886')
  },

  // 3. Fast2SMS (Indian SMS Gateway)
  FAST2SMS: {
    API_KEY: ''          // <--- Enter Fast2SMS API Key
  }
};
