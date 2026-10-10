"use client";

import { signIn } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { clearQueuedToast, queueToast, toast } from "@/lib/toast";

const SignIn = () => {
  const handleGoogleSignUp = async () => {
    queueToast("Google দিয়ে সফলভাবে sign in হয়েছে");
    try {
      const { error } = await signIn.social({ provider: "google", callbackURL: "/" });
      if (error) {
        clearQueuedToast();
        toast.error(error.message || "Google দিয়ে sign in করা যায়নি");
      }
    } catch {
      clearQueuedToast();
      toast.error("Google দিয়ে sign in করা যায়নি");
    }
  };

  const handleGithubSignUp = async () => {
    queueToast("GitHub দিয়ে সফলভাবে sign in হয়েছে");
    try {
      const { error } = await signIn.social({ provider: "github", callbackURL: "/" });
      if (error) {
        clearQueuedToast();
        toast.error(error.message || "GitHub দিয়ে sign in করা যায়নি");
      }
    } catch {
      clearQueuedToast();
      toast.error("GitHub দিয়ে sign in করা যায়নি");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    queueToast("সফলভাবে sign in হয়েছে");
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
    if (error) {
      clearQueuedToast();
      toast.error(error.message || "Sign in করা যায়নি। তথ্যগুলো যাচাই করুন।");
    } else {
      clearQueuedToast();
      toast.success("সফলভাবে sign in হয়েছে");
    }
  };

  return (
    <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-4 py-8 sm:px-6">
      {/* Heading */}
      <div className="mb-8 max-w-md text-center">
        <h1 className="font-bold text-2xl pb-2">সাইন ইন</h1>

        <p className="text-sm">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Signup Form */}
      <Form
        className="flex w-full max-w-md flex-col gap-4 rounded-2xl border p-4 shadow-sm sm:p-6"
        onSubmit={onSubmit}
      >
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
        <Link href={`/sign-up`}>
          <p className="text-center pt-3 text-xs">
            অ্যাকাউন্ট আছে?
            <span className="text-green-700">সাইন ইন করুন</span>
          </p>
        </Link>
      </Form>
      <Link href={`/`}>
        <button className="mt-12 text-sm cursor-pointer">
          ← হোম পেজে ফিরে যান
        </button>
      </Link>
    </main>
  );
};

export default SignIn;
