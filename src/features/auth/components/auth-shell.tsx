import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
};

function Brand() {
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

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="min-h-dvh bg-brand-50 px-5 py-5 text-ink sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100dvh-40px)] w-full max-w-[560px] flex-col">
        <header className="shrink-0">
          <Brand />
        </header>

        <div className="flex flex-1 items-center py-5 sm:py-6">
          <div className="w-full rounded-2xl border border-line bg-white/82 px-5 py-6 shadow-[0_20px_56px_rgba(249,115,22,0.12)] backdrop-blur sm:px-7 sm:py-7">
            {children}
          </div>
        </div>

        <p className="m-0 shrink-0 text-center text-xs text-muted">
          © 2026 Money Tracking
        </p>
      </section>
    </main>
  );
}
