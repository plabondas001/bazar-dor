"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedName = name.trim();

    if (!updatedName) {
      setError("নাম খালি রাখা যাবে না।");
      setMessage("");
      return;
    }

    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      const { error: updateError } = await authClient.updateUser({ name: updatedName });
      if (updateError) {
        setError(updateError.message || "নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
      } else {
        setName(updatedName);
        setMessage("নাম সফলভাবে আপডেট হয়েছে।");
      }
    } catch {
      setError("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-10 text-[#202b24]">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-600">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

        {isPending ? (
          <p className="mt-8 text-sm text-gray-600">প্রোফাইল লোড হচ্ছে...</p>
        ) : !user ? (
          <p className="mt-8 rounded-xl border bg-white p-5">প্রোফাইল দেখতে আগে সাইন ইন করুন।</p>
        ) : (
          <>
            <section className="mt-6 flex items-center gap-4 rounded-2xl border border-[#dce5dd] bg-white/80 p-6">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gray-200">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="প্রোফাইল ছবি" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-gray-600">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-xl font-semibold">{user.name || name || "ব্যবহারকারী"}</h2>
                <p className="truncate text-gray-600">{user.email}</p>
              </div>
            </section>

            <section className="mt-6 rounded-2xl border border-[#dce5dd] bg-white/80 p-6 sm:p-8">
              <h2 className="font-semibold">তথ্য</h2>
              <form onSubmit={handleUpdate} className="mt-8 space-y-4 px-0 sm:px-4">
                <label htmlFor="profile-name" className="block text-sm font-medium">নাম</label>
                <input
                  id="profile-name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  className="w-full rounded-lg border border-[#dce5dd] bg-transparent px-3 py-3 outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
                />
                <button
                  type="submit"
                  disabled={isSaving || !name.trim() || name.trim() === user.name}
                  className="w-full rounded-lg bg-green-700 py-3 font-medium text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "আপডেট হচ্ছে..." : "আপডেট"}
                </button>
                {message && <p role="status" className="text-sm text-green-700">{message}</p>}
                {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              </form>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
