import { Badge, Button, TimeCellSlot } from '@itsallsavvy/savvy-resuable-components'
import { format } from 'date-fns'
import { StaffRota } from '../table/staff-rota-columns'
import { useStaffRotaTableStore } from '@/providers/staff/staff-rota-table-store-provider'
import useSWRMutation from 'swr/mutation'
import { createUser } from '@/fetcher/staff/mutations/createUser'
import { editSingleShift } from '@/fetcher/staff-rota/mutations/editSingleShift'

interface Props {
   staffRota: StaffRota
   editShits: TimeCellSlot[]
   slot: TimeCellSlot
   navigateRegularShiftModal: () => void
   closeEditShiftModal: () => void
}

export default function ConfirmationShift({
   staffRota,
   editShits,
   slot,
   navigateRegularShiftModal,
   closeEditShiftModal,
}: Props) {
   const dateString = slot.startDateTimeString.split('T')[0]

   const { staffRotaEditChanges } = useStaffRotaTableStore((state) => state)

   const { trigger: createUserMutation, isMutating: creatingUser } = useSWRMutation(
      '/staffRotaComp/editSingleShift',
      editSingleShift,
   )

   const handleScheduleAsRegularShift = () => {
      closeEditShiftModal()
      navigateRegularShiftModal()
   }

   const handleUpdateShift = () => {
      // Here we need to call the update method
      // We have ...
      closeEditShiftModal()
   }

   return (
      <>
         <div className="py-6">
            <h5 className="text-lg font-semibold">Confirmation Shift Change</h5>
         </div>
         <div className="w-full">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>
         <div className="flex flex-col gap-6 py-6">
            <p className="text-sm">Are you sure you want to update to this new shift time? </p>
            <div className="flex flex-col gap-4 rounded-2xl border border-grey-06 px-6 py-4">
               <h6>{format(slot.startDateTimeString, 'iiii, dd LLL, yyyy')}</h6>
               <div className="flex justify-between">
                  <div className="flex flex-col gap-3">
                     <Badge className="border-0 bg-text-primary/70 text-white">Old</Badge>
                     <div className="rounded-sm border-l-4 border-l-text-primary/70 px-2 py-1">
                        {(staffRota?.[dateString as any] as any)?.slots.map(
                           (_slot: TimeCellSlot, index: number) => (
                              <p key={_slot.id} className="font-medium text-grey-04 line-through">
                                 {`Shift ${index + 1}: ${format(_slot.startDateTimeString, 'hh:mm a')} - ${format(_slot.endDateTimeString, 'hh:mm a')}`}
                              </p>
                           ),
                        )}
                     </div>
                  </div>

                  <div className="flex flex-col gap-3">
                     <Badge className="border-0 bg-primary bg-opacity-100 text-white">
                        Changed
                     </Badge>
                     <div className="rounded-sm border-l-4 border-l-primary px-2 py-1">
                        {editShits.map((_slot: TimeCellSlot, index: number) => (
                           <p key={_slot.id} className="font-medium">
                              {`Shift ${index + 1}: ${format(_slot.startDateTimeString, 'hh:mm a')} - ${format(_slot.endDateTimeString, 'hh:mm a')}`}
                           </p>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="w-full">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>
         <div className="flex justify-between py-6">
            <Button variant="outlined" color="secondary" onClick={handleScheduleAsRegularShift}>
               Schedule as Regular Shift
            </Button>
            <Button color="secondary" onClick={handleUpdateShift}>
               Update This Shift Only
            </Button>
         </div>
      </>
   )
}
