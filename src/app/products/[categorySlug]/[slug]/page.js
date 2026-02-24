import React from 'react';
import { dressProducts } from '@/data/products';
import { extractIdFromSlug } from '@/utils/slugHelpers';
import { getProductsFromStorage } from '@/utils/storageHelpers';
import ProductDetailsContent from '@/components/ProductDetailsContent';

export default function ProductDetailsPage({ params: paramsPromise }) {
  const params = React.use(paramsPromise);

  if (!params?.slug || !params?.categorySlug) {
    return (
      <div className="container-custom py-12 text-center">
        <i className="fas fa-exclamation-circle text-5xl text-gray-300 mb-4 block"></i>
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <a href="/products" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Back to Products
        </a>
      </div>
    );
  }

  const productId = extractIdFromSlug(params.slug);
  if (!productId) {
    return (
      <div className="container-custom py-12 text-center">
        <i className="fas fa-exclamation-circle text-5xl text-gray-300 mb-4 block"></i>
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <a href="/products" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Back to Products
        </a>
      </div>
    );
  }

  const storedProducts = getProductsFromStorage(dressProducts);
  const product = storedProducts.find((p) => p.id === productId);

  return <ProductDetailsContent product={product} categorySlug={params.categorySlug} slug={params.slug} />;
}
