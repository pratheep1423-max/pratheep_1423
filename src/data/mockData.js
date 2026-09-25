export const INITIAL_SERVICES = [
  {
    id: 'srv-wedding',
    name: 'Wedding Photography',
    category: 'Weddings',
    description: 'Cinematic coverage of your special day, capturing unscripted emotion, vows, and grand celebrations.',
    startingPrice: 2800,
    duration: 'Full Day / Half Day',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    features: ['2 Photographers', 'High-res digital gallery', 'Fine art color grading', 'Print rights included']
  },
  {
    id: 'srv-prewedding',
    name: 'Pre-Wedding Photography',
    category: 'Pre-Wedding',
    description: 'Romantic editorial shoot in scenic outdoor locations or studio settings before your big day.',
    startingPrice: 1500,
    duration: '4 Hours',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    features: ['Location scouting', 'Multiple outfit changes', 'Styling consultation', '50 Edited photos']
  },
  {
    id: 'srv-birthday',
    name: 'Birthday Photography',
    category: 'Birthdays',
    description: 'Vibrant and joyful coverage for milestone birthdays, private galas, and intimate gatherings.',
    startingPrice: 850,
    duration: '3 Hours',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    features: ['Candid party moments', 'Group portraits', 'Online private gallery', 'Fast 48h highlight delivery']
  },
  {
    id: 'srv-portraits',
    name: 'Outdoor Portraits',
    category: 'Portraits',
    description: 'Editorial solo or couple portraits utilizing natural golden hour light and dramatic landscapes.',
    startingPrice: 650,
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    features: ['Golden hour timing', 'Retouching & skin tone tuning', '25 Select high-res edits', 'Full resolution downloads']
  },
  {
    id: 'srv-event',
    name: 'Event Photography',
    category: 'Events',
    description: 'Comprehensive documentary-style photography for luxury corporate galas, award shows, and private VIP events.',
    startingPrice: 1800,
    duration: '5 Hours',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    features: ['Step and repeat coverage', 'Keynote & guest highlights', 'Same-day press teaser photos', 'Commercial license']
  },
  {
    id: 'srv-fashion',
    name: 'Fashion Photography',
    category: 'Fashion',
    description: 'High-concept lookbooks, brand campaigns, and model portfolio shoots with studio lighting.',
    startingPrice: 2200,
    duration: 'Full Day',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
    features: ['Art direction support', 'Tethered shooting setup', 'High-end retouching included', 'Commercial usage rights']
  }
];

export const INITIAL_PACKAGES = [
  {
    id: 'pkg-basic',
    name: 'BASIC',
    price: 1200,
    duration: '2 Hours',
    featured: false,
    photographers: '1 Photographer',
    photosCount: '100 Edited Photos',
    features: [
      '2 Hours Coverage',
      '1 Professional Photographer',
      '100 High-Res Edited Photos',
      'Online Private Web Gallery',
      'Standard Turnaround (14 Days)'
    ]
  },
  {
    id: 'pkg-signature',
    name: 'SIGNATURE',
    price: 2800,
    duration: '5 Hours',
    featured: true,
    photographers: '2 Photographers',
    photosCount: '300 Edited Photos',
    features: [
      '5 Hours Coverage',
      '2 Lead Photographers',
      '300 High-Res Edited Photos',
      'Handcrafted Premium Album (30 Pages)',
      'Pre-Event Styling Consultation',
      'Express Turnaround (7 Days)'
    ]
  },
  {
    id: 'pkg-luxury',
    name: 'LUXURY',
    price: 5500,
    duration: 'Full Day',
    featured: false,
    photographers: '2 Photographers',
    photosCount: 'Unlimited Coverage',
    features: [
      'Full Day Unlimited Hours',
      '2 Master Photographers + Lighting Assistant',
      'Unlimited High-Res Edited Photos',
      'Luxury Leather-Bound Album',
      '3-Minute Cinematic Highlight Film',
      'Drone Aerial Photography (Weather Permitting)',
      'VIP Priority 3-Day Turnaround'
    ]
  }
];

export const INITIAL_PORTFOLIO = [
  {
    id: 'port-1',
    title: 'Serenade by the Coast',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    location: 'Amalfi Coast, Italy',
    featured: true,
    aspect: 'tall',
    description: 'An intimate clifftop wedding captured in soft Mediterranean sunset light.'
  },
  {
    id: 'port-2',
    title: 'Elegance in Motion',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
    location: 'Paris, France',
    featured: true,
    aspect: 'wide',
    description: 'High-fashion editorial shoot showcasing fluid silk drapes against haussmannian architecture.'
  },
  {
    id: 'port-3',
    title: 'The Golden Hour Promise',
    category: 'Pre-Wedding',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    location: 'Santorini, Greece',
    featured: false,
    aspect: 'tall',
    description: 'Warm golden hour romance framed against white cycladic rooftops.'
  },
  {
    id: 'port-4',
    title: 'The Modern Monolith',
    category: 'Portraits',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    location: 'New York, USA',
    featured: true,
    aspect: 'tall',
    description: 'Deep dramatic shadow play and minimalist studio lighting for a striking portrait.'
  },
  {
    id: 'port-5',
    title: 'Gala under Stars',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    location: 'London, UK',
    featured: false,
    aspect: 'wide',
    description: 'Annual philanthropy ball captured with crisp ambient lighting and candid joy.'
  },
  {
    id: 'port-6',
    title: 'Wilderness Vows',
    category: 'Outdoor',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    location: 'Banff National Park, Canada',
    featured: true,
    aspect: 'tall',
    description: 'Breathtaking mountain lake vistas setting the stage for an authentic couple shoot.'
  },
  {
    id: 'port-7',
    title: 'The 30th Horizon Gala',
    category: 'Birthdays',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    location: 'Los Angeles, USA',
    featured: false,
    aspect: 'square',
    description: 'Sophisticated rooftop birthday celebration surrounded by champagne and laughter.'
  },
  {
    id: 'port-8',
    title: 'Eternal Grace',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    location: 'Tuscany, Italy',
    featured: false,
    aspect: 'tall',
    description: 'A classic villa wedding featuring traditional florals and timeless black-tie aesthetic.'
  },
  {
    id: 'port-9',
    title: 'Vogue Horizon',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    location: 'Milan, Italy',
    featured: false,
    aspect: 'wide',
    description: 'Avant-garde capsule collection portrait in industrial studio lighting.'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'bk-1',
    refNumber: '2MP-2026-00125',
    customerName: 'Victoria Sterling',
    email: 'victoria.sterling@example.com',
    phone: '+1 (555) 234-5678',
    serviceId: 'srv-wedding',
    serviceName: 'Wedding Photography',
    packageId: 'pkg-luxury',
    packageName: 'LUXURY',
    price: 5500,
    eventDate: '2026-10-18',
    eventTime: '10:00 AM',
    eventType: 'Weddings',
    location: 'Grand Ballroom, Plaza Hotel, New York',
    peopleCount: 180,
    requirements: 'Focus on natural candid moments and drone aerial shots during outdoor cocktail hour.',
    status: 'Confirmed',
    createdAt: '2026-09-01T14:30:00Z'
  },
  {
    id: 'bk-2',
    refNumber: '2MP-2026-00126',
    customerName: 'Marcus Vance',
    email: 'marcus.v@example.com',
    phone: '+1 (555) 987-6543',
    serviceId: 'srv-prewedding',
    serviceName: 'Pre-Wedding Photography',
    packageId: 'pkg-signature',
    packageName: 'SIGNATURE',
    price: 2800,
    eventDate: '2026-10-22',
    eventTime: '03:30 PM',
    eventType: 'Pre-Wedding',
    location: 'Botanical Gardens & Coastline',
    peopleCount: 2,
    requirements: 'Need golden hour lighting for seaside shots. 2 outfit changes.',
    status: 'Pending',
    createdAt: '2026-09-05T09:15:00Z'
  },
  {
    id: 'bk-3',
    refNumber: '2MP-2026-00127',
    customerName: 'Elena Rostova',
    email: 'elena.r@example.com',
    phone: '+1 (555) 456-7890',
    serviceId: 'srv-fashion',
    serviceName: 'Fashion Photography',
    packageId: 'pkg-basic',
    packageName: 'BASIC',
    price: 1200,
    eventDate: '2026-09-28',
    eventTime: '11:00 AM',
    eventType: 'Fashion',
    location: 'Downtown Loft Studio A',
    peopleCount: 5,
    requirements: 'High contrast monochrome portrait lookbook.',
    status: 'Completed',
    createdAt: '2026-08-20T16:00:00Z'
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1',
    name: 'Victoria Sterling',
    email: 'victoria.sterling@example.com',
    phone: '+1 (555) 234-5678',
    bookingsCount: 2,
    lastBookingDate: '2026-10-18',
    totalSpent: 8300
  },
  {
    id: 'cust-2',
    name: 'Marcus Vance',
    email: 'marcus.v@example.com',
    phone: '+1 (555) 987-6543',
    bookingsCount: 1,
    lastBookingDate: '2026-10-22',
    totalSpent: 2800
  },
  {
    id: 'cust-3',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    phone: '+1 (555) 456-7890',
    bookingsCount: 1,
    lastBookingDate: '2026-09-28',
    totalSpent: 1200
  }
];

export const INITIAL_ENQUIRIES = [
  {
    id: 'enq-1',
    name: 'Claire Dupont',
    email: 'claire.dupont@example.com',
    phone: '+1 (555) 321-7654',
    message: 'Hello! We are planning a destination wedding in Amalfi for summer 2027. Do you offer international travel packages?',
    date: '2026-09-10T11:20:00Z',
    status: 'New'
  },
  {
    id: 'enq-2',
    name: 'Julian Hayes',
    email: 'julian.h@example.com',
    phone: '+1 (555) 654-0987',
    message: 'Looking for a private portrait session for our executive leadership team next month.',
    date: '2026-09-08T15:45:00Z',
    status: 'Read'
  },
  {
    id: 'enq-3',
    name: 'Sophia Thorne',
    email: 'sophia.t@example.com',
    phone: '+1 (555) 876-5432',
    message: 'Wanted to inquire if the Signature package includes drone videography or if that is exclusively Luxury?',
    date: '2026-09-04T10:10:00Z',
    status: 'Replied'
  }
];

export const INITIAL_BLOCKED_DATES = [
  '2026-10-18',
  '2026-10-25',
  '2026-11-04'
];

export const BEFORE_AFTER_SAMPLES = [
  {
    id: 'ba-1',
    title: 'Warm Tuscan Sunset Color Grade',
    original: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=50&sat=-40&con=-20', // simulated raw unedited feel
    edited: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' // high res finished edit
  },
  {
    id: 'ba-2',
    title: 'High-Fashion Studio Retouching',
    original: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=50&sat=-50',
    edited: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Alexander & Charlotte Vance',
    event: 'Luxury Amalfi Wedding',
    quote: '2M PICTURES turned our wedding into an unforgettable masterpiece. Every photograph feels like a still from a high-end cinema classic.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'test-2',
    name: 'Isabelle Chen',
    event: 'Fashion Editorial Campaign',
    quote: 'Working with the 2M team was sheer perfection. Their attention to subtle lighting and editorial pacing is unmatched in the industry.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'test-3',
    name: 'David & Evelyn Miller',
    event: 'Pre-Wedding Sunset Session',
    quote: 'We were nervous in front of the camera, but they made us feel so effortless and natural. The final album brought our families to tears.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_SITE_SETTINGS = {
  brandName: '2M PICTURES',
  tagline: 'Stories Worth Remembering.',
  heroBadge: 'FINE ART PHOTOGRAPHY STUDIO',
  heroTitle: 'Stories Worth Remembering.',
  heroSubtitle: 'We capture real moments and transform them into timeless visual stories.',
  heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90',
  heroCtaText: 'BOOK YOUR SESSION',
  aboutSubtitle: '02 / ABOUT THE STUDIO',
  aboutTitle: "We don't take pictures. We craft heirlooms.",
  aboutDescription: 'Founded in 2020, 2M PICTURES was built on a simple promise: to capture life’s most profound transitions—weddings, milestones, high-fashion editorials, and quiet intimate gazes—with elevated artistic rigor.',
  directorName: 'Pratheep',
  directorRole: 'Creative Director & Founder',
  directorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  email: 'admin@2mpictures.com',
  phone: '+91 9876543210',
  whatsapp: '919876543210',
  address: 'Main Studio Avenue, Luxury District',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  bts1: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
  bts2: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
  bts3: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
  bts4: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80',
  beforeAfterOriginal: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=50&sat=-40&con=-20',
  beforeAfterEdited: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
};

