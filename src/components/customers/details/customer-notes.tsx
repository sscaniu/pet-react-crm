import Note from '@/components/note/note'
import { NoteVariantEnum } from '@/constants/customers-tabs'
import { listNotesByLinkIdAndVariant } from '@/fetcher/notes/queries/listNotesByLinkIdAndVariant'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { Button, Loader } from '@itsallsavvy/savvy-resuable-components'
import { useState } from 'react'
import useSWR from 'swr'
import AddCustomerNote from '../../note/add-customer-note'
import EmptyPlaceholder from '@/components/ui/empty-placeholder'

export default function CustomerNotes() {
   const { selectedCustomerId } = useCustomerTableStore((state) => state)
   const [openNote, setOpenNote] = useState<boolean>(false)

   const {
      data: listCustomerNotesData,
      isLoading: fetchingCustomerNotes,
      mutate: refetchCustomerNotes,
      isValidating,
   } = useSWR(
      selectedCustomerId
         ? [
              '/notes/listNotesByLinkIdAndVariant',
              selectedCustomerId,
              'CUSTOMER_ID',
              NoteVariantEnum.CUSTOMER,
           ]
         : null,
      ([url, linkId, linkIdType, variant]) =>
         listNotesByLinkIdAndVariant({ url, linkId, linkIdType, variant }),
   )

   const handleOpenAddCustomerNote = () => {
      setOpenNote(true)
   }

   const handleCloseNoteAndRefetch = () => {
      setOpenNote(false)
      refetchCustomerNotes()
   }

   // Can remove isValidating if don't prefer loading screen while revalidating
   if (fetchingCustomerNotes || isValidating) {
      return (
         <div className="flex h-[400px] w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   return (
      <div className="flex flex-col">
         <div className="border-b border-grey-01 p-6">
            {!openNote ? (
               <Button
                  variant="icon"
                  className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-grey-01 px-6 py-4 text-sm font-bold text-grey-02 hover:bg-primary-light hover:text-primary"
                  onClick={handleOpenAddCustomerNote}
               >
                  + Add Customer Note
               </Button>
            ) : (
               <>
                  {selectedCustomerId && (
                     <AddCustomerNote
                        customerId={selectedCustomerId}
                        closeNote={() => setOpenNote(false)}
                        closeNoteAndRefetch={handleCloseNoteAndRefetch}
                     />
                  )}
               </>
            )}
         </div>
         {listCustomerNotesData?.contents?.length ? (
            listCustomerNotesData?.contents.map((note) => (
               <Note
                  key={note.id}
                  id={note.id}
                  createdDate={note.createdDate}
                  note={note.note}
                  variant={NoteVariantEnum.CUSTOMER}
                  refetchNotes={refetchCustomerNotes}
               />
            ))
         ) : (
            <EmptyPlaceholder message="No customer notes found for this customer." />
         )}
      </div>
   )
}
