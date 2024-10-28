'use client'
import ActivityUpdatesList from '@/components/customers/activity-updates/activity-updates-list'
import AppointmentsOverview from '@/components/customers/appointments/appointment-overview'
import CustomerActionForm from '@/components/customers/action/customer-action-form'
import CustomerDetails from '@/components/customers/details/customer-details'
import CustomerForms from '@/components/customers/forms/customer-forms'
import DetailsLayout from '@/components/customers/layout/details-layout'
import PetsOverview from '@/components/customers/pets/pets-overview'
import ReceiptsOverview from '@/components/customers/receipts/receipts-overview'
import { SidebarNavEnum } from '@/constants/customers-tabs'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import PetsActionOverview from '@/components/customers/action/pet-action-overview'
import { useCustomerDrawerStore } from '@/providers/customer/customer-drawer-store-provider'

export default function CustomerDetailsTemplate() {
   const { openDrawer } = useCustomerDrawerStore((state) => state)
   const { mainNav, action } = useSidebarNavStore((state) => state)

   let customerDetailsElement

   if (!openDrawer) {
      return <></>
   }

   if (!mainNav) {
      customerDetailsElement = <ActivityUpdatesList />
      return <DetailsLayout>{customerDetailsElement}</DetailsLayout>
   }

   if (action) {
      customerDetailsElement = {
         [SidebarNavEnum.CUSTOMER]: <CustomerActionForm />,
         [SidebarNavEnum.PET]: <PetsActionOverview />,
         [SidebarNavEnum.APPOINTMENT]: <></>,
         [SidebarNavEnum.RECEIPT]: <></>,
         [SidebarNavEnum.FORM]: <></>,
      }[mainNav]

      return <DetailsLayout>{customerDetailsElement}</DetailsLayout>
   }

   customerDetailsElement = {
      [SidebarNavEnum.CUSTOMER]: <CustomerDetails />,
      [SidebarNavEnum.PET]: <PetsOverview />,
      [SidebarNavEnum.APPOINTMENT]: <AppointmentsOverview />,
      [SidebarNavEnum.RECEIPT]: <ReceiptsOverview />,
      [SidebarNavEnum.FORM]: <CustomerForms />,
   }[mainNav]

   return <DetailsLayout>{customerDetailsElement}</DetailsLayout>
}
