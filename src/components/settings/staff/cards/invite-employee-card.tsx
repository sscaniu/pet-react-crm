import { Checkbox } from '@itsallsavvy/savvy-resuable-components'
import { SetStateAction } from 'react'

interface Props {
   isInviteEmployeeEnabled: boolean
   setIsInviteEmployeeEnabled: React.Dispatch<SetStateAction<boolean>>
}

export default function InviteEmployeeCard({
   isInviteEmployeeEnabled,
   setIsInviteEmployeeEnabled,
}: Props) {
   return (
      <div className="flex items-start gap-4 rounded-lg border border-primary bg-primary-light p-4">
         <Checkbox
            name="invite-employee"
            checked={isInviteEmployeeEnabled}
            onCheckedChange={(checked: boolean) => setIsInviteEmployeeEnabled(checked)}
         />
         <div className="flex flex-col gap-4">
            <h6 className="text-sm font-bold">Invite employee to a dashboard</h6>
            <p className="text-sm">
               Inviting a Staff will allow them to access the Savvy Dashboard of their assigned
               location with their own personal login credentials.
            </p>
         </div>
      </div>
   )
}
