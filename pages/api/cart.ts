import type { NextApiRequest, NextApiResponse } from "next";
import { MOCK_CART_DATA } from "@/lib/mockCart";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(MOCK_CART_DATA);
}
