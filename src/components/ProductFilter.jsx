
"use client";

import { useState } from "react";
import Link from "next/link";

const ProductFilter = ({ products = [], showSort = true }) => {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.today - b.today;
    }

    if (sortBy === "price-high") {
      return b.today - a.today;
    }

    if (sortBy === "name") {
      return a.nameBn.localeCompare(b.nameBn, "bn");
    }

    return a.id - b.id;
  });

  return (
    <section>
      {/* Filter Dropdown */}
      {showSort && <div className="mb-4 flex items-center justify-end gap-3 rounded-2xl border border-[#dce5dc] bg-white/70 p-4">
        <label
          htmlFor="sort-products"
          className="text-sm text-gray-500"
        >
          সাজান
        </label>

        <select
          id="sort-products"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-500"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
        </select>
      </div>}

      {/* Product Count */}
      <p className="mb-4 text-sm text-gray-500">
        মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${encodeURIComponent(product.slug ?? product.id)}`}
            className="block rounded-2xl border border-[#dce5dc] bg-white/70 p-4 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244b59]"
          >
            {/* Product Information */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <div>
                <h2 className="font-bold text-gray-800">
                  {product.nameBn}
                </h2>

                <p className="text-sm text-gray-500">
                  প্রতি{" "}
                  {product.unit === "kg"
                    ? "কেজি"
                    : product.unit === "liter"
                    ? "লিটার"
                    : product.unit}
                </p>
              </div>
            </div>

            {/* Price Information */}
            <p className="text-sm text-gray-600">
              আজকের দাম
            </p>

            <div className="flex items-center justify-between gap-2">
              <p className="text-xl font-bold text-gray-900">
                {product.today} টাকা
              </p>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  product.change?.dir === "up"
                    ? "bg-red-50 text-red-500"
                    : product.change?.dir === "down"
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {product.change?.dir === "up"
                  ? "▲"
                  : product.change?.dir === "down"
                  ? "▼"
                  : "—"}{" "}
                {product.change?.pct ?? 0}%
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </div>
      )}
    </section>
  );
};

export default ProductFilter;
