import React from "react";
import ProductFilter from "@/components/ProductFilter";

const getProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { cache: "no-store" },
  );

  const data = await res.json();
  return data;
};

const CategoryProduct = async ({ params }) => {
  const { categorySlug } = await params;

  const response = await getProducts();

  const products = Array.isArray(response)
    ? response
    : (response.products ?? response.data ?? []);

  const categoryProducts = products.filter(
    (product) => product.category === categorySlug,
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Category Header */}
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/80 p-5">
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
