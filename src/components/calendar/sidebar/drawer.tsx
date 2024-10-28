'use client'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { useSidebarNavStore } from '@/providers/appointment/sidebar-nav-store-provider'
import { CalendarDrawerViewEnum } from '@/stores/appointment/appointment-drawer-store'
import { CalendarItemActionEnum } from '@/stores/appointment/appointment-panel-store'
import AddEventTemplate from '@/templates/add-event-template'
import AddHolidayTemplate from '@/templates/add-holiday-template'
import CalendarDetailsTemplate from '@/templates/calendar-details-template'
import ViewEventTemplate from '@/templates/view-event-template'
import ViewHolidayTemplate from '@/templates/view-holiday-template'
import {
   Drawer,
   DrawerContent,
   DrawerDescription,
   DrawerHeader,
   DrawerTitle,
} from '@itsallsavvy/savvy-resuable-components'

export default function SidebarDrawer() {
   const { openDrawer, drawerView, setOpenDrawer, setDrawerView } = useAppointmentDrawerStore(
      (state) => state,
   )
   const { resetPanelStore } = useAppointmentPanelStore((state) => state)
   const { resetSidebarNavs } = useSidebarNavStore((state) => state)

   const handleClose = () => {
      setDrawerView(null)
      resetPanelStore()
      resetSidebarNavs()
   }

   const element = drawerView ? (
      {
         [CalendarDrawerViewEnum.DETAILS]: <CalendarDetailsTemplate />,
         [CalendarDrawerViewEnum.ADD_EVENT]: <AddEventTemplate />,
         [CalendarDrawerViewEnum.ADD_HOLIDAY]: <AddHolidayTemplate />,
         [CalendarDrawerViewEnum.VIEW_EVENT]: <ViewEventTemplate />,
         [CalendarDrawerViewEnum.VIEW_HOLIDAY]: <ViewHolidayTemplate />,
      }[drawerView]
   ) : (
      <></>
   )

   return (
      <Drawer
         direction="right"
         open={openDrawer}
         onOpenChange={setOpenDrawer}
         onClose={handleClose}
         modal={drawerView === CalendarDrawerViewEnum.DETAILS}
      >
         <DrawerContent
            className="w-side-bar overflow-auto overflow-x-hidden shadow-01"
            onClick={(e) => e.stopPropagation()}
         >
            <DrawerHeader className="sr-only">
               <DrawerTitle>Appointment Details Sidebar</DrawerTitle>
               <DrawerDescription>A sidebar drawer for appointment details</DrawerDescription>
            </DrawerHeader>

            {element}
         </DrawerContent>
      </Drawer>
   )
}
