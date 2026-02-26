import React from "react";

export default function ProductView({ product }) {
  if (!product) return <div>No product found.</div>;
  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ fontSize: 32, marginBottom: 16 }}>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ maxWidth: 400, marginBottom: 24 }} />
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Rating:</strong> {product.rating} ({product.reviews} reviews)</p>
      <p><strong>Status:</strong> {product.stock === 0 ? 'Out of Stock' : 'In Stock'}</p>
    </div>
  );
}
