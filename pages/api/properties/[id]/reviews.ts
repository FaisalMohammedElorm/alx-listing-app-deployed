import type { NextApiRequest, NextApiResponse } from "next";

interface Review {
  id: number;
  propertyId: number;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

// Sample reviews data - in a real app, this would come from a database
const allReviews: Review[] = [
  // Reviews for Property 1 (Cozy Beachfront Villa)
  {
    id: 1,
    propertyId: 1,
    guestName: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely stunning villa with breathtaking ocean views! The location is perfect and the amenities exceeded our expectations. The host was very responsive and helpful throughout our stay.",
    date: "2024-10-15",
    verified: true
  },
  {
    id: 2,
    propertyId: 1,
    guestName: "Michael Chen",
    rating: 4,
    comment: "Great beachfront location with easy access to the water. The villa was clean and well-maintained. Only minor issue was the WiFi was a bit slow, but overall a fantastic stay!",
    date: "2024-09-28",
    verified: true
  },
  {
    id: 3,
    propertyId: 1,
    guestName: "Emily Rodriguez",
    rating: 5,
    comment: "Perfect getaway spot! The sunset views from the deck are incredible. The kitchen was fully equipped and the bedrooms were comfortable. Will definitely book again!",
    date: "2024-09-10",
    verified: true
  },

  // Reviews for Property 2 (Mountain Cabin Retreat)
  {
    id: 4,
    propertyId: 2,
    guestName: "David Thompson",
    rating: 5,
    comment: "Amazing mountain retreat! Perfect for disconnecting from city life. The cabin is cozy and has everything you need. Great hiking trails nearby.",
    date: "2024-10-20",
    verified: true
  },
  {
    id: 5,
    propertyId: 2,
    guestName: "Lisa Wang",
    rating: 4,
    comment: "Beautiful location surrounded by nature. The cabin was clean and the fireplace was perfect for cool evenings. Road access can be a bit challenging in winter.",
    date: "2024-10-05",
    verified: true
  },

  // Reviews for Property 3 (Urban Luxury Apartment)
  {
    id: 6,
    propertyId: 3,
    guestName: "Robert Kim",
    rating: 5,
    comment: "Exceptional luxury apartment in the heart of Manhattan! Everything was top-notch - from the modern amenities to the prime location. Highly recommended!",
    date: "2024-10-12",
    verified: true
  },
  {
    id: 7,
    propertyId: 3,
    guestName: "Amanda Foster",
    rating: 5,
    comment: "Perfect for a business trip! The apartment is beautifully designed and centrally located. Easy access to restaurants, shopping, and transportation.",
    date: "2024-09-25",
    verified: true
  },
  {
    id: 8,
    propertyId: 3,
    guestName: "James Wilson",
    rating: 4,
    comment: "Great apartment with stunning city views. Very clean and modern. The only downside was some noise from the street, but overall excellent stay.",
    date: "2024-09-18",
    verified: true
  },

  // Reviews for Property 4 (Charming Countryside Cottage)
  {
    id: 9,
    propertyId: 4,
    guestName: "Jennifer Adams",
    rating: 5,
    comment: "Charming cottage in a peaceful setting! Perfect for a romantic getaway. The garden is beautiful and the interior is tastefully decorated.",
    date: "2024-10-08",
    verified: true
  },
  {
    id: 10,
    propertyId: 4,
    guestName: "Mark Davis",
    rating: 4,
    comment: "Lovely countryside retreat. Very quiet and relaxing. The cottage has character and charm. Great for families with children.",
    date: "2024-09-30",
    verified: true
  },

  // Reviews for Property 5 (Modern City Loft)
  {
    id: 11,
    propertyId: 5,
    guestName: "Sophie Turner",
    rating: 5,
    comment: "Stunning modern loft with amazing city views! The design is incredible and the location is perfect for exploring Chicago. Highly recommend!",
    date: "2024-10-18",
    verified: true
  },
  {
    id: 12,
    propertyId: 5,
    guestName: "Alex Martinez",
    rating: 4,
    comment: "Great loft with modern amenities. The industrial design is really cool. Good location near restaurants and attractions.",
    date: "2024-10-01",
    verified: true
  },

  // Reviews for Property 6 (Lakeside Family Home)
  {
    id: 13,
    propertyId: 6,
    guestName: "Rachel Green",
    rating: 5,
    comment: "Perfect family vacation home! The kids loved the lake access and there's plenty of space for everyone. Beautiful location and well-equipped kitchen.",
    date: "2024-10-22",
    verified: true
  },
  {
    id: 14,
    propertyId: 6,
    guestName: "Tom Anderson",
    rating: 5,
    comment: "Amazing lakeside property! Great for fishing and water activities. The house is spacious and comfortable. Perfect for large groups.",
    date: "2024-10-14",
    verified: true
  },
  {
    id: 15,
    propertyId: 6,
    guestName: "Karen Miller",
    rating: 4,
    comment: "Beautiful location right on the lake. The house has everything you need for a great vacation. Minor issue with the hot water, but otherwise excellent.",
    date: "2024-09-20",
    verified: true
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Review[] | { message: string }>
) {
  const { id } = req.query;

  if (req.method === "GET") {
    const propertyId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);
    
    if (isNaN(propertyId)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    // Filter reviews for the specific property
    const propertyReviews = allReviews.filter(review => review.propertyId === propertyId);
    
    // Sort reviews by date (newest first)
    propertyReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    res.status(200).json(propertyReviews);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}