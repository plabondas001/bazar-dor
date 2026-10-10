"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/lib/toast";

const ProductAccessLink = ({ product, className, children }) => {
  const { data: session, isPending } = authClient.useSession();
  const productPath = `/product/${encodeURIComponent(product.id ?? product.slug)}`;
  const href = isPending ? "#" : session?.user ? productPath : "/sign-in";

  return (
    <Link
      href={href}
      aria-disabled={isPending}
      onClick={(event) => {
        if (isPending) event.preventDefault();
        else if (!session?.user) toast.error("পণ্যের বিস্তারিত দেখতে আগে sign in করুন");
      }}
      className={className}
    >
      {children}
    </Link>
  );
};

export default ProductAccessLink;
