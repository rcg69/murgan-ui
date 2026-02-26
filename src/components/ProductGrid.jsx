'use client';
import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star, Filter, Search, X } from 'lucide-react';

<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductGrid.css';
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

// Product type for reference:
// {
//   id: number,
//   name: string,
//   price: number,
//   originalPrice?: number,
//   image: string,
//   category: string,
//   rating: number,
//   reviews: number,
//   inStock: boolean,
//   discount?: number
// }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  if (loading) {
    return (
      <div className="product-grid" style={{ padding: '32px 24px' }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-96 animate-pulse border border-[#e8e8e8] rounded-xl"></div>
        ))}
      </div>
=======
=======
>>>>>>> Stashed changes
const ProductsGrid = ({
  products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      category: "Electronics",
      rating: 4.5,
      reviews: 128,
      inStock: true,
      discount: 25
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 449.99,
      originalPrice: 599.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      category: "Electronics",
      rating: 4.8,
      reviews: 256,
      inStock: true,
      discount: 25
    },
    {
      id: 3,
      name: "Designer Sunglasses",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
      category: "Fashion",
      rating: 4.3,
      reviews: 89,
      inStock: true
    },
    {
      id: 4,
      name: "Leather Backpack",
      price: 129.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      category: "Fashion",
      rating: 4.6,
      reviews: 174,
      inStock: true,
      discount: 28
    },
    {
      id: 5,
      name: "Running Shoes",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      category: "Sports",
      rating: 4.7,
      reviews: 312,
      inStock: true
    },
    {
      id: 6,
      name: "Yoga Mat Premium",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
      category: "Sports",
      rating: 4.4,
      reviews: 95,
      inStock: false,
      discount: 29
    },
    {
      id: 7,
      name: "Coffee Maker Deluxe",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
      category: "Home",
      rating: 4.5,
      reviews: 203,
      inStock: true
    },
    {
      id: 8,
      name: "Desk Lamp Modern",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
      category: "Home",
      rating: 4.2,
      reviews: 67,
      inStock: true,
      discount: 20
    }
  ],
  categories = ["All", "Electronics", "Fashion", "Sports", "Home"]
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    );
  };

  return (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <div className="product-grid">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
=======
=======
>>>>>>> Stashed changes
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Our Products</h1>
          <p className="text-muted-foreground">Discover our curated collection of premium products</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-foreground"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Categories */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-card text-foreground border border-border hover:bg-accent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.discount && (
                    <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-bold">
                      -{product.discount}%
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs font-bold">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      wishlist.includes(product.id)
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-background/80 text-foreground hover:bg-background'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>

                {/* Add to Cart Overlay */}
                <div className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/95 to-transparent transition-transform duration-300 ${
                  hoveredProduct === product.id ? 'translate-y-0' : 'translate-y-full'
                }`}>
                  <button
                    disabled={!product.inStock}
                    className={`w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      product.inStock
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-muted-foreground font-medium">{product.category}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </div>
  );
};

export default ProductsGrid;
