"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import type { CartData, CheckoutStep, ShippingAddress } from "@/types";

type CheckoutStore = {
  cartData: CartData;
  shippingAddress: ShippingAddress | null;
  step: CheckoutStep;
  setStep: (step: CheckoutStep) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  saveShippingAddress: (address: ShippingAddress) => void;
  resetFlow: () => void;
};

const CheckoutContext = createContext<CheckoutStore | null>(null);

type CheckoutProviderProps = {
  children: ReactNode;
  initialCartData: CartData;
};

export function CheckoutProvider({ children, initialCartData }: CheckoutProviderProps) {
  const [cartData, setCartData] = useState<CartData>(initialCartData);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [step, setStep] = useState<CheckoutStep>("cart");

  const value = useMemo<CheckoutStore>(() => {
    return {
      cartData,
      shippingAddress,
      step,
      setStep,
      updateQuantity: (productId: number, quantity: number) => {
        setCartData((prev) => ({
          ...prev,
          cartItems: prev.cartItems.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        }));
      },
      saveShippingAddress: (address: ShippingAddress) => {
        setShippingAddress(address);
        setStep("payment");
      },
      resetFlow: () => {
        setShippingAddress(null);
        setCartData(initialCartData);
        setStep("cart");
      },
    };
  }, [cartData, initialCartData, shippingAddress, step]);

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckoutStore() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckoutStore must be used inside CheckoutProvider");
  }
  return context;
}
