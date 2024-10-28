import { createStore } from 'zustand/vanilla'

export type NavMenuDrawerState = {
   openDrawer: boolean
}

export type NavMenuDrawerActions = {
   setOpenDrawer: (state: NavMenuDrawerState['openDrawer']) => void
}

export type NavMenuDrawerStore = NavMenuDrawerState & NavMenuDrawerActions

export const initNavMenuDrawerStore = (): NavMenuDrawerState => {
   return { openDrawer: false }
}

export const defaultInitState: NavMenuDrawerState = {
   openDrawer: false,
}

export const createNavMenuDrawerStore = (initState: NavMenuDrawerState = defaultInitState) => {
   return createStore<NavMenuDrawerStore>()((set) => ({
      ...initState,
      setOpenDrawer: (openDrawer) => set(() => ({ openDrawer })),
   }))
}
