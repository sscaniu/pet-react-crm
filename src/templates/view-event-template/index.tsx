import ViewEvent from '@/components/calendar/view-calendar-item/view-event'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'

export default function ViewEventTemplate() {
   const { openDrawer } = useAppointmentDrawerStore((state) => state)

   if (!openDrawer) return <></>

   return <ViewEvent />
}
