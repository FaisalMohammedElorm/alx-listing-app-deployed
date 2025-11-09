import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PropertyProps } from "@/interfaces";

interface PropertyCardProps {
  property: PropertyProps;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`} className="block">
      <div className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="relative">
          <Image
            src={property.image}
            alt={property.name}
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
          {property.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{property.discount}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">{property.name}</h2>
          
          <p className="text-gray-600 mb-2">
            {property.address.city}, {property.address.state}, {property.address.country}
          </p>
          
          <div className="flex items-center mb-2">
            <span className="text-yellow-400 mr-1">⭐</span>
            <span className="text-gray-700">{property.rating}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {property.category.map((cat, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
          
          <div className="text-sm text-gray-600 mb-3">
            <div className="flex justify-between">
              <span>{property.offers.bed}</span>
              <span>{property.offers.shower}</span>
              <span>{property.offers.occupants}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-green-600 font-bold text-lg">${property.price} / night</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
