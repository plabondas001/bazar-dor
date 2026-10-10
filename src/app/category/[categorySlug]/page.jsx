import React from "react";
import ProductFilter from "@/components/ProductFilter";
import { notFound } from "next/navigation";

const getCategory = async (categorySlug) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/categories/${encodeURIComponent(categorySlug)}`,
  );
  if (!response.ok) return null;

  const data = await response.json();
  const category = data.category ?? data.data ?? data;
  return category && (category.id || category.slug || category.name || category.nameBn)
    ? category
    : null;
};

const getProducts = async (categorySlug) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categorySlug)}`,
  );

  const data = await res.json();
  return data;
};

const CategoryProduct = async ({ params }) => {
  const { categorySlug } = await params;

  const [category, response] = await Promise.all([
    getCategory(categorySlug),
    getProducts(categorySlug),
  ]);
  if (!category) notFound();

  const products = Array.isArray(response)
    ? response
    : (response.products ?? response.data ?? []);

  const categoryProducts = products;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Category Header */}
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/80 p-4 sm:gap-4 sm:p-5">
        <span className="text-4xl">
          {categoryProducts[0]?.categoryIcon || "🛒"}
        </span>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {categoryProducts[0]?.categoryNameBn || categorySlug}
          </h1>

          <p className="text-sm text-gray-500">
            {categoryProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>
      <ProductFilter products={categoryProducts} />
    </main>
  );
};

export default CategoryProduct;
