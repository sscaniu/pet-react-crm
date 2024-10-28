import { AppointmentDayInfoType } from '@/schemas/appointment/appointment-info-schema'
import Appointment from './appointment'
import { format } from 'date-fns'

interface Props {
   appointment: AppointmentDayInfoType
   showPetName?: boolean
}

export default function Appointments({ appointment, showPetName }: Props) {
   const formattedAppointmentDate = format(appointment.date, 'EEE, dd MMM yyyy')

   return (
      <div className="flex flex-col gap-4">
         <p className="text-sm font-medium">
            {formattedAppointmentDate}, {appointment.date}
         </p>
         {appointment.services.map((appointmentService) => (
            <Appointment
               key={appointmentService.title}
               showPetName={showPetName}
               appointmentService={appointmentService}
            />
         ))}
      </div>
   )
}
