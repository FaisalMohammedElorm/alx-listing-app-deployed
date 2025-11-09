import type { NextApiRequest, NextApiResponse } from "next";

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  billingAddress?: string; // For simplified form
  propertyId?: number;
  checkInDate?: string;
  checkOutDate?: string;
  totalAmount?: number;
}

interface BookingResponse {
  id: string;
  status: string;
  message: string;
  bookingDetails?: BookingData & {
    bookingDate: string;
    confirmationNumber: string;
  };
}

interface BookingSummary {
  id: string;
  name: string;
  email: string;
  confirmationNumber: string;
  bookingDate: string;
}

interface BookingsListResponse {
  message: string;
  bookings: BookingSummary[];
}

// Simulate a database to store bookings (in real app, use a proper database)
const bookings: (BookingData & { id: string; bookingDate: string; confirmationNumber: string })[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookingResponse | BookingsListResponse | { message: string }>
) {
  if (req.method === "POST") {
    try {
      const bookingData: BookingData = req.body;

      // Basic validation
      const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'cardNumber', 'expirationDate', 'cvv'];
      
      // Check if using detailed address or simple billing address
      if (bookingData.billingAddress) {
        requiredFields.push('billingAddress');
      } else {
        requiredFields.push('streetAddress', 'city', 'state', 'zipCode', 'country');
      }

      for (const field of requiredFields) {
        if (!bookingData[field as keyof BookingData]) {
          return res.status(400).json({ 
            message: `Missing required field: ${field}` 
          });
        }
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(bookingData.email)) {
        return res.status(400).json({ 
          message: "Invalid email format" 
        });
      }

      // Phone number validation (basic)
      if (bookingData.phoneNumber.length < 10) {
        return res.status(400).json({ 
          message: "Phone number must be at least 10 characters" 
        });
      }

      // Card number validation (basic - should be more sophisticated in real app)
      if (bookingData.cardNumber.replace(/\s/g, '').length < 13) {
        return res.status(400).json({ 
          message: "Invalid card number" 
        });
      }

      // CVV validation
      if (bookingData.cvv.length < 3 || bookingData.cvv.length > 4) {
        return res.status(400).json({ 
          message: "Invalid CVV" 
        });
      }

      // Generate booking ID and confirmation number
      const bookingId = `BK${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      const confirmationNumber = `CONF${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

      // Create booking record
      const newBooking = {
        ...bookingData,
        id: bookingId,
        bookingDate: new Date().toISOString(),
        confirmationNumber: confirmationNumber
      };

      // Store booking (in real app, save to database)
      bookings.push(newBooking);

      // Return success response
      const response: BookingResponse = {
        id: bookingId,
        status: "confirmed",
        message: "Booking confirmed successfully!",
        bookingDetails: newBooking
      };

      res.status(201).json(response);

    } catch (error) {
      console.error("Booking submission error:", error);
      res.status(500).json({ 
        message: "Internal server error. Please try again later." 
      });
    }
  } else if (req.method === "GET") {
    // Return all bookings (for testing purposes)
    const response: BookingsListResponse = {
      message: `Total bookings: ${bookings.length}`,
      bookings: bookings.map(b => ({
        id: b.id,
        name: `${b.firstName} ${b.lastName}`,
        email: b.email,
        confirmationNumber: b.confirmationNumber,
        bookingDate: b.bookingDate
      }))
    };
    res.status(200).json(response);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}