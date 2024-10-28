import { DurationOfLeaveEnum, TimeCellSlot } from '@itsallsavvy/savvy-resuable-components'
import { useState } from 'react'
import { StaffRota } from '../table/staff-rota-columns'
import ConfirmationShift from './confirmation-shift'
import EditShiftTimes from './edit-shift-times'

interface Props {
   staffRota: StaffRota
   slot: TimeCellSlot
   navigateRegularShiftModal: () => void
   closeEditShiftModal: () => void
}

export default function EditShiftCard({
   staffRota,
   slot,
   navigateRegularShiftModal,
   closeEditShiftModal,
}: Props) {
   const editDateString = slot.startDateTimeString.split('T')[0]

   const [description, setDescription] = useState('')
   const [durationOfLeave, setDurationOfLeave] = useState<DurationOfLeaveEnum>()
   const shifts = (staffRota?.[editDateString] as any)?.slots

   const [editShifts, setEditShifts] = useState<TimeCellSlot[]>(shifts)

   const [partialLeaveShift, setPartialLeaveShift] = useState<TimeCellSlot>({
      id: Math.random().toString(),
      startDateTimeString: shifts[0].startDateTimeString,
      endDateTimeString: shifts[0].endDateTimeString,
      durationOfLeave: DurationOfLeaveEnum.PARTIAL_LEAVE,
      isOnLeave: true,
   })

   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

   return (
      <div className="flex w-full flex-col rounded-2xl border border-grey-06 bg-white px-10 shadow-01">
         {isConfirmationOpen ? (
            <ConfirmationShift
               navigateRegularShiftModal={navigateRegularShiftModal}
               closeEditShiftModal={closeEditShiftModal}
               editShits={editShifts}
               slot={slot}
               staffRota={staffRota}
            />
         ) : (
            <EditShiftTimes
               editDateString={editDateString}
               openConfirmation={() => setIsConfirmationOpen(true)}
               description={description}
               durationOfLeave={durationOfLeave}
               editShifts={editShifts}
               setDescription={setDescription}
               setDurationOfLeave={setDurationOfLeave}
               setEditShifts={setEditShifts}
               slot={slot}
               staffRota={staffRota}
               partialLeaveShift={partialLeaveShift}
               setPartialLeaveShift={setPartialLeaveShift}
            />
         )}
      </div>
   )
}
