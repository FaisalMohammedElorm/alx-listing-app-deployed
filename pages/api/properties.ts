import type { NextApiRequest, NextApiResponse } from "next";
import { PropertyProps } from "@/interfaces";

const properties: PropertyProps[] = [
  {
    id: 1,
    name: "Cozy Beachfront Villa",
    address: {
      state: "California",
      city: "Malibu",
      country: "USA"
    },
    rating: 4.8,
    category: ["Villa", "Beachfront", "Luxury"],
    price: 350,
    offers: {
      bed: "3 beds",
      shower: "2 baths",
      occupants: "6 guests"
    },
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
    discount: "15%"
  },
  {
    id: 2,
    name: "Mountain Cabin Retreat",
    address: {
      state: "Colorado",
      city: "Aspen",
      country: "USA"
    },
    rating: 4.6,
    category: ["Cabin", "Mountain", "Countryside"],
    price: 220,
    offers: {
      bed: "2 beds",
      shower: "1 bath",
      occupants: "4 guests"
    },
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop",
    discount: "10%"
  },
  {
    id: 3,
    name: "Urban Luxury Apartment",
    address: {
      state: "New York",
      city: "Manhattan",
      country: "USA"
    },
    rating: 4.9,
    category: ["Apartment", "Luxury", "Urban"],
    price: 450,
    offers: {
      bed: "1 bed",
      shower: "1 bath",
      occupants: "2 guests"
    },
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop",
    discount: "20%"
  },
  {
    id: 4,
    name: "Charming Countryside Cottage",
    address: {
      state: "Texas",
      city: "Austin",
      country: "USA"
    },
    rating: 4.5,
    category: ["Cottage", "Countryside", "Peaceful"],
    price: 180,
    offers: {
      bed: "2 beds",
      shower: "1 bath",
      occupants: "4 guests"
    },
    image: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=500&h=300&fit=crop",
    discount: "5%"
  },
  {
    id: 5,
    name: "Modern City Loft",
    address: {
      state: "Illinois",
      city: "Chicago",
      country: "USA"
    },
    rating: 4.7,
    category: ["Loft", "Modern", "Self Checkin"],
    price: 280,
    offers: {
      bed: "1 bed",
      shower: "1 bath",
      occupants: "2 guests"
    },
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop",
    discount: "12%"
  },
  {
    id: 6,
    name: "Lakeside Family Home",
    address: {
      state: "Minnesota",
      city: "Duluth",
      country: "USA"
    },
    rating: 4.8,
    category: ["House", "Lakeside", "Free Parking"],
    price: 320,
    offers: {
      bed: "4 beds",
      shower: "3 baths",
      occupants: "8 guests"
    },
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c0a0?w=500&h=300&fit=crop",
    discount: "8%"
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PropertyProps[]>
) {
  if (req.method === "GET") {
    res.status(200).json(properties);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}