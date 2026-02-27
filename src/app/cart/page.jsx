"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuth();
  const { cartItems, isLoading, error, setQuantity, removeItem, getTotalPrice, getTotalItems, isMutating } =
    useCart();

  const [localError, setLocalError] = useState("");

  const items = useMemo(() => cartItems || [], [cartItems]);

  if (!isHydrated) return null;

  if (!isAuthenticated) {
    return (
      <div className="container-custom py-12">
        <h1 className="text-3xl font-light mb-4">Your cart</h1>
        <p className="text-gray-600 mb-6">Please sign in to view your cart.</p>
        <Link className="underline" href="/signin?next=/cart">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light">Your cart</h1>
          <p className="text-gray-600 text-sm">{getTotalItems()} item(s)</p>
        </div>
        <button
          disabled={items.length === 0 || isMutating}
          onClick={() => router.push("/checkout")}
          className="px-5 py-3 bg-black text-white rounded-lg disabled:opacity-60"
        >
          Checkout
        </button>
      </div>

      {(localError || error) && (
        <div className="mb-4 p-3 border border-red-200 bg-red-50 text-red-700 rounded">
          {localError || error?.message || "Cart error"}
        </div>
      )}

      {isLoading ? (
        <div className="text-gray-600">Loading cart...</div>
      ) : items.length === 0 ? (
        <div className="text-gray-600">
          Your cart is empty.{" "}
          <Link className="underline" href="/products">
            Browse products
          </Link>
          .
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const product = item.product || item;
              const productId = item.productId ?? product.id;
              const qty = item.quantity ?? 0;
              const imageSrc = product.imageUrl || product.image || "/saree.png";
              const name = product.name || `Product #${productId}`;
              const price = product.price ?? 0;
              const lineTotal = price * qty;

              return (
                <div key={productId} className="border border-gray-200 rounded-lg p-4 flex gap-4">
                  <img src={imageSrc} alt={name} className="w-24 h-24 object-cover rounded bg-gray-100" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold">{name}</div>
                        <div className="text-sm text-gray-600">₹{price}</div>
                      </div>
                      <button
                        onClick={async () => {
                          setLocalError("");
                          try {
                            await removeItem(productId);
                          } catch (e) {
                            setLocalError(e?.message || "Failed to remove item.");
                          }
                        }}
                        className="text-sm underline text-gray-700"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={async () => {
                          setLocalError("");
                          try {
                            await setQuantity(productId, Math.max(0, qty - 1));
                          } catch (e) {
                            setLocalError(e?.message || "Failed to update quantity.");
                          }
                        }}
                        className="px-3 py-2 border border-gray-300 rounded"
                      >
                        −
                      </button>
                      <input
                        value={qty}
                        onChange={(e) => {
                          const next = Number(e.target.value);
                          if (!Number.isFinite(next)) return;
                          setLocalError("");
                          setQuantity(productId, next).catch((er) =>
                            setLocalError(er?.message || "Failed to update quantity.")
                          );
                        }}
                        className="w-16 text-center px-2 py-2 border border-gray-300 rounded"
                        inputMode="numeric"
                      />
                      <button
                        onClick={async () => {
                          setLocalError("");
                          try {
                            await setQuantity(productId, qty + 1);
                          } catch (e) {
                            setLocalError(e?.message || "Failed to update quantity.");
                          }
                        }}
                        className="px-3 py-2 border border-gray-300 rounded"
                      >
                        +
                      </button>
                      <div className="ml-auto text-sm text-gray-700">
                        Line total: <span className="font-semibold">₹{lineTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border border-gray-200 rounded-lg p-5 h-fit">
            <h2 className="text-lg font-semibold mb-3">Summary</h2>
            <div className="flex justify-between text-sm text-gray-700 mb-2">
              <span>Items</span>
              <span>{getTotalItems()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mb-4">
              <span>Total</span>
              <span className="font-semibold">₹{getTotalPrice()}</span>
            </div>
            <button
              disabled={items.length === 0 || isMutating}
              onClick={() => router.push("/checkout")}
              className="w-full py-3 bg-black text-white rounded-lg disabled:opacity-60"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

