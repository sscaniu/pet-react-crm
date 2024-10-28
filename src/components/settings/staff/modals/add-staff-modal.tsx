import { Dialog, DialogContent } from '@itsallsavvy/savvy-resuable-components'
import AddStaffModalCard from '../cards/add-staff-modal-card'
import { useStaffTableStore } from '@/providers/staff/staff-table-store-provider'

export default function AddStaffModal() {
   const { openAddStaffModal, setOpenAddStaffModal } = useStaffTableStore((state) => state)

   return (
      <Dialog open={openAddStaffModal} onOpenChange={setOpenAddStaffModal}>
         <DialogContent className="w-full max-w-[700px]" onClick={(e) => e.stopPropagation()}>
            {/* TODO: Add DialogTitle */}
            <AddStaffModalCard closeAddStaffModal={() => setOpenAddStaffModal(false)} />
         </DialogContent>
      </Dialog>
   )
}
