import FaIcon from '@/components/common/fa-icon'
import { createNote } from '@/fetcher/notes/mutations/createNote'
import { NoteVariantEnum } from '@/constants/customers-tabs'
import { CreateNoteArgs, LinkIdResponse } from '@/schemas/notes/create-note-schema'
import { faFloppyDisk, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Button, Textarea } from '@itsallsavvy/savvy-resuable-components'
import { useEffect, useRef, useState } from 'react'

import useSWRMutation from 'swr/mutation'

interface Props {
   customerId: string
   closeNote: () => void
   closeNoteAndRefetch: () => void
}

export default function AddCustomerNote({ customerId, closeNote, closeNoteAndRefetch }: Props) {
   const [note, setNote] = useState<string>('')
   const textareaRef = useRef<HTMLTextAreaElement>(null)

   const isSaveBtnDisabled = note.trim().length === 0

   const { trigger: createCustomerNoteMutation, isMutating: creatingCustomerNote } = useSWRMutation(
      '/notes',
      createNote,
   )

   const adjustHeight = () => {
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto'
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
   }

   const handleAddCustomerNote = () => {
      const linkId: LinkIdResponse = {
         linkedId: customerId,
         linkedIdType: 'CUSTOMER_ID',
      }

      const linkIds: LinkIdResponse[] = [linkId]

      const createArgs: CreateNoteArgs = {
         note,
         linkIds: linkIds,
         variant: NoteVariantEnum.CUSTOMER,
      }
      createCustomerNoteMutation(createArgs, { onSuccess: () => closeNoteAndRefetch() })
   }

   useEffect(() => {
      adjustHeight()
   }, [note])

   return (
      <div className="flex flex-col gap-6 rounded-md border border-grey-06 p-6">
         <div className="flex items-center justify-between">
            <div className="flex flex-1 items-start gap-3">
               <FaIcon icon={faPenToSquare} className="pt-1 text-primary" />
               <Textarea
                  ref={textareaRef}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="max-h-[200px] min-h-[20px] resize-none border-0 py-1 focus:border-0"
                  placeholder="Add your note..."
               />
            </div>
         </div>
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Button variant="text" onClick={() => closeNote()} isDisabled={creatingCustomerNote}>
                  Cancel
               </Button>
               <Button
                  leftIcon={<FaIcon icon={faFloppyDisk} />}
                  onClick={handleAddCustomerNote}
                  isLoading={creatingCustomerNote}
                  isDisabled={isSaveBtnDisabled}
               >
                  Save Note
               </Button>
            </div>
         </div>
      </div>
   )
}
