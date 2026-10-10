"use client";

import React from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn, signUp } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

const SignUp = () => {
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    const { error } = await signIn.social({
      provider: "google",
    });
    if (error) toast.error(error.message || "Google দিয়ে sign up করা যায়নি");
  };

  const handleGithubSignUp = async () => {
    const { error } = await signIn.social({
      provider: "github",
    });
    if (error) toast.error(error.message || "GitHub দিয়ে sign up করা যায়নি");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি একই নয়");
      return;
    }

    const data = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data: signUpData, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.image,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    } else if (signUpData) {
      toast.success("সফলভাবে sign up হয়েছে");
      router.push("/");
    }
  };

  return (
    <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-4 py-8 sm:px-6">
      {/* Heading */}
      <div className="mb-8 max-w-md text-center">
        <h1 className="font-bold text-2xl pb-2">অ্যাকাউন্ট তৈরি করুন</h1>

        <p className="text-sm">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      {/* Signup Form */}
      <Form
        className="flex w-full max-w-md flex-col gap-4 rounded-2xl border p-4 shadow-sm sm:p-6"
        onSubmit={onSubmit}
      >
        {/* Name */}
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }

            return null;
          }}
        >
          <Label>নাম</Label>
          <Input placeholder="যেমন: রহিম উদ্দিন" />
          <FieldError />
        </TextField>

        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>ইমেইল</Label>
          <Input placeholder="you@example.com" />
          <FieldError />
        </TextField>

        {/* Password */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }

            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label>পাসওয়ার্ড</Label>
          <Input placeholder="কমপক্ষে ৮ অক্ষর" />
          <FieldError />
        </TextField>

        {/* Confirm Password */}
        <TextField
          isRequired
          name="confirmPassword"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
            }

            return null;
          }}
        >
          <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
          <Input placeholder="আবার লিখুন" />
          <FieldError />
        </TextField>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-green-700 text-white">
          অ্যাকাউন্ট তৈরি করুন
        </Button>
        {/* Google Button */}
        <div className="grid w-full grid-cols-1 gap-2 min-[380px]:grid-cols-2 sm:gap-3">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="flex min-w-0 items-center justify-center gap-1 rounded-2xl border px-2 py-2 cursor-pointer hover:bg-gray-50 transition"
          >
            <Image
              width={24}
              height={24}
              src="https://img.magnific.com/premium-vector/print-creative-modern-color-full-logo-design_1271730-562.jpg?semt=ais_hybrid&w=740&q=80"
              alt="google-logo"
              className="shrink-0"
            />

            <p className="truncate text-xs sm:text-sm">
              Google দিয়ে চালিয়ে যান
            </p>
          </button>

          <button
            type="button"
            onClick={handleGithubSignUp}
            className="flex min-w-0 items-center justify-center gap-1 rounded-2xl border px-2 py-2 cursor-pointer hover:bg-gray-50 transition"
          >
            <Image
              width={24}
              height={24}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWD3KKvAMZEFo5RnP9oVGaU3_a1cBtBe1rulaBuCR8Jw&s=10"
              alt="google-logo"
              className="shrink-0"
            />

            <p className="truncate text-xs sm:text-sm">
              GitHub দিয়ে চালিয়ে যান
            </p>
          </button>
        </div>
        <p className="text-center pt-3 text-xs">
          অ্যাকাউন্ট আছে?
          <span className="text-green-700">সাইন ইন করুন</span>
        </p>
      </Form>
     <Link href={`/`}>
      <button className="mt-12 text-sm cursor-pointer">
        ← হোম পেজে ফিরে যান
      </button>
     </Link>
    </main>
  );
};

export default SignUp;
