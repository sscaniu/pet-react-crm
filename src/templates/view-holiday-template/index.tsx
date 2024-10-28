import ViewHoliday from '@/components/calendar/view-calendar-item/view-holiday'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'

export default function ViewHolidayTemplate() {
   const { openDrawer } = useAppointmentDrawerStore((state) => state)

   if (!openDrawer) return <></>

   return <ViewHoliday />
}
