'use client'
import { loadCalendarEntriesByRange } from '@/fetcher/calendar/queries/loadCalendarEntriesByRange'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { useShopConfigStore } from '@/providers/global/shop-config-store-provider'
import { CalendarAppointmentData } from '@/schemas/calendar/calendar-schema'
import { CalendarDrawerViewEnum } from '@/stores/appointment/appointment-drawer-store'
import {
   AppointmentCalendar,
   AppointmentDragEndEvent,
   AppointmentProps,
   CalendarViewEnum,
   EventProps,
   FrequencyEnum,
   StaffSelectionEnum,
} from '@itsallsavvy/savvy-resuable-components'
import {
   addMinutes,
   differenceInMinutes,
   endOfMonth,
   endOfWeek,
   endOfYear,
   format,
   startOfMonth,
   startOfWeek,
   startOfYear,
} from 'date-fns'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import AppointmentBody from '../appointment/appointment-body'
import CalendarActionDropdownButton from '../appointment/calendar-action-dropdown-button'
import EventBody from '../appointment/event-body'
import EventTooltips from '../appointment/event-tooltips'
import HolidayTooltips from '../appointment/holiday-tooltips'
import { FORMATTED_DATE_STRING } from '@/constants/utils'

export default function AppointmentScheduler() {
   const [calendarView, setCalendarView] = useState<CalendarViewEnum>(CalendarViewEnum.DAY)

   const { selectedLocationId } = useShopConfigStore((state) => state)
   const { setOpenDrawer, setDrawerView } = useAppointmentDrawerStore((state) => state)
   const {
      appointments,
      holidays,
      eventPreview,
      holidayPreview,
      currentDate,
      rescheduleAppointmentPreview,
      isRescheduleMode,
      setRescheduleAppointmentPreview,
      setRescheduleAppointment,
      setAppointments,
      setOpenRescheduleAppointmentModal,
      setCurrentDate,
      setSelectedHolidayId,
      setSelectedAppoitmentId,
      setSelectedEventId,
   } = useAppointmentPanelStore((state) => state)

   const getStartDateString = () => {
      switch (calendarView) {
         case CalendarViewEnum.DAY:
            return format(currentDate, 'yyyy-MM-dd')
         case CalendarViewEnum.WEEK: {
            const startOfWeekDate = startOfWeek(currentDate)
            return format(startOfWeekDate, 'yyyy-MM-dd')
         }
         case CalendarViewEnum.MONTH: {
            const startOfMonthDate = startOfMonth(currentDate)
            return format(startOfMonthDate, 'yyyy-MM-dd')
         }
         case CalendarViewEnum.YEAR: {
            const startOfYearDate = startOfYear(currentDate)
            return format(startOfYearDate, 'yyyy-MM-dd')
         }

         default:
            return format(currentDate, 'yyyy-MM-dd')
      }
   }

   const getEndDateString = () => {
      switch (calendarView) {
         case CalendarViewEnum.DAY:
            return format(currentDate, 'yyyy-MM-dd')
         case CalendarViewEnum.WEEK: {
            const endOfWeekDate = endOfWeek(currentDate)
            return format(endOfWeekDate, 'yyyy-MM-dd')
         }
         case CalendarViewEnum.MONTH: {
            const endOfMonthDate = endOfMonth(currentDate)
            return format(endOfMonthDate, 'yyyy-MM-dd')
         }
         case CalendarViewEnum.YEAR: {
            const endOfYearDate = endOfYear(currentDate)
            return format(endOfYearDate, 'yyyy-MM-dd')
         }
         default:
            return format(currentDate, 'yyyy-MM-dd')
      }
   }

   const { data: calendarEntriesData } = useSWR(
      [
         '/calendarCompositeV3/loadEntriesByRangeV3',
         {
            start: getStartDateString(),
            end: getEndDateString(),
            ...(selectedLocationId ? { filterLocations: [selectedLocationId] } : {}),
         },
      ],
      ([url, args]) => loadCalendarEntriesByRange({ url, args }),
   )

   const calendarEvents =
      calendarEntriesData && calendarEntriesData.events && calendarEntriesData.events.length > 0
         ? calendarEntriesData.events.map((ce) => {
              const entry: EventProps = {
                 id: ce.id,
                 title: ce.title,
                 description: ce.description,
                 startDateTimeString: ce.startDateTimeString,
                 endDateTimeString: ce.endDateTimeString,
                 blockedOnlineBooking: ce.blockOnlineBooking,
                 isAppliedToAllStaff: ce.allStaff,
                 isAllDayEvent: ce.allDay,
                 staffSelection: ce.allStaff
                    ? StaffSelectionEnum.ALL_STAFF
                    : StaffSelectionEnum.SPECIFIC_STAFF, //TODO is this still needed?
                 frequency: FrequencyEnum.DOES_NOT_REPEAT, //TODO to be implemented once repeat events is implemented
                 staffs: [], //TODO need to have global stores for users
              }

              return entry
           })
         : []

   const handleClickAppointment = (id: string) => {
      setSelectedAppoitmentId(id)
      setDrawerView(CalendarDrawerViewEnum.DETAILS)
      setOpenDrawer(true)
   }

   const handleClickEvent = (id: string) => {
      setSelectedEventId(id)
      setDrawerView(CalendarDrawerViewEnum.VIEW_EVENT)
      setOpenDrawer(true)
   }

   const handleClickHoliday = (id: string) => {
      setSelectedHolidayId(id)
      setDrawerView(CalendarDrawerViewEnum.VIEW_HOLIDAY)
      setOpenDrawer(true)
   }

   const handleDragEnd = (event: AppointmentDragEndEvent) => {
      const { active, over } = event
      const updateAppointmentId = active?.id
      const updateAppointment = appointments.find((apt) => apt.id === updateAppointmentId)

      if (updateAppointment && over) {
         const newStartDateTime = new Date(over.data?.current?.dateTime)

         const duration = differenceInMinutes(
            updateAppointment.endDateTimeString,
            updateAppointment.startDateTimeString,
         )

         const newEndDateTime = addMinutes(newStartDateTime, duration)
         const rescheduleAppointment = {
            ...updateAppointment,
            startDateTimeString: format(newStartDateTime, FORMATTED_DATE_STRING),
            endDateTimeString: format(newEndDateTime, FORMATTED_DATE_STRING),
         }

         setOpenRescheduleAppointmentModal(true)
         setRescheduleAppointment(rescheduleAppointment)
      }
   }

   const handleClickCell = (dateTimeString: string) => {
      if (rescheduleAppointmentPreview && isRescheduleMode) {
         const updateAppointment = appointments.find(
            (appt) => appt.id === rescheduleAppointmentPreview.id,
         )
         const newStartDateTime = new Date(dateTimeString)

         const duration = differenceInMinutes(
            rescheduleAppointmentPreview.endDateTimeString,
            rescheduleAppointmentPreview.startDateTimeString,
         )

         const newEndDateTime = addMinutes(newStartDateTime, duration)
         const rescheduleAppointment = {
            ...updateAppointment!,
            startDateTimeString: format(newStartDateTime, FORMATTED_DATE_STRING),
            endDateTimeString: format(newEndDateTime, FORMATTED_DATE_STRING),
         }

         setOpenRescheduleAppointmentModal(true)
         setRescheduleAppointment(rescheduleAppointment)
      }
   }

   const handleHoverCell = (dateTimeString: string) => {
      if (rescheduleAppointmentPreview && isRescheduleMode) {
         const newStartDateTime = new Date(dateTimeString)

         const duration = differenceInMinutes(
            rescheduleAppointmentPreview.endDateTimeString,
            rescheduleAppointmentPreview.startDateTimeString,
         )

         const newEndDateTime = addMinutes(newStartDateTime, duration)
         const _rescheduleAppointmentPreview = {
            ...rescheduleAppointmentPreview,
            startDateTimeString: format(newStartDateTime, FORMATTED_DATE_STRING),
            endDateTimeString: format(newEndDateTime, FORMATTED_DATE_STRING),
         }

         // setOpenRescheduleAppointmentModal(true)
         setRescheduleAppointmentPreview(_rescheduleAppointmentPreview)
      }
   }

   useEffect(() => {
      const appointments =
         calendarEntriesData &&
         calendarEntriesData.appointments &&
         calendarEntriesData.appointments.length > 0
            ? calendarEntriesData.appointments.map((ce) => {
                 const entry: AppointmentProps<CalendarAppointmentData> = {
                    id: ce.id,
                    title: ce.title,
                    data: ce.data,
                    startDateTimeString: ce.startDateTimeString,
                    endDateTimeString: ce.endDateTimeString,
                 }

                 return entry
              })
            : []
      setAppointments(appointments)
   }, [calendarEntriesData, setAppointments])

   useEffect(() => {
      if (eventPreview) {
         setCurrentDate(new Date(eventPreview.startDateTimeString))
      }
   }, [eventPreview, setCurrentDate])

   useEffect(() => {
      if (holidayPreview) {
         setCurrentDate(new Date(holidayPreview.startDateTimeString))
      }
   }, [holidayPreview, setCurrentDate])

   return (
      <AppointmentCalendar
         onHoverCell={handleHoverCell}
         currentDate={currentDate}
         onDragEnd={handleDragEnd}
         calendarView={calendarView}
         onClickCell={handleClickCell}
         holidays={holidays}
         rescheduleAppointmentPreview={rescheduleAppointmentPreview}
         onClickHolidayItem={handleClickHoliday}
         setCurrentDate={setCurrentDate as any}
         setCalendarView={setCalendarView}
         events={calendarEvents}
         renderEventTooltips={(event) => <EventTooltips event={event} />}
         renderHolidayTooltips={(holiday) => <HolidayTooltips holiday={holiday} />}
         onClickEventItem={handleClickEvent}
         renderEventBody={(event) => <EventBody event={event} />}
         renderCalendarActionButton={() => <CalendarActionDropdownButton />}
         eventPreview={eventPreview}
         holidayPreview={holidayPreview}
         renderAppointmentBody={(appointment) => <AppointmentBody appointment={appointment} />}
         appointments={appointments}
         onClickAppointment={handleClickAppointment}
      />
   )
}
