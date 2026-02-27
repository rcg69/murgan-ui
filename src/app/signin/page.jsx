"use client";
import React, { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    // Add authentication logic here
    alert("Signed in as " + email);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-white">
      {/* Left Image - hidden on mobile */}
      <div className="hidden md:flex absolute left-0 top-0 h-screen w-1/4 items-center justify-center z-10">
        <img
          src="/1.png"
          alt="Left Visual"
          className="h-[90vh] w-auto object-cover rounded-xl shadow-lg"
        />
      </div>
      {/* Right Image - hidden on mobile */}
      <div className="hidden md:flex absolute right-0 top-0 h-screen w-1/4 items-center justify-center z-10">
        <img
          src="/1.png"
          alt="Right Visual"
          className="h-[90vh] w-auto object-cover rounded-xl shadow-lg"
        />
      </div>
      {/* Sign In Form with gap */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full md:w-1/3 min-h-screen mx-4 md:mx-16">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');`}</style>
        <div className="p-8 rounded w-full max-w-md" style={{ fontFamily: 'Playfair Display, serif' }}>
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="mb-2">
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 pt-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2 pt-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition pt-4"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
