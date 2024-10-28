import { NoteVariantEnum } from '@/constants/customers-tabs'
import FaIcon from '../common/fa-icon'
import { updateNote } from '@/fetcher/notes/mutations/updateNote'
import { deleteNote } from '@/fetcher/notes/mutations/deleteNote'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { Button, Textarea } from '@itsallsavvy/savvy-resuable-components'
import { useEffect, useRef, useState } from 'react'

import useSWRMutation from 'swr/mutation'
import { UpdateNoteArgs } from '@/schemas/notes/notes-schema'

interface Props {
   id: string
   variant: NoteVariantEnum
   createdDate: string
   note: string
   closeNoteAndRefetch: () => void
}

export default function ViewNote({ id, variant, createdDate, note, closeNoteAndRefetch }: Props) {
   const [editNote, setEditNote] = useState(false)
   const [noteText, setNoteText] = useState(note)
   const textareaRef = useRef<HTMLTextAreaElement>(null)

   const { trigger: updateNoteMutation } = useSWRMutation('/notes', updateNote)

   const { trigger: deleteNoteMutation } = useSWRMutation(
      `/notes/${id}`,
      (url) => deleteNote(url),
      {
         onSuccess: () => {
            closeNoteAndRefetch() // Handle success
         },
         onError: (error) => {
            //TODO: implement error handling depending on design requirements
            console.error('Error deleting note:', error) // Handle error
         },
      },
   )

   const adjustHeight = () => {
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto'
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
   }

   const handleDiscardChanges = () => {
      setEditNote(false)
      setNoteText(note)
   }

   const handleUpdateNote = () => {
      const updateArgs: UpdateNoteArgs = {
         note: noteText,
         id,
      }
      updateNoteMutation(updateArgs, { onSuccess: () => closeNoteAndRefetch() })
   }

   const handleDeleteNote = () => {
      deleteNoteMutation()
   }

   useEffect(() => {
      if (editNote) {
         adjustHeight()
      }
   }, [noteText, editNote])

   return (
      <div className="flex flex-col rounded-2xl bg-white px-10">
         <div className="flex items-center gap-2 py-6">
            <FaIcon icon={faPenToSquare} className="text-primary" />
            <h6 className="font-medium capitalize">
               {variant} note - {format(new Date(createdDate), 'dd LLL yyyy')}
            </h6>
         </div>
         <div className="w-full">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>

         <div className="flex flex-1 flex-col gap-2 py-6">
            {editNote ? (
               <Textarea
                  ref={textareaRef}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="max-h-[200px] min-h-[10px] resize-none p-6"
                  placeholder="Add your note..."
               />
            ) : (
               <p className="text-sm text-grey-04">{note}</p>
            )}
         </div>
         <div className="w-full">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>
         <div className="flex justify-between py-6">
            {!editNote ? (
               <>
                  <Button
                     className="bg-red-01 text-white hover:bg-red-02 focus:ring-red-01"
                     onClick={handleDeleteNote}
                  >
                     Delete Note
                  </Button>
                  <Button color="secondary" onClick={() => setEditNote(true)}>
                     Edit Note
                  </Button>
               </>
            ) : (
               <>
                  <Button variant="text" color="secondary" onClick={handleDiscardChanges}>
                     Discard Chagnes
                  </Button>
                  <Button color="secondary" onClick={handleUpdateNote}>
                     Save Changes
                  </Button>
               </>
            )}
         </div>
      </div>
   )
}
