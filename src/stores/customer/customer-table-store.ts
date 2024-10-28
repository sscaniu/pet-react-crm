import { CustomerTableTabEnum } from '@/constants/customers-tabs'
import {
   CustomersAndPetsCountSummaryResponse,
   CustomersAndPetsResponse,
} from '@/schemas/customers-and-pets/customers-and-pets-schema'
import { BreedType } from '@/schemas/customers-and-pets/breed-schema'
import { PetType } from '@/schemas/pet/pet-types-schema'
import { MultiSelectOption } from '@itsallsavvy/savvy-resuable-components'
import { OnChangeFn, PaginationState } from '@tanstack/react-table'
import { KeyedMutator } from 'swr'
import { createStore } from 'zustand/vanilla'
import { CustomerFlagType } from '@/schemas/customers-and-pets/flags-schema'
import { PetResponse } from '@/schemas/pet/pets-list-schema'
import { PagedPetNoteResponse } from '@/schemas/pet/pet-note-schema'
import { PetSize } from '@/schemas/pet/pet-size-schema'

export type SelectedPetType = {
   id: string
   type: string
}

export type SelectedPetSize = {
   id: string
   type: string
}

export type CustomerState = {
   customerPetsCount: number
   selectedCustomerId?: string
   searchQuery: string
   tableTab: CustomerTableTabEnum
   pagination: PaginationState
   selectedBreed: string
   selectedPetTypes: SelectedPetType[]
   selectedPetSizes: SelectedPetSize[]
   selectedFlags: MultiSelectOption[]
   filters: string[]
   breeds: BreedType[]
   petTypes: PetType[]
   petSizes: PetSize[]
   flags: CustomerFlagType[]
   selectedPet?: PetResponse
   refetchCustomersAndPets?: KeyedMutator<CustomersAndPetsResponse>
   refetchCustomerAndPetsCountSummary?: KeyedMutator<CustomersAndPetsCountSummaryResponse>
}

export type CustomerTableActions = {
   setTableTab: (state: CustomerState['tableTab']) => void
   setCustomerPetsCount: (state: CustomerState['customerPetsCount']) => void
   setSelectedCustomerId: (state: CustomerState['selectedCustomerId']) => void
   setSearchQuery: (state: CustomerState['searchQuery']) => void
   setSelectedBreed: (state: CustomerState['selectedBreed']) => void
   setSelectedPetTypes: (id: string, checked: boolean) => void
   setSelectedFlags: (state: CustomerState['selectedFlags']) => void
   setFilters: (state: CustomerState['filters']) => void
   setBreeds: (state: CustomerState['breeds']) => void
   setFlags: (state: CustomerState['flags']) => void
   setPetTypes: (state: CustomerState['petTypes']) => void
   setPetSizes: (state: CustomerState['petSizes']) => void
   clearFilters: () => void
   setSelectedPet: (state: CustomerState['selectedPet']) => void
   onPaginationChange: OnChangeFn<PaginationState> | undefined
   setRefetchCustomerAndPets: (state: CustomerState['refetchCustomersAndPets']) => void
   setRefetchCustomerAndPetsCountSummary: (
      state: CustomerState['refetchCustomerAndPetsCountSummary'],
   ) => void
}

export type CustomerTableStore = CustomerState & CustomerTableActions

export const initCustomerTableStore = (): CustomerState => {
   return {
      tableTab: CustomerTableTabEnum.ACTIVE,
      customerPetsCount: 0,
      pagination: { pageIndex: 0, pageSize: 10 },
      searchQuery: '',
      filters: [],
      breeds: [],
      petTypes: [],
      petSizes: [],
      flags: [],
      selectedBreed: '',
      selectedFlags: [],
      selectedPetTypes: [],
      selectedPetSizes: [],
   }
}

export const defaultInitState: CustomerState = {
   tableTab: CustomerTableTabEnum.ACTIVE,
   customerPetsCount: 0,
   pagination: { pageIndex: 0, pageSize: 10 },
   searchQuery: '',
   filters: [],
   flags: [],
   breeds: [],
   petTypes: [],
   petSizes: [],
   selectedBreed: '',
   selectedFlags: [],
   selectedPetTypes: [],
   selectedPetSizes: [],
}

export const createCustomerTableStore = (initState: CustomerState = defaultInitState) => {
   return createStore<CustomerTableStore>()((set) => ({
      ...initState,
      setTableTab: (tableTab) => set(() => ({ tableTab })),
      setCustomerPetsCount: (petsCount) => set(() => ({ customerPetsCount: petsCount })),
      setSelectedCustomerId: (id) => set(() => ({ selectedCustomerId: id })),
      setSelectedBreed: (breed) => set(() => ({ selectedBreed: breed })),
      setSelectedPetTypes: (id: string, checked: boolean) =>
         set((state) => {
            if (checked) {
               const selectedPetType = state.petTypes.find((pt) => pt.id === id)
               const petTypes = [
                  ...state.selectedPetTypes,
                  ...(selectedPetType
                     ? [{ id: selectedPetType.id, type: selectedPetType.name }]
                     : []),
               ]
               return { selectedPetTypes: petTypes }
            }
            return { selectedPetTypes: state.selectedPetTypes.filter((pt) => pt.id !== id) }
         }),
      setSelectedPetSizes: (id: string, checked: boolean) =>
         set((state) => {
            if (checked) {
               const selectedPetSize = state.petSizes.find((pt) => pt.id === id)
               const petSizes = [
                  ...state.selectedPetSizes,
                  ...(selectedPetSize
                     ? [{ id: selectedPetSize.id, type: selectedPetSize.name }]
                     : []),
               ]
               return { selectedPetSizes: petSizes }
            }
            return { selectedPetSizes: state.selectedPetSizes.filter((pt) => pt.id !== id) }
         }),
      setSelectedPet: (pet) => set(() => ({ selectedPet: pet })),
      setSelectedFlags: (flags) => set(() => ({ selectedFlags: flags })),
      setBreeds: (breeds) => set(() => ({ breeds })),
      setFlags: (flags) => set(() => ({ flags })),
      setPetTypes: (petTypes) => set(() => ({ petTypes })),
      setPetSizes: (petSizes) => set(() => ({ petSizes })),
      setRefetchCustomerAndPets: (refetch) => set(() => ({ refetchCustomersAndPets: refetch })),
      setRefetchCustomerAndPetsCountSummary: (refetch) =>
         set(() => ({ refetchCustomerAndPetsCountSummary: refetch })),
      clearFilters: () =>
         set(() => ({
            selectedFlags: [],
            selectedBreed: '',
            selectedPetTypes: [],
         })),
      setSearchQuery: (query) =>
         set((state) => ({
            searchQuery: query,
            // Alaways return to page 1 after searching a query
            pagination: { ...state.pagination, pageIndex: 0 },
         })),
      setFilters: (filters) => set(() => ({ filters })),
      onPaginationChange: (paginate: any) =>
         set((state) => ({ pagination: paginate(state.pagination) })),
   }))
}
