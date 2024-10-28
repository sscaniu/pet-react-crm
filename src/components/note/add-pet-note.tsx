import FaIcon from '@/components/common/fa-icon'
import { NoteVariantEnum } from '@/constants/customers-tabs'
import { faFloppyDisk, faImage, faPaw, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Button, Textarea, SelectBox } from '@itsallsavvy/savvy-resuable-components'
import { useEffect, useRef, useState } from 'react'
import { createNote } from '@/fetcher/notes/mutations/createNote'

import useSWRMutation from 'swr/mutation'
import { CreateNoteArgs, LinkIdResponse } from '@/schemas/notes/create-note-schema'

interface Props {
   petId:
      | string
      | undefined /** can be undefined if adding from customer profile or appointment profile */
   customerId: string
   variant: NoteVariantEnum
   selectBoxOptions: SelectBoxOption[]
   closeNote: () => void
   closeNoteAndRefetch: () => void
}

export type SelectBoxOption = {
   label: string
   value: string
}
export default function AddPetNote({
   petId,
   customerId,
   variant,
   selectBoxOptions,
   closeNote,
   closeNoteAndRefetch,
}: Props) {
   const [note, setNote] = useState<string>('')
   const [selectedPetId, setSelectedPetId] = useState<string | undefined>(petId)
   const textareaRef = useRef<HTMLTextAreaElement>(null)

   const isSaveBtnDisabled = note.trim().length === 0

   const { trigger: createPetNoteMutation, isMutating: creatingPetNote } = useSWRMutation(
      '/notes',
      createNote,
   )

   const adjustHeight = () => {
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto'
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
   }

   const handleAddPetNote = () => {
      const customerLinkId: LinkIdResponse = {
         linkedId: customerId,
         linkedIdType: 'CUSTOMER_ID',
      }
      const linkIds: LinkIdResponse[] = [customerLinkId]

      if (selectedPetId) {
         const petLinkId: LinkIdResponse = {
            linkedId: selectedPetId,
            linkedIdType: 'PET_ID',
         }
         linkIds.push(petLinkId)
      }

      const createArgs: CreateNoteArgs = {
         note,
         linkIds: linkIds,
         variant: NoteVariantEnum.PET,
      }
      createPetNoteMutation(createArgs, { onSuccess: () => closeNoteAndRefetch() })
   }

   useEffect(() => {
      adjustHeight()
   }, [note])

   return (
      <div className="flex flex-col gap-6 rounded-md border border-grey-06 p-6">
         <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-3">
               <FaIcon icon={faPenToSquare} className="text-primary" />
               <Textarea
                  ref={textareaRef}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="max-h-[200px] min-h-[20px] resize-none border-0 py-1 focus:border-0"
                  placeholder="Add your note..."
               />
            </div>
            <FaIcon icon={faImage} size="xl" className="text-primary" />
         </div>
         <div className="flex items-center justify-between">
            {/* if adding a pet note from customer profile or appointment, we don't know who is the pet so user will select the pet for the Note
            if adding a pet note from pet profile, we have the petId so no need to select a pet */}
            {variant == NoteVariantEnum.PET && !petId && (
               <SelectBox
                  placeholder={
                     <div className="flex items-center gap-2">
                        <FaIcon icon={faPaw} />
                        Select Pet
                     </div>
                  }
                  className="h-8 w-[150px]"
                  name="selectedPetId"
                  options={selectBoxOptions}
                  value={selectedPetId}
                  onChange={(value) => setSelectedPetId(value)}
               />
            )}

            <div className="flex items-center gap-4">
               <Button variant="text" onClick={() => closeNote()} isDisabled={creatingPetNote}>
                  Cancel
               </Button>
               <Button
                  leftIcon={<FaIcon icon={faFloppyDisk} />}
                  onClick={handleAddPetNote}
                  isLoading={creatingPetNote}
                  isDisabled={isSaveBtnDisabled}
               >
                  Save Note
               </Button>
            </div>
         </div>
      </div>
   )
}
