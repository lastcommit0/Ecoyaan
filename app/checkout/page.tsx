import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";
import { getCartDataSSR } from "@/lib/mockCart";

export const metadata = {
  title: "Ecoyaan Checkout",
  description: "Multi-step checkout flow",
};

export default async function CheckoutPage() {
  const initialCartData = await getCartDataSSR();
  return <CheckoutFlow initialCartData={initialCartData} />;
}
