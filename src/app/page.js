import Hero from "@/components/Hero";
import HighProducts from "@/components/HighProducts";
import LowProducts from "@/components/LowProducts";
import AllProducts from "./allProducts/page";

export default function Home() {
  return (
    <div className="bg-[#f0f5f0]">
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Hero/>
      <HighProducts/>
      <LowProducts/>
      <AllProducts/>
    </main>
    </div>
  );
}
