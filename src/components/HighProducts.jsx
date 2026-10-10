
import React from "react";

const highProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );

  const data = await res.json();
  return data;
};

const HighProducts = async () => {
  const products = await highProducts();

  const increasedProducts = products.filter(
    (product) => product.change?.dir === "up"
  );

  return (
    <section className="bg-[#f0f5f0] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#244b59]">
          <span className="text-red-500">▲</span>
          আজ দাম বেড়েছে
        </h2>

        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {increasedProducts.slice(0,6).map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-[#dce5dc] bg-white/80 p-4 transition-shadow hover:shadow-md"
            >
              {/* Product Info */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
                  {product.image || product.categoryIcon || "🛒"}
                </div>

                <div>
                  <h3 className="font-bold text-[#27332c]">
                    {product.nameBn}
                  </h3>

                  <p className="text-xs text-gray-500">
                    প্রতি{" "}
                    {product.unit === "kg"
                      ? "কেজি"
                      : product.unit === "piece"
                      ? "পিস"
                      : product.unit === "dozen"
                      ? "ডজন"
                      : product.unit}
                  </p>
                </div>
              </div>

              {/* Price */}
              <p className="text-xs text-gray-600">
                আজকের দাম
              </p>

              <div className="flex items-center justify-between gap-2">
                <p className="text-lg font-bold text-[#27332c]">
                  {product.today} টাকা
                </p>

                <span className="rounded-full bg-[#f0f5f0] px-3 py-1 text-xs font-semibold text-red-500">
                  ▲ {product.change.pct}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {increasedProducts.length === 0 && (
          <p className="text-sm text-gray-500">
            দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  );
};

export default HighProducts;