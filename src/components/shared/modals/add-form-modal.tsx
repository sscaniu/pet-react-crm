import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from '@itsallsavvy/savvy-resuable-components'
import { SetStateAction } from 'react'

interface Props {
   children: React.ReactNode
   openModal: boolean
   setOpenModal: React.Dispatch<SetStateAction<boolean>>
}

export default function AddFormModal({ children, openModal, setOpenModal }: Props) {
   return (
      <Dialog open={openModal} onOpenChange={setOpenModal}>
         <DialogContent className="w-full max-w-[700px]">
            <DialogHeader className="sr-only">
               <DialogTitle>Modal for adding a form</DialogTitle>
            </DialogHeader>
            {children}
         </DialogContent>
      </Dialog>
   )
}
