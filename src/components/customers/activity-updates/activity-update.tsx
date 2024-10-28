import FaIcon from '@/components/common/fa-icon'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { Notification } from '@/schemas/customers-and-pets/notifications-schema'

interface Props {
   notification?: Notification
}

export default function ActivityUpdate({ notification }: Props) {
   //const formattedDateIssued = format(notification?.dateIssued, 'dd MMM yyyy h:mma')

   // TODO: Implement the activity is seen or not

   return (
      <div className="flex items-start gap-3 border-b border-grey-06 p-6" key={notification?.title}>
         <FaIcon icon={faBell} size="lg" className="pt-1 text-primary" />
         <div className="flex flex-1 flex-col gap-2">
            <div className="flex w-full items-center justify-between">
               <h6 className="font-medium">{notification?.title}</h6>
               <span className="h-3 w-3 rounded-full bg-red-01" />
            </div>
            <p className="text-sm italic text-grey-02">{notification?.description}</p>
            <p className="text-sm text-grey-02">{notification?.dateIssued}</p>
         </div>
      </div>
   )
}
