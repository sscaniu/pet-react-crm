import { getAllBreeds } from '@/fetcher/customers-and-pets/queries/getAllBreeds'
import { FlagTypeEnum, getAllFlags } from '@/fetcher/customers-and-pets/queries/getAllFlags'
import { getAllPetTypes } from '@/fetcher/customers-and-pets/queries/getAllPetTypes'
import { getCustomerAndPetsCountSummary } from '@/fetcher/customers-and-pets/queries/getCustomerAndPetsCountSummary'
import { getCustomersAndPets } from '@/fetcher/customers-and-pets/queries/getCustomersAndPets'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { CustomerFlagsResponse } from '@/schemas/customers-and-pets/flags-schema'
import { useEffect, useRef } from 'react'
import useSWR from 'swr'
import { getAllPetSizes } from '@/fetcher/customers-and-pets/queries/getAllPetSizes'

export default function useCustomerData() {
   //! The ref is to ensure the hook is invoked only once
   // To prevent unintended state changes or redundant API calls.

   const isInitialized = useRef<boolean>(false)

   const {
      selectedBreed,
      pagination,
      selectedFlags,
      selectedPetTypes,
      searchQuery,
      setFlags,
      setBreeds,
      setPetTypes,
      setPetSizes,
      setRefetchCustomerAndPets,
      setRefetchCustomerAndPetsCountSummary,
      tableTab,
   } = useCustomerTableStore((state) => state)

   const flagIds = selectedFlags ? selectedFlags.map((flag) => flag.value) : []

   const { data: getCustomerAndPetsCountSummaryData, mutate: refetchCustomerAndPetsCountSummary } =
      useSWR(['/searchV2/customerAndPetsCountSummary'], ([url]) =>
         getCustomerAndPetsCountSummary({ url }),
      )

   const {
      data: customersAndPetsData,
      isLoading: fetchingCustomersAndPets,
      mutate: refetchCustomerAndPets,
   } = useSWR(
      [
         '/searchV2/performSearch',
         {
            searchString: searchQuery,
            paginationData: {
               pageNumber: pagination.pageIndex + 1,
               pageSize: pagination.pageSize,
            },
            ...(selectedBreed ? { breed: selectedBreed } : {}),
            ...(selectedFlags ? { includeFlags: flagIds } : {}),
            petTypes: selectedPetTypes.map((type) => type.type),
            excludeFlags: [],
            ascending: true,
            status: tableTab,
         },
      ],
      ([url, args]) => getCustomersAndPets({ url, args }),
   )

   const { data: getAllFlagsData, isLoading: fetchingFlags } = useSWR(
      ['/flagDef/byType', FlagTypeEnum.CUSTOMER],
      ([url, type]) => getAllFlags<CustomerFlagsResponse>({ type, url }),
   )

   const { data: getAllPetTypesData, isLoading: fetchingPetTypes } = useSWR(
      '/petType/list',
      getAllPetTypes,
   )

   const { data: getAllPetSizesData, isLoading: fetchingPetSizes } = useSWR(
      '/petSize/list',
      getAllPetSizes,
   )

   const { data: getAllBreedsData, isLoading: fetechingBreeds } = useSWR(
      '/datalist/byName',
      getAllBreeds,
   )

   useEffect(() => {
      // Only run init logic if it hasn't been done yet
      if (!isInitialized.current) {
         if (getAllBreedsData) {
            const uniqueBreedNames = new Set()

            const breeds = getAllBreedsData.dataItems.filter((breed) => {
               const isDuplicated = uniqueBreedNames.has(breed.name)
               uniqueBreedNames.add(breed.name)
               return !isDuplicated
            })
            setBreeds(breeds)
         }

         if (getAllFlagsData) {
            const flags = getAllFlagsData?.flagDefinitions ? getAllFlagsData.flagDefinitions : []
            setFlags(flags)
         }

         if (getAllPetTypesData) {
            const petTypes = getAllPetTypesData
            setPetTypes(petTypes)
         }

         if (getAllPetSizesData) {
            const petSizes = getAllPetSizesData
            setPetSizes(petSizes)
         }

         setRefetchCustomerAndPets(refetchCustomerAndPets as any)
         setRefetchCustomerAndPetsCountSummary(refetchCustomerAndPetsCountSummary)

         const allDataFeeded = getAllBreedsData && getAllFlagsData && getAllPetTypesData
         if (allDataFeeded) {
            isInitialized.current = true
         }
      }
   }, [
      getAllBreedsData,
      getAllFlagsData,
      getAllPetTypesData,
      refetchCustomerAndPets,
      refetchCustomerAndPetsCountSummary,
      setBreeds,
      setFlags,
      setPetTypes,
      setPetSizes,
      setRefetchCustomerAndPets,
      setRefetchCustomerAndPetsCountSummary,
   ])

   return {
      customersAndPetsData,
      getCustomerAndPetsCountSummaryData,
      fetchingCustomersAndPets,
      getAllFlagsData,
      fetchingFlags,
      getAllPetTypesData,
      fetchingPetTypes,
      getAllBreedsData,
      loading: fetchingCustomersAndPets || fetechingBreeds || fetchingFlags || fetchingPetTypes,
   }
}
