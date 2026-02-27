"use client";
import "../styles/FilterModel.css";

export default function FilterModal({ onClose }) {
  return (
    <div className="filter-overlay">
      <div className="filter-modal" style={{ fontFamily: 'Playfair Display, serif' }}>
        {/* Header */}
        <div className="filter-header">
          <h2>Refine Your Style</h2>
          <p>Choose filters to discover the perfect dress</p>
        </div>
        {/* Content */}
        <div className="filter-content">
          {/* Sort */}
          <div className="filter-block">
            <label>Sort By</label>
            <select>
              <option>Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          {/* Price */}
          <div className="filter-block">
            <label>Price Range</label>
            <input type="range" />
            <div className="price-labels">
              <span>₹0</span>
              <span>₹5000</span>
            </div>
          </div>
          {/* Categories */}
          <div className="filter-block">
            <label>Categories</label>
            <div className="chip-grid">
              {['Casual', 'Evening', 'Party', 'Office', 'Maxi'].map(cat => (
                <span key={cat} className="chip">{cat}</span>
              ))}
            </div>
          </div>
          {/* Sizes */}
          <div className="filter-block">
            <label>Sizes</label>
            <div className="chip-grid">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <span key={size} className="chip size-chip">{size}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Actions (CENTERED) */}
        <div className="filter-actions">
          <button className="btn-secondary no-rounded" onClick={onClose}>
            Clear
          </button>
          <button className="btn-primary no-rounded">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}