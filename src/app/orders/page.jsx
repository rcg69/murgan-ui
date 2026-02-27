"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { userApi } from "@/lib/apiClient";
import { normalizePage } from "@/lib/pagination";

export default function OrdersPage() {
  const { isAuthenticated, isHydrated, accessToken } = useAuth();
  const [page, setPage] = useState(0);
  const size = 10;

  const ordersQuery = useQuery({
    queryKey: ["orders", { page, size }],
    enabled: isAuthenticated,
    queryFn: ({ signal }) => userApi.getOrders({ token: accessToken, page, size }, signal),
  });

  const pageData = useMemo(() => {
    const raw = ordersQuery.data?.data ?? ordersQuery.data;
    return normalizePage(raw);
  }, [ordersQuery.data]);

  if (!isHydrated) return null;

  if (!isAuthenticated) {
    return (
      <div className="container-custom py-12">
        <h1 className="text-3xl font-light mb-4">Orders</h1>
        <p className="text-gray-600 mb-6">Please sign in to view your orders.</p>
        <Link className="underline" href="/signin?next=/orders">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-light mb-8">Orders</h1>

      {ordersQuery.isError && (
        <div className="mb-4 p-3 border border-red-200 bg-red-50 text-red-700 rounded">
          Failed to load orders. {ordersQuery.error?.message ? `(${ordersQuery.error.message})` : ""}
        </div>
      )}

      {ordersQuery.isLoading ? (
        <div className="text-gray-600">Loading orders...</div>
      ) : pageData.items.length === 0 ? (
        <div className="text-gray-600">
          No orders yet.{" "}
          <Link className="underline" href="/products">
            Shop now
          </Link>
          .
        </div>
      ) : (
        <div className="space-y-4">
          {pageData.items.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold">Order #{order.id}</div>
                  <div className="text-sm text-gray-600">
                    {order.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{order.status || "—"}</div>
                  {typeof order.total === "number" && (
                    <div className="font-semibold">₹{order.total}</div>
                  )}
                </div>
              </div>

              {Array.isArray(order.items) && order.items.length > 0 && (
                <div className="mt-4 text-sm text-gray-700">
                  <div className="font-semibold mb-2">Items</div>
                  <ul className="space-y-1">
                    {order.items.map((it, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>
                          {it.product?.name || `Product #${it.productId}`} × {it.quantity}
                        </span>
                        {typeof it.unitPrice === "number" && (
                          <span>₹{it.unitPrice * (it.quantity || 0)}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {pageData.totalPages > 1 && (
        <div className="flex items-center justify-between mt-10">
          <button
            disabled={page <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <div className="text-sm text-gray-600">
            Page <span className="font-semibold">{page + 1}</span> of{" "}
            <span className="font-semibold">{pageData.totalPages}</span>
          </div>
          <button
            disabled={page + 1 >= pageData.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

