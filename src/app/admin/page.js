'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { dressProducts } from '@/data/products';
import { useAdmin } from '@/context/AdminContext';
import { getProductsFromStorage, saveProductsToStorage, addProductToStorage, deleteProductFromStorage } from '@/utils/storageHelpers';

export default function AdminPage() {
  const router = useRouter();
  const { isLoggedIn, adminUser, logout } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Casual Dresses',
    price: '',
    originalPrice: '',
    description: '',
    image: '',
    stock: '50',
    colors: 'Black, White',
    sizes: 'S, M, L, XL',
  });

  // Load products from localStorage on mount
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      const storedProducts = getProductsFromStorage(dressProducts);
      setProducts(storedProducts);
      setLoading(false);
    }
  }, [isLoggedIn, router]);

  const totalProducts = products.length;
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * 10), 0); // Mock revenue
  const totalOrders = Math.floor(Math.random() * 500) + 100;

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    if (!newProduct.name || !newProduct.price || !newProduct.originalPrice || !newProduct.image) {
      alert('Please fill in all required fields');
      return;
    }

    const productToAdd = {
      name: newProduct.name,
      category: newProduct.category,
      price: parseInt(newProduct.price),
      originalPrice: parseInt(newProduct.originalPrice),
      description: newProduct.description,
      image: newProduct.image,
      stock: parseInt(newProduct.stock) || 50,
      colors: newProduct.colors.split(',').map(c => c.trim()),
      sizes: newProduct.sizes.split(',').map(s => s.trim()),
      rating: 5,
      reviews: 0,
      material: 'Premium Fabric',
      care: 'Hand wash recommended',
      features: ['Premium Quality'],
    };

    const updatedProducts = addProductToStorage(productToAdd, products);
    setProducts(updatedProducts);
    
    // Reset form
    setNewProduct({
      name: '',
      category: 'Casual Dresses',
      price: '',
      originalPrice: '',
      description: '',
      image: '',
      stock: '50',
      colors: 'Black, White',
      sizes: 'S, M, L, XL',
    });
    setShowAddForm(false);
    
    // Show success message
    setSuccessMessage('Product added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = deleteProductFromStorage(id, products);
      setProducts(updatedProducts);
      setSuccessMessage('Product deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
          <p className="text-gray-700">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="container-custom py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">
            <i className="fas fa-tachometer-alt mr-2"></i>
            Murgan Store Admin
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              <i className="fas fa-user-shield mr-2"></i>
              {adminUser?.username}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-600 font-semibold hover:text-red-700"
            >
              <i className="fas fa-sign-out-alt mr-1"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative sticky top-16 z-30">
          <i className="fas fa-check-circle mr-2"></i>
          {successMessage}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="container-custom">
          <nav className="flex gap-8 py-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`font-semibold pb-2 border-b-2 transition ${
                activeTab === 'dashboard'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              <i className="fas fa-chart-line mr-2"></i>
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`font-semibold pb-2 border-b-2 transition ${
                activeTab === 'products'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              <i className="fas fa-box mr-2"></i>
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`font-semibold pb-2 border-b-2 transition ${
                activeTab === 'orders'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Orders
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`font-semibold pb-2 border-b-2 transition ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              <i className="fas fa-cog mr-2"></i>
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Products</p>
                    <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
                  </div>
                  <i className="fas fa-box text-4xl text-blue-600 opacity-20"></i>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                  </div>
                  <i className="fas fa-shopping-bag text-4xl text-green-600 opacity-20"></i>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Revenue (Demo)</p>
                    <p className="text-3xl font-bold text-gray-900">₹{(totalRevenue / 1000).toFixed(0)}K</p>
                  </div>
                  <i className="fas fa-rupee-sign text-4xl text-orange-600 opacity-20"></i>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-2">Order ID</th>
                      <th className="text-left py-2">Customer</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-3 font-semibold">MUR-{String(i + 1).padStart(3, '0')}</td>
                        <td className="py-3">Customer {i + 1}</td>
                        <td className="py-3">₹{Math.floor(Math.random() * 5000) + 1000}</td>
                        <td className="py-3">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Processing
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Products Management</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                <i className="fas fa-plus mr-2"></i>
                Add New Product
              </button>
            </div>

            {/* Add Product Form */}
            {showAddForm && (
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name *</label>
                      <input
                        type="text"
                        placeholder="Enter product name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option>Casual Dresses</option>
                        <option>Evening Dresses</option>
                        <option>Office Dresses</option>
                        <option>Party Dresses</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹) *</label>
                      <input
                        type="number"
                        placeholder="Enter price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Original Price (₹) *</label>
                      <input
                        type="number"
                        placeholder="Enter original price"
                        value={newProduct.originalPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Stock</label>
                      <input
                        type="number"
                        placeholder="Enter stock quantity"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Sizes (comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g., S, M, L, XL"
                        value={newProduct.sizes}
                        onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Colors (comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g., Black, White, Red"
                        value={newProduct.colors}
                        onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL *</label>
                      <input
                        type="text"
                        placeholder="Enter image URL"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                      <textarea
                        placeholder="Enter product description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition"
                    >
                      <i className="fas fa-save mr-2"></i>
                      Save Product
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="text-left px-6 py-3 font-semibold">Product</th>
                      <th className="text-left px-6 py-3 font-semibold">Category</th>
                      <th className="text-left px-6 py-3 font-semibold">Price</th>
                      <th className="text-left px-6 py-3 font-semibold">Stock</th>
                      <th className="text-left px-6 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-10 h-12 object-cover rounded" />
                            <span className="font-semibold text-gray-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-gray-600">{product.category}</td>
                        <td className="px-6 py-3 font-bold">₹{product.price}</td>
                        <td className="px-6 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.stock > 20 ? 'bg-green-100 text-green-700' :
                            product.stock > 0 ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <button className="text-blue-600 hover:text-blue-700 mr-4 font-semibold text-sm">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Orders Management</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 mb-4">Orders management coming soon. When backend is integrated, you'll be able to:</p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ View all customer orders</li>
                <li>✓ Update order status</li>
                <li>✓ Manage shipping and delivery</li>
                <li>✓ Handle returns and refunds</li>
                <li>✓ Download order reports</li>
              </ul>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Admin Settings</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 mb-4">Settings coming soon. You'll be able to configure:</p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Store information</li>
                <li>✓ Payment gateways</li>
                <li>✓ Shipping methods</li>
                <li>✓ Tax settings</li>
                <li>✓ Email notifications</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
