"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_CART_DATA } from "@/lib/mockCart";
import type { CartData, CheckoutStep, ShippingAddress } from "@/types";

type CheckoutState = {
  cartData: CartData;
  initialCartData: CartData;
  shippingAddress: ShippingAddress | null;
  step: CheckoutStep;
  hasInitialized: boolean;
};

type CheckoutActions = {
  initializeCheckout: (initialCartData: CartData) => void;
  setStep: (step: CheckoutStep) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  saveShippingAddress: (address: ShippingAddress) => void;
  resetFlow: () => void;
};

type CheckoutStore = CheckoutState & CheckoutActions;

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      cartData: MOCK_CART_DATA,
      initialCartData: MOCK_CART_DATA,
      shippingAddress: null,
      step: "cart",
      hasInitialized: false,
      initializeCheckout: (initialCartData) =>
        set((state) => {
          if (state.hasInitialized) {
            return { initialCartData };
          }
          return {
            cartData: initialCartData,
            initialCartData,
            hasInitialized: true,
          };
        }),
      setStep: (step) => set({ step }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cartData: {
            ...state.cartData,
            cartItems: state.cartData.cartItems.map((item) =>
              item.product_id === productId
                ? { ...item, quantity: Math.max(1, quantity) }
                : item,
            ),
          },
        })),
      saveShippingAddress: (address) =>
        set({
          shippingAddress: address,
          step: "payment",
        }),
      resetFlow: () =>
        set((state) => ({
          shippingAddress: null,
          cartData: state.initialCartData,
          step: "cart",
        })),
    }),
    {
      name: "checkout-flow-store",
      partialize: (state) => ({
        cartData: state.cartData,
        initialCartData: state.initialCartData,
        shippingAddress: state.shippingAddress,
        step: state.step,
        hasInitialized: state.hasInitialized,
      }),
    },
  ),
);
