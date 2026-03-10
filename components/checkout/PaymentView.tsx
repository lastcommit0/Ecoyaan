"use client";

import { useState } from "react";
import { formatCurrency, getGrandTotal, getSubtotal } from "@/lib/utils";
import { useCheckoutStore } from "@/store/useCheckoutStore";

export function PaymentView() {
  const { cartData, shippingAddress, setStep } = useCheckoutStore();
  const [processing, setProcessing] = useState(false);

  if (!shippingAddress) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900">Payment Method / Confirmation</h2>
        <p className="text-sm text-zinc-600">Please complete shipping details first.</p>
        <button
          type="button"
          onClick={() => setStep("shipping")}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100"
        >
          Go to Shipping
        </button>
      </section>
    );
  }

  const subtotal = getSubtotal(cartData.cartItems);
  const total = getGrandTotal(cartData);

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-zinc-900">Payment Method / Confirmation</h2>
        <button
          type="button"
          onClick={() => setStep("shipping")}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
        >
          Edit Address
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-zinc-200 bg-white p-4">
          <h3 className="mb-3 text-base font-semibold text-zinc-900">Shipping Address</h3>
          <p className="text-sm text-zinc-700">{shippingAddress.fullName}</p>
          <p className="text-sm text-zinc-600">{shippingAddress.email}</p>
          <p className="text-sm text-zinc-600">{shippingAddress.phoneNumber}</p>
          <p className="mt-2 text-sm text-zinc-600">
            {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
          </p>
        </article>

        <article className="rounded-xl border border-zinc-200 bg-white p-4 text-sm">
          <h3 className="mb-3 text-base font-semibold text-zinc-900">Final Order Summary</h3>
          <div className="flex items-center justify-between py-1">
            <span className="text-zinc-600">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-zinc-600">Shipping Fee</span>
            <span>{formatCurrency(cartData.shipping_fee)}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-zinc-600">Discount</span>
            <span>-{formatCurrency(cartData.discount_applied)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-zinc-200 pt-3 text-base font-semibold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </article>
      </div>

      <button
        type="button"
        disabled={processing}
        onClick={() => {
          setProcessing(true);
          setTimeout(() => {
            setProcessing(false);
            setStep("success");
          }, 1200);
        }}
        className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        {processing ? "Processing Payment..." : `Pay Securely ${formatCurrency(total)}`}
      </button>
    </section>
  );
}
