import FaIcon from '@/components/common/fa-icon'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { faBan, faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Badge, Button, StaffSelectionEnum } from '@itsallsavvy/savvy-resuable-components'
import { format } from 'date-fns'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { CalendarItemActionEnum } from '@/stores/appointment/appointment-panel-store'
import { CalendarDrawerViewEnum } from '@/stores/appointment/appointment-drawer-store'

export default function ViewEventCard() {
   const { setOpenDrawer, setDrawerView } = useAppointmentDrawerStore((state) => state)
   const { selectedEventId, events, setCalendarItemAction } = useAppointmentPanelStore(
      (state) => state,
   )

   const selectedEvent = events.find((event) => event.id === selectedEventId)

   if (!selectedEvent) return null

   const {
      title,
      description,
      endDateTimeString,
      id,
      staffs,
      startDateTimeString,
      blockedOnlineBooking,
      frequency,
      isAppliedToAllStaff,
      staffSelection,
   } = selectedEvent

   const date = new Date(startDateTimeString)
   const startTime = format(startDateTimeString, 'hh:mm a')
   const endTime = format(endDateTimeString, 'hh:mm a')

   const frequencyText = frequency.split('_').join(' ')

   const handleEditEvent = () => {
      setDrawerView(CalendarDrawerViewEnum.ADD_EVENT)
      setCalendarItemAction(CalendarItemActionEnum.EDIT)
   }

   return (
      <div>
         <div className="flex items-start justify-between p-10">
            <div className="flex flex-col gap-2">
               <h6 className="text-2xl font-medium">
                  {title} {staffSelection === StaffSelectionEnum.ALL_STAFF && `- All Staff`}
               </h6>
               <div className="flex items-center gap-2">
                  <p className="font-medium">{format(date, 'iii, dd LLL yyyy')}</p>
                  <span className="h-1 w-1 rounded-full bg-text-primary" />
                  <p className="font-medium">
                     {startTime} - {endTime}
                  </p>
               </div>
               <p className="font-medium capitalize">{frequencyText}</p>
            </div>
            <div className="flex gap-4">
               <Button variant="icon" onClick={handleEditEvent}>
                  <FaIcon icon={faPen} className="text-grey-04" />
               </Button>
               <Button variant="icon" onClick={() => setOpenDrawer(false)}>
                  <FaIcon icon={faXmark} className="text-grey-04" />
               </Button>
            </div>
         </div>
         <div className="w-full px-10">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>
         <div className="flex flex-col gap-10 px-10 py-6">
            {blockedOnlineBooking && (
               <p className="text-sm font-medium text-grey-04">
                  <FaIcon icon={faBan} className="px-1 text-red-01" />
                  Online Booking Time Availabilities Blocked During Event Hours
               </p>
            )}
            <div className="flex flex-col gap-2">
               <p className="text-sm font-medium text-grey-04">Description</p>
               <p className="text-sm font-medium">{description}</p>
            </div>
            <div className="flex flex-col gap-2">
               <p className="text-sm font-medium text-grey-04">Apply Event To</p>
               <div className="flex flex-wrap gap-4">
                  {isAppliedToAllStaff ? (
                     <Badge
                        key={'all staff'}
                        className="border-0 bg-grey-04 px-4 py-2 text-text-primary"
                     >
                        All Staff
                     </Badge>
                  ) : (
                     staffs.map((staff) => (
                        <Badge
                           key={staff.id}
                           className="border-0 bg-grey-04 px-4 py-2 text-text-primary"
                        >
                           {staff.name}
                        </Badge>
                     ))
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}
