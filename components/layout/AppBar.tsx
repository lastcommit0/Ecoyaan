import Link from "next/link";
import type { ReactNode } from "react";
import { MdOutlineShoppingCart  } from "react-icons/md";

type AppBarProps = {
  cartCount: number;
};

export function AppBar({ cartCount }: AppBarProps) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center gap-3 px-4 py-3 lg:flex-nowrap lg:gap-6">
        <Link href="/" className="flex min-w-[240px] items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
            <img src="https://prod-cdn.ecoyaan.com/pb-cs-app/images/about-us/EcoyaanLogo.png" alt="" width={150} height={150} />
          </div>
          <div>
            <p className="text-xl leading-none font-bold tracking-[0.02em] text-emerald-700 md:text-3xl">
              Ecoyaan
            </p>
            <p className="mt-1 text-sm leading-none font-medium text-emerald-700 md:text-md">
              Sustainability made easy
            </p>
          </div>
        </Link>

        <div
          className="flex min-w-[210px] items-start gap-2 rounded-md px-2 py-1 text-left hover:bg-zinc-50"
        >
          <MapPinIcon className="mt-1 size-8 text-emerald-700" />
          <span className="block text-sm mt-2 text-zinc-300">fetching location...</span>
        </div>

        <div className="min-w-[260px] flex-1">
          <label className="flex h-[52px] items-center gap-3 rounded-2xl border border-emerald-300 px-4">
            <SearchIcon className="h-5 w-5 text-emerald-700" />
            <input
              type="search"
              placeholder="Search for 'Natural Sanitery Pads Scane'"
              className="w-full bg-transparent text-lg text-zinc-800 outline-none placeholder:text-zinc-400"
            />
          </label>
        </div>

        <nav className="ml-auto flex items-center gap-3">
          <IconButton label="Profile">
            <UserIcon className="h-5 w-5 text-emerald-700" />
          </IconButton>
          <button
            type="button"
            aria-label="Wishlist"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-100"
          >
            <HeartIcon className="h-7 w-7 text-emerald-700" />
          </button>
          <button
            type="button"
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-100"
          >
            <MdOutlineShoppingCart  className="h-7 w-7 text-emerald-700"/>

            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-700 px-1 text-xs font-semibold text-white">
              {cartCount}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}

function IconButton({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-700 hover:bg-emerald-50"
    >
      {children}
    </button>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a8 8 0 0 0-8 8c0 5.7 6.4 11.2 7.1 11.8a1.4 1.4 0 0 0 1.8 0C13.6 21.2 20 15.7 20 10a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM4 19.3C4 16.4 7.1 14 12 14s8 2.4 8 5.3c0 .4-.3.7-.7.7H4.7a.7.7 0 0 1-.7-.7Z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20s-7-4.6-9.2-8.2A5.6 5.6 0 0 1 12 5a5.6 5.6 0 0 1 9.2 6.8C19 15.4 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 4h2l1.4 8h10.9l2-6H7.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="19" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}
