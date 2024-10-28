import { Dialog, DialogContent } from '@itsallsavvy/savvy-resuable-components'
import ChatPanel from './chat-panel'

interface Props {
   open: boolean
   opOpenChange: (open: boolean) => void
}

export default function MessageBoxDialog({ open, opOpenChange }: Props) {
   return (
      <Dialog modal={false} open={open} onOpenChange={opOpenChange}>
         <DialogContent position="bottom-right" className="w-full max-w-[700px]">
            <ChatPanel />
         </DialogContent>
      </Dialog>
   )
}
