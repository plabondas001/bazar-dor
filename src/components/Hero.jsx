
import Image from "next/image";
import React from "react";
import hero from "../assets/bazar-hero.png";

const Hero = () => {
  const date = new Date();

  const formattedDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="flex flex-col-reverse items-center gap-8 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:justify-between sm:p-8 lg:p-10">
        {/* Left Content */}
        <div className="min-w-0 flex-1">
          {/* Eyebrow */}
          <span className="inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
            {formattedDate}
          </span>

          {/* Main Heading */}
          <h1 className="mt-5 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-5xl">
            আজকের বাজারের দাম
            <span className="mt-1 block text-green-700">
              এক নজরে
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার
            দাম — বাজারভিত্তিক বিস্তারিত তথ্য, গড়,
            সর্বনিম্ন-সর্বাধিক মূল্য এবং দামের পরিবর্তন
            জানুন এক জায়গায়।
          </p>

          {/* CTA Button: Same-page anchor */}
          <a
            href="#সব-পণ্য"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Right Hero Image */}
        <div className="flex w-full shrink-0 justify-center sm:w-2/5">
          <Image
            src={hero}
            alt="বাজারের বিভিন্ন পণ্য"
            width={400}
            height={300}
            priority
            className="h-auto w-full max-w-[400px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
