import { notFound } from "next/navigation";
import { publicApi } from "@/lib/apiClient";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateStaticParams() {
  // Fetch all products and return their IDs for static generation
  const products = await publicApi.getProducts({ page: 0, size: 1000 });
  const items = products?.content || [];
  return items.map((product) => ({ id: String(product.id) }));
}
export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return (
      <div style={{ color: 'red' }}>Invalid product ID: {id}</div>
    );
  }

  let product = null;
  let error = null;
  try {
    product = await publicApi.getProduct(numericId);
  } catch (err) {
    error = err;
  }

  if (error || !product) {
    return (
      <div style={{ color: 'red' }}>
        Failed to load product.<br />
        {error ? String(error) : 'No product found.'}
      </div>
    );
  }

  // Use a client component for Add to Cart button
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-4 bg-gray-100"
        style={{ objectFit: 'cover' }}
      />
      <p className="text-gray-700 mb-2">{product.description}</p>
      <div className="mb-2">
        <span className="font-semibold">Price:</span> ₹{product.price}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Stock:</span> {product.stockQuantity}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Category:</span> {product.category?.name}
      </div>
      <AddToCartButton productId={product.id} />
    </div>
  );

}

