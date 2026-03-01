"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({ username, email, password });
      router.replace("/signin");
    } catch (err) {
      setError(err?.message || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-4 font-playfair e">
    <div className="w-full max-w-md  p-6 sm:p-8 rounded-2xl ">
      
      <h1 className="text-2xl sm:text-3xl font-light mb-6 text-center">
        Create account
      </h1>

      {error && (
        <div className="mb-4 p-3 border border-red-200 bg-red-50 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-semibold mb-1">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            autoComplete="username"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            autoComplete="new-password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg transition hover:opacity-90 disabled:opacity-60 mt-4"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link className="underline" href="/signin">
          Sign in
        </Link>
      </p>

    </div>
  </div>
 );
}