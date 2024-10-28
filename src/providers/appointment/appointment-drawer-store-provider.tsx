'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
   type AppointmentDrawerStore,
   createAppointmentDrawerStore,
   initAppointmentDrawerStore,
} from '@/stores/appointment/appointment-drawer-store'

export type AppointmentDrawerStoreApi = ReturnType<typeof createAppointmentDrawerStore>

export const AppointmentDrawerStoreContext = createContext<AppointmentDrawerStoreApi | undefined>(
   undefined,
)

export interface AppointmentDrawerStoreProviderProps {
   children: ReactNode
}

export const AppointmentDrawerStoreProvider = ({
   children,
}: AppointmentDrawerStoreProviderProps) => {
   const storeRef = useRef<AppointmentDrawerStoreApi>()

   if (!storeRef.current) {
      storeRef.current = createAppointmentDrawerStore(initAppointmentDrawerStore())
   }

   return (
      <AppointmentDrawerStoreContext.Provider value={storeRef.current}>
         {children}
      </AppointmentDrawerStoreContext.Provider>
   )
}

export const useAppointmentDrawerStore = <T,>(
   selector: (store: AppointmentDrawerStore) => T,
): T => {
   const appointmentDrawerStoreContext = useContext(AppointmentDrawerStoreContext)

   if (!appointmentDrawerStoreContext) {
      throw new Error(
         `useAppointmentDrawerStore must be used within AppointmentDrawerStoreProvider`,
      )
   }

   return useStore(appointmentDrawerStoreContext, selector)
}
