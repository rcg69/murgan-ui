// Product data - Empty array ready for backend API integration
// Once backend is ready, replace this with API calls
export const dressProducts = [];

// Categories
export const categories = [
  'All Products',
  'Casual Dresses',
  'Evening Dresses',
  'Office Dresses',
  'Party Dresses',
];

// Price ranges
export const priceRanges = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
  { label: '₹2,000 - ₹3,000', min: 2000, max: 3000 },
  { label: '₹3,000 - ₹5,000', min: 3000, max: 5000 },
  { label: 'Above ₹5,000', min: 5000, max: 10000 },
];

// Ratings
export const ratingFilters = [
  { label: '★★★★★ 5 Star', value: 5 },
  { label: '★★★★☆ 4 Stars & up', value: 4 },
  { label: '★★★☆☆ 3 Stars & up', value: 3 },
  { label: '★★☆☆☆ 2 Stars & up', value: 2 },
];
