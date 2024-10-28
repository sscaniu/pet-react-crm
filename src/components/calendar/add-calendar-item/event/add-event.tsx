import { FORMATTED_DATE_STRING } from '@/constants/utils'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { format, setHours, setMinutes, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'
import AddEventCard from '../../cards/add-event-card'
import { CalendarItemActionEnum, STAFFS } from '@/stores/appointment/appointment-panel-store'
import { FREQUENCY, FrequencyEnum } from '@/schemas/calendar/block-calendar-event-schema'

// dummy staffs data, will be removed after API integration

const startWorkingHour = '09:00'
const endWorkingHour = '17:00'

export default function AddEvent() {
   const { events, calendarItemAction, selectedEventId, currentDate, setEventPreview, addEvent } =
      useAppointmentPanelStore((state) => state)

   const { setOpenDrawer } = useAppointmentDrawerStore((state) => state)
   const [startTime, setStartTime] = useState<string>(startWorkingHour)
   const [endTime, setEndTime] = useState<string>(endWorkingHour)
   const [frequency, setFrequency] = useState<FrequencyEnum>(FREQUENCY.Enum.DOES_NOT_REPEAT)
   const [title, setTitle] = useState('')
   const [eventDate, setEventDate] = useState(currentDate)
   const [isAllDayEvent, setIsAllDayEvent] = useState(false)
   //TODO: Remove Fake Id
   const id = Math.random().toString()

   const [startHour, startMinute] = isAllDayEvent
      ? startWorkingHour.split(':')
      : startTime.split(':')
   const [endHour, endMinute] = isAllDayEvent ? endWorkingHour.split(':') : endTime.split(':')
   const startDateTimeString = format(
      setHours(setMinutes(eventDate, +startMinute), +startHour),
      FORMATTED_DATE_STRING,
   )
   const endDateTimeString = format(
      setHours(setMinutes(eventDate, +endMinute), +endHour),
      FORMATTED_DATE_STRING,
   )

   // const isAddEventBtnDisabled = !(
   //    frequency &&
   //    description.trim().length > 0 &&
   //    title.trim().length > 0
   // )

   // const handleAddEvent = () => {
   //    const event: EventProps = {
   //       id,
   //       description,
   //       title,
   //       //TODO: Integrate actual staffs and update logic with all staff selection
   //       staffs: STAFFS,
   //       blockedOnlineBooking: isBlockedOnlineBooking,
   //       startDateTimeString: startDateTimeString,
   //       endDateTimeString: endDateTimeString,
   //       frequency,
   //       isAppliedToAllStaff: staffSelection === StaffSelectionEnum.ALL_STAFF,
   //       staffSelection,
   //       isAllDayEvent,
   //    }
   //    addEvent(event)
   //    setOpenDrawer(false)
   // }

   useEffect(() => {
      if (calendarItemAction === CalendarItemActionEnum.EDIT) {
         const selectedEvent = events.find((event) => event.id === selectedEventId)
         if (!selectedEvent) return

         const newDate = new Date(startOfDay(selectedEvent.startDateTimeString))
         const newStartTime = format(selectedEvent.startDateTimeString, 'HH:mm')
         const newEndTime = format(selectedEvent.endDateTimeString, 'HH:mm')

         setTitle(selectedEvent.title)

         setIsAllDayEvent(selectedEvent.isAllDayEvent)
         // setFrequency(selectedEvent.frequency)
         setEventDate(newDate)
         setStartTime(newStartTime)
         setEndTime(newEndTime)
      }
   }, [calendarItemAction, events, selectedEventId])

   useEffect(() => {
      // TODO: Remove fake Id
      const id = Math.random().toString()
      const selectedEvent = events.find((event) => event.id === selectedEventId)

      const previewId = calendarItemAction === CalendarItemActionEnum.ADD ? id : selectedEvent!.id
      setEventPreview({ id: previewId, startDateTimeString, endDateTimeString })
   }, [
      endDateTimeString,
      calendarItemAction,
      events,
      selectedEventId,
      setEventPreview,
      startDateTimeString,
   ])

   return (
      <div className="flex min-h-screen w-full flex-1 flex-col justify-between">
         <AddEventCard
            eventDate={eventDate}
            setFrequency={setFrequency}
            date={eventDate}
            setDate={setEventDate}
            title={title}
            setTitle={setTitle}
            endTime={endTime}
            isAllDayEvent={isAllDayEvent}
            setIsAllDayEvent={setIsAllDayEvent}
            startTime={startTime}
            frequency={frequency}
            setEndTime={setEndTime}
            setStartTime={setStartTime}
            startDateTimeString={startDateTimeString}
            endDateTimeString={endDateTimeString}
         />
      </div>
   )
}
