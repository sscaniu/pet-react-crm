'use client'
import MessageBoxDialog from '@/components/calendar/message/message-box-dialog'
import RescheduleAppointmentModal from '@/components/calendar/modals/reschedule-appointment-modal'
import AppointmentScheduler from '@/components/calendar/panel/appointment-scheduler'
import RescheduleAppointment from '@/components/calendar/reschedule-appointment/reschedule-appointment'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'

export default function CalendarTemplate() {
   const { openMessageBox, setOpenMessageBox } = useAppointmentDrawerStore((state) => state)
   const { rescheduleAppointment } = useAppointmentPanelStore((state) => state)

   return (
      <>
         <AppointmentScheduler />

         {rescheduleAppointment && (
            <RescheduleAppointmentModal>
               <RescheduleAppointment />
            </RescheduleAppointmentModal>
         )}
         <MessageBoxDialog open={openMessageBox} opOpenChange={setOpenMessageBox} />
      </>
   )
}
