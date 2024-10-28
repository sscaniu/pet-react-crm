import {
   DetailsTabEnum,
   FormTabEnum,
   InternalNotesTabEnum,
   PetProfileTabEnum,
   PetViewEnum,
   ReceiptTabEnum,
   ReceiptViewEnum,
   SidebarActionEnum,
   SidebarNavEnum,
} from '@/constants/customers-tabs'
import { temporal, TemporalState } from 'zundo'
import { CreateCustomerArgs } from '@/schemas/customer/create-customer-schema'
import { createStore } from 'zustand/vanilla'
import { useStore } from 'zustand'

export type SidebarNavState = {
   createCustomerFields: CreateCustomerArgs | null
   mainNav: SidebarNavEnum | null
   customerDetailsNav: DetailsTabEnum
   internalNotesNav: InternalNotesTabEnum
   formNav: FormTabEnum
   petProfileNav: PetProfileTabEnum
   petView: PetViewEnum
   receiptView: ReceiptViewEnum
   receiptNav: ReceiptTabEnum
   action?: SidebarActionEnum
}

export type SidebarNavActions = {
   setMainNav: (state: SidebarNavState['mainNav'] | null) => void
   setAction: (state: SidebarNavState['action']) => void
   resetAction: () => void
   resetSidebarNavs: () => void
   setPetView: (state: SidebarNavState['petView']) => void
   setReceiptView: (state: SidebarNavState['receiptView']) => void
   setPetProfileNav: (state: SidebarNavState['petProfileNav']) => void
   setReceiptNav: (state: SidebarNavState['receiptNav']) => void
   setCustomerDetailsNav: (state: SidebarNavState['customerDetailsNav']) => void
   setInternalNotesNav: (state: SidebarNavState['internalNotesNav']) => void
   setFormNav: (state: SidebarNavState['formNav']) => void
   setCreateCustomerFields: (state: SidebarNavState['createCustomerFields']) => void
}

export type SidebarNavStore = SidebarNavState & SidebarNavActions

export const initSidebarNavStore = (): SidebarNavState => {
   return {
      action: undefined,
      mainNav: SidebarNavEnum.CUSTOMER,
      customerDetailsNav: DetailsTabEnum.INFORMATION,
      internalNotesNav: InternalNotesTabEnum.APPOINTMENT,
      petView: PetViewEnum.LIST,
      petProfileNav: PetProfileTabEnum.INFORMATION,
      formNav: FormTabEnum.CHECK_IN,
      receiptView: ReceiptViewEnum.LIST,
      receiptNav: ReceiptTabEnum.PAID,
      createCustomerFields: null,
   }
}

export const defaultInitState: SidebarNavState = {
   action: undefined,
   mainNav: SidebarNavEnum.CUSTOMER,
   createCustomerFields: null,
   customerDetailsNav: DetailsTabEnum.INFORMATION,
   internalNotesNav: InternalNotesTabEnum.APPOINTMENT,
   petView: PetViewEnum.LIST,
   formNav: FormTabEnum.CHECK_IN,
   petProfileNav: PetProfileTabEnum.INFORMATION,
   receiptView: ReceiptViewEnum.LIST,
   receiptNav: ReceiptTabEnum.PAID,
}

export const createSidebarNavStore = (initState: SidebarNavState = defaultInitState) => {
   return createStore<SidebarNavStore>()(
      temporal((set) => ({
         ...initState,
         setAction: (action) => set(() => ({ action })),
         setMainNav: (nav) =>
            set((oldState) => {
               return {
                  mainNav: nav,
                  petView: PetViewEnum.LIST,
                  petProfileNav: PetProfileTabEnum.INFORMATION,
                  createCustomerFields: oldState.createCustomerFields,
               }
            }),
         resetAction: () => set(() => ({ action: undefined })),
         resetSidebarNavs: () => set(() => ({ ...defaultInitState, previousNav: undefined })),
         setCustomerDetailsNav: (nav) => set(() => ({ customerDetailsNav: nav })),
         setInternalNotesNav: (nav) => set(() => ({ internalNotesNav: nav })),
         setPetView: (view) => set(() => ({ petView: view })),
         setReceiptView: (view) => set(() => ({ receiptView: view })),

         setPetProfileNav: (nav) => set(() => ({ petProfileNav: nav })),
         setReceiptNav: (nav) => set(() => ({ receiptNav: nav })),
         setFormNav: (nav) => set(() => ({ formNav: nav })),

         setCreateCustomerFields: (createCustomerFields) => set(() => ({ createCustomerFields })),
      })),
   )
}

export const sidebarNavStore = createSidebarNavStore(initSidebarNavStore())

export const useTemporalSidebarNavStore = <T>(
   selector: (state: TemporalState<SidebarNavState>) => T,
   equality?: (a: T, b: T) => boolean,
) => useStore(sidebarNavStore.temporal, selector, equality)
