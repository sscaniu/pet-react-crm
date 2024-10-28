import { FORMATTED_DATE_STRING } from '@/constants/utils'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { CalendarItemActionEnum, STAFFS } from '@/stores/appointment/appointment-panel-store'
import {
   FrequencyEnum,
   HolidayProps,
   StaffSelectionEnum,
} from '@itsallsavvy/savvy-resuable-components'
import { format, setHours, setMinutes, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'
import AddHolidayCard from '../../cards/add-holiday-card'
import AddHolidayAction from './add-holiday-action'

const startWorkingHour = '09:00'
const endWorkingHour = '17:00'

export default function AddHoliday() {
   const {
      holidays,
      calendarItemAction,
      selectedHolidayId,
      currentDate,
      setHolidayPreview,
      addHoliday,
   } = useAppointmentPanelStore((state) => state)

   const { setOpenDrawer } = useAppointmentDrawerStore((state) => state)
   const [startTime, setStartTime] = useState<string>(startWorkingHour)
   const [endTime, setEndTime] = useState<string>(endWorkingHour)
   const [frequency, setFrequency] = useState<FrequencyEnum>(FrequencyEnum.DOES_NOT_REPEAT)
   const [staffSelection, setStaffSelection] = useState<StaffSelectionEnum>(
      StaffSelectionEnum.ALL_STAFF,
   )
   const [title, setTitle] = useState('')
   const [holidayDate, setHolidayDate] = useState(currentDate)
   const [description, setDescription] = useState('')
   const [isAllDayEvent, setIsAllDayEvent] = useState(false)
   const [isBlockedOnlineBooking, setIsBlockedOnlineBooking] = useState(true)
   //TODO: Remove Fake Id
   const id = Math.random().toString()

   const [startHour, startMinute] = isAllDayEvent
      ? startWorkingHour.split(':')
      : startTime.split(':')
   const [endHour, endMinute] = isAllDayEvent ? endWorkingHour.split(':') : endTime.split(':')
   const startDateTimeString = format(
      setHours(setMinutes(holidayDate, +startMinute), +startHour),
      FORMATTED_DATE_STRING,
   )
   const endDateTimeString = format(
      setHours(setMinutes(holidayDate, +endMinute), +endHour),
      FORMATTED_DATE_STRING,
   )

   const isAddHolidayBtnDisabled = !(
      frequency &&
      description.trim().length > 0 &&
      title.trim().length > 0
   )

   const handleAddHoliday = () => {
      const holiday: HolidayProps = {
         id,
         description,
         title,
         staffs: STAFFS,
         blockedOnlineBooking: isBlockedOnlineBooking,
         startDateTimeString: startDateTimeString,
         endDateTimeString: endDateTimeString,
         frequency,
         isAppliedToAllStaff: staffSelection === StaffSelectionEnum.ALL_STAFF,
         staffSelection,
         isAllDayEvent,
      }
      addHoliday(holiday)
      setOpenDrawer(false)
   }

   useEffect(() => {
      if (calendarItemAction === CalendarItemActionEnum.EDIT) {
         const selectedHoliday = holidays.find((holiday) => holiday.id === selectedHolidayId)
         if (!selectedHoliday) return

         const newDate = new Date(startOfDay(selectedHoliday.startDateTimeString))
         const newStartTime = format(selectedHoliday.startDateTimeString, 'HH:mm')
         const newEndTime = format(selectedHoliday.endDateTimeString, 'HH:mm')

         setTitle(selectedHoliday.title)
         setDescription(selectedHoliday.description)
         setIsBlockedOnlineBooking(!!selectedHoliday.blockedOnlineBooking)

         setStaffSelection(selectedHoliday.staffSelection)
         setIsAllDayEvent(selectedHoliday.isAllDayEvent)
         setFrequency(selectedHoliday.frequency)
         setHolidayDate(newDate)
         setStartTime(newStartTime)
         setEndTime(newEndTime)
      }
   }, [calendarItemAction, holidays, selectedHolidayId])

   useEffect(() => {
      // TODO: Remove fake Id
      const id = Math.random().toString()
      const selectedHoliday = holidays.find((holiday) => holiday.id === selectedHolidayId)

      const previewId = calendarItemAction === CalendarItemActionEnum.ADD ? id : selectedHoliday!.id
      setHolidayPreview({ id: previewId, startDateTimeString, endDateTimeString })
   }, [
      endDateTimeString,
      calendarItemAction,
      holidays,
      selectedHolidayId,
      setHolidayPreview,
      startDateTimeString,
   ])

   return (
      <div className="flex min-h-screen w-full flex-1 flex-col justify-between">
         <AddHolidayCard
            date={holidayDate}
            setFrequency={setFrequency}
            setDate={setHolidayDate}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            isBlockedOnlineBooking={isBlockedOnlineBooking}
            setIsBlockedOnlineBooking={setIsBlockedOnlineBooking}
            endTime={endTime}
            isAllDayEvent={isAllDayEvent}
            setIsAllDayEvent={setIsAllDayEvent}
            startTime={startTime}
            frequency={frequency}
            setEndTime={setEndTime}
            setStaffSelection={setStaffSelection}
            setStartTime={setStartTime}
            staffSelection={staffSelection}
         />

         <AddHolidayAction
            onAddHoliday={handleAddHoliday}
            isAddHolidayBtnDisabled={isAddHolidayBtnDisabled}
         />
      </div>
   )
}
