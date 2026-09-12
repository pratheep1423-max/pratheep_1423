import https from 'https';
import http from 'http';
import { config } from './config.js';

/**
 * Format exact requested notification message
 */
export const formatBookingNotification = (booking) => {
  const name = booking.customerName || 'N/A';
  const phone = booking.phone || 'N/A';
  const eventType = booking.eventType || booking.serviceName || 'N/A';
  const eventDate = booking.eventDate || 'N/A';
  const eventTime = booking.eventTime || 'N/A';
  const location = booking.location || 'N/A';
  const packageSelected = booking.packageName || 'N/A';

  return `📸 NEW BOOKING
Customer: ${name}
Phone: ${phone}
Event: ${eventType}
Date: ${eventDate}
Time: ${eventTime}
Location: ${location}
Package: ${packageSelected}`;
};

/**
 * Send notification to admin phone number using configured provider
 */
export const sendBookingNotification = async (booking) => {
  const message = formatBookingNotification(booking);
  const targetPhone = config.ADMIN_PHONE_NUMBER.replace(/[^0-9]/g, '');

  console.log('\n----------------------------------------');
  console.log('🔔 NEW BOOKING NOTIFICATION DISPATCHED:');
  console.log(message);
  console.log('----------------------------------------\n');

  try {
    switch (config.PROVIDER) {
      case 'CALLMEBOT':
        return await sendCallMeBot(targetPhone, message);
      case 'TWILIO_SMS':
        return await sendTwilioSMS(targetPhone, message);
      case 'TWILIO_WHATSAPP':
        return await sendTwilioWhatsApp(targetPhone, message);
      case 'FAST2SMS':
        return await sendFast2SMS(targetPhone, message);
      case 'WHATSAPP_LINK':
      default:
        console.log(`ℹ️ Provider set to WHATSAPP_LINK. Direct URL generated.`);
        return { success: true, mode: 'WHATSAPP_LINK' };
    }
  } catch (err) {
    console.error('❌ Notification Dispatch Error:', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * 1. CallMeBot WhatsApp API (Free & Simple)
 */
const sendCallMeBot = (phone, text) => {
  return new Promise((resolve) => {
    const apiKey = config.CALLMEBOT_API_KEY;
    if (!apiKey) {
      console.warn('⚠️ CallMeBot API Key is empty in server/config.js');
      return resolve({ success: false, message: 'Missing CallMeBot API key' });
    }

    const encodedText = encodeURIComponent(text);
    const url = `https://api.callmebot.com/whatsapp.php?phone=+${phone}&text=${encodedText}&apikey=${apiKey}`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        console.log('✅ CallMeBot Response:', data);
        resolve({ success: true, response: data });
      });
    }).on('error', (err) => {
      console.error('❌ CallMeBot Error:', err.message);
      resolve({ success: false, error: err.message });
    });
  });
};

/**
 * 2. Twilio SMS
 */
const sendTwilioSMS = (phone, text) => {
  return new Promise((resolve) => {
    const { ACCOUNT_SID, AUTH_TOKEN, FROM_NUMBER } = config.TWILIO;
    if (!ACCOUNT_SID || !AUTH_TOKEN || !FROM_NUMBER) {
      console.warn('⚠️ Twilio Credentials missing in server/config.js');
      return resolve({ success: false, message: 'Missing Twilio credentials' });
    }

    const postData = new URLSearchParams({
      To: `+${phone}`,
      From: FROM_NUMBER,
      Body: text
    }).toString();

    const auth = Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64');

    const req = https.request({
      hostname: 'api.twilio.com',
      path: `/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`,
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        console.log('✅ Twilio SMS Response:', data);
        resolve({ success: true, response: data });
      });
    });

    req.on('error', (err) => {
      console.error('❌ Twilio Error:', err.message);
      resolve({ success: false, error: err.message });
    });

    req.write(postData);
    req.end();
  });
};

/**
 * 3. Twilio WhatsApp
 */
const sendTwilioWhatsApp = (phone, text) => {
  return new Promise((resolve) => {
    const { ACCOUNT_SID, AUTH_TOKEN, FROM_NUMBER } = config.TWILIO;
    if (!ACCOUNT_SID || !AUTH_TOKEN || !FROM_NUMBER) {
      console.warn('⚠️ Twilio Credentials missing in server/config.js');
      return resolve({ success: false, message: 'Missing Twilio credentials' });
    }

    const fromFormatted = FROM_NUMBER.startsWith('whatsapp:') ? FROM_NUMBER : `whatsapp:${FROM_NUMBER}`;
    const toFormatted = `whatsapp:+${phone}`;

    const postData = new URLSearchParams({
      To: toFormatted,
      From: fromFormatted,
      Body: text
    }).toString();

    const auth = Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64');

    const req = https.request({
      hostname: 'api.twilio.com',
      path: `/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`,
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        console.log('✅ Twilio WhatsApp Response:', data);
        resolve({ success: true, response: data });
      });
    });

    req.on('error', (err) => {
      console.error('❌ Twilio WhatsApp Error:', err.message);
      resolve({ success: false, error: err.message });
    });

    req.write(postData);
    req.end();
  });
};

/**
 * 4. Fast2SMS (Indian SMS Gateway)
 */
const sendFast2SMS = (phone, text) => {
  return new Promise((resolve) => {
    const apiKey = config.FAST2SMS.API_KEY;
    if (!apiKey) {
      console.warn('⚠️ Fast2SMS API Key missing in server/config.js');
      return resolve({ success: false, message: 'Missing Fast2SMS API key' });
    }

    // Standard 10 digit Indian number
    const numbers = phone.slice(-10);
    const postData = JSON.stringify({
      route: 'q',
      message: text,
      language: 'english',
      flash: 0,
      numbers: numbers
    });

    const req = https.request({
      hostname: 'www.fast2sms.com',
      path: '/dev/bulkV2',
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        console.log('✅ Fast2SMS Response:', data);
        resolve({ success: true, response: data });
      });
    });

    req.on('error', (err) => {
      console.error('❌ Fast2SMS Error:', err.message);
      resolve({ success: false, error: err.message });
    });

    req.write(postData);
    req.end();
  });
};
