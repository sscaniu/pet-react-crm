import Seperator from '@/components/common/seperator'
import DayAppointments from '@/components/ui/day-appointments'
import AppointmentHistory from './appointment-history'
import { Loader } from '@itsallsavvy/savvy-resuable-components'
import useSWR from 'swr'
import { listUpcomingAppointmentsByCustomerId } from '@/fetcher/appointment/queries/listUpcomingAppointmentsByCustomerId'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import EmptyPlaceholder from '@/components/ui/empty-placeholder'

export default function AppointmentsOverview() {
   const { selectedCustomerId } = useCustomerTableStore((state) => state)

   const {
      data: listUpcomingAppointmentsData,
      isLoading: fetchingUpcomingAppointments,
      isValidating,
   } = useSWR(
      selectedCustomerId
         ? ['/appointmentV3/loadCustomerUpcomingAppointments', selectedCustomerId]
         : null,
      ([url, customerId]) => listUpcomingAppointmentsByCustomerId({ url, customerId }),
   )

   // Can remove isValidating if don't prefer loading screen while revalidating
   if (fetchingUpcomingAppointments || isValidating) {
      return (
         <div className="flex h-[400px] w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   return (
      <div className="flex flex-col gap-10 px-10 py-6">
         <div className="flex flex-col gap-4">
            <h4 className="text-xl font-medium">Upcoming Appointments</h4>
            <div className="flex flex-col gap-16">
               {listUpcomingAppointmentsData?.appointmentServiceDayDtos?.length ? (
                  listUpcomingAppointmentsData.appointmentServiceDayDtos.map(
                     //TODO: add type
                     (appointment: any) => (
                        <DayAppointments key={appointment.date} appointmentDay={appointment} />
                     ),
                  )
               ) : (
                  <EmptyPlaceholder message="No upcoming appointments found for this customer." />
               )}
            </div>
         </div>
         <Seperator />
         <AppointmentHistory />
      </div>
   )
}
