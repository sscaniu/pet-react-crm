import { Dialog, DialogContent } from '@itsallsavvy/savvy-resuable-components'

interface Props {
   open: boolean
   onOpenChange: (open: boolean) => void
   children: React.ReactNode
}

export default function ViewNoteModal({ open, onOpenChange, children }: Props) {
   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="w-full max-w-[580px]">{children}</DialogContent>
      </Dialog>
   )
}
