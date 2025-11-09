export interface CardProps {
  title: string;
  description: string;
  image?: string;
}

export interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}

export interface PropertyProps {
  id?: string | number;
  name: string;
  address: {
    state: string;
    city: string;
    country: string;
  };
  rating: number;
  category: string[];
  price: number;
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image: string;
  discount: string;
}

export interface ReviewProps {
  id: number;
  propertyId: number;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}
