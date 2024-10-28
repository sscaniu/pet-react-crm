import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { CalendarItemActionEnum } from '@/stores/appointment/appointment-panel-store'
import { Button } from '@itsallsavvy/savvy-resuable-components'

interface Props {
   onAddHoliday: () => void
   isAddHolidayBtnDisabled: boolean
}

export default function AddHolidayAction({ onAddHoliday, isAddHolidayBtnDisabled }: Props) {
   const { setOpenDrawer } = useAppointmentDrawerStore((state) => state)
   const { calendarItemAction } = useAppointmentPanelStore((state) => state)

   //TODO: Integrate real mutations after APIs are integrated
   const handleSubmitAction = () => {
      if (calendarItemAction === CalendarItemActionEnum.ADD) {
         onAddHoliday()
         setOpenDrawer(false)
      } else if (calendarItemAction === CalendarItemActionEnum.EDIT) {
         return
      }
   }

   return (
      <div className="sticky bottom-0 flex justify-end border-t border-grey-01 bg-grey-00 px-4 py-6">
         <Button
            color="secondary"
            onClick={handleSubmitAction}
            isDisabled={isAddHolidayBtnDisabled}
         >
            {calendarItemAction === CalendarItemActionEnum.ADD ? `Add Holiday` : `Update Holiday`}
         </Button>
      </div>
   )
}
