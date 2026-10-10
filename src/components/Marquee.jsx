import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");

  const response = await res.json();
  const data = Array.isArray(response)
    ? response
    : (response.products ?? response.data ?? []);

  return (
    <div className="w-full overflow-hidden border-b bg-white">
      <MarqueeText direction="right" duration="20">
        <div className="flex items-center whitespace-nowrap">
          {data.map((prod) => (
            <div
              key={prod.id}
              className="flex items-center gap-2 border-r px-6 py-3 text-sm"
            >
              <span className="text-base">{prod.image}</span>

              <span className="font-medium text-gray-800">{prod.nameBn}</span>

              <span className="text-gray-700">{prod.today} টাকা/কেজি</span>

              <span
                className={`font-medium ${
                  prod.change.dir === "up" ? "text-red-500" : "text-green-600"
                }`}
              >
                {prod.change.dir === "up" ? "▲" : "▼"} {prod.change.pct}%
              </span>
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
