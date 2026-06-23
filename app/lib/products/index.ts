import { ProductDetail } from "../types";

export const productMap = {
  "1010120010": () => import("./1010120010"),
  "1010120011": () => import("./1010120011"),
  "1010120012": () => import("./1010120012"),
  "1010120013": () => import("./1010120013"),
} satisfies Record<string, () => Promise<{ default: ProductDetail }>>;

export type ProductId = keyof typeof productMap;
