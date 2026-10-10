
import React from "react";

const ProductsCard = ({ products }) => {
  const isUp = products.change?.dir === "up";
  const isDown = products.change?.dir === "down";

  return (
    <div className="rounded-2xl border border-[#dce5dc] bg-white/80 p-4 transition-shadow hover:shadow-md">
      {/* Product Info */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
          {products.image || products.categoryIcon || "🛒"}
        </div>

        <div>
          <h2 className="font-bold text-[#27332c]">
            {products.nameBn}
          </h2>

          <p className="text-xs text-gray-500">
            প্রতি{" "}
            {products.unit === "kg"
              ? "কেজি"
              : products.unit === "liter"
              ? "লিটার"
              : products.unit === "piece"
              ? "পিস"
              : products.unit === "dozen"
              ? "ডজন"
              : products.unit}
          </p>
        </div>
      </div>

      {/* Price */}
      <p className="text-xs text-gray-600">
        আজকের দাম
      </p>

      <div className="flex items-center justify-between gap-2">
        <p className="text-lg font-bold text-[#27332c]">
          {products.today} টাকা
        </p>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isUp
              ? "bg-red-50 text-red-500"
              : isDown
              ? "bg-green-50 text-green-600"
              : "bg-[#f0f5f0] text-gray-600"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {products.change?.pct ?? 0}%
        </span>
      </div>
    </div>
  );
};

export default ProductsCard;