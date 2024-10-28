import { useEffect, useState } from 'react'

import FaIcon from '@/components/common/fa-icon'
import Seperator from '@/components/common/seperator'
import { FORMATTED_DATE_STRING } from '@/constants/utils'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { CalendarAppointmentData } from '@/schemas/calendar/calendar-schema'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import {
   AppointmentProps,
   Badge,
   Button,
   Checkbox,
   convertMinutesToHoursAndMinutes,
   createDateTimeValue,
   DatePicker,
   generateConfirmAppointmentDateTime,
   generateTimeRangeOptions,
   TimePicker,
} from '@itsallsavvy/savvy-resuable-components'
import {
   addMinutes,
   differenceInMinutes,
   endOfWeek,
   format,
   isAfter,
   setHours,
   startOfDay,
   startOfWeek,
} from 'date-fns'

export default function RescheduleAppointment() {
   const {
      rescheduleAppointment,
      appointments,
      setRescheduleAppointment,
      setOpenRescheduleAppointmentModal,
      resetRescheduleAppointment,
   } = useAppointmentPanelStore((state) => state)
   const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(
      startOfDay(new Date(rescheduleAppointment!.startDateTimeString)),
   )

   const currentAppointment = appointments.find((appt) => appt.id === rescheduleAppointment?.id)

   const editDateTimeText = generateConfirmAppointmentDateTime(
      rescheduleAppointment!.startDateTimeString,
      rescheduleAppointment!.endDateTimeString,
   )

   const duration = differenceInMinutes(
      rescheduleAppointment!.endDateTimeString,
      rescheduleAppointment!.startDateTimeString,
   )

   const currentDateTimeText = currentAppointment
      ? generateConfirmAppointmentDateTime(
           currentAppointment.startDateTimeString,
           currentAppointment.endDateTimeString,
        )
      : ''

   const maxEndTime = setHours(startOfDay(rescheduleAppointment!.startDateTimeString), 17)

   const timeOptions = generateTimeRangeOptions(8, 17)

   const handleUpdateAppointment = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (
         rescheduleAppointment &&
         currentAppointment &&
         !isAfter(new Date(rescheduleAppointment.endDateTimeString), maxEndTime)
      ) {
         resetRescheduleAppointment()
         //TODO: Integrate reschedule appointment API mutation here
      }
   }

   const handleUpdateStartDateTime = (newStartTime: string) => {
      const newStartDateTimeString = format(
         createDateTimeValue(new Date(rescheduleAppointment!.startDateTimeString), newStartTime),
         FORMATTED_DATE_STRING,
      )

      const newEndDateTimeString = format(
         addMinutes(
            createDateTimeValue(new Date(rescheduleAppointment!.startDateTimeString), newStartTime),
            duration,
         ),
         FORMATTED_DATE_STRING,
      )

      const _rescheduleAppointment: AppointmentProps<CalendarAppointmentData> = {
         ...rescheduleAppointment!,
         startDateTimeString: newStartDateTimeString,
         endDateTimeString: newEndDateTimeString,
      }

      setRescheduleAppointment(_rescheduleAppointment)
   }

   // useEffect(() => {
   //    if (appointmentDate) {
   //       updateRescheduleAppointment(appointmentDate)
   //    }
   // }, [appointmentDate, updateRescheduleAppointment])

   if (!currentAppointment) {
      return <></>
   }

   return (
      <form className="w-full p-6" onSubmit={handleUpdateAppointment}>
         <h6 className="text-xl font-medium">
            Confirm this appointment reschedule for{' '}
            <span className="font-semibold text-primary">{currentAppointment.title}</span>
         </h6>
         <Seperator />
         <div className="flex flex-col gap-4">
            <div className="broder-grey-06 flex flex-col gap-1 rounded-2xl border px-6 py-4">
               <div className="flex items-center gap-2">
                  <p className="font-medium">{editDateTimeText} </p>
                  <Badge className="bg-primary bg-opacity-100 text-white">Changed</Badge>
               </div>

               <p className="font-medium text-grey-04 line-through">{currentDateTimeText}</p>

               {/* {subtitle && <p className="text-xs font-medium text-grey-04">{subtitle}</p>} */}
            </div>

            <div className="broder-grey-06 flex w-full flex-col gap-4 rounded-2xl border px-6 py-4">
               <div className="grid grid-cols-[1fr,360px] justify-between gap-4">
                  <h6 className="flex-1 flex-shrink-0 font-bold">New Appointment Date:</h6>
                  <DatePicker
                     value={appointmentDate}
                     onChange={setAppointmentDate}
                     name="appointment-date"
                     minDate={startOfWeek(rescheduleAppointment!.startDateTimeString)}
                     maxDate={endOfWeek(rescheduleAppointment!.startDateTimeString)}
                  />

                  <div>
                     <h6 className="flex-1 flex-shrink-0 font-bold">New Appointment Time:</h6>
                     <p className="text-sm font-medium text-primary">
                        {convertMinutesToHoursAndMinutes(duration)}
                     </p>
                  </div>
                  <div className="flex gap-4">
                     <TimePicker
                        options={timeOptions}
                        value={format(rescheduleAppointment!.startDateTimeString, 'HH:mm')}
                        onChange={handleUpdateStartDateTime}
                        placeholder={format(rescheduleAppointment!.startDateTimeString, 'hh.mm a')}
                        name="start-time"
                        label="Start"
                     />
                     <TimePicker
                        options={timeOptions}
                        disabled
                        value={format(rescheduleAppointment!.endDateTimeString, 'HH:mm')}
                        name="end-time"
                        label="End"
                     />
                  </div>
               </div>
               <p className="flex-1 text-sm font-medium">
                  <FaIcon icon={faCircleInfo} className="pr-2 text-grey-04" />
                  You cannot change the end time of the appointment as it is linked with the service
                  duration selected.
               </p>
            </div>
            <div className="flex items-center gap-2">
               <Checkbox />
               <p className="text-sm font-medium">
                  Notify the customer via email and/or SMS of their new appointment schedule.
               </p>
            </div>
            <Seperator />
            <div className="flex justify-end">
               <Button type="submit" color="secondary">
                  Confirm Reschedule
               </Button>
            </div>
         </div>
      </form>
   )
}
