import Image from "next/image";
import Link from "next/link";

export function AppHeader() {
  return (
    <Link
      className="relative inline-flex w-fit items-center gap-3 text-lg font-bold tracking-[-0.02em] text-ink no-underline hover:text-brand-500"
      href="/login"
      aria-label="Money Tracking - Trang đăng nhập"
    >
      <span className="block size-12 shrink-0 overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(249,115,22,0.2)]">
        <Image
          src="/images/moneytracking-brand-icon.png"
          alt=""
          width={46}
          height={46}
          priority
        />
      </span>
      <span>Money Tracking</span>
    </Link>
  );
}
