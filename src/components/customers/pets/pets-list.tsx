import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import PetsTable from './pets-table'
import { getAllPetsByCustomerId } from '@/fetcher/pet/queries/getAllPetsByCustomerId'
import useSWR from 'swr'
import { Button, Loader } from '@itsallsavvy/savvy-resuable-components'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '@/components/common/fa-icon'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { PetViewEnum, SidebarActionEnum, SidebarNavEnum } from '@/constants/customers-tabs'
import PetListEmptyPlaceholder from './pet-list-empty-placeholder'
import { useEffect } from 'react'
import { useCustomerDetailsStore } from '@/providers/customer/customer-details-store-provider'

export default function PetsList() {
   const { selectedCustomerId } = useCustomerTableStore((state) => state)
   const { setRefetchPetsList } = useCustomerDetailsStore((state) => state)
   const { setAction, setPetView } = useSidebarNavStore((state) => state)

   const {
      data: getAllPetsListData,
      isLoading: fetchingPetsList,
      mutate: refetchPetsList,
      isValidating,
   } = useSWR(
      selectedCustomerId ? ['/pet/loadCustomersPets', selectedCustomerId] : null,
      ([url, id]) => getAllPetsByCustomerId({ url, id }),
   )

   const handleAddPet = () => {
      setPetView(PetViewEnum.DETAILS)
      setAction(SidebarActionEnum.PET_ADD)
   }

   const petsListData = getAllPetsListData?.filter((pet) => !pet.deceased)
   const petsCount = petsListData?.length ?? 0
   const deceasedPetsListData = getAllPetsListData?.filter((pet) => pet.deceased)
   const deceasedPetsCount = deceasedPetsListData?.length ?? 0
   const petsCountLabel = `${petsCount} Pet${petsCount > 1 ? 's' : ''}`

   useEffect(() => {
      if (getAllPetsListData) {
         setRefetchPetsList(refetchPetsList)
      }
      // So if setRefetchPetsList changes (ie. selected customer changes) it will automatically refresh the list
   }, [getAllPetsListData, refetchPetsList, setRefetchPetsList])

   // Can remove isValidating if don't prefer loading screen while revalidating
   if (fetchingPetsList || isValidating) {
      return (
         <div className="flex h-[400px] w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   return (
      <div className="px-10 py-6">
         <div className="flex flex-col gap-16">
            {petsCount > 0 ? (
               <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-medium">{petsCountLabel}</h4>
                  <PetsTable petsListData={petsListData} />
                  <Button
                     type="button"
                     onClick={handleAddPet}
                     variant="text"
                     color="secondary"
                     leftIcon={<FaIcon icon={faPlus} />}
                  >
                     Add Another pet
                  </Button>
               </div>
            ) : (
               <PetListEmptyPlaceholder onAddPet={handleAddPet} />
            )}
            {deceasedPetsCount > 0 && (
               <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-medium">Deceased</h4>
                  <PetsTable petsListData={deceasedPetsListData} isForDeceased />
               </div>
            )}
         </div>
      </div>
   )
}
