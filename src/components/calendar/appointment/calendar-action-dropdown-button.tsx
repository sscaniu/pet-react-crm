import FaIcon from '@/components/common/fa-icon'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { CalendarDrawerViewEnum } from '@/stores/appointment/appointment-drawer-store'
import { faChevronDown, faP, faPlus } from '@fortawesome/free-solid-svg-icons'
import {
   Button,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@itsallsavvy/savvy-resuable-components'

export default function CalendarActionDropdownButton() {
   const { setOpenDrawer, setDrawerView } = useAppointmentDrawerStore((state) => state)

   const handleOpenAddEventDrawer = () => {
      setOpenDrawer(true)
      setDrawerView(CalendarDrawerViewEnum.ADD_EVENT)
   }

   const handleOpenAddHolidayDrawer = () => {
      setOpenDrawer(true)
      setDrawerView(CalendarDrawerViewEnum.ADD_HOLIDAY)
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               color="secondary"
               leftIcon={<FaIcon icon={faPlus} />}
               rightIcon={<FaIcon icon={faChevronDown} />}
            >
               Create
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="center" className="ml-2" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem>New Appointment</DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenAddEventDrawer}>Add Event</DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenAddHolidayDrawer}>Add Holiday</DropdownMenuItem>
            <DropdownMenuItem>Block Online Booking</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
