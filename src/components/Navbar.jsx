import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  const response = await res.json();
  const data = Array.isArray(response)
    ? response
    : (response.categories ?? response.data ?? []);

  return (
    <nav aria-label="Product categories" className="w-full border-t">
      <div className="mx-auto max-w-7xl px-2 sm:px-4">
        <div
          className="
            flex items-center gap-1 sm:gap-2
            overflow-x-auto
            py-2 sm:py-3
            scrollbar-hide
            whitespace-nowrap
          "
        >
          {data.map((cate) => (
            <Link key={cate.id} href={`/category/${cate.slug}`}>
            <span
              className="
                flex items-center
                shrink-0 px-3 py-2 sm:px-4
                text-sm
                font-medium
                cursor-pointer
              "
            >
              <span className="text-lg">{cate?.icon}</span>

              <h1>{cate?.nameBn}</h1>
            </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
