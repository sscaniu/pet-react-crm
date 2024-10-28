'use client'

import {
   createStaffRotaTableStore,
   initStaffRotaTableStore,
   StaffRotaTableStore,
} from '@/stores/staff/staff-rota-table-store'
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

export type StaffRotaTableStoreApi = ReturnType<typeof createStaffRotaTableStore>

export const StaffRotaTableStoreContext = createContext<StaffRotaTableStoreApi | undefined>(
   undefined,
)

export interface StaffRotaTableStoreProviderProps {
   children: ReactNode
}

export const StaffRotaTableStoreProvider = ({ children }: StaffRotaTableStoreProviderProps) => {
   const storeRef = useRef<StaffRotaTableStoreApi>()

   if (!storeRef.current) {
      storeRef.current = createStaffRotaTableStore(initStaffRotaTableStore())
   }

   return (
      <StaffRotaTableStoreContext.Provider value={storeRef.current}>
         {children}
      </StaffRotaTableStoreContext.Provider>
   )
}

export const useStaffRotaTableStore = <T,>(selector: (store: StaffRotaTableStore) => T): T => {
   const staffTableStoreContext = useContext(StaffRotaTableStoreContext)

   if (!staffTableStoreContext) {
      throw new Error(`useStaffRotaTableStore must be used within StaffRotaTableStoreProvider`)
   }

   return useStore(staffTableStoreContext, selector)
}
