import FaIcon from '@/components/common/fa-icon'
import { convertTime24to12 } from '@/lib/utils'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import {
   Button,
   CalendarDropdown,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@itsallsavvy/savvy-resuable-components'
import { format } from 'date-fns'
import { SetStateAction, useState } from 'react'

interface Props {
   date: Date
   startTime: string
   endTime: string
   frequency: string
   isAllDayEvent: boolean
   setDate: React.Dispatch<SetStateAction<Date>>
}

export default function AddHolidayHeader({
   date,
   startTime,
   endTime,
   frequency,
   setDate,
   isAllDayEvent,
}: Props) {
   const { setOpenDrawer } = useAppointmentDrawerStore((state) => state)
   const [openCalendar, setOpenCalendar] = useState(false)

   return (
      <div className="flex items-start justify-between p-10">
         <div className="flex flex-col gap-2">
            <DropdownMenu open={openCalendar} onOpenChange={setOpenCalendar}>
               <DropdownMenuTrigger asChild>
                  <p className="text-2xl font-medium">
                     {format(date, 'iii, dd LLL yyyy')}
                     <FaIcon icon={faChevronDown} size="xs" className="px-2 text-base" />
                  </p>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  align="center"
                  className="ml-2"
                  onClick={(e) => e.stopPropagation()}
               >
                  <CalendarDropdown
                     currentDate={date}
                     setCurrentDate={setDate}
                     closeDropdown={() => setOpenCalendar(false)}
                  />
               </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2">
               <p className="font-medium">
                  {`${convertTime24to12(startTime)} - ${convertTime24to12(endTime)} ${isAllDayEvent ? `(All Day)` : ``}`}
               </p>
               <span className="h-1 w-1 rounded-full bg-text-primary" />
               <p className="font-medium capitalize">{frequency.split('_').join(' ')}</p>
            </div>
         </div>
         <Button variant="icon" onClick={() => setOpenDrawer(false)}>
            <FaIcon icon={faXmark} className="text-grey-04" />
         </Button>
      </div>
   )
}
