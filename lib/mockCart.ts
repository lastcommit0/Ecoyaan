import type { CartData } from "@/types";

export const MOCK_CART_DATA: CartData = {
  cartItems: [
    {
      product_id: 101,
      product_name: "Bamboo Toothbrush (Pack of 4)",
      product_price: 299,
      quantity: 2,
      image: "https://prod-cdn.ecoyaan.com/cdn/seller-docs/15/product/16/images/pi/16-1732852027.jpg",
    },
    {
      product_id: 102,
      product_name: "Reusable Cotton Produce Bags",
      product_price: 450,
      quantity: 1,
      image: "https://prod-cdn.ecoyaan.com/cdn/seller-docs/35/product/1298/images/pi/1298-4e65b9a7-1743573249.jpg",
    },
  ],
  shipping_fee: 50,
  discount_applied: 0,
};

export async function getCartDataSSR(): Promise<CartData> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return MOCK_CART_DATA;
}
