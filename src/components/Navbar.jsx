import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const data = await res.json();

  return (
    <nav className="w-full border-t">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="
            flex items-center gap-1
            overflow-x-auto
            py-3
            scrollbar-hide
            whitespace-nowrap
          "
        >
          {data.map((cate) => (
            <Link key={cate.id} href={`/category/${cate.slug}`}>
            <div
              className="
                flex items-center
                px-4 py-2
                text-sm
                font-medium
                cursor-pointer
              "
            >
              <span className="text-lg">{cate?.icon}</span>

              <h1>{cate?.nameBn}</h1>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;