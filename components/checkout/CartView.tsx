"use client";

import Image from "next/image";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { formatCurrency, getGrandTotal, getSubtotal } from "@/lib/utils";

export function CartView() {
  const { cartData, updateQuantity, setStep } = useCheckoutStore();
  const subtotal = getSubtotal(cartData.cartItems);
  const grandTotal = getGrandTotal(cartData);

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold text-zinc-900">Cart / Order Summary</h2>

      <div className="space-y-4">
        {cartData.cartItems.map((item) => (
          <article
            key={item.product_id}
            className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center"
          >
            <Image
              src={item.image}
              alt={item.product_name}
              width={80}
              height={80}
              className="h-20 w-20 rounded-lg border border-zinc-200 object-cover"
              unoptimized
            />

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium text-zinc-900 sm:text-base">{item.product_name}</h3>
              <p className="mt-1 text-sm text-zinc-600">Price: {formatCurrency(item.product_price)}</p>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor={`qty-${item.product_id}`} className="text-sm text-zinc-600">
                Qty
              </label>
              <input
                id={`qty-${item.product_id}`}
                type="number"
                min={1}
                value={item.quantity}
                onChange={(event) => {
                  const nextQuantity = Number(event.target.value);
                  updateQuantity(item.product_id, Number.isFinite(nextQuantity) ? nextQuantity : 1);
                }}
                className="w-16 rounded-md border border-zinc-300 px-2 py-1 text-sm"
              />
            </div>

            <p className="min-w-24 text-right text-sm font-semibold text-zinc-900 sm:text-base">
              {formatCurrency(item.product_price * item.quantity)}
            </p>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm">
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
          <span>Grand Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setStep("shipping")}
        className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
      >
        Proceed to Checkout
      </button>
    </section>
  );
}
