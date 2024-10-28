'use client'

import {
   createStaffTableStore,
   initStaffTableStore,
   StaffTableStore,
} from '@/stores/staff/staff-table-store'
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

export type StaffTableStoreApi = ReturnType<typeof createStaffTableStore>

export const StaffTableStoreContext = createContext<StaffTableStoreApi | undefined>(undefined)

export interface StaffTableStoreProviderProps {
   children: ReactNode
}

export const StaffTableStoreProvider = ({ children }: StaffTableStoreProviderProps) => {
   const storeRef = useRef<StaffTableStoreApi>()

   if (!storeRef.current) {
      storeRef.current = createStaffTableStore(initStaffTableStore())
   }

   return (
      <StaffTableStoreContext.Provider value={storeRef.current}>
         {children}
      </StaffTableStoreContext.Provider>
   )
}

export const useStaffTableStore = <T,>(selector: (store: StaffTableStore) => T): T => {
   const staffTableStoreContext = useContext(StaffTableStoreContext)

   if (!staffTableStoreContext) {
      throw new Error(`useStaffTableStore must be used within StaffTableStoreProvider`)
   }

   return useStore(staffTableStoreContext, selector)
}
