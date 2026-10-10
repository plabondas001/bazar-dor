import React from 'react';
import ProductsCard from './ProductsCard';

const getAllProducts = async () => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products')
    const data = await res.json();
    return data;
}

const AllProducts = async () => {
    const allProducts = await getAllProducts()
    return (
        <section className="bg-[#f0f5f0] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-xl font-bold text-[#244b59]">
          সকল পণ্য
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allProducts.map((products) => (
            <ProductsCard
              key={products.id}
              products={products}
            />
          ))}
        </div>
      </div>
    </section>
    );
};

export default AllProducts;