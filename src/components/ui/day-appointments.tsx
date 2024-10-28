import Appointment from './appointment'
import { AppointmentDayInfoType } from '@/schemas/appointment/appointment-info-schema'

interface Props {
   appointmentDay: AppointmentDayInfoType
   showPetName?: boolean
}

export default function DayAppointments({ appointmentDay, showPetName }: Props) {
   return (
      <div className="flex flex-col gap-4">
         <p className="text-sm font-medium">{appointmentDay.date}</p>
         {appointmentDay.services.map((appointmentService) => (
            <Appointment
               key={appointmentService.title}
               showPetName={showPetName}
               appointmentService={appointmentService}
            />
         ))}
      </div>
   )
}
