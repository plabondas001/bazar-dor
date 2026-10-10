import { notFound } from "next/navigation";
import Link from "next/link";

const getProduct = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${encodeURIComponent(id)}`,
  );

  if (!res.ok) return null;

  const data = await res.json();

  if (Array.isArray(data)) return data[0] ?? null;
  return data.product ?? data.data ?? data;
};

const formatPrice = (price) =>
  Number(price).toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

const ProductDetailsPage = async ({ params }) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const categoryName = product.categoryNameBn ?? product.category ?? "অন্যান্য";

  // API-তে বাজারের তালিকা থাকলে সেটি ব্যবহার করবে
  const productMarkets =
    product.markets ?? product.marketPrices ?? product.market_prices ?? [];
  const markets =
    Array.isArray(productMarkets) && productMarkets.length > 0
      ? productMarkets
      : [
          {
            id: `product-${product.id ?? product.slug}`,
            marketNameBn:
              product.marketNameBn ??
              product.marketName ??
              "à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨ à¦¦à¦¾à¦®",
            divisionBn:
              product.divisionBn ??
              product.division ??
              product.districtBn ??
              product.district ??
              "â€”",
            lowest:
              product.lowestPrice ?? product.lowestPriceToday ?? product.today,
            highest:
              product.highestPrice ??
              product.highestPriceToday ??
              product.today,
            average: product.averagePrice ?? product.today,
            price: product.today,
          },
        ];

  const marketPrices = markets
    .map((market) => {
      const currentPrice = Number(
        market.price ?? market.today ?? product.today,
      );
      const min = Number(market.min ?? market.lowest ?? currentPrice);
      const max = Number(market.max ?? market.highest ?? currentPrice);

      return {
        min,
        max,
        average: Number(market.average ?? (min + max) / 2),
      };
    })
    .filter(({ min, max, average }) =>
      [min, max, average].every((price) => Number.isFinite(price) && price > 0),
    );

  const lowestPrice = marketPrices.length
    ? Math.min(...marketPrices.map(({ min }) => min))
    : Number(product.lowestPrice ?? product.lowestPriceToday ?? product.today);

  const highestPrice = marketPrices.length
    ? Math.max(...marketPrices.map(({ max }) => max))
    : Number(
        product.highestPrice ?? product.highestPriceToday ?? product.today,
      );

  const averagePrice = marketPrices.length
    ? marketPrices.reduce((sum, { average }) => sum + average, 0) /
      marketPrices.length
    : Number(product.averagePrice ?? product.today);

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-[#27332c] sm:py-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[#68746b] sm:text-sm"
        >
          <Link href="/" className="hover:text-green-700 font-bold">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${encodeURIComponent(product.category ?? "")}`}
            className="hover:text-green-700"
          >
            {categoryName}
          </Link>

          <span>›</span>

          <span className="font-medium text-[#27332c]">{product.nameBn}</span>
        </nav>

        {/* Product Information */}
        <section className="mb-6 flex flex-col justify-between gap-6 rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-4 sm:p-5 lg:flex-row lg:items-center lg:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl sm:h-20 sm:w-20">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold leading-tight text-[#202a23] sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-[#68746b]">
                প্রতি {product.unit || "কেজি"} · {categoryName}
              </p>

              <p className="mt-2 text-sm">
                <span className="text-[#68746b]">
                  গতকালের তুলনায় আজকের দাম{" "}
                </span>

                <span
                  className={`font-semibold ${
                    isUp
                      ? "text-red-500"
                      : isDown
                        ? "text-green-600"
                        : "text-[#68746b]"
                  }`}
                >
                  {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                  {" · "}
                  {formatPrice(product.change?.pct ?? 0)}%
                </span>
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="flex min-w-32 flex-col items-center justify-center rounded-2xl bg-[#f0f5f0] px-6 py-4 text-center sm:min-w-36">
            <p className="text-sm text-[#68746b]">আজকের দাম</p>

            <p className="my-1 text-3xl font-extrabold text-[#202a23]">
              {formatPrice(product.today)}
            </p>

            <p className="text-sm text-[#68746b]">
              টাকা / {product.unit || "কেজি"}
            </p>

            <p
              className={`mt-1 text-sm font-bold ${
                isUp
                  ? "text-red-500"
                  : isDown
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {formatPrice(product.change?.pct ?? 0)}%
            </p>
          </div>
        </section>

        {/* Price Summary and Market Prices */}
        <section className="rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="mb-4 text-lg font-bold text-[#27332c]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* Lowest Price */}
            <div className="rounded-2xl border border-[#dce5dc] p-5">
              <p className="text-sm text-[#68746b]">সর্বনিম্ন দাম</p>

              <p className="mt-1 text-2xl font-extrabold text-green-600">
                {formatPrice(lowestPrice)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>

              <p className="mt-1 text-xs text-[#68746b]">
                {marketPrices.length
                  ? "সবচেয়ে কম দামের বাজার"
                  : "বর্তমান দামের ভিত্তিতে"}
              </p>
            </div>

            {/* Highest Price */}
            <div className="rounded-2xl border border-[#dce5dc] p-5">
              <p className="text-sm text-[#68746b]">সর্বাধিক দাম</p>

              <p className="mt-1 text-2xl font-extrabold text-red-500">
                {formatPrice(highestPrice)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>

              <p className="mt-1 text-xs text-[#68746b]">
                {marketPrices.length
                  ? "সবচেয়ে বেশি দামের বাজার"
                  : "বর্তমান দামের ভিত্তিতে"}
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-2xl border border-[#dce5dc] p-5">
              <p className="text-sm text-[#68746b]">গড় দাম</p>

              <p className="mt-1 text-2xl font-extrabold text-green-600">
                {formatPrice(averagePrice)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>

              <p className="mt-1 text-xs text-[#68746b]">
                প্রতি {product.unit || "কেজি"} হিসেবে
              </p>
            </div>
          </div>

          {/* Market Price Table */}
          <h2 className="mb-4 mt-7 text-lg font-bold text-[#27332c]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-[#dce5dc]">
            <table className="w-full min-w-[650px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#f7faf7] text-[#7b847d]">
                  <th className="px-4 py-4 font-semibold">বাজার</th>
                  <th className="px-4 py-4 font-semibold">বিভাগ</th>
                  <th className="px-4 py-4 font-semibold">সর্বনিম্ন</th>
                  <th className="px-4 py-4 font-semibold">সর্বাধিক</th>
                  <th className="px-4 py-4 text-right font-semibold">গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.length > 0 ? (
                  markets.map((market, index) => {
                    const price = Number(
                      market.price ?? market.today ?? product.today ?? 0,
                    );
                    const minPrice = Number(
                      market.min ?? market.lowest ?? price,
                    );
                    const maxPrice = Number(
                      market.max ?? market.highest ?? price,
                    );
                    const avgPrice = Number(
                      market.average ?? (minPrice + maxPrice) / 2,
                    );

                    return (
                      <tr
                        key={market.id ?? market.slug ?? index}
                        className="border-t border-[#dce5dc] transition-colors hover:bg-[#f0f5f0]"
                      >
                        <td className="px-4 py-4 font-medium">
                          {market.market ??
                            market.marketNameBn ??
                            market.marketBn ??
                            market.marketName ??
                            market.nameBn ??
                            market.name ??
                            "স্থানীয় বাজার"}
                        </td>

                        <td className="px-4 py-4">
                          {market.division ??
                            market.divisionBn ??
                            market.division ??
                            market.districtBn ??
                            market.district ??
                            "—"}
                        </td>

                        <td className="px-4 py-4">
                          {formatPrice(minPrice)} টাকা
                        </td>

                        <td className="px-4 py-4">
                          {formatPrice(maxPrice)} টাকা
                        </td>

                        <td className="px-4 py-4 text-right font-bold">
                          {formatPrice(avgPrice)} টাকা
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-[#68746b]"
                    >
                      <span className="mb-2 block text-3xl">🏪</span>
                      <p className="font-semibold">
                        বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি
                      </p>
                      <p className="mt-1 text-xs">
                        API-তে বাজারের তথ্য যোগ করলে এখানে দেখাবে।
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
