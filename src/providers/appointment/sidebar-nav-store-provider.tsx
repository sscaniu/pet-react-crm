'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
   type SidebarNavStore,
   createSidebarNavStore,
   sidebarNavStore,
} from '@/stores/appointment/sidebar-nav-store'

export type SidebarNavStoreApi = ReturnType<typeof createSidebarNavStore>

export const SidebarNavStoreContext = createContext<SidebarNavStoreApi | undefined>(undefined)

export interface SidebarNavStoreProviderProps {
   children: ReactNode
}

export const SidebarNavStoreProvider = ({ children }: SidebarNavStoreProviderProps) => {
   const storeRef = useRef<SidebarNavStoreApi>()

   if (!storeRef.current) {
      storeRef.current = sidebarNavStore
   }

   // storeRef.current.temporal.getState()

   return (
      <SidebarNavStoreContext.Provider value={storeRef.current}>
         {children}
      </SidebarNavStoreContext.Provider>
   )
}

export const useSidebarNavStore = <T,>(selector: (store: SidebarNavStore) => T): T => {
   const sidebarNavStoreContext = useContext(SidebarNavStoreContext)

   if (!sidebarNavStoreContext) {
      throw new Error(`useSidebarNavStore must be used within SidebarNavStoreProvider`)
   }

   return useStore(sidebarNavStoreContext, selector)
}
