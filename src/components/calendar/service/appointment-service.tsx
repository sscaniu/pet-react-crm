import DayAppointments from '@/components/ui/day-appointments'
import { Button, Loader } from '@itsallsavvy/savvy-resuable-components'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'

export default function AppointmentService() {
   const { appointmentInformationData } = useAppointmentPanelStore((state) => state)

   if (!appointmentInformationData) {
      return (
         <div className="flex h-[400px] w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   return (
      <div className="flex flex-col gap-10 px-10 py-6">
         <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
               <h4 className="text-xl font-semibold">Services/Products Requested</h4>
               <Button variant="text" color="secondary">
                  +Add Service/Product
               </Button>
            </div>
            <div className="flex flex-col gap-16">
               {appointmentInformationData.daysBookings.map((dayBookings, index) => (
                  <DayAppointments
                     key={`${dayBookings.date}-${index}`}
                     showPetName
                     appointmentDay={dayBookings}
                  />
               ))}
            </div>
         </div>

         {/* <InternalNotes /> */}
      </div>
   )
}
