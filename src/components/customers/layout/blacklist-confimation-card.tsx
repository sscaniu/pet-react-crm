import { Button, DropdownMenuLabel } from '@itsallsavvy/savvy-resuable-components'

interface Props {
   handleBlacklist: () => void
   loading: boolean
}

export default function BlacklistConfirmationCard({ handleBlacklist, loading }: Props) {
   return (
      <div className="flex w-full flex-col rounded-2xl border border-grey-06 bg-white px-10 shadow-01">
         <DropdownMenuLabel className="px-0 py-6 text-lg font-semibold">
            Are you sure you want to blacklist this customer?
         </DropdownMenuLabel>
         <div className="w-full">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>
         <div className="py-6">
            <p className="text-sm">
               Blacklisting this customer means you will be unable to book an appointment with them.
               They will be blocked from their customer portal and will not be able to book an
               online appointment.
            </p>
         </div>
         <div className="w-full">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>
         <div className="flex justify-end py-6">
            <Button color="secondary" onClick={handleBlacklist} isLoading={loading}>
               Blacklist
            </Button>
         </div>
      </div>
   )
}
