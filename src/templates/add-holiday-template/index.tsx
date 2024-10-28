import AddHoliday from '@/components/calendar/add-calendar-item/holiday/add-holiday'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'

export default function AddHolidayTemplate() {
   const { openDrawer } = useAppointmentDrawerStore((state) => state)

   if (!openDrawer) return <></>

   return <AddHoliday />
}
