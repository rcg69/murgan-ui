import React from 'react';
import { dressProducts } from '@/data/products';
import { extractIdFromSlug } from '@/utils/slugHelpers';
import { getProductsFromStorage } from '@/utils/storageHelpers';
import ProductDetailsContent from '@/components/ProductDetailsContent';

// Generate metadata for each product
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.slug) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }
  
  const productId = extractIdFromSlug(resolvedParams.slug);
  if (!productId) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }
  
  const storedProducts = getProductsFromStorage(dressProducts);
  const product = storedProducts.find((p) => p.id === productId);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return {
    title: `${product.name} | Buy Online at Murgan Store`,
    description: `${product.description} Price: ₹${product.price}. Rating: ${product.rating}★ (${product.reviews} reviews). Free shipping on orders over ₹50.`,
    keywords: `${product.name}, ${product.category}, women dresses, online shopping`,
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'product',
      url: `https://yourshop.com/${resolvedParams.categorySlug}/${resolvedParams.slug}`,
      image: product.image,
      price: {
        amount: product.price,
        currency: 'INR',
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      image: product.image,
    },
  };
}

// Generate static paths for all products (ISR)
export async function generateStaticParams() {
  const storedProducts = getProductsFromStorage(dressProducts);

  return storedProducts.map((product) => ({
    categorySlug: product.categorySlug,
    slug: product.slug,
  }));
}

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
