import FaIcon from '@/components/common/fa-icon'
import { CustomerTableTabEnum, SidebarActionEnum, SidebarNavEnum } from '@/constants/customers-tabs'
import { archiveCustomer } from '@/fetcher/customer/mutations/archiveCustomer'
import { undoArchiveCustomer } from '@/fetcher/customer/mutations/undoArchiveCustomer'
import { undoBanCustomer } from '@/fetcher/customer/mutations/undoBanCustomer'
import { banCustomer } from '@/fetcher/customer/mutations/banCustomer'
import { useCustomerDrawerStore } from '@/providers/customer/customer-drawer-store-provider'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { useTemporalSidebarNavStore } from '@/stores/customer/sidebar-nav-store'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import {
   DropdownMenu,
   DropdownMenuTrigger,
   Button,
   DropdownMenuContent,
   DropdownMenuItem,
   toast,
} from '@itsallsavvy/savvy-resuable-components'
import { MouseEvent, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import BlacklistConfirmationModal from './blacklist-confirmation-modal'
import BlacklistConfirmationCard from './blacklist-confimation-card'
import RemoveBlacklistConfirmationCard from './remove-blacklist-confirmation-card'
import RemoveBlacklistConfirmationModal from './remove-blacklist-confirmation-modal'

interface Props {
   customerId: string
}

export default function ActionsDropDown({ customerId }: Props) {
   const {
      setSelectedCustomerId,
      refetchCustomersAndPets,
      refetchCustomerAndPetsCountSummary,
      tableTab,
   } = useCustomerTableStore((state) => state)
   const { setOpenDrawer, openDrawer } = useCustomerDrawerStore((state) => state)
   const { setAction, mainNav, setMainNav } = useSidebarNavStore((state) => state)
   const { pause } = useTemporalSidebarNavStore((state) => state)
   const [openBlacklistConfirmationModal, setOpenBlacklistConfirmationModal] = useState(false)
   const [openRemoveBlacklistConfirmationModal, setOpenRemoveBlacklistConfirmationModal] =
      useState(false)

   const { trigger: archiveCustomerMutation } = useSWRMutation(
      '/customer/archiveCustomerForLoggedInUser',
      archiveCustomer,
   )

   const { trigger: banCustomerMutation, isMutating: banningCustomer } = useSWRMutation(
      '/customer/banCustomer',
      banCustomer,
   )

   const { trigger: undoArchiveCustomerMutation } = useSWRMutation(
      '/customer/undoArchiveCustomerForLoggedInUser',
      undoArchiveCustomer,
   )

   const { trigger: undoBanCustomerMutation, isMutating: undoingBanCustomer } = useSWRMutation(
      '/customer/unbanCustomer',
      undoBanCustomer,
   )

   const handleEdit = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.stopPropagation()
      if (!openDrawer) {
         setOpenDrawer(true)
      }
      setSelectedCustomerId(customerId)
      if (mainNav !== SidebarNavEnum.CUSTOMER && mainNav !== SidebarNavEnum.PET) {
         setMainNav(SidebarNavEnum.CUSTOMER)
      }
      setAction(SidebarActionEnum.EDIT)
      // pause()
   }

   const handleArchive = () => {
      archiveCustomerMutation(
         { customerId },

         {
            onSuccess: async () => {
               await refetchCustomersAndPets?.()
               await refetchCustomerAndPetsCountSummary?.()
               toast.success('User is archived')
            },
         },
      )
   }

   const handleUndoArchive = () => {
      undoArchiveCustomerMutation(
         { customerId },

         {
            onSuccess: async () => {
               await refetchCustomersAndPets?.()
               await refetchCustomerAndPetsCountSummary?.()
               toast.success('User is unarchived')
            },
         },
      )
   }

   const handleOpenBlacklistConfirmationModal = () => {
      setOpenBlacklistConfirmationModal(true)
   }

   const handleOpenRemoveBlacklistConfrimationModal = () => {
      setOpenRemoveBlacklistConfirmationModal(true)
   }

   const handleRemoveBlacklist = () => {
      undoBanCustomerMutation(
         { customerId },
         {
            onSuccess: async () => {
               setOpenBlacklistConfirmationModal(false)
               await refetchCustomersAndPets?.()
               await refetchCustomerAndPetsCountSummary?.()
               toast.success('User is removed from blacklisted')
            },
         },
      )
   }

   const handleBlacklist = () => {
      banCustomerMutation(
         { customerId },
         {
            onSuccess: async () => {
               setOpenBlacklistConfirmationModal(false)
               await refetchCustomersAndPets?.()
               await refetchCustomerAndPetsCountSummary?.()
               toast.success('User is blacklisted')
            },
         },
      )
   }

   const activeDropdownItems = (
      <>
         <DropdownMenuItem>New Appointment</DropdownMenuItem>
         <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
         <DropdownMenuItem>Message</DropdownMenuItem>
         <DropdownMenuItem onClick={handleArchive}>Archive</DropdownMenuItem>
         <DropdownMenuItem onClick={handleOpenBlacklistConfirmationModal} className="text-red-01">
            BlackList
         </DropdownMenuItem>
      </>
   )

   const archivedDropdownItems = (
      <>
         <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
         <DropdownMenuItem onClick={handleUndoArchive}>Unarchive</DropdownMenuItem>
      </>
   )

   const blacklistedDropdownItems = (
      <>
         <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
         <DropdownMenuItem onClick={handleOpenRemoveBlacklistConfrimationModal}>
            Remove from Blacklist
         </DropdownMenuItem>
      </>
   )

   const renderDropdownItemsElement = () => {
      if (tableTab === CustomerTableTabEnum.ACTIVE || openDrawer) {
         return activeDropdownItems
      } else if (tableTab === CustomerTableTabEnum.ARCHIVED) {
         return archivedDropdownItems
      } else if (tableTab === CustomerTableTabEnum.BLACKLISTED) {
         return blacklistedDropdownItems
      } else return <></>
   }

   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button className="h-8 w-8 p-0" variant="icon">
                  <FaIcon icon={faEllipsisVertical} size="lg" className="text-grey-04" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" onClick={(e) => e.stopPropagation()}>
               {renderDropdownItemsElement()}
            </DropdownMenuContent>
         </DropdownMenu>
         <BlacklistConfirmationModal
            open={openBlacklistConfirmationModal}
            onOpenChange={setOpenBlacklistConfirmationModal}
         >
            <BlacklistConfirmationCard
               handleBlacklist={handleBlacklist}
               loading={banningCustomer}
            />
         </BlacklistConfirmationModal>
         <RemoveBlacklistConfirmationModal
            open={openRemoveBlacklistConfirmationModal}
            onOpenChange={setOpenRemoveBlacklistConfirmationModal}
         >
            <RemoveBlacklistConfirmationCard
               handleRemoveBlacklist={handleRemoveBlacklist}
               loading={banningCustomer}
            />
         </RemoveBlacklistConfirmationModal>
      </>
   )
}
