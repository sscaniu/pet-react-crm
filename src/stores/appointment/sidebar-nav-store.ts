import { SidebarNavEnum } from '@/constants/appointment-tabs'
import { InternalNotesTabEnum } from '@/constants/customers-tabs'
import { temporal, TemporalState } from 'zundo'
import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'

export type SidebarNavState = {
   mainNav: SidebarNavEnum | null
   internalNotesNav: InternalNotesTabEnum
}

export type SidebarNavActions = {
   setMainNav: (state: SidebarNavState['mainNav'] | null) => void
   setInternalNotesNav: (state: SidebarNavState['internalNotesNav']) => void
   resetSidebarNavs: () => void
}

export type SidebarNavStore = SidebarNavState & SidebarNavActions

export const initSidebarNavStore = (): SidebarNavState => {
   return {
      mainNav: SidebarNavEnum.SERVICE,
      internalNotesNav: InternalNotesTabEnum.APPOINTMENT,
   }
}

export const defaultInitState: SidebarNavState = {
   mainNav: SidebarNavEnum.SERVICE,
   internalNotesNav: InternalNotesTabEnum.APPOINTMENT,
}

export const createSidebarNavStore = (initState: SidebarNavState = defaultInitState) => {
   return createStore<SidebarNavStore>()(
      temporal((set) => ({
         ...initState,

         setMainNav: (nav) =>
            set(() => ({
               mainNav: nav,
            })),
         setInternalNotesNav: (nav) => set(() => ({ internalNotesNav: nav })),
         resetSidebarNavs: () => set(() => ({ ...defaultInitState, previousNav: undefined })),
      })),
   )
}

export const sidebarNavStore = createSidebarNavStore(initSidebarNavStore())

export const useTemporalSidebarNavStore = <T>(
   selector: (state: TemporalState<SidebarNavState>) => T,
   equality?: (a: T, b: T) => boolean,
) => useStore(sidebarNavStore.temporal, selector, equality)
