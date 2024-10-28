import FaIcon from '@/components/common/fa-icon'
import { faPaw, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { NoteVariantEnum } from '@/constants/customers-tabs'
import NoteWrapper from './note-wrapper'
import { useState } from 'react'
import ViewNoteModal from './view-note-modal'
import ViewNote from './view-note'

interface Props {
   id: string
   variant: NoteVariantEnum
   createdDate: string
   note: string
   petName?: string
   isCard?: boolean
   refetchNotes: () => void
}

export default function Note({
   id,
   createdDate,
   note,
   petName,
   variant,
   isCard,
   refetchNotes,
}: Props) {
   const [viewNote, setViewNote] = useState(false)

   const closeViewNote = () => {
      setViewNote(false)
      refetchNotes()
   }

   return (
      <>
         <NoteWrapper isCard={isCard} openNote={() => setViewNote(true)}>
            <FaIcon icon={faPenToSquare} className="text-primary" />
            <div className="flex flex-1 flex-col gap-2">
               <h6 className="font-medium capitalize">
                  {variant} note - {format(new Date(createdDate), 'dd LLL yyyy')}
               </h6>
               <p className="text-grey-04">{note}</p>
               <div className="flex items-center justify-between">
                  {variant !== NoteVariantEnum.CUSTOMER && petName && (
                     <div className="flex items-center gap-1 text-primary">
                        <FaIcon icon={faPaw} size="sm" />
                        <p className="text-xs font-medium text-primary">{petName}</p>
                     </div>
                  )}
                  {variant === NoteVariantEnum.APPOINTMENT && (
                     <p className="text-xs font-medium text-primary">{`Appointment ${format(new Date(createdDate), 'dd LLL yyyy, hh:mm a')}`}</p>
                  )}
               </div>
            </div>
         </NoteWrapper>
         <ViewNoteModal open={viewNote} onOpenChange={setViewNote}>
            <ViewNote
               id={id}
               createdDate={createdDate}
               note={note}
               variant={variant}
               closeNoteAndRefetch={closeViewNote}
            />
         </ViewNoteModal>
      </>
   )
}
