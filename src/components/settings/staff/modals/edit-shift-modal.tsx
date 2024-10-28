import { Dialog, DialogContent, DialogHeader } from '@itsallsavvy/savvy-resuable-components'

interface Props {
   open: boolean
   onOpenChange: (open: boolean) => void
   children: React.ReactNode
}

export default function EditShiftModal({ open, onOpenChange, children }: Props) {
   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="w-full max-w-[640px]" onClick={(e) => e.stopPropagation()}>
            {/* TODO: Add DialogTitle */}
            {children}
         </DialogContent>
      </Dialog>
   )
}
