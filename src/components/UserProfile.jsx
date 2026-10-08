"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const UserProfile = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="shrink-0">
      {user ? (
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            {/* Profile Image / First Letter */}
           <Link href={`/profile`} className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="h-9 w-9 rounded-full overflow-hidden shrink-0 sm:h-[50px] sm:w-[50px]">
              {user?.image ? (
                <Image
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                  src={user.image}
                  alt="user-img"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>

            {/* Full Name */}
            <div className="hidden min-w-0 sm:block">
              <p className="max-w-36 truncate font-semibold">{user?.name || "User"}</p>
            </div>
           </Link>
          </div>
          <button
            onClick={handleSignOut}
            className="cursor-pointer whitespace-nowrap rounded-md bg-green-700 px-2 py-2 text-xs text-white sm:px-3 sm:text-sm"
          >
            সাইন আউট
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href={`/sign-in`}>
            <button className="cursor-pointer whitespace-nowrap rounded-md border px-3 py-2 text-xs sm:px-5 sm:text-sm">
              সাইন ইন
            </button>
          </Link>
          <Link href={`/sign-up`}>
            <button className="cursor-pointer whitespace-nowrap rounded-md bg-green-700 px-3 py-2 text-xs text-white sm:px-5 sm:text-sm">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
