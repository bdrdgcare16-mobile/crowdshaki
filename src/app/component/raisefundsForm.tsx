"use client";
import React, { useState } from "react";
import { raiseFundDetails } from "../actions/raiseFundDetails";

interface RaiseFundsFormProps {
  user: any;
}

export default function RaiseFundsForm({ user }: RaiseFundsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const result = await raiseFundDetails(formData, user?.uid || null);
      
      console.log("Result:", result);
      
      if (result.status === 200) {
        alert(
          `✅ SUCCESS!\n\n` +
          `Campaign submitted successfully!\n\n` +
          `Campaign ID: ${result.campaignId}\n\n` +
          `Check your email: ${formData.get('email')}\n` +
          `(Check spam folder too!)`
        );
        e.currentTarget.reset();
      } else {
        alert(`❌ Error: ${result.error || 'Submission failed'}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Start Your Fundraising Campaign
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">1. Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">First Name *</label>
              <input
                type="text"
                name="firstName"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="First name"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Last Name *</label>
              <input
                type="text"
                name="lastName"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Last name"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Mobile *</label>
              <input
                type="tel"
                name="mobile"
                required
                pattern="[0-9]{10}"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="10 digit mobile"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">Address *</label>
              <textarea
                name="address"
                required
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Full address"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Pincode *</label>
              <input
                type="text"
                name="pincode"
                required
                pattern="[0-9]{6}"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="6 digit pincode"
              />
            </div>

            <input type="hidden" name="block" defaultValue="" />
            <input type="hidden" name="center" defaultValue="" />
            <input type="hidden" name="chaName" defaultValue="" />
            <input type="hidden" name="chaPhoneNumber" defaultValue="" />
            <input type="hidden" name="chaLeader" defaultValue="" />
            <input type="hidden" name="documentsFinished" defaultValue="" />
            <input type="hidden" name="aeStudentName" defaultValue="" />
            <input type="hidden" name="aePhoneNumber" defaultValue="" />
            <input type="hidden" name="hrName" defaultValue="" />
          </div>
        </div>

        {/* Campaign Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">2. Campaign Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Beneficiary Name *</label>
              <input
                type="text"
                name="beneficiaryName"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Who needs the funds?"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Relationship *</label>
              <input
                type="text"
                name="relationship"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Your relation"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Amount Required (₹) *</label>
              <input
                type="number"
                name="amountForFund"
                required
                min={1000}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Amount"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Category *</label>
              <select
                name="category"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select</option>
                <option value="Medical">Medical</option>
                <option value="Education">Education</option>
                <option value="Emergency">Emergency</option>
                <option value="Women & Girls">Women & Girls</option>
                <option value="Children">Children</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">Reason for Fundraising *</label>
              <textarea
                name="reasonForFund"
                required
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Why you need funds"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">Current Situation *</label>
              <textarea
                name="situation"
                required
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Describe situation"
              />
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">3. Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Account Holder *</label>
              <input
                type="text"
                name="accountHolder"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="As per bank"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Account Number *</label>
              <input
                type="text"
                name="accountNumber"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Bank account number"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Account Type *</label>
              <select
                name="accountType"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select</option>
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">IFSC Code *</label>
              <input
                type="text"
                name="ifscCode"
                required
                pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g., SBIN0001234"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              px-10 py-4 rounded-lg text-white text-lg font-bold
              transition-all duration-200
              ${isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black hover:bg-gray-800'
              }
            `}
            style={{ minWidth: '250px' }}
          >
            {isSubmitting ? '⏳ Submitting...' : 'Submit Campaign'}
          </button>
          
          {isSubmitting && (
            <p className="mt-3 text-sm text-gray-600">
              Please wait... Sending notifications
            </p>
          )}
        </div>
      </form>
    </div>
  );
}