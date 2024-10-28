'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
   type AppointmentPanelStore,
   createAppointmentPanelStore,
   initAppointmentPanelStore,
} from '@/stores/appointment/appointment-panel-store'

export type AppointmentPanelStoreApi = ReturnType<typeof createAppointmentPanelStore>

export const AppointmentPanelStoreContext = createContext<AppointmentPanelStoreApi | undefined>(
   undefined,
)

export interface AppointmentPanelStoreProviderProps {
   children: ReactNode
}

export const AppointmentPanelStoreProvider = ({ children }: AppointmentPanelStoreProviderProps) => {
   const storeRef = useRef<AppointmentPanelStoreApi>()

   if (!storeRef.current) {
      storeRef.current = createAppointmentPanelStore(initAppointmentPanelStore())
   }

   return (
      <AppointmentPanelStoreContext.Provider value={storeRef.current}>
         {children}
      </AppointmentPanelStoreContext.Provider>
   )
}

export const useAppointmentPanelStore = <T,>(selector: (store: AppointmentPanelStore) => T): T => {
   const appointmentPanelStoreContext = useContext(AppointmentPanelStoreContext)

   if (!appointmentPanelStoreContext) {
      throw new Error(`useAppointmentPanelStore must be used within AppointmentPanelStoreProvider`)
   }

   return useStore(appointmentPanelStoreContext, selector)
}
