import React from "react";
import Image from "next/image";
import { PropertyProps } from "@/interfaces";
import ReviewSection from "./ReviewSection";

interface PropertyDetailProps {
  property: PropertyProps;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Property Image */}
        <div className="relative">
          <Image
            src={property.image}
            alt={property.name}
            width={600}
            height={400}
            className="w-full h-96 object-cover rounded-lg"
          />
          {property.discount && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
              -{property.discount}
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.name}</h1>
            <p className="text-lg text-gray-600 mb-4">
              {property.address.city}, {property.address.state}, {property.address.country}
            </p>
            
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-xl mr-2">⭐</span>
              <span className="text-lg font-semibold text-gray-700">{property.rating}</span>
              <span className="text-gray-500 ml-2">(Based on guest reviews)</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {property.category.map((cat, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Property Offers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Accommodation Details</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">🛏️</div>
                <p className="text-sm font-medium text-gray-700">{property.offers.bed}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">🚿</div>
                <p className="text-sm font-medium text-gray-700">{property.offers.shower}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">👥</div>
                <p className="text-sm font-medium text-gray-700">{property.offers.occupants}</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">${property.price}</p>
                <p className="text-gray-500">per night</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">About this property</h3>
          <p className="text-gray-600 leading-relaxed">
            Welcome to {property.name}, a beautiful {property.category[0].toLowerCase()} located in 
            {property.address.city}, {property.address.state}. This property offers comfortable 
            accommodation with {property.offers.bed} and {property.offers.shower}, perfect for 
            {property.offers.occupants}.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Location</h3>
          <div className="space-y-2">
            <p className="text-gray-600"><strong>City:</strong> {property.address.city}</p>
            <p className="text-gray-600"><strong>State:</strong> {property.address.state}</p>
            <p className="text-gray-600"><strong>Country:</strong> {property.address.country}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {property.id && <ReviewSection propertyId={property.id as number} />}
    </div>
  );
}