import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { useEffect } from 'react'

export default function AppointmentMessageBox() {
   const { setOpenDrawer, setOpenMessageBox } = useAppointmentDrawerStore((state) => state)

   useEffect(() => {
      setOpenDrawer(false)
      setOpenMessageBox(true)
   }, [setOpenDrawer, setOpenMessageBox])

   return <></>
}
