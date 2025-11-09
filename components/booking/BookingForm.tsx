import axios from "axios";
import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/bookings", formData);
      setSuccess(`Booking confirmed! Confirmation number: ${response.data.bookingDetails.confirmationNumber}`);
      
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to submit booking. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Contact Detail</h2>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form className="mt-4" onSubmit={handleSubmit}>
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border p-2 w-full mt-2 rounded-md" 
              placeholder="John" 
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border p-2 w-full mt-2 rounded-md" 
              placeholder="Doe" 
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border p-2 w-full mt-2 rounded-md" 
              placeholder="john@example.com" 
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input 
              type="tel" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="border p-2 w-full mt-2 rounded-md" 
              placeholder="+233 123 456 789" 
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Payment Information */}
        <h2 className="text-xl font-semibold mt-6">Pay with</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <input 
            type="text" 
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className="border p-2 w-full mt-2 rounded-md" 
            placeholder="1234 5678 9012 3456" 
            required
            disabled={loading}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
            <input 
              type="text" 
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleInputChange}
              className="border p-2 w-full mt-2 rounded-md" 
              placeholder="MM/YY" 
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input 
              type="text" 
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              className="border p-2 w-full mt-2 rounded-md" 
              placeholder="123" 
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Billing Address */}
        <h2 className="text-xl font-semibold mt-6">Billing Address</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Street Address</label>
          <input 
            type="text" 
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleInputChange}
            className="border p-2 w-full mt-2 rounded-md" 
            placeholder="123 Main St" 
            required
            disabled={loading}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input 
              type="text" 
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="border p-2 w-full mt-2 rounded-md" 
              placeholder="Accra" 
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input 
              type="text" 
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="border p-2 w-full mt-2 rounded-md" 
              placeholder="Greater Accra" 
              required
              disabled={loading}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input 
              type="text" 
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="border p-2 w-full mt-2 rounded-md" 
              placeholder="00233" 
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input 
              type="text" 
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="border p-2 w-full mt-2 rounded-md" 
              placeholder="Ghana" 
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full py-2 px-4 rounded-md font-semibold transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
