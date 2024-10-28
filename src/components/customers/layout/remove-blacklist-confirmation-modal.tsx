import { Dialog, DialogContent } from '@itsallsavvy/savvy-resuable-components'

interface Props {
   open: boolean
   onOpenChange: (open: boolean) => void
   children: React.ReactNode
}

export default function RemoveBlacklistConfirmationModal({ open, onOpenChange, children }: Props) {
   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="z-50 w-full max-w-[580px]" onClick={(e) => e.stopPropagation()}>
            {children}
         </DialogContent>
      </Dialog>
   )
}
