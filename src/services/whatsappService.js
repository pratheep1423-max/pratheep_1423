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

/**
 * CUSTOMER NOTIFICATION SERVICES
 * Generates direct WhatsApp message link & mailto link for customer updates
 */
export const formatCustomerStatusMessage = (booking, newStatus = booking.status) => {
  let statusBadge = '✅ CONFIRMED';
  let statusDesc = '🎉 Congratulations! Your photography reservation has been officially APPROVED & CONFIRMED by our studio team.';

  if (newStatus === 'Cancelled') {
    statusBadge = '❌ CANCELLED';
    statusDesc = 'Your booking has been cancelled. If this was a mistake or you wish to reschedule to another date, please get in touch with us.';
  } else if (newStatus === 'Completed') {
    statusBadge = '🌟 COMPLETED';
    statusDesc = 'Thank you for choosing 2M PICTURES! Your shoot has been completed and your high-res digital gallery is currently being curated & color-graded.';
  } else if (newStatus === 'In Progress') {
    statusBadge = '⏳ IN PROGRESS';
    statusDesc = 'Your booking is currently being processed by our lead photographers.';
  } else if (newStatus === 'Pending') {
    statusBadge = '🕒 PENDING REVIEW';
    statusDesc = 'Your booking is received and awaiting schedule confirmation.';
  }

  return `✨ *2M PICTURES STUDIO - BOOKING STATUS UPDATE* ✨

Dear *${booking.customerName || 'Valued Client'}*,

${statusDesc}

📋 *RESERVATION DETAILS:*
━━━━━━━━━━━━━━━━━━━━━
🔖 *Booking Ref:* ${booking.refNumber}
📌 *Current Status:* *${statusBadge}*
📸 *Service:* ${booking.serviceName || booking.eventType || 'Photography Session'}
💎 *Package Tier:* ${booking.packageName || 'Standard'}
📅 *Date:* ${booking.eventDate || 'Scheduled Date'}
⏰ *Time:* ${booking.eventTime || 'TBD'}
📍 *Location:* ${booking.location || 'Studio'}
💰 *Price:* $${booking.price?.toLocaleString() || 0}
━━━━━━━━━━━━━━━━━━━━━

For questions or styling inquiries, reply directly to this chat.
Thank you for letting 2M PICTURES capture your special moments!`;
};

export const getCustomerWhatsAppLink = (booking, newStatus = booking.status) => {
  let phone = (booking.phone || '').replace(/[^0-9]/g, '');
  if (phone.length === 10) phone = '91' + phone; // Default to India country code if 10-digit
  const message = formatCustomerStatusMessage(booking, newStatus);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const sendStatusUpdateToCustomerWhatsApp = (booking, newStatus = booking.status) => {
  const url = getCustomerWhatsAppLink(booking, newStatus);
  const win = window.open(url, '_blank');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    window.location.href = url;
  }
};

export const getCustomerEmailLink = (booking, newStatus = booking.status) => {
  const subject = `Booking Update [${newStatus.toUpperCase()}] - Ref: ${booking.refNumber} - 2M PICTURES Studio`;
  
  let statusNote = 'Your photography booking has been officially CONFIRMED on our schedule!';
  if (newStatus === 'Cancelled') statusNote = 'Your photography booking has been cancelled.';
  if (newStatus === 'Completed') statusNote = 'Your photography session is completed! We are preparing your finished photo gallery.';

  const body = `Dear ${booking.customerName || 'Client'},

${statusNote}

RESERVATION DETAILS:
--------------------------------------------------
Booking Reference: ${booking.refNumber}
Current Status: ${newStatus.toUpperCase()}
Service Offering: ${booking.serviceName || booking.eventType}
Package Tier: ${booking.packageName}
Event Date: ${booking.eventDate}
Event Time: ${booking.eventTime}
Location: ${booking.location}
Total Amount: $${booking.price?.toLocaleString() || 0}
--------------------------------------------------

If you have any questions or schedule adjustments, please reply to this email or reach us on WhatsApp (+91 8248149082).

Warm Regards,
Studio Management Team
2M PICTURES Studio
hello@2mpictures.com`;

  return `mailto:${booking.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const sendCustomerEmailUpdate = (booking, newStatus = booking.status) => {
  const url = getCustomerEmailLink(booking, newStatus);
  window.location.href = url;
};

