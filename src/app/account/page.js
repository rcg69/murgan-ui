'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+971 50 123 4567',
    address: '123 Al Manara Street, Dubai, UAE',
    city: 'Dubai',
    state: 'Dubai',
    zipcode: '12345',
  });

  const [orders] = useState([
    {
      id: 'MUR-001',
      date: '2024-02-15',
      status: 'Delivered',
      total: 2599,
      items: 2,
    },
    {
      id: 'MUR-002',
      date: '2024-02-10',
      status: 'In Transit',
      total: 4199,
      items: 3,
    },
    {
      id: 'MUR-003',
      date: '2024-02-05',
      status: 'Processing',
      total: 1899,
      items: 1,
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    // Here you would typically send the data to your backend
    alert('Profile updated successfully!');
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 sticky top-24">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded transition ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-user mr-2"></i>
                My Profile
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-2 rounded transition ${
                  activeTab === 'orders'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-shopping-bag mr-2"></i>
                My Orders
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full text-left px-4 py-2 rounded transition ${
                  activeTab === 'addresses'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-map-marker-alt mr-2"></i>
                Addresses
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full text-left px-4 py-2 rounded transition ${
                  activeTab === 'wishlist'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-heart mr-2"></i>
                Wishlist
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-2 rounded transition ${
                  activeTab === 'settings'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-cog mr-2"></i>
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 rounded text-gray-700 hover:bg-gray-100 transition border-t mt-4 pt-4">
                <i className="fas fa-sign-out-alt mr-2 text-red-600"></i>
                <span className="text-red-600">Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">My Profile</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                  <button className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-50 transition">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">My Orders</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-bold">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-semibold">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Items</p>
                        <p className="font-semibold">{order.items} Item(s)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className={`font-semibold ${
                          order.status === 'Delivered' ? 'text-green-600' :
                          order.status === 'In Transit' ? 'text-blue-600' :
                          'text-orange-600'
                        }`}>
                          {order.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="font-bold text-lg">₹{order.total.toLocaleString()}</p>
                      </div>
                      <Link
                        href="#"
                        className="col-span-1 md:col-span-5 text-blue-600 hover:underline font-semibold text-sm pt-2 border-t"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Delivery Addresses</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold mb-2">Home Address</h3>
                      <p className="text-gray-600 text-sm">{userData.address}</p>
                      <p className="text-gray-600 text-sm">{userData.city}, {userData.state} {userData.zipcode}</p>
                      <p className="text-gray-600 text-sm mt-1">{userData.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:underline text-sm font-semibold">Edit</button>
                      <button className="text-red-600 hover:underline text-sm font-semibold">Delete</button>
                    </div>
                  </div>
                </div>
                <button className="w-full border-2 border-dashed border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                  <i className="fas fa-plus mr-2"></i>
                  Add New Address
                </button>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
              <div className="text-center py-12">
                <i className="fas fa-heart text-5xl text-gray-300 mb-4 block"></i>
                <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                <Link
                  href="/products"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">Email Notifications</h3>
                      <p className="text-gray-600 text-sm">Receive updates about your orders and new products</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">SMS Notifications</h3>
                      <p className="text-gray-600 text-sm">Get SMS updates on your orders</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="pt-4">
                  <button className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
