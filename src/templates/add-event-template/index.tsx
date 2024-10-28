import AddEvent from '@/components/calendar/add-calendar-item/event/add-event'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'

export default function AddEventTemplate() {
   const { openDrawer } = useAppointmentDrawerStore((state) => state)

   if (!openDrawer) return <></>

   return <AddEvent />
}
