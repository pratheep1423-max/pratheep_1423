import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import { sendBookingNotification } from './notificationService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// Target WhatsApp number
const ADMIN_WHATSAPP_NUMBER = '918248149082';

// Ensure data directory and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2));
}

// Helpers for JSON reading/writing
const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

const formatWhatsAppURL = (booking) => {
  const message = `📸 *NEW BOOKING RESERVATION - 2M PICTURES*

*Ref Number:* ${booking.refNumber}
*Customer Name:* ${booking.customerName}
*Phone:* ${booking.phone}
*Email:* ${booking.email}

*Service:* ${booking.serviceName}
*Package:* ${booking.packageName} ($${booking.price})
*Event Date:* ${booking.eventDate}
*Time Slot:* ${booking.eventTime}
*Location:* ${booking.location}
*Guests:* ${booking.peopleCount}
${booking.requirements ? `*Notes:* ${booking.requirements}` : ''}

*Status:* ${booking.status}`;

  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // GET /api/bookings
  if (req.method === 'GET' && url.pathname === '/api/bookings') {
    const bookings = readJSON(BOOKINGS_FILE);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, bookings }));
    return;
  }

  // POST /api/bookings
  if (req.method === 'POST' && url.pathname === '/api/bookings') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const bookings = readJSON(BOOKINGS_FILE);

        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const refNumber = payload.refNumber || `2MP-2026-${randomNum}`;

        const newBooking = {
          id: `bk-${Date.now()}`,
          refNumber,
          status: 'Pending',
          createdAt: new Date().toISOString(),
          ...payload
        };

        bookings.unshift(newBooking);
        writeJSON(BOOKINGS_FILE, bookings);

        // Dispatch instant notification to admin phone number
        sendBookingNotification(newBooking);

        const whatsappUrl = formatWhatsAppURL(newBooking);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          booking: newBooking,
          whatsappUrl,
          whatsappNumber: ADMIN_WHATSAPP_NUMBER
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // GET /api/enquiries
  if (req.method === 'GET' && url.pathname === '/api/enquiries') {
    const enquiries = readJSON(ENQUIRIES_FILE);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, enquiries }));
    return;
  }

  // POST /api/enquiries
  if (req.method === 'POST' && url.pathname === '/api/enquiries') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const enquiries = readJSON(ENQUIRIES_FILE);

        const newEnquiry = {
          id: `enq-${Date.now()}`,
          status: 'New',
          createdAt: new Date().toISOString(),
          ...payload
        };

        enquiries.unshift(newEnquiry);
        writeJSON(ENQUIRIES_FILE, enquiries);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, enquiry: newEnquiry }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // POST /api/admin/login
  if (req.method === 'POST' && url.pathname === '/api/admin/login') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { username, password } = JSON.parse(body);
        const { EMAIL, USERNAME, PASSWORD } = config.ADMIN_AUTH;

        const inputUser = (username || '').trim().toLowerCase();
        const validEmail = EMAIL.toLowerCase();
        const validUser = USERNAME.toLowerCase();

        if ((inputUser === validEmail || inputUser === validUser) && password === PASSWORD) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            token: `2m-auth-token-${Date.now()}`,
            user: { name: 'Studio Director', email: EMAIL, role: 'Super Admin' }
          }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Invalid username/email or password.' }));
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON request' }));
      }
    });
    return;
  }

  // 404 Route
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`🚀 2M Pictures Backend API Server running on http://localhost:${PORT}`);
  console.log(`📱 WhatsApp target notifications set to: +${ADMIN_WHATSAPP_NUMBER}`);
});

