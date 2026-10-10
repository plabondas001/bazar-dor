import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[55vh] items-center justify-center bg-[#f0f5f0] px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-[#dce5dc] bg-white p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">404</p>
        <h1 className="mt-3 text-2xl font-bold text-[#244b59] sm:text-3xl">পেজটি খুঁজে পাওয়া যায়নি</h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">ঠিকানাটি ভুল হতে পারে অথবা পেজটি সরানো হয়েছে।</p>
        <Link href="/" className="mt-6 inline-flex rounded-xl bg-green-700 px-5 py-3 font-medium text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800">
          হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}
