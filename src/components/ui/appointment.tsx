import { faDog } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '../common/fa-icon'
import { AppointmentServiceType } from '@/schemas/appointment/appointment-info-schema'

interface Props {
   showPetName?: boolean
   appointmentService: AppointmentServiceType
}
export default function AppointmentService({ showPetName, appointmentService }: Props) {
   return (
      <div className="flex items-stretch gap-1">
         <div className="relative flex flex-col gap-2 px-4 py-1">
            <div className="absolute left-0 top-0 inline-flex h-full w-1 rounded-l-md bg-primary" />
            {showPetName && (
               <div className="flex items-center gap-1 text-xs">
                  <FaIcon icon={faDog} />
                  <p className="font-bold">{appointmentService.petName}</p>
                  <span className="font-medium">({appointmentService.breed})</span>
               </div>
            )}
            <h4 className="font-medium">{appointmentService.title}</h4>
            <p className="font-medium text-grey-04">{appointmentService.price}</p>
            <div className="flex items-center gap-2 text-sm">
               <p className="font-medium text-grey-04">{appointmentService.scheduleTime}</p>
               <div className="h-1 w-1 rounded-full bg-grey-04" />
               <p className="font-medium text-grey-04">{appointmentService.duration}</p>
            </div>
            <p className="text-sm font-medium text-grey-04">{appointmentService.groomer}</p>
         </div>
      </div>
   )
}
