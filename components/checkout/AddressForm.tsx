"use client";

import { useMemo, useState } from "react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import type { ShippingAddress } from "@/types";

type AddressErrors = Partial<Record<keyof ShippingAddress, string>>;

const defaultForm: ShippingAddress = {
  fullName: "",
  email: "",
  phoneNumber: "",
  pinCode: "",
  city: "",
  state: "",
};

export function AddressForm() {
  const { saveShippingAddress, setStep, shippingAddress } = useCheckoutStore();
  const [form, setForm] = useState<ShippingAddress>(shippingAddress ?? defaultForm);
  const [errors, setErrors] = useState<AddressErrors>({});

  const isFormReady = useMemo(() => {
    return Object.values(form).every((value) => value.trim().length > 0);
  }, [form]);

  const validate = () => {
    const nextErrors: AddressErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (!/^\d{10}$/.test(form.phoneNumber)) nextErrors.phoneNumber = "Phone must be 10 digits";
    if (!/^\d{6}$/.test(form.pinCode)) nextErrors.pinCode = "PIN Code must be 6 digits";
    if (!form.city.trim()) nextErrors.city = "City is required";
    if (!form.state.trim()) nextErrors.state = "State is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-zinc-900">Shipping Address</h2>
        <button
          type="button"
          onClick={() => setStep("cart")}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
        >
          Back to Cart
        </button>
      </div>

      <form
        className="grid grid-cols-1 gap-4 rounded-xl border border-zinc-200 bg-white p-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (!validate()) return;
          saveShippingAddress(form);
        }}
      >
        <InputField
          label="Full Name"
          value={form.fullName}
          error={errors.fullName}
          onChange={(value) => setForm((prev) => ({ ...prev, fullName: value }))}
        />
        <InputField
          label="Email"
          type="email"
          value={form.email}
          error={errors.email}
          onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
        />
        <InputField
          label="Phone Number"
          value={form.phoneNumber}
          error={errors.phoneNumber}
          onChange={(value) => setForm((prev) => ({ ...prev, phoneNumber: value.replace(/\D/g, "") }))}
        />
        <InputField
          label="PIN Code"
          value={form.pinCode}
          error={errors.pinCode}
          onChange={(value) => setForm((prev) => ({ ...prev, pinCode: value.replace(/\D/g, "") }))}
        />
        <InputField
          label="City"
          value={form.city}
          error={errors.city}
          onChange={(value) => setForm((prev) => ({ ...prev, city: value }))}
        />
        <InputField
          label="State"
          value={form.state}
          error={errors.state}
          onChange={(value) => setForm((prev) => ({ ...prev, state: value }))}
        />

        <button
          type="submit"
          disabled={!isFormReady}
          className="sm:col-span-2 w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          Continue to Payment
        </button>
      </form>
    </section>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
};

function InputField({ label, value, onChange, error, type = "text" }: InputFieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition ${
          error
            ? "border-red-500 focus:border-red-600"
            : "border-zinc-300 focus:border-emerald-700"
        }`}
      />
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </label>
  );
}
