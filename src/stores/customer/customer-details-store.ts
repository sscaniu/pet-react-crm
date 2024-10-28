import { CustomerInformationResponse } from '@/schemas/customer/customer-information-schema'
import { PetFlagType } from '@/schemas/customers-and-pets/flags-schema'
import { PetResponse, PetsListResponse } from '@/schemas/pet/pets-list-schema'
import { KeyedMutator } from 'swr'
import { createStore } from 'zustand/vanilla'
import { PetSizeListResponse } from '@/schemas/pet/pet-size-schema'

export type CustomerDetailsState = {
   customerInformationData?: CustomerInformationResponse
   petInformationData?: PetResponse
   selectedReceiptId?: string
   petFlags: PetFlagType[]
   fetchingFlags?: boolean
   refetchCustomerInformation?: KeyedMutator<CustomerInformationResponse>
   refetchPetInformation?: KeyedMutator<PetResponse>
   refetchPetsList?: KeyedMutator<PetsListResponse>
   refetchPetSizeList?: KeyedMutator<PetSizeListResponse>
}

export type CustomerDetailsActions = {
   setSelectedReceiptId: (state: CustomerDetailsState['selectedReceiptId']) => void
   setPetFlags: (state: CustomerDetailsState['petFlags']) => void
   setFetchingFlags: (state: CustomerDetailsState['fetchingFlags']) => void
   setCustomerInformationData: (state: CustomerDetailsState['customerInformationData']) => void
   setRefetchCustomerInformation: (
      state: CustomerDetailsState['refetchCustomerInformation'],
   ) => void
   setPetInformationData: (state: CustomerDetailsState['petInformationData']) => void
   setRefetchPetInformation: (state: CustomerDetailsState['refetchPetInformation']) => void
   setRefetchPetsList: (state: CustomerDetailsState['refetchPetsList']) => void
   setRefetchPetSizeList: (state: CustomerDetailsState['refetchPetSizeList']) => void
}

export type CustomerDetailsStore = CustomerDetailsState & CustomerDetailsActions

export const initCustomerDetailsStore = (): CustomerDetailsState => {
   return { petFlags: [] }
}

export const defaultInitState: CustomerDetailsState = { petFlags: [] }

export const createCustomerDetailsStore = (initState: CustomerDetailsState = defaultInitState) => {
   return createStore<CustomerDetailsStore>()((set) => ({
      ...initState,
      setSelectedReceiptId: (id) => set(() => ({ selectedReceiptId: id })),
      setCustomerInformationData: (data) => set(() => ({ customerInformationData: data })),
      setFetchingFlags: (fetchingFlags) => set(() => ({ fetchingFlags })),
      setRefetchCustomerInformation: (refetch) =>
         set(() => ({ refetchCustomerInformation: refetch })),
      setPetInformationData: (data) => set(() => ({ petInformationData: data })),
      setRefetchPetInformation: (refetch) => set(() => ({ refetchPetInformation: refetch })),
      setRefetchPetsList: (refetch) => set(() => ({ refetchPetsList: refetch })),
      setRefetchPetSizeList: (refetch) => set(() => ({ refetchPetSizeList: refetch })),
      setPetFlags: (flags) => set(() => ({ petFlags: flags })),
   }))
}

//TODO: To migrate the functions into object for better serialization
// refetchFunctions: {
//    customerInformation?: KeyedMutator<CustomerInformationResponse>
//    petInformation?: KeyedMutator<PetResponse>
//    petsList?: KeyedMutator<PetsListResponse>
//  }

//  setRefetchFunction: <T extends keyof CustomerDetailsState['refetchFunctions']>(
//    key: T,
//    refetchFn: CustomerDetailsState['refetchFunctions'][T]
//  ) => vo

//  setRefetchFunction: (key, refetchFn) =>
//    set((state) => ({
//      refetchFunctions: { ...state.refetchFunctions, [key]: refetchFn }
//    })),

// setRefetchFunction('customerInformation', mutate)
