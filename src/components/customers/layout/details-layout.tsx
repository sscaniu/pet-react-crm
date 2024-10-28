'use client'
import FaIcon from '@/components/common/fa-icon'
import {
   PetViewEnum,
   ReceiptViewEnum,
   SidebarActionEnum,
   SidebarNavEnum,
   sidebarNavs,
} from '@/constants/customers-tabs'
import { getCustomerInformationById } from '@/fetcher/customer/queries/getCustomerInformation'
import { FlagTypeEnum, getAllFlags } from '@/fetcher/customers-and-pets/queries/getAllFlags'
import { getPetById } from '@/fetcher/pet/queries/getPetById'
import { useCustomerDetailsStore } from '@/providers/customer/customer-details-store-provider'
import { useCustomerDrawerStore } from '@/providers/customer/customer-drawer-store-provider'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { PetFlagsResponse } from '@/schemas/customers-and-pets/flags-schema'
import { useTemporalSidebarNavStore } from '@/stores/customer/sidebar-nav-store'
import {
   faArrowLeft,
   faBell,
   faEllipsisVertical,
   faPaw,
   faXmark,
} from '@fortawesome/free-solid-svg-icons'
import {
   Badge,
   Button,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   Loader,
} from '@itsallsavvy/savvy-resuable-components'
import { useEffect } from 'react'
import useSWR from 'swr'
import ActionsDropDown from './actions-drop-down'
import SidebarNavigation from './sidebar-nav'
import { FlagsData } from '@/types/utils'

interface Props {
   children: React.ReactNode
}

export default function DetailsLayout({ children }: Props) {
   const { setOpenDrawer } = useCustomerDrawerStore((state) => state)
   const {
      petView,
      action,
      mainNav,
      setAction,
      setPetProfileNav,
      setPetView,
      setMainNav,
      resetAction,
      receiptView,
      setReceiptNav,
      setReceiptView,
      resetSidebarNavs,
   } = useSidebarNavStore((state) => state)

   const { selectedCustomerId, customerPetsCount, selectedPet, flags } = useCustomerTableStore(
      (state) => state,
   )

   const {
      setCustomerInformationData,
      setRefetchCustomerInformation,
      setPetInformationData,
      setRefetchPetInformation,
      setPetFlags,
      setFetchingFlags,
      petFlags,
   } = useCustomerDetailsStore((state) => state)

   const { undo, pastStates, futureStates, resume } = useTemporalSidebarNavStore((state) => state)

   const petFlagsData = petFlags.reduce((acc, flag) => {
      acc[flag.id] = flag
      return acc
   }, {} as FlagsData)

   const customerFlagsData = flags.reduce((acc, flag) => {
      acc[flag.id] = flag
      return acc
   }, {} as FlagsData)

   const isCreationAction = action === SidebarActionEnum.CREATE

   const navs = !action
      ? sidebarNavs
      : action === SidebarActionEnum.PET_ADD
        ? sidebarNavs.filter((nav) => nav.name === SidebarNavEnum.PET)
        : sidebarNavs.filter(
             (nav) => nav.name === SidebarNavEnum.CUSTOMER || nav.name === SidebarNavEnum.PET,
          )

   const {
      data: customerInformationData,
      isLoading: fetchingCustomerInformation,
      mutate: refetchCustomerInformation,
   } = useSWR(
      selectedCustomerId && !isCreationAction
         ? ['/customer/getCustomerById', selectedCustomerId]
         : null,
      ([url, id]) => getCustomerInformationById({ url, id }),
   )

   const {
      data: petInformationData,
      isLoading: fetchingPetInformation,
      mutate: refetchPetInformation,
   } = useSWR(selectedPet?.id ? ['/pet', selectedPet.id] : null, ([url, id]) =>
      getPetById({ url, id }),
   )

   const { data: getAllFlagsData, isLoading: fetchingFlags } = useSWR(
      ['/flagDef/byType', FlagTypeEnum.PET],
      ([url, type]) => getAllFlags<PetFlagsResponse>({ type, url }),
   )

   const firstName = customerInformationData?.firstName
   const lastName = customerInformationData?.lastName
   const customerFullName = [firstName, lastName].join(' ')

   const isReceiptDetailsView =
      mainNav === SidebarNavEnum.RECEIPT && receiptView === ReceiptViewEnum.DETAILS

   const isPetDetailsView = mainNav === SidebarNavEnum.PET && petView === PetViewEnum.DETAILS

   const actionLabel = action
      ? {
           [SidebarActionEnum.CREATE]: `Create New Customer & Pet`,
           [SidebarActionEnum.EDIT]: `Edit Customer & Pet`,
           [SidebarActionEnum.PET_ADD]: `Create New Pet`,
        }[action]
      : ``

   const isDetailsView = isReceiptDetailsView || isPetDetailsView

   const showBackBtn =
      (!action && isDetailsView) ||
      (!action && !mainNav) ||
      (action && (action === SidebarActionEnum.EDIT || action === SidebarActionEnum.PET_ADD))

   const handleNavigateBack = () => {
      if (action === SidebarActionEnum.PET_ADD) {
         undo()
         undo()
         // resume()
         return
      }
      undo()
      // resume()
   }

   const handleNavigateActivities = () => {
      setMainNav(null)
   }

   const backBtn = (
      <Button variant="icon" className="p-0" onClick={handleNavigateBack}>
         <FaIcon icon={faArrowLeft} size="lg" />
      </Button>
   )

   const detailsElement = (
      <>
         <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4">
               {isReceiptDetailsView ? (
                  <>
                     <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-4">
                           {showBackBtn && backBtn}
                           <h4 className="text-xl font-medium">Receipt #00120</h4>
                           <Badge>Receipt Sent</Badge>
                        </div>
                        <h6 className="font-medium">{customerFullName}</h6>
                     </div>

                     <div className="flex flex-col gap-1 text-xs font-medium">
                        <p className="text-grey-02">Date Issued: 14/05/2024 03:00 PM</p>
                        <p className="text-grey-02">Invoice ID: 00120-5678-GO</p>
                        <p className="text-grey-02">Cozy Pet Spa Branch 1</p>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="flex items-center gap-4">
                        {showBackBtn && backBtn}
                        <h4 className="text-xl font-medium">
                           {isPetDetailsView
                              ? `${petInformationData?.name} (${petInformationData?.breedLabel})`
                              : customerFullName}
                        </h4>
                        {!isDetailsView && (
                           <div className="flex items-center gap-1 text-grey-02">
                              <FaIcon icon={faPaw} size="lg" />
                              <p className="text-grey-02">{customerPetsCount.toString()}</p>
                           </div>
                        )}
                     </div>

                     <div className="flex flex-col gap-1 text-xs font-medium">
                        <p className="text-grey-02">
                           {isPetDetailsView
                              ? `${customerFullName} (${customerInformationData?.username})`
                              : `${customerInformationData?.username}`}
                        </p>
                        <p className="text-grey-02">
                           {customerInformationData?.mobilePhoneNumberObj?.internationalNumber}
                        </p>
                        <p className="text-grey-02">Last Appointment: 30/04/2024</p>
                     </div>
                  </>
               )}
            </div>
            <div className="flex flex-wrap gap-2">
               {isPetDetailsView
                  ? petInformationData?.flags?.map((flag) => (
                       <Badge key={flag}>{petFlagsData?.[flag]?.name}</Badge>
                    ))
                  : customerInformationData?.flags?.map((flag) => (
                       <Badge key={flag}>{customerFlagsData?.[flag]?.name}</Badge>
                    ))}
            </div>
         </div>

         <div className="flex items-center gap-6 text-grey-04">
            <Button variant="icon" onClick={handleNavigateActivities}>
               <FaIcon icon={faBell} size="xl" />
            </Button>
            <ActionsDropDown customerId={selectedCustomerId ?? ''} />
            <Button variant="icon" onClick={() => setOpenDrawer(false)}>
               <FaIcon icon={faXmark} size="xl" />
            </Button>
         </div>
      </>
   )

   const actionElement = (
      <>
         <div className="flex flex-1 items-center gap-4">
            {showBackBtn && backBtn}
            <h4 className="text-xl font-medium">{actionLabel}</h4>
         </div>

         <Button variant="icon" onClick={() => setOpenDrawer(false)}>
            <FaIcon icon={faXmark} size="xl" />
         </Button>
      </>
   )

   const activityElement = (
      <>
         <div className="flex flex-1 items-center gap-4">
            {backBtn}
            <h4 className="text-xl font-medium">Activity Updates</h4>
         </div>

         <div className="flex items-center gap-6 text-grey-04">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button className="h-8 w-8 p-0" variant="icon">
                     <FaIcon icon={faEllipsisVertical} size="lg" className="text-grey-04" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="start">
                  <DropdownMenuItem>Mark all as read</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="icon" onClick={() => setOpenDrawer(false)}>
               <FaIcon icon={faXmark} size="xl" />
            </Button>
         </div>
      </>
   )

   useEffect(() => {
      if (customerInformationData) {
         setCustomerInformationData(customerInformationData)
         setRefetchCustomerInformation(refetchCustomerInformation)
      }
   }, [
      customerInformationData,
      refetchCustomerInformation,
      setCustomerInformationData,
      setRefetchCustomerInformation,
   ])

   useEffect(() => {
      if (petInformationData) {
         setPetInformationData(petInformationData)
         setRefetchPetInformation(refetchPetInformation)
      }
   }, [petInformationData, refetchPetInformation, setPetInformationData, setRefetchPetInformation])

   useEffect(() => {
      if (getAllFlagsData) {
         setPetFlags(getAllFlagsData.flagDefinitions)
         setFetchingFlags(fetchingFlags)
      }
   }, [fetchingFlags, getAllFlagsData, setFetchingFlags, setPetFlags])

   return (
      <aside className="flex items-start">
         <SidebarNavigation navs={navs} />
         {fetchingCustomerInformation || fetchingPetInformation ? (
            <div className="flex h-screen w-full items-center justify-center">
               <Loader />
            </div>
         ) : (
            <div className="w-full flex-1">
               <div className="flex flex-col gap-6 pt-10">
                  <div className="flex items-start px-10">
                     {!action && !mainNav
                        ? activityElement
                        : action
                          ? actionElement
                          : detailsElement}
                  </div>
                  <div className="w-full px-10">
                     <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
                  </div>
               </div>

               {children}
            </div>
         )}
      </aside>
   )
}
