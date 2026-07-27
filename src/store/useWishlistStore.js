import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (item) => {
        const { favorites } = get();
        const exists = favorites.some((f) => f.id === item.id);
        if (exists) {
          set({ favorites: favorites.filter((f) => f.id !== item.id) });
        } else {
          set({ favorites: [...favorites, item] });
        }
      },
      isFavorite: (id) => get().favorites.some((f) => f.id === id),
    }),
    { name: 'superapp-wishlist' }
  )
);