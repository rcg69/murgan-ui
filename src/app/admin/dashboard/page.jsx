"use client";


import React from "react";
import AnalyticsDashboard from "@/components/ui/analytics-dashboard";
import RequireAdmin from "@/components/RequireAdmin";
import { useAuth } from "@/context/AuthContext";
import { adminApi } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function AdminDashboard() {
  const { accessToken } = useAuth();
  const dashboardQuery = useQuery({
    queryKey: ["adminDashboard"],
    enabled: Boolean(accessToken),
    queryFn: ({ signal }) => adminApi.getDashboard(accessToken, signal),
  });

  return (
    <RequireAdmin>
      <div className="min-h-screen w-full bg-white text-black">
        <div className="container-custom py-10">
          <AnalyticsDashboard />

          {/* Quick admin navigation */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/products"
              className="border border-gray-200 rounded-lg p-4 hover:border-black transition-colors"
            >
              <h2 className="font-semibold mb-1">Manage products</h2>
              <p className="text-sm text-gray-600">
                Create, edit, and delete products in your catalog.
              </p>
            </a>
            <a
              href="/admin/categories"
              className="border border-gray-200 rounded-lg p-4 hover:border-black transition-colors"
            >
              <h2 className="font-semibold mb-1">Manage categories</h2>
              <p className="text-sm text-gray-600">
                Add new categories or update existing ones.
              </p>
            </a>
            <a
              href="/admin/users"
              className="border border-gray-200 rounded-lg p-4 hover:border-black transition-colors"
            >
              <h2 className="font-semibold mb-1">View users</h2>
              <p className="text-sm text-gray-600">
                Browse registered users and their roles.
              </p>
            </a>
          </div>

          <div className="mt-10 border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="text-lg font-semibold">Backend dashboard (live)</h2>
              <button
                onClick={() => dashboardQuery.refetch()}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                Refresh
              </button>
            </div>
            {dashboardQuery.isLoading ? (
              <div className="text-gray-600">Loading…</div>
            ) : dashboardQuery.isError ? (
              <div className="text-red-700">
                Failed to load: {dashboardQuery.error?.message || "Error"}
              </div>
            ) : (
              <pre className="text-xs overflow-auto bg-gray-50 p-4 rounded">
                {JSON.stringify(dashboardQuery.data, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </RequireAdmin>
  );
}
