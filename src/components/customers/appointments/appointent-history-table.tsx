import LargeBranchIcon from '@/components/icon/large-branch-icon'
import SmallBranchIcon from '@/components/icon/small-branch-icon'
import {
   Loader,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@itsallsavvy/savvy-resuable-components'
import useSWR from 'swr'
import { listAppointmentHistoryByCustomerId } from '@/fetcher/appointment/queries/listAppointmentsHistoryByCustomerId'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import EmptyPlaceholder from '@/components/ui/empty-placeholder'

export default function AppointmentHistoryTable() {
   const { selectedCustomerId } = useCustomerTableStore((state) => state)

   const {
      data: listAppointmentHistoryData,
      isLoading: fetchingAppointmentHistory,
      isValidating,
   } = useSWR(
      selectedCustomerId
         ? ['/appointmentV3/loadCustomerAppointmentHistory', selectedCustomerId]
         : null,
      ([url, customerId]) => listAppointmentHistoryByCustomerId({ url, customerId }),
   )

   // Can remove isValidating if don't prefer loading screen while revalidating
   if (fetchingAppointmentHistory || isValidating) {
      return (
         <div className="flex h-[400px] w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   return (
      <>
         {listAppointmentHistoryData?.length ? (
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className="min-w-40">Date & Time</TableHead>
                     <TableHead>Pet</TableHead>
                     <TableHead>Service</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {listAppointmentHistoryData?.length &&
                     listAppointmentHistoryData?.map((history) => (
                        <TableRow key={history.id}>
                           <TableCell className="p-0">
                              <div className="p-4">
                                 <div className="text-sm font-medium">
                                    {history.appointmentDate}
                                 </div>
                                 <div className="flex gap-1">
                                    {history.pets.length > 1 && (
                                       <div className="relative -mt-0.5 w-3">
                                          <div className="absolute left-[0.6px] top-2">
                                             <SmallBranchIcon />
                                          </div>

                                          <div className="absolute left-0 top-0">
                                             <LargeBranchIcon />
                                          </div>
                                       </div>
                                    )}
                                    <div className="flex flex-col gap-11 pt-1">
                                       {history.pets.map(
                                          (pet, index) =>
                                             index < 2 && (
                                                <div
                                                   key={`${pet.name}-time-${index}`}
                                                   className="text-xs text-grey-04"
                                                >
                                                   {pet.scheduleTimeRange}
                                                </div>
                                             ),
                                       )}
                                    </div>
                                 </div>

                                 {history.pets.length > 2 && (
                                    <div className="mt-2 text-sm text-primary">
                                       + {history.pets.length - 2} more pets
                                    </div>
                                 )}
                              </div>
                           </TableCell>
                           <TableCell className="pt-10">
                              <div className="flex h-20 flex-col justify-between">
                                 {history.pets.map(
                                    (pet, index) =>
                                       index < 2 && (
                                          <div
                                             key={`${pet.name}-${index}`}
                                             className="max-w-28 truncate text-sm font-medium"
                                          >
                                             {pet.name}
                                          </div>
                                       ),
                                 )}
                              </div>
                           </TableCell>
                           <TableCell className="pt-10">
                              <div className="flex h-20 flex-col justify-between">
                                 {history.pets.map(
                                    (pet, index) =>
                                       index < 2 && (
                                          <div
                                             key={`${pet.name}-service-${index}`}
                                             className="relative max-w-50"
                                          >
                                             <p className="truncate text-sm font-medium">
                                                {pet.service}
                                             </p>
                                             {pet.additionalService > 0 && (
                                                <div className="absolute text-sm text-grey-04">
                                                   + {pet.additionalService} more
                                                </div>
                                             )}
                                          </div>
                                       ),
                                 )}
                              </div>
                           </TableCell>
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
         ) : (
            <EmptyPlaceholder message="No appointment history found for this customer." />
         )}
      </>
   )
}
