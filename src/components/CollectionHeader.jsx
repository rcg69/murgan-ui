import React from "react";

export default function CollectionHeader({ onFilterOpen }) {
  return (
    <section className="bg-white border-b">
      <div className="container-custom py-16 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center w-full gap-4">
          {/* Left spacer (keeps center truly centered) */}
          <div></div>

          {/* Center: Title */}
          <div className="featured-header text-center flex flex-col items-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-wide">
              Our Products
            </h1>
            <p className="mt-1 text-gray-500 text-sm md:text-base">
              Handpicked styles loved by our customers
            </p>
          </div>

          {/* Right: Filter Button */}
          <div className="flex md:justify-end justify-center">
            <button
              onClick={onFilterOpen}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition shadow-sm"
            >
              <span className="filter-icon">⚲</span>
              Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
