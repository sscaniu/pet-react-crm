import Note from '@/components/note/note'
import EmptyPlaceholder from '@/components/ui/empty-placeholder'
import { NoteVariantEnum } from '@/constants/customers-tabs'
import { listNotesByLinkIdAndVariant } from '@/fetcher/notes/queries/listNotesByLinkIdAndVariant'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { Loader } from '@itsallsavvy/savvy-resuable-components'
import useSWR from 'swr'

export default function AppointmentNotes() {
   const { selectedCustomerId } = useCustomerTableStore((state) => state)

   const {
      data: listAppointmentNotesData,
      isLoading: fetchingAppointmentNotes,
      mutate: refetchAppointmentNotes,
      isValidating,
   } = useSWR(
      selectedCustomerId
         ? [
              '/notes/listNotesByLinkIdAndVariant',
              selectedCustomerId,
              'CUSTOMER_ID',
              NoteVariantEnum.APPOINTMENT,
           ]
         : null,
      ([url, linkId, linkIdType, variant]) =>
         listNotesByLinkIdAndVariant({ url, linkId, linkIdType, variant }),
   )

   // Can remove isValidating if don't prefer loading screen while revalidating
   if (fetchingAppointmentNotes || isValidating) {
      return (
         <div className="flex h-[400px] w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   return (
      <div className="flex flex-col">
         {listAppointmentNotesData?.contents?.length ? (
            listAppointmentNotesData?.contents.map((note) => (
               <Note
                  key={note.id}
                  id={note.id}
                  createdDate={note.createdDate}
                  note={note.note}
                  variant={NoteVariantEnum.APPOINTMENT}
                  petName={note.petName}
                  refetchNotes={refetchAppointmentNotes}
               />
            ))
         ) : (
            <EmptyPlaceholder message="No appointment notes found for this customer." />
         )}
      </div>
   )
}
