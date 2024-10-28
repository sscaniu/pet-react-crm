import AddPetNote, { SelectBoxOption } from '@/components/note/add-pet-note'
import Note from '@/components/note/note'
import { NoteVariantEnum } from '@/constants/customers-tabs'
import { listNotesByLinkIdAndVariant } from '@/fetcher/notes/queries/listNotesByLinkIdAndVariant'
import { useCustomerDetailsStore } from '@/providers/customer/customer-details-store-provider'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { Button, Loader } from '@itsallsavvy/savvy-resuable-components'
import { useState } from 'react'
import useSWR from 'swr'
import { useEffect } from 'react'
import { getAllPetsByCustomerId } from '@/fetcher/pet/queries/getAllPetsByCustomerId'
import EmptyPlaceholder from '@/components/ui/empty-placeholder'

export default function PetNotes() {
   const { selectedCustomerId } = useCustomerTableStore((state) => state)
   const { setRefetchPetsList } = useCustomerDetailsStore((state) => state)
   const [openNote, setOpenNote] = useState<boolean>(false)
   const [selectBoxOptions, setSelectBoxOptions] = useState<SelectBoxOption[]>([])

   const {
      data: getAllPetsListData,
      isLoading: fetchingPetsList,
      mutate: refetchPetsList,
   } = useSWR(
      selectedCustomerId ? ['/pet/loadCustomersPets', selectedCustomerId] : null,
      ([url, id]) => getAllPetsByCustomerId({ url, id }),
   )

   const {
      data: listPetNotesData,
      isLoading: fetchingPetNotes,
      mutate: refetchPetNotes,
      isValidating,
   } = useSWR(
      selectedCustomerId
         ? [
              '/notes/listNotesByLinkIdAndVariant',
              selectedCustomerId,
              'CUSTOMER_ID',
              NoteVariantEnum.PET,
           ]
         : null,
      ([url, linkId, linkIdType, variant]) =>
         listNotesByLinkIdAndVariant({ url, linkId, linkIdType, variant }),
   )

   const handleOpenAddPetNote = () => {
      setOpenNote(true)
   }

   const handleCloseNoteAndRefetch = () => {
      setOpenNote(false)
      refetchPetNotes()
   }

   useEffect(() => {
      if (getAllPetsListData) {
         const items: SelectBoxOption[] = getAllPetsListData.map((pet) => {
            const item: SelectBoxOption = { label: pet.name, value: pet.id }
            return item
         })
         setSelectBoxOptions(items)
      }
      // So if setRefetchPetsList changes (ie. selected customer changes) it will automatically refresh the list
   }, [getAllPetsListData, refetchPetsList, setRefetchPetsList])

   // Can remove isValidating if don't prefer loading screen while revalidating
   if (fetchingPetNotes || isValidating) {
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
                  onClick={handleOpenAddPetNote}
               >
                  + Add Pet Note
               </Button>
            ) : (
               <>
                  {selectedCustomerId && (
                     <AddPetNote
                        petId={undefined}
                        customerId={selectedCustomerId}
                        variant={NoteVariantEnum.PET}
                        selectBoxOptions={selectBoxOptions}
                        closeNote={() => setOpenNote(false)}
                        closeNoteAndRefetch={handleCloseNoteAndRefetch}
                     />
                  )}
               </>
            )}
         </div>
         {listPetNotesData?.contents?.length ? (
            listPetNotesData?.contents.map((note) => (
               <Note
                  key={note.id}
                  id={note.id}
                  createdDate={note.createdDate}
                  note={note.note}
                  variant={NoteVariantEnum.PET}
                  petName={note.petName}
                  refetchNotes={refetchPetNotes}
               />
            ))
         ) : (
            <EmptyPlaceholder message="No pet notes found for this customer." />
         )}
      </div>
   )
}
