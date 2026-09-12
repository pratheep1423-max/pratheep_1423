/**
 * WhatsApp Notification Service for 2M Pictures Studio
 * Target WhatsApp Number: +91 8248149082
 */

export const ADMIN_WHATSAPP_NUMBER = '918248149082';

export const formatWhatsAppMessage = (booking) => {
  const text = `📸 NEW BOOKING
Customer: ${booking.customerName || 'N/A'}
Phone: ${booking.phone || 'N/A'}
Event: ${booking.eventType || booking.serviceName || 'N/A'}
Date: ${booking.eventDate || 'N/A'}
Time: ${booking.eventTime || 'N/A'}
Location: ${booking.location || 'N/A'}
Package: ${booking.packageName || 'N/A'}`;

  return text;
};

export const formatEnquiryWhatsAppMessage = (enquiry) => {
  return `📩 *NEW CLIENT ENQUIRY - 2M PICTURES*

*Name:* ${enquiry.name || 'N/A'}
*Email:* ${enquiry.email || 'N/A'}
*Phone:* ${enquiry.phone || 'N/A'}

*Message:* ${enquiry.message || 'No details provided.'}`;
};

export const getWhatsAppLink = (booking, targetNumber = ADMIN_WHATSAPP_NUMBER) => {
  const message = formatWhatsAppMessage(booking);
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
};

export const getEnquiryWhatsAppLink = (enquiry, targetNumber = ADMIN_WHATSAPP_NUMBER) => {
  const message = formatEnquiryWhatsAppMessage(enquiry);
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
};

export const sendBookingToWhatsApp = (booking, targetNumber = ADMIN_WHATSAPP_NUMBER, directRedirect = false) => {
  const url = getWhatsAppLink(booking, targetNumber);
  if (directRedirect) {
    window.location.href = url;
  } else {
    const win = window.open(url, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      // Fallback if popup blocker intercepted
      window.location.href = url;
    }
  }
};

export const sendEnquiryToWhatsApp = (enquiry, targetNumber = ADMIN_WHATSAPP_NUMBER) => {
  const url = getEnquiryWhatsAppLink(enquiry, targetNumber);
  const win = window.open(url, '_blank');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    window.location.href = url;
  }
};
