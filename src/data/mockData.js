// Mock data for the application

export const eventCategories = [
  {
    id: 1,
    name: 'Weddings',
    description: 'From intimate ceremonies to grand celebrations, find everything you need for your perfect day.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Corporate Events',
    description: 'Conferences, team-building, product launches, and more professional services for every business need.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Birthdays & Anniversaries',
    description: 'Celebrate milestones with custom cakes, decorations, entertainment, and memorable moments.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Social Gatherings',
    description: 'Host gatherings for reunions and special occasions with ease. Food, music, and fun for all.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Festivals & Concerts',
    description: 'Organize large-scale public events, live music, festivals & cultural celebrations.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Private Parties',
    description: 'Exclusive venues, bespoke catering, and tailored entertainment for your intimate event.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop'
  }
];

export const featuredServices = [
  {
    id: 1,
    name: 'Gourmet Catering Deluxe',
    vendor: 'Culinary Masterpieces',
    price: 75,
    priceUnit: 'person',
    rating: 4.9,
    reviews: 1230,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop',
    description: 'Experience exquisite flavors with our premium catering service perfect for weddings, corporate events, and large gatherings.'
  },
  {
    id: 2,
    name: 'Luxury Floral & Decor',
    vendor: 'Petal Perfect Designs',
    price: 1500,
    priceUnit: 'event',
    rating: 4.8,
    reviews: 856,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
    description: 'Transform your venue into a dream setting with our bespoke decoration packages. From intimate gatherings to grand celebrations.'
  },
  {
    id: 3,
    name: 'Dynamic DJ & Lighting',
    vendor: 'Rhythm & Lights Entertainment',
    price: 800,
    priceUnit: 'event',
    rating: 4.9,
    reviews: 2104,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
    description: 'Keep your guests dancing all night with our professional DJ services. State-of-the-art sound systems and vibrant lighting effects.'
  },
  {
    id: 4,
    name: 'Elegant Photo Booth',
    vendor: 'Snapshot Memories',
    price: 450,
    priceUnit: '3 hours',
    rating: 4.8,
    reviews: 645,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
    description: 'Capture every precious moment with our premium photo booth. High-resolution photos and video packages available.'
  },
  {
    id: 5,
    name: 'Professional Event Hosting',
    vendor: 'Eloquent Emcees',
    price: 600,
    priceUnit: 'event',
    rating: 4.9,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop',
    description: 'Make your event memorable with our charismatic hosts who keep the energy high and the program flowing smoothly.'
  },
  {
    id: 6,
    name: 'Custom Invitation Design',
    vendor: 'Artful Invites',
    price: 250,
    priceUnit: 'design',
    rating: 4.7,
    reviews: 423,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
    description: 'Set the tone for your event with beautifully designed custom invitations that reflect your unique style.'
  }
];

export const services = [
  {
    id: 1,
    name: 'Gourmet Catering Deluxe',
    vendor: 'Culinary Masterpieces',
    category: 'Catering',
    price: 1200,
    priceDisplay: '$1,200.00',
    rating: 4.9,
    reviews: 1230,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop',
    description: 'Experience exquisite flavors with our premium catering service perfect for weddings, corporate events, and large gatherings.'
  },
  {
    id: 2,
    name: 'Elegant Floral & Event Decoration',
    vendor: 'Bloom & Petal Designs',
    category: 'Decoration',
    price: 850,
    priceDisplay: '$850.00',
    rating: 4.7,
    reviews: 856,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
    description: 'Transform your venue into a dream setting with our bespoke decoration packages. From intimate gatherings to grand celebrations, we create unforgettable atmospheres.'
  },
  {
    id: 3,
    name: 'Pro DJ & Lighting Package',
    vendor: 'Beat Blasters Entertainment',
    category: 'DJ',
    price: 600,
    priceDisplay: '$600.00',
    rating: 4.8,
    reviews: 2104,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop',
    description: 'Keep your guests dancing all night with our professional DJ services. State-of-the-art sound systems and vibrant lighting effects for an unforgettable experience.'
  },
  {
    id: 4,
    name: 'Premium Event Photography',
    vendor: 'Everlasting Moments Studio',
    category: 'Photography',
    price: 950,
    priceDisplay: '$950.00',
    rating: 4.9,
    reviews: 1567,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
    description: 'Capture every precious moment with our award-winning photographers. High-resolution photos and video packages available to preserve your memories forever.'
  },
  {
    id: 5,
    name: 'Modern Venue Rental - City View',
    vendor: 'Urban Vista Spaces',
    category: 'Venue',
    price: 2500,
    priceDisplay: '$2,500.00',
    rating: 4.6,
    reviews: 743,
    image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c1f0?w=600&h=400&fit=crop',
    description: 'Host your event in style at our contemporary venue with stunning city views. Flexible layouts and amenities to suit various event sizes and types.'
  },
  {
    id: 6,
    name: 'Live Band & Entertainment',
    vendor: 'Harmony Collective',
    category: 'Entertainment',
    price: 1100,
    priceDisplay: '$1,100.00',
    rating: 4.7,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=600&h=400&fit=crop',
    description: 'Add a touch of live music to your event with our versatile band. Performing genres from jazz to pop, tailored to your audience and event theme.'
  }
];

export const bookingRequests = [
  {
    id: 1,
    customerName: 'Sarah Johnson',
    eventName: 'Annual Gala Dinner',
    eventType: 'Corporate',
    eventDate: '2026-02-15',
    eventTime: '19:00',
    location: 'Grand Ballroom, City Center Hotel',
    guestCount: '50 - 100 guests',
    service: 'Gourmet Catering Deluxe',
    amount: 7250,
    status: 'pending',
    requestDate: '2026-01-25',
    customerEmail: 'sarah.j@company.com',
    customerPhone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    customerName: 'Michael Chen',
    eventName: 'Wedding Reception',
    eventType: 'Wedding',
    eventDate: '2026-03-20',
    eventTime: '18:00',
    location: 'Riverside Gardens',
    guestCount: '100 - 150 guests',
    service: 'Luxury Floral & Decor',
    amount: 4500,
    status: 'pending',
    requestDate: '2026-01-28',
    customerEmail: 'mchen@email.com',
    customerPhone: '+1 (555) 234-5678'
  },
  {
    id: 3,
    customerName: 'Emily Rodriguez',
    eventName: 'Birthday Celebration',
    eventType: 'Birthday',
    eventDate: '2026-02-10',
    eventTime: '15:00',
    location: 'Private Residence',
    guestCount: '20 - 50 guests',
    service: 'Dynamic DJ & Lighting',
    amount: 800,
    status: 'accepted',
    requestDate: '2026-01-20',
    customerEmail: 'emily.r@email.com',
    customerPhone: '+1 (555) 345-6789'
  }
];

export const vendorEarnings = {
  totalEarnings: 45680,
  pendingPayments: 12050,
  completedBookings: 87,
  upcomingBookings: 12,
  monthlyData: [
    { month: 'Jan', earnings: 3200 },
    { month: 'Feb', earnings: 4100 },
    { month: 'Mar', earnings: 3800 },
    { month: 'Apr', earnings: 5200 },
    { month: 'May', earnings: 4900 },
    { month: 'Jun', earnings: 6100 },
    { month: 'Jul', earnings: 5800 },
    { month: 'Aug', earnings: 4500 },
    { month: 'Sep', earnings: 3900 },
    { month: 'Oct', earnings: 4180 }
  ],
  recentTransactions: [
    {
      id: 1,
      date: '2026-01-28',
      customer: 'Sarah Johnson',
      service: 'Gourmet Catering Deluxe',
      amount: 7250,
      status: 'completed'
    },
    {
      id: 2,
      date: '2026-01-25',
      customer: 'Michael Chen',
      service: 'Luxury Floral & Decor',
      amount: 4500,
      status: 'pending'
    },
    {
      id: 3,
      date: '2026-01-20',
      customer: 'Emily Rodriguez',
      service: 'Dynamic DJ & Lighting',
      amount: 800,
      status: 'completed'
    }
  ]
};

export const users = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    role: 'customer',
    status: 'active',
    joinDate: '2025-06-15',
    totalBookings: 12
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'mchen@email.com',
    role: 'customer',
    status: 'active',
    joinDate: '2025-08-22',
    totalBookings: 8
  },
  {
    id: 3,
    name: 'Culinary Masterpieces',
    email: 'contact@culinarymasterpieces.com',
    role: 'vendor',
    status: 'active',
    joinDate: '2025-03-10',
    totalServices: 5,
    rating: 4.9
  },
  {
    id: 4,
    name: 'Petal Perfect Designs',
    email: 'hello@petalperfect.com',
    role: 'vendor',
    status: 'active',
    joinDate: '2025-04-18',
    totalServices: 3,
    rating: 4.8
  },
  {
    id: 5,
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    role: 'customer',
    status: 'inactive',
    joinDate: '2025-11-05',
    totalBookings: 2
  }
];

export const adminStats = {
  totalUsers: 1247,
  totalVendors: 156,
  totalCustomers: 1091,
  totalBookings: 3421,
  totalRevenue: 456780,
  activeBookings: 89,
  pendingApprovals: 12
};
