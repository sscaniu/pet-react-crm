import {
   DropdownMenuContent,
   DropdownMenuItem,
   TimeCellSlot,
} from '@itsallsavvy/savvy-resuable-components'
import { StaffRota } from '../staff-rota-columns'
import EditShiftCard from '../../cards/edit-shift-card'
import EditShiftModal from '../../modals/edit-shift-modal'
import { useState } from 'react'
import ScheduleRegularShiftModal from '../../modals/schedule-regular-shift-modal'
import ScheduleRegularShiftCard from '../../cards/schedule-regular-shift-card'

interface Props {
   slot: TimeCellSlot
   staffRota: StaffRota
}

export default function StaffRotaCellDropdown({ slot, staffRota }: Props) {
   const [openEditShiftModal, setOpenEditShiftModal] = useState(false)
   const [openScheduleRegularShiftModal, setOpenScheduleRegularShiftModal] = useState(false)

   const handleOpenEditShiftModal = () => {
      setOpenEditShiftModal(true)
   }

   const handleOpenScheduleRegularShiftModal = () => {
      setOpenScheduleRegularShiftModal(true)
   }

   return (
      <>
         <DropdownMenuContent align="center" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem onClick={handleOpenEditShiftModal}>Edit this shift</DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenScheduleRegularShiftModal}>
               Schedule Regular Shifts
            </DropdownMenuItem>
         </DropdownMenuContent>
         <EditShiftModal open={openEditShiftModal} onOpenChange={setOpenEditShiftModal}>
            <EditShiftCard
               closeEditShiftModal={() => setOpenEditShiftModal(false)}
               navigateRegularShiftModal={() => setOpenScheduleRegularShiftModal(true)}
               slot={slot}
               staffRota={staffRota}
            />
         </EditShiftModal>
         <ScheduleRegularShiftModal
            open={openScheduleRegularShiftModal}
            onOpenChange={setOpenScheduleRegularShiftModal}
         >
            <ScheduleRegularShiftCard
               closeRegularShiftModal={() => setOpenScheduleRegularShiftModal(false)}
               staffRota={staffRota}
            />
         </ScheduleRegularShiftModal>
      </>
   )
}
