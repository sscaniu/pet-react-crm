'use client'
import { useCustomerDrawerStore } from '@/providers/customer/customer-drawer-store-provider'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import {
   Drawer,
   DrawerContent,
   DrawerDescription,
   DrawerHeader,
   DrawerTitle,
} from '@itsallsavvy/savvy-resuable-components'
import NavMenu from './nav-menu'
import { useNavMenuDrawerStore } from '@/providers/customer/nav-menu-drawer-store-provider'

export default function NavMenuDrawer() {
   const { openDrawer, setOpenDrawer } = useNavMenuDrawerStore((state) => state)

   const handleClose = () => {}

   return (
      <Drawer direction="left" open={openDrawer} onOpenChange={setOpenDrawer} onClose={handleClose}>
         <DrawerContent className="w-nav-menu overflow-auto overflow-x-hidden">
            <DrawerHeader className="sr-only">
               <DrawerTitle>Customer Details Sidebar</DrawerTitle>
               <DrawerDescription>A sidebar drawer for customer details</DrawerDescription>
            </DrawerHeader>
            <NavMenu />
         </DrawerContent>
      </Drawer>
   )
}
