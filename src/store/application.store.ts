import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AuthStore, authStoreSlice } from "./auth-store/auth.store";

export type AppStore = AuthStore;
export const useApplicationStore = create<AppStore>()(
  persist(
    immer((...a) => ({
      ...authStoreSlice(...a),
    })),
    {
      partialize: ({ token, user }) => ({
        token,
        user,
      }),
      name: "application-store",
    }
  )
);
