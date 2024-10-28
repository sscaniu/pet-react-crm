import { createStore } from 'zustand/vanilla'

export type CustomerDrawerState = {
   openDrawer: boolean
}

export type CustomerDrawerActions = {
   setOpenDrawer: (state: CustomerDrawerState['openDrawer']) => void
}

export type CustomerDrawerStore = CustomerDrawerState & CustomerDrawerActions

export const initCustomerDrawerStore = (): CustomerDrawerState => {
   return { openDrawer: false }
}

export const defaultInitState: CustomerDrawerState = {
   openDrawer: false,
}

export const createCustomerDrawerStore = (initState: CustomerDrawerState = defaultInitState) => {
   return createStore<CustomerDrawerStore>()((set) => ({
      ...initState,
      setOpenDrawer: (openDrawer) => set(() => ({ openDrawer })),
   }))
}
