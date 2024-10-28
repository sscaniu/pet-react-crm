'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
   type NavMenuDrawerStore,
   createNavMenuDrawerStore,
   initNavMenuDrawerStore,
} from '@/stores/customer/nav-menu-drawer-store'

export type NavMenuDrawerStoreApi = ReturnType<typeof createNavMenuDrawerStore>

export const NavMenuDrawerStoreContext = createContext<NavMenuDrawerStoreApi | undefined>(undefined)

export interface NavMenuDrawerStoreProviderProps {
   children: ReactNode
}

export const NavMenuDrawerStoreProvider = ({ children }: NavMenuDrawerStoreProviderProps) => {
   const storeRef = useRef<NavMenuDrawerStoreApi>()

   if (!storeRef.current) {
      storeRef.current = createNavMenuDrawerStore(initNavMenuDrawerStore())
   }

   return (
      <NavMenuDrawerStoreContext.Provider value={storeRef.current}>
         {children}
      </NavMenuDrawerStoreContext.Provider>
   )
}

export const useNavMenuDrawerStore = <T,>(selector: (store: NavMenuDrawerStore) => T): T => {
   const navMenuDrawerStoreContext = useContext(NavMenuDrawerStoreContext)

   if (!navMenuDrawerStoreContext) {
      throw new Error(`useNavMenuDrawerStore must be used within NavMenuDrawerStoreProvider`)
   }

   return useStore(navMenuDrawerStoreContext, selector)
}
