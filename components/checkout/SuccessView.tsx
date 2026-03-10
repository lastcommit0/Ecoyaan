"use client";

import Link from "next/link";
import { useCheckoutStore } from "@/store/useCheckoutStore";

export function SuccessView() {
  const { resetFlow } = useCheckoutStore();

  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
      <h2 className="text-2xl font-semibold text-emerald-900">Order Successful!</h2>
      <p className="mt-2 text-sm text-emerald-800">
        Your payment is complete and your eco-friendly order is confirmed.
      </p>

      <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={resetFlow}
          className="rounded-md border border-emerald-700 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
        >
          Start New Checkout
        </button>
        <Link
          href="/"
          className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
