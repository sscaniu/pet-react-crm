import FaIcon from '@/components/common/fa-icon'
import {
   NoteVariantEnum,
   DetailsTabEnum,
   InternalNotesTabEnum,
   SidebarNavEnum,
} from '@/constants/customers-tabs'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import AddPetNote from '../../note/add-pet-note'
import { Button, Loader } from '@itsallsavvy/savvy-resuable-components'
import { listNotesByLinkIdAndVariant } from '@/fetcher/notes/queries/listNotesByLinkIdAndVariant'
import { useCustomerDetailsStore } from '@/providers/customer/customer-details-store-provider'
import useSWR from 'swr'
import Note from '@/components/note/note'
import EmptyPlaceholder from '@/components/ui/empty-placeholder'

export default function PetInternalNotes() {
   const [openNote, setOpenNote] = useState<boolean>(false)
   const { petInformationData } = useCustomerDetailsStore((state) => state)

   const {
      data: listPetNotesData,
      isLoading: fetchingPetNotes,
      mutate: refetchPetNotes,
      isValidating,
   } = useSWR(
      petInformationData?.id
         ? [
              '/notes/listNotesByLinkIdAndVariant',
              petInformationData.id,
              'PET_ID',
              NoteVariantEnum.PET,
           ]
         : null,
      ([url, linkId, linkIdType, variant]) =>
         listNotesByLinkIdAndVariant({ url, linkId, linkIdType, variant }),
   )

   const petId = petInformationData?.id
   const customerId = petInformationData?.petOwnerId

   const { setMainNav, setCustomerDetailsNav, setInternalNotesNav } = useSidebarNavStore(
      (state) => state,
   )

   const handleNavigateInternalNotes = () => {
      setMainNav(SidebarNavEnum.CUSTOMER)
      setCustomerDetailsNav(DetailsTabEnum.NOTES)
      setInternalNotesNav(InternalNotesTabEnum.APPOINTMENT)
   }

   const handleOpenAddPetNote = () => {
      setOpenNote(true)
   }

   const handleCloseNoteAndRefetch = () => {
      setOpenNote(false)
      refetchPetNotes()
   }

   // Can remove isValidating if don't prefer loading screen while revalidating
   if (fetchingPetNotes || isValidating) {
      return (
         <div className="flex h-[400px] w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   return (
      <div className="flex flex-col gap-4">
         <h6 className="text-xl font-medium">Internal Notes</h6>
         {!openNote ? (
            <button
               className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-grey-01 px-6 py-4 text-sm font-bold text-grey-02 hover:bg-primary-light hover:text-primary"
               onClick={handleOpenAddPetNote}
            >
               + Add Pet Note
            </button>
         ) : (
            <>
               {customerId && petId && (
                  <AddPetNote
                     customerId={customerId}
                     petId={petId}
                     variant={NoteVariantEnum.PET}
                     selectBoxOptions={[]}
                     closeNote={() => setOpenNote(false)}
                     closeNoteAndRefetch={handleCloseNoteAndRefetch}
                  />
               )}
            </>
         )}
         <div className="flex flex-col gap-4">
            {listPetNotesData?.contents?.length ? (
               listPetNotesData?.contents.map((note) => (
                  <Note
                     isCard
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
               <EmptyPlaceholder message="No customer notes found for this customer." />
            )}
         </div>
         <Button
            variant="icon"
            color="secondary"
            className="inline-flex items-center gap-2 text-sm"
            onClick={handleNavigateInternalNotes}
         >
            <FaIcon icon={faEye} size="sm" /> See all internal notes
         </Button>
      </div>
   )
}
