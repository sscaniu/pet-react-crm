import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from '@itsallsavvy/savvy-resuable-components'

interface Props {
   children: React.ReactNode
}

export default function RescheduleAppointmentModal({ children }: Props) {
   const { openRescheduleAppointmentModal, setOpenRescheduleAppointmentModal } =
      useAppointmentPanelStore((state) => state)

   return (
      <Dialog
         open={openRescheduleAppointmentModal}
         onOpenChange={setOpenRescheduleAppointmentModal}
      >
         <DialogContent className="w-full max-w-[720px] bg-white">
            <DialogHeader>
               <DialogTitle className="sr-only">Appointment Edit Modal</DialogTitle>
            </DialogHeader>
            {children}
         </DialogContent>
      </Dialog>
   )
}
