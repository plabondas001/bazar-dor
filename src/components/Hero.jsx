import Image from "next/image";
import Link from "next/link";
import React from "react";
import hero from "../assets/bazar-hero.png"

const date = new Date();

const formattedDate = new Intl.DateTimeFormat("bn-BD", {
  month: "long",
  day: "numeric",
  year: "numeric",
}).format(date);

const Hero = () => {
  return (
    <div className="flex flex-col-reverse items-stretch gap-5 rounded-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:p-8">
        <div className="min-w-0 sm:flex-1">
            <span className="border px-3 py-1 rounded-full bg-green-200 mb-10">{formattedDate}</span>
            <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
            <p className="mt-3">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন- <br className="hidden lg:block"/> সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
            
            <Link href="/allProducts" className="inline-block bg-green-700 text-white px-5 py-3 cursor-pointer mt-8 rounded-xl transition-colors hover:bg-green-800">সব পণ্য দেখুন</Link>
        </div>

        <div className="flex w-full justify-center sm:w-2/5 sm:shrink-0">
            <Image className="h-auto w-full max-w-[400px]" width={400} height={100} src={hero} alt="" priority />
        </div>

    </div>
  )
};

export default Hero;
