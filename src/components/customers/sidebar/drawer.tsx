'use client'
import { CustomerDetailsStoreProvider } from '@/providers/customer/customer-details-store-provider'
import { useCustomerDrawerStore } from '@/providers/customer/customer-drawer-store-provider'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { useTemporalSidebarNavStore } from '@/stores/customer/sidebar-nav-store'
import CustomerDetailsTemplate from '@/templates/customers-details-template'
import {
   Drawer,
   DrawerContent,
   DrawerDescription,
   DrawerHeader,
   DrawerTitle,
} from '@itsallsavvy/savvy-resuable-components'

export default function SidebarDrawer() {
   const { openDrawer, setOpenDrawer } = useCustomerDrawerStore((state) => state)
   const { resetAction, resetSidebarNavs } = useSidebarNavStore((state) => state)

   const { setSelectedCustomerId } = useCustomerTableStore((state) => state)
   const { clear, resume } = useTemporalSidebarNavStore((state) => state)

   const handleClose = () => {
      resetAction()
      resetSidebarNavs()
      setSelectedCustomerId(undefined)
      clear()
      resume()
   }

   return (
      <Drawer
         direction="right"
         open={openDrawer}
         onOpenChange={setOpenDrawer}
         onClose={handleClose}
      >
         <DrawerContent className="w-side-bar overflow-auto overflow-x-hidden">
            <DrawerHeader className="sr-only">
               <DrawerTitle>Customer Details Sidebar</DrawerTitle>
               <DrawerDescription>A sidebar drawer for customer details</DrawerDescription>
            </DrawerHeader>
            <CustomerDetailsStoreProvider>
               <CustomerDetailsTemplate />
            </CustomerDetailsStoreProvider>
         </DrawerContent>
      </Drawer>
   )
}
