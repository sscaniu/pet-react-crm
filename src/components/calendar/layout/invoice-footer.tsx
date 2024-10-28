import FaIcon from '@/components/common/fa-icon'
import { cn } from '@/lib/utils'
import { faChevronDown, faDollarSign, faPlus } from '@fortawesome/free-solid-svg-icons'
import {
   Badge,
   Button,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@itsallsavvy/savvy-resuable-components'
import { AppointmentInfoType } from '@/schemas/appointment/appointment-info-schema'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'

interface Props {
   appointment?: AppointmentInfoType
}

export default function InvoiceFooter({ appointment }: Props) {
   return (
      <div className="sticky bottom-0 border-t border-grey-06 bg-grey-00">
         <div className="flex items-center justify-between p-6">
            <div className="flex flex-col gap-2">
               <h6 className="text-sm font-medium text-grey-04">Total Costs</h6>
               <Badge variant="danger" className="gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-01">
                     <FaIcon icon={faDollarSign} className="h-4 w-4 text-white" />
                  </div>
                  {appointment?.invoiceStatus}
               </Badge>
            </div>
            <div className="flex-col gap-2">
               <div className="flex gap-2">
                  <p className="text-xl font-medium">{appointment?.totalCost}</p>
                  <p className="text-sm font-medium text-grey-02">
                     {`(Inc. `} {appointment?.taxPercent} {`% Tax)`}
                  </p>
               </div>
               <p className="text-sm font-medium text-grey-02">
                  {`Deposit/Fixed Fee - `}
                  {appointment?.depositPercent}%
               </p>
            </div>
         </div>
         <div className="w-full">
            <div className="h-[1.5px] w-full bg-grey-05" />
         </div>
         <div className={cn('flex items-stretch justify-between p-6', {})}>
            {/* <Badge className="border-grey-04 bg-transparent text-grey-04">Other Actions</Badge> */}
            <OtherActionsDropdownButton appointmentId={appointment!.id} />
            <Button type="submit" color="secondary">
               Mark as Paid
            </Button>
         </div>
      </div>
   )
}

const OtherActionsDropdownButton = ({ appointmentId }: { appointmentId: string }) => {
   const { appointments, setIsRescheduleMode, setRescheduleAppointmentPreview } =
      useAppointmentPanelStore((state) => state)
   const { setOpenDrawer } = useAppointmentDrawerStore((state) => state)

   const handleRescheduleAppointment = () => {
      setOpenDrawer(false)
      setIsRescheduleMode(true)

      const updateAppointment = appointments.find((appt) => appt.id === appointmentId)!
      setRescheduleAppointmentPreview({
         id: updateAppointment.id,
         startDateTimeString: updateAppointment.startDateTimeString,
         endDateTimeString: updateAppointment.endDateTimeString,
      })
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="outlined"
               className="border-grey-04 text-grey-04"
               rightIcon={<FaIcon icon={faChevronDown} />}
            >
               Other Actions
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="center" className="ml-2" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem>Set as Repeating</DropdownMenuItem>
            <DropdownMenuItem>See Appointment Activity</DropdownMenuItem>
            <DropdownMenuItem onClick={handleRescheduleAppointment}>
               Reschedule Appointment
            </DropdownMenuItem>
            {/* <Seperator /> */}
            <DropdownMenuItem>Set Payment Request</DropdownMenuItem>
            <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
            {/* <Seperator /> */}
            <DropdownMenuItem className="text-red-01">Cancel Appointment</DropdownMenuItem>
            <DropdownMenuItem className="text-red-01">Blacklist Customer</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
