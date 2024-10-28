import FaIcon from '@/components/common/fa-icon'
import { faBan, faClock, faPencil, faUser } from '@fortawesome/free-solid-svg-icons'
import { Badge, EventProps, HolidayProps } from '@itsallsavvy/savvy-resuable-components'
import { format } from 'date-fns'

interface Props {
   holiday: HolidayProps
}

export default function HolidayTooltips({ holiday }: Props) {
   const eventTime = `${format(holiday.startDateTimeString, 'hh:mm a')} - ${format(holiday.endDateTimeString, 'hh:mm a')}`

   return (
      <div className="flex flex-col gap-6 p-6">
         <div className="item-center flex gap-4">
            <h6 className="font-bold">{holiday.title}</h6>
            <Badge className="border-grey-04 bg-transparent text-grey-04">Holiday</Badge>
         </div>
         <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
               <FaIcon icon={faClock} />
               <p className="text-sm">{eventTime}</p>
            </div>

            <div className="flex items-center gap-2">
               <FaIcon icon={faPencil} />
               <p className="text-sm">{holiday.description}</p>
            </div>

            <div className="flex items-center gap-2">
               <FaIcon icon={faUser} />
               <p className="text-sm">{holiday.staffs.length} staff</p>
            </div>

            {holiday.blockedOnlineBooking && (
               <div className="flex items-center gap-2">
                  <FaIcon icon={faBan} className="text-red-01" />
                  <p className="text-sm">{`Online Booking Unavailable ${holiday.isAllDayEvent ? 'for whole day' : `from ${eventTime}`}`}</p>
               </div>
            )}
         </div>
      </div>
   )
}
