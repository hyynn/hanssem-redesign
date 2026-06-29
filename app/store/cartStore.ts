import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../lib/types";

// productId + optionLabel 조합으로 고유 식별
function itemKey(productId: string, optionLabel?: string) {
  return optionLabel ? `${productId}__${optionLabel}` : productId;
}

interface CartStore {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  remove: (productId: string, optionLabel?: string) => void;
  updateQuantity: (productId: string, quantity: number, optionLabel?: string) => void;
  clear: () => void;
  totalCount: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      add: (newItem, quantity = 1) =>
        set((state) => {
          const key = itemKey(newItem.productId, newItem.optionLabel);
          const existing = state.items.find(
            (i) => itemKey(i.productId, i.optionLabel) === key
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i.productId, i.optionLabel) === key
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...newItem, quantity }] };
        }),

      remove: (productId, optionLabel) =>
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.productId, i.optionLabel) !== itemKey(productId, optionLabel)
          ),
        })),

      updateQuantity: (productId, quantity, optionLabel) =>
        set((state) => {
          const key = itemKey(productId, optionLabel);
          return {
            items:
              quantity <= 0
                ? state.items.filter((i) => itemKey(i.productId, i.optionLabel) !== key)
                : state.items.map((i) =>
                    itemKey(i.productId, i.optionLabel) === key ? { ...i, quantity } : i
                  ),
          };
        }),

      clear: () => set({ items: [] }),

      totalCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "hanssem-cart",
      version: 1,
      // originalPrice 필드 추가 전 저장된 아이템 보정
      migrate: (persisted: unknown) => persisted,
    }
  )
);
