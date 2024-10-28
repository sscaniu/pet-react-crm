import { createStore } from 'zustand/vanilla'

export enum CalendarDrawerViewEnum {
   DETAILS = 'details',
   ADD_EVENT = 'add-event',
   ADD_HOLIDAY = 'add-holiday',
   VIEW_EVENT = 'view-event',
   VIEW_HOLIDAY = 'view-holiday',
}

export type AppointmentDrawerState = {
   openDrawer: boolean
   openMessageBox: boolean
   drawerView: CalendarDrawerViewEnum | null
}

export type AppointmentDrawerActions = {
   setOpenDrawer: (state: AppointmentDrawerState['openDrawer']) => void
   setDrawerView: (state: AppointmentDrawerState['drawerView']) => void
   setOpenMessageBox: (state: AppointmentDrawerState['openMessageBox']) => void
}

export type AppointmentDrawerStore = AppointmentDrawerState & AppointmentDrawerActions

export const initAppointmentDrawerStore = (): AppointmentDrawerState => {
   return { openDrawer: false, openMessageBox: false, drawerView: null }
}

export const defaultInitState: AppointmentDrawerState = {
   openDrawer: false,
   openMessageBox: false,
   drawerView: null,
}

export const createAppointmentDrawerStore = (
   initState: AppointmentDrawerState = defaultInitState,
) => {
   return createStore<AppointmentDrawerStore>()((set) => ({
      ...initState,
      setOpenMessageBox: (openMessageBox) => set(() => ({ openMessageBox })),
      setOpenDrawer: (openDrawer) => set(() => ({ openDrawer })),
      setDrawerView: (view) => set(() => ({ drawerView: view })),
   }))
}
