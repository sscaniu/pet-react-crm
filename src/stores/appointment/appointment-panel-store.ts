import { createStore } from 'zustand/vanilla'
import { LoadAppointmentResponse } from '@/schemas/appointment/appointment-info-schema'
import {
   AppointmentProps,
   EventProps,
   FrequencyEnum,
   HolidayProps,
   PreviewProps,
   StaffSelectionEnum,
} from '@itsallsavvy/savvy-resuable-components'
import { format, setDate, setMonth, startOfDay } from 'date-fns'
import { CalendarAppointmentData } from '@/schemas/calendar/calendar-schema'
import { FORMATTED_DATE_STRING } from '@/constants/utils'

export const STAFFS = [
   { id: '1', name: 'Aris Bron' },
   { id: '2', name: 'Luna Lovegood' },
   { id: '3', name: 'Hermione Granger' },
]

export const HOLIDAYS = [
   {
      id: '012',
      title: 'Pizza Party',
      description: 'Event description lorem ispum dolor sit',
      staffs: STAFFS,
      blockedOnlineBooking: false,
      startDateTimeString: '2024-09-12T08:00:00.00',
      endDateTimeString: '2024-09-12T12:00:00.00',
      frequency: FrequencyEnum.DOES_NOT_REPEAT,
      isAppliedToAllStaff: true,
      staffSelection: StaffSelectionEnum.ALL_STAFF,
      isAllDayEvent: false,
   },
   {
      id: '013',
      title: 'Dentist Appointment',
      description: 'Event description lorem ispum dolor sit',
      staffs: STAFFS,
      blockedOnlineBooking: true,
      startDateTimeString: '2024-09-21T09:00:00.00',
      endDateTimeString: '2024-09-21T12:00:00.00',
      frequency: FrequencyEnum.DOES_NOT_REPEAT,
      isAppliedToAllStaff: true,
      staffSelection: StaffSelectionEnum.ALL_STAFF,
      isAllDayEvent: false,
   },
   {
      id: '014',
      title: 'Company Dinner',
      description: 'Event description lorem ispum dolor sit',
      staffs: STAFFS,
      blockedOnlineBooking: true,
      startDateTimeString: '2024-09-22T15:00:00.00',
      endDateTimeString: '2024-09-22T17:00:00.00',
      frequency: FrequencyEnum.DOES_NOT_REPEAT,
      isAppliedToAllStaff: true,
      staffSelection: StaffSelectionEnum.ALL_STAFF,
      isAllDayEvent: false,
   },
]

export enum CalendarItemActionEnum {
   ADD = 'add',
   EDIT = 'edit',
}

export type AppointmentPanelState = {
   appointments: AppointmentProps<CalendarAppointmentData>[]
   currentDate: Date
   isRescheduleMode: boolean
   selectedAppointmentId?: string
   selectedEventId?: string
   selectedHolidayId?: string
   calendarItemAction: CalendarItemActionEnum
   openRescheduleAppointmentModal: boolean
   rescheduleAppointment?: AppointmentProps<CalendarAppointmentData>
   eventPreview?: PreviewProps
   holidayPreview?: PreviewProps
   rescheduleAppointmentPreview?: PreviewProps
   appointmentInformationData?: LoadAppointmentResponse
   // dummy states and will be removed when API is integrated
   events: EventProps[] //TODO: do we have to store events on a store?
   holidays: HolidayProps[]
}

export type AppointmentPanelActions = {
   setCurrentDate: (state: AppointmentPanelState['currentDate']) => void
   setCalendarItemAction: (state: AppointmentPanelState['calendarItemAction']) => void
   setIsRescheduleMode: (state: AppointmentPanelState['isRescheduleMode']) => void
   setAppointments: (state: AppointmentPanelState['appointments']) => void
   setAppointmentInformationData: (
      state: AppointmentPanelState['appointmentInformationData'],
   ) => void
   setOpenRescheduleAppointmentModal: (
      state: AppointmentPanelState['openRescheduleAppointmentModal'],
   ) => void
   updateRescheduleAppointment: (appointmentDate: Date) => void
   resetRescheduleAppointment: () => void
   setRescheduleAppointment: (state: AppointmentPanelState['rescheduleAppointment']) => void
   setRescheduleAppointmentPreview: (
      state: AppointmentPanelState['rescheduleAppointmentPreview'],
   ) => void
   setSelectedAppoitmentId: (state: AppointmentPanelState['selectedAppointmentId']) => void
   setSelectedEventId: (state: AppointmentPanelState['selectedEventId']) => void
   setSelectedHolidayId: (state: AppointmentPanelState['selectedHolidayId']) => void
   setEventPreview: (state: AppointmentPanelState['eventPreview']) => void
   setHolidayPreview: (state: AppointmentPanelState['holidayPreview']) => void
   addEvent: (state: EventProps) => void
   addHoliday: (state: HolidayProps) => void
   resetPanelStore: () => void
}

export type AppointmentPanelStore = AppointmentPanelState & AppointmentPanelActions

export const initAppointmentPanelStore = (): AppointmentPanelState => {
   return {
      appointments: [],
      isRescheduleMode: false,
      openRescheduleAppointmentModal: false,
      currentDate: startOfDay(new Date()),
      calendarItemAction: CalendarItemActionEnum.ADD,
      events: [],
      holidays: HOLIDAYS,
   }
}

export const defaultInitState: AppointmentPanelState = {
   appointments: [],
   isRescheduleMode: false,
   openRescheduleAppointmentModal: false,
   currentDate: startOfDay(new Date()),
   calendarItemAction: CalendarItemActionEnum.ADD,
   events: [],
   holidays: HOLIDAYS,
}

export const createAppointmentPanelStore = (
   initState: AppointmentPanelState = defaultInitState,
) => {
   return createStore<AppointmentPanelStore>()((set) => ({
      ...initState,
      setAppointments: (appointments) => set(() => ({ appointments })),
      setCurrentDate: (date) => set(() => ({ currentDate: date })),
      setSelectedAppoitmentId: (id) => set(() => ({ selectedAppointmentId: id })),
      setSelectedEventId: (id) => set(() => ({ selectedEventId: id })),
      setIsRescheduleMode: (mode) => set(() => ({ isRescheduleMode: mode })),
      setSelectedHolidayId: (id) => set(() => ({ selectedHolidayId: id })),
      setAppointmentInformationData: (data) => set(() => ({ appointmentInformationData: data })),
      setRescheduleAppointment: (appointment) =>
         set(() => ({ rescheduleAppointment: appointment })),
      setRescheduleAppointmentPreview: (preview) =>
         set(() => ({ rescheduleAppointmentPreview: preview })),
      updateRescheduleAppointment: (appointmentDate: Date) =>
         set((state) => ({
            rescheduleAppointment: state.rescheduleAppointment
               ? {
                    ...state.rescheduleAppointment,
                    startDateTimeString: format(
                       setDate(
                          setMonth(
                             new Date(state.rescheduleAppointment.startDateTimeString),
                             appointmentDate.getMonth(),
                          ),
                          appointmentDate.getDate(),
                       ),
                       FORMATTED_DATE_STRING,
                    ),
                    endDateTimeString: format(
                       setDate(
                          setMonth(
                             new Date(state.rescheduleAppointment.endDateTimeString),
                             appointmentDate.getMonth(),
                          ),
                          appointmentDate.getDate(),
                       ),
                       FORMATTED_DATE_STRING,
                    ),
                 }
               : undefined,
         })),
      setCalendarItemAction: (action) => set(() => ({ calendarItemAction: action })),
      setEventPreview: (preview) => set(() => ({ eventPreview: preview })),
      setHolidayPreview: (preview) => set(() => ({ holidayPreview: preview })),
      addEvent: (event) => set((prev) => ({ events: [...prev.events, event] })),
      addHoliday: (holiday) => set((prev) => ({ holidays: [...prev.holidays, holiday] })),
      setOpenRescheduleAppointmentModal: (open) =>
         set(() => ({ openRescheduleAppointmentModal: open })),
      resetRescheduleAppointment: () =>
         set(() => ({
            isRescheduleMode: false,
            rescheduleAppointment: undefined,
            rescheduleAppointmentPreview: undefined,
            openRescheduleAppointmentModal: false,
         })),
      resetPanelStore: () =>
         set(() => ({
            calendarItemAction: CalendarItemActionEnum.ADD,
            selectedEventId: undefined,
            selectedHolidayId: undefined,
            eventPreview: undefined,
            holidayPreview: undefined,
         })),
   }))
}
