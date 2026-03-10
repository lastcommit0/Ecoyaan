import type { CartData, CartItem } from "@/types";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getSubtotal(cartItems: CartItem[]) {
  return cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
}

export function getGrandTotal(data: CartData) {
  return getSubtotal(data.cartItems) + data.shipping_fee - data.discount_applied;
}
