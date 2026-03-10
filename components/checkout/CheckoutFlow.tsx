"use client";

import type { CartData } from "@/types";
import { CheckoutProvider, useCheckoutStore } from "@/store/useCheckoutStore";
import { StepIndicator } from "@/components/checkout/StepIndicator";
import { CartView } from "@/components/checkout/CartView";
import { AddressForm } from "@/components/checkout/AddressForm";
import { PaymentView } from "@/components/checkout/PaymentView";
import { SuccessView } from "@/components/checkout/SuccessView";

type CheckoutFlowProps = {
  initialCartData: CartData;
};

export function CheckoutFlow({ initialCartData }: CheckoutFlowProps) {
  return (
    <CheckoutProvider initialCartData={initialCartData}>
      <FlowContent />
    </CheckoutProvider>
  );
}

function FlowContent() {
  const { step } = useCheckoutStore();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-8 text-center">
        <p className="text-xl leading-none font-bold tracking-[0.02em] text-emerald-700 md:text-3xl">
          Ecoyaan
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900 sm:text-4xl">Sustainability made easy</h1>
        <p className="mt-2 text-sm text-zinc-600">Clean, responsive and assignment-ready.</p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-6">
        <StepIndicator step={step} />
        {step === "cart" ? <CartView /> : null}
        {step === "shipping" ? <AddressForm /> : null}
        {step === "payment" ? <PaymentView /> : null}
        {step === "success" ? <SuccessView /> : null}
      </section>
    </main>
  );
}
