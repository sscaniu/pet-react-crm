'use client'

import {
   createShopConfigStore,
   initShopConfigStore,
   ShopConfigStore,
} from '@/stores/global/shop-config-store'
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

export type ShopConfigStoreApi = ReturnType<typeof createShopConfigStore>

export const ShopConfigStoreContext = createContext<ShopConfigStoreApi | undefined>(undefined)

export interface ShopConfigStoreProviderProps {
   children: ReactNode
}

export const ShopConfigStoreProvider = ({ children }: ShopConfigStoreProviderProps) => {
   const storeRef = useRef<ShopConfigStoreApi>()

   if (!storeRef.current) {
      storeRef.current = createShopConfigStore(initShopConfigStore())
   }

   return (
      <ShopConfigStoreContext.Provider value={storeRef.current}>
         {children}
      </ShopConfigStoreContext.Provider>
   )
}

export const useShopConfigStore = <T,>(selector: (store: ShopConfigStore) => T): T => {
   const shopConfigStoreContext = useContext(ShopConfigStoreContext)

   if (!shopConfigStoreContext) {
      throw new Error(`useShopConfigStore must be used within ShopConfigStoreProvider`)
   }

   return useStore(shopConfigStoreContext, selector)
}
