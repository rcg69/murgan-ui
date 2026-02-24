'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { dressProducts } from '@/data/products';
import { getProductsFromStorage } from '@/utils/storageHelpers';
import ProductGrid from '@/components/ProductGrid';

export default function ProductDetailsContent({ product, categorySlug, slug }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const storedProducts = getProductsFromStorage(dressProducts);
    setAllProducts(storedProducts);
    if (product && product.colors?.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
    if (product && product.sizes?.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <i className="fas fa-exclamation-circle text-5xl text-gray-300 mb-4 block"></i>
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <button
          onClick={() => router.push('/products')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <>
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex gap-2 mb-8 text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-blue-600">Products</a>
          <span>/</span>
          <a href={`/products?category=${product.category}`} className="hover:text-blue-600">
            {product.category}
          </a>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Image Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-lg overflow-hidden sticky top-24">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-light mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    ></i>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl font-bold text-blue-600">₹{product.price}</span>
                  <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-semibold">
                    {discount}% OFF
                  </span>
                </div>
                <p className="text-green-600 font-semibold">In Stock ({product.stock} available)</p>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">{product.description}</p>

              {/* Material & Care */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm mb-2">
                  <span className="font-semibold text-gray-900">Material:</span> {product.material}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-900">Care:</span> {product.care}
                </p>
              </div>

              {/* Features */}
              {product.features && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-900">Features:</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <i className="fas fa-check text-green-600"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Color</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded border-2 transition ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2 text-gray-900">Size</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 rounded border-2 transition font-semibold ${
                          selectedSize === size
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-900">Quantity</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-center"
                    min="1"
                    max={product.stock}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition mb-2"
              >
                Add to Cart
              </button>

              {/* Wishlist Button */}
              <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-2 rounded-lg transition">
                <i className="fas fa-heart mr-2"></i> Add to Wishlist
              </button>

              {/* Success Message */}
              {addedToCart && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-sm text-center">
                  <i className="fas fa-check mr-2"></i> Added to cart successfully!
                </div>
              )}

              {/* Shipping Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm">
                <p className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-truck text-blue-600"></i> Free shipping on orders over ₹50
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-sync text-blue-600"></i> 30-day returns policy
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-shield-alt text-blue-600"></i> Secure payment guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-light mb-10">Related Products</h2>
            <ProductGrid products={relatedProducts} loading={false} />
          </div>
        </section>
      )}
    </>
  );
}
