'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
   type CustomerDrawerStore,
   createCustomerDrawerStore,
   initCustomerDrawerStore,
} from '@/stores/customer/customer-drawer-store'

export type CustomerDrawerStoreApi = ReturnType<typeof createCustomerDrawerStore>

export const CustomerDrawerStoreContext = createContext<CustomerDrawerStoreApi | undefined>(
   undefined,
)

export interface CustomerDrawerStoreProviderProps {
   children: ReactNode
}

export const CustomerDrawerStoreProvider = ({ children }: CustomerDrawerStoreProviderProps) => {
   const storeRef = useRef<CustomerDrawerStoreApi>()

   if (!storeRef.current) {
      storeRef.current = createCustomerDrawerStore(initCustomerDrawerStore())
   }

   return (
      <CustomerDrawerStoreContext.Provider value={storeRef.current}>
         {children}
      </CustomerDrawerStoreContext.Provider>
   )
}

export const useCustomerDrawerStore = <T,>(selector: (store: CustomerDrawerStore) => T): T => {
   const customerDrawerStoreContext = useContext(CustomerDrawerStoreContext)

   if (!customerDrawerStoreContext) {
      throw new Error(`useCustomerDrawerStore must be used within CustomerDrawerStoreProvider`)
   }

   return useStore(customerDrawerStoreContext, selector)
}
