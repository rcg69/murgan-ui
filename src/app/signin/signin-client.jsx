"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { decodeJwtPayload, extractRoles } from "@/lib/jwt";

export default function SignInClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, isAdmin, role } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nextUrl = searchParams.get("next") || "/products";

  useEffect(() => {
    if (!isAuthenticated) return;
    if (role === "admin") {
      router.replace("/admin/dashboard");
    } else {
      router.replace(nextUrl);
    }
  }, [isAuthenticated, isAdmin, nextUrl, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login({ usernameOrEmail, password });
      let redirectTo = nextUrl || "/products";
      const userRole = res?.role;
      if (userRole === "admin") {
        redirectTo = "/admin/dashboard";
      }
      router.replace(redirectTo);
    } catch (err) {
      setError(err?.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center px-4 ">
    <div className="w-full max-w-md  p-6 sm:p-8 rounded-2xl ">
      
      <h1 className="text-2xl sm:text-3xl font-light mb-6 text-center">
        Sign in
      </h1>

      {error && (
        <div className="mb-4 p-3 border border-red-200 bg-red-50 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm font-semibold mb-1">
            Username or Email
          </label>
          <input
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            autoComplete="username"
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
            autoComplete="current-password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg transition hover:opacity-90 disabled:opacity-60 mt-4"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600 text-center">
        Don&apos;t have an account?{" "}
        <Link className="underline" href="/register">
          Create one
        </Link>
      </p>
    </div>
  </div>
 );
}