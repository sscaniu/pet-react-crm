'use client'
import AppointmentForms from '@/components/calendar/forms/appointment-forms'
import AppointmentInformation from '@/components/calendar/information/appointment-information'
import DetailsLayout from '@/components/calendar/layout/details-layout'
import AppointmentMessageBox from '@/components/calendar/message/appointment-message-box'
import AppointmentPayment from '@/components/calendar/payment/appointment-payment'
import AppointmentSerivce from '@/components/calendar/service/appointment-service'
import { SidebarNavEnum } from '@/constants/appointment-tabs'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { useSidebarNavStore } from '@/providers/appointment/sidebar-nav-store-provider'

export default function CalendarDetailsTemplate() {
   const { openDrawer } = useAppointmentDrawerStore((state) => state)
   const { mainNav } = useSidebarNavStore((state) => state)

   if (!openDrawer || !mainNav) {
      return <></>
   }

   const appointmentDetailsElement = {
      [SidebarNavEnum.SERVICE]: <AppointmentSerivce />,
      [SidebarNavEnum.INFORMATION]: <AppointmentInformation />,
      /* Second icon / tab - this is like Appointment forms */
      [SidebarNavEnum.FORM]: <AppointmentForms />,
      [SidebarNavEnum.PAYMENT]: <AppointmentPayment />,
      [SidebarNavEnum.MESSAGE]: <AppointmentMessageBox />,
   }[mainNav]

   return <DetailsLayout>{appointmentDetailsElement}</DetailsLayout>
}
