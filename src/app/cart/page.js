'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalDiscount, clearCart, isLoading } =
    useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="text-center max-w-md mx-auto">
          <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-6 block"></i>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Add some beautiful dresses to your cart and come back here to checkout.
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const discount = getTotalDiscount();
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.1); // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b font-semibold text-sm hidden md:grid">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-center">Subtotal</div>
              <div className="col-span-1"></div>
            </div>

            {/* Cart Items List */}
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="p-4 hover:bg-gray-50 transition">
                  <div className="grid grid-cols-12 gap-4 items-center mb-4 md:mb-0">
                    {/* Product Info */}
                    <div className="col-span-12 md:col-span-5">
                      <div className="flex gap-4">
                        <Link href={`/products/${item.id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-24 object-cover rounded hover:shadow-md transition"
                          />
                        </Link>
                        <div className="flex-1">
                          <Link
                            href={`/products/${item.id}`}
                            className="font-semibold text-gray-900 hover:text-blue-600 mb-2 block"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-gray-600 mb-1">Category: {item.category}</p>
                          {item.selectedColor && (
                            <p className="text-xs text-gray-600 mb-1">Color: {item.selectedColor}</p>
                          )}
                          {item.selectedSize && (
                            <p className="text-xs text-gray-600">Size: {item.selectedSize}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-6 md:col-span-2 flex items-center justify-between md:flex-col md:text-center">
                      <span className="font-semibold md:hidden text-gray-600">Price:</span>
                      <span className="font-semibold">₹{item.price.toLocaleString()}</span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-6 md:col-span-2 flex items-center justify-between md:flex-col md:text-center gap-2">
                      <span className="font-semibold md:hidden text-gray-600">Qty:</span>
                      <div className="flex items-center gap-2 bg-gray-100 rounded w-fit">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-200 transition"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-200 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-6 md:col-span-2 flex items-center justify-between md:flex-col md:text-center">
                      <span className="font-semibold md:hidden text-gray-600">Subtotal:</span>
                      <span className="font-bold text-blue-600">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    {/* Remove */}
                    <div className="col-span-12 md:col-span-1 flex justify-end">
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-red-600 hover:text-red-700 font-semibold transition text-sm md:text-lg"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="p-4 bg-gray-50 border-t flex gap-4">
              <Link
                href="/products"
                className="flex-1 border-2 border-blue-600 text-blue-600 py-2 px-4 rounded font-semibold hover:bg-blue-50 transition text-center"
              >
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="flex-1 border-2 border-red-600 text-red-600 py-2 px-4 rounded font-semibold hover:bg-red-50 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-green-600 font-semibold">Discount:</span>
                  <span className="text-green-600 font-semibold">-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Shipping:
                  {shipping === 0 && <span className="text-green-600 ml-2">(FREE)</span>}
                </span>
                <span className="font-semibold">₹{shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%):</span>
                <span className="font-semibold">₹{tax.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-2xl font-bold text-blue-600">₹{total.toLocaleString()}</span>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-gray-600 mb-4">
                <i className="fas fa-info-circle mr-1"></i>
                Free shipping on orders above ₹999
              </p>
            )}

            <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition mb-3">
              Proceed to Checkout
            </button>

            <p className="text-xs text-gray-600 text-center">
              We accept all major payment methods. Your payment is 100% secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
