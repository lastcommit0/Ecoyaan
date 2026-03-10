"use client";

import type { CheckoutStep } from "@/types";

type StepIndicatorProps = {
  step: CheckoutStep;
};

const steps: Array<{ id: Exclude<CheckoutStep, "success">; label: string }> = [
  { id: "cart", label: "Cart" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

export function StepIndicator({ step }: StepIndicatorProps) {
  const currentIndex = step === "success" ? 2 : steps.findIndex((item) => item.id === step);

  return (
    <div className="mb-8 flex items-center justify-between gap-3">
      {steps.map((item, index) => {
        const active = index <= currentIndex;
        return (
          <div key={item.id} className="flex flex-1 items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                active ? "bg-emerald-700 text-white" : "bg-zinc-200 text-zinc-600"
              }`}
            >
              {index + 1}
            </div>
            <p className={`text-sm ${active ? "text-zinc-900" : "text-zinc-500"}`}>{item.label}</p>
            {index < steps.length - 1 ? <div className="h-px flex-1 bg-zinc-200" /> : null}
          </div>
        );
      })}
    </div>
  );
}
