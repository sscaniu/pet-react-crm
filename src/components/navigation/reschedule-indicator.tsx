import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { Button } from '@itsallsavvy/savvy-resuable-components'

export default function RescheduleIndicator() {
   const { resetRescheduleAppointment } = useAppointmentPanelStore((state) => state)

   return (
      <div className="absolute z-20 -mx-8 flex h-full w-full items-center justify-center bg-black bg-opacity-30">
         <div className="flex items-center justify-between gap-20 rounded-full bg-primary px-4 py-1">
            <p className="text-sm font-bold text-white">
               Select a date & time to reschedule the appointment to
            </p>
            <Button
               variant="text"
               className="text-white underline hover:text-white"
               onClick={() => resetRescheduleAppointment()}
            >
               cancel
            </Button>
         </div>
      </div>
   )
}
