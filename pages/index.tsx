import React, { useEffect, useState } from "react";
import axios from "axios";
import Pill from "@/components/Pill";
import PropertyCard from "@/components/property/PropertyCard";
import { PropertyProps } from "@/interfaces";

export default function Home() {
  const filters = [
    "Top Villa",
    "Self Checkin",
    "Free Parking",
    "Luxury",
    "Countryside",
  ];

  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties");
        setProperties(response.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: "url('/hero.jpg')" }} // Ensure hero.jpg exists in /public
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          Find your favorite place here!
        </h1>
        <p className="text-lg md:text-2xl mt-4">
          The best prices for over 2 million properties worldwide.
        </p>
      </section>

      {/* Filters */}
      <section className="p-6 flex flex-wrap justify-center">
        {filters.map((f) => (
          <Pill key={f} label={f} />
        ))}
      </section>

      {/* Listings */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {loading && <p className="text-center col-span-full">Loading properties...</p>}
        {error && <p className="text-center text-red-500 col-span-full">{error}</p>}

        {!loading && !error && properties.length === 0 && (
          <p className="text-center col-span-full">No properties available.</p>
        )}

        {!loading &&
          !error &&
          properties.map((property) => (
            <PropertyCard key={property.id || property.name} property={property} />
          ))}
      </section>
    </div>
  );
}
