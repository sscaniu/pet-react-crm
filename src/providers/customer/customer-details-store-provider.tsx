'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
   type CustomerDetailsStore,
   createCustomerDetailsStore,
   initCustomerDetailsStore,
} from '@/stores/customer/customer-details-store'

export type CustomerDetailsStoreApi = ReturnType<typeof createCustomerDetailsStore>

export const CustomerDetailsStoreContext = createContext<CustomerDetailsStoreApi | undefined>(
   undefined,
)

export interface CustomerDetailsStoreProviderProps {
   children: ReactNode
}

export const CustomerDetailsStoreProvider = ({ children }: CustomerDetailsStoreProviderProps) => {
   const storeRef = useRef<CustomerDetailsStoreApi>()

   if (!storeRef.current) {
      storeRef.current = createCustomerDetailsStore(initCustomerDetailsStore())
   }

   return (
      <CustomerDetailsStoreContext.Provider value={storeRef.current}>
         {children}
      </CustomerDetailsStoreContext.Provider>
   )
}

export const useCustomerDetailsStore = <T,>(selector: (store: CustomerDetailsStore) => T): T => {
   const customerDetailsStoreContext = useContext(CustomerDetailsStoreContext)

   if (!customerDetailsStoreContext) {
      throw new Error(`useCustomerDetailsStore must be used within CustomerDetailsStoreProvider`)
   }

   return useStore(customerDetailsStoreContext, selector)
}
