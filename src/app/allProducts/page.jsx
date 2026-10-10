import React from 'react';
import ProductFilter from "@/components/ProductFilter";

const getProducts = async () => {
    const response = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products",
        { cache: "no-store" },
    );

    if (!response.ok) {
        throw new Error("পণ্যের তথ্য আনা যায়নি");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : (data.products ?? data.data ?? []);
};

const AllProducts = async () => {
    const products = await getProducts();

    return (
        <main id="সব-পণ্য" className="min-h-screen scroll-mt-24 bg-[#f0f5f0]">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">সব পণ্য</h1>
                <ProductFilter products={products} showSort={false} />
            </div>
        </main>
    );
};

export default AllProducts;
