'use client'

import {
   createCustomerTableStore,
   initCustomerTableStore,
   CustomerTableStore,
} from '@/stores/customer/customer-table-store'
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

export type CustomerTableStoreApi = ReturnType<typeof createCustomerTableStore>

export const CustomerTableStoreContext = createContext<CustomerTableStoreApi | undefined>(undefined)

export interface CustomerTableStoreProviderProps {
   children: ReactNode
}

export const CustomerTableStoreProvider = ({ children }: CustomerTableStoreProviderProps) => {
   const storeRef = useRef<CustomerTableStoreApi>()

   if (!storeRef.current) {
      storeRef.current = createCustomerTableStore(initCustomerTableStore())
   }

   return (
      <CustomerTableStoreContext.Provider value={storeRef.current}>
         {children}
      </CustomerTableStoreContext.Provider>
   )
}

export const useCustomerTableStore = <T,>(selector: (store: CustomerTableStore) => T): T => {
   const customerTableStoreContext = useContext(CustomerTableStoreContext)

   if (!customerTableStoreContext) {
      throw new Error(`useCustomerTableStore must be used within CustomerTableStoreProvider`)
   }

   return useStore(customerTableStoreContext, selector)
}
