import Image from "next/image";
import React from "react";
import logo from "../assets/logo-icon.png";
import { Button } from "@heroui/react";
import Link from "next/link";
import UserProfile from "./UserProfile";
import Navbar from "./Navbar";

const Header = () => {
  const date = new Date();

  const formattedDate = new Intl.DateTimeFormat("bn-BD", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 sm:py-5 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link href={`/`}>
              <Image
                className="h-9 w-9 rounded-md bg-green-400 p-1 sm:h-10 sm:w-10"
                src={logo}
                alt="logo"
              ></Image>
            </Link>
            <div className="min-w-0">
              <h1 className="font-bold">বাজার দর</h1>
              <p>{formattedDate}</p>
            </div>
          </div>
          <UserProfile />
        </div>
      </div>
      <Navbar/>
    </header>
  );
};

export default Header;
