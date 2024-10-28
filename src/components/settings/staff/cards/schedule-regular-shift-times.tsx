import { addTimeToDateTimeString, isDate } from '@/lib/utils'
import { StaffRota } from '../table/staff-rota-columns'
import FaIcon from '@/components/common/fa-icon'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {
   convertMinutesToHoursAndMinutes,
   TimePicker,
   Button,
   TimeCellSlot,
   generateTimeRangeOptions,
   Switch,
} from '@itsallsavvy/savvy-resuable-components'
import { differenceInMinutes, format } from 'date-fns'
import { SetStateAction, useState } from 'react'

interface Props {
   staffRota: StaffRota
}

const ScheduleRegularShiftTimes = ({ staffRota }: Props) => {
   const timeOptions = generateTimeRangeOptions(7, 21)
   const dateKeys = Object.keys(staffRota).filter(isDate)

   const [editStaffRota, setEditStaffRota] = useState(staffRota)

   return (
      <div className="flex flex-col gap-6 px-10 py-6">
         <h6 className="text-xl font-medium">Shift Time</h6>
         <div className="flex flex-col gap-4">
            {dateKeys.map((dateKey) => (
               <ShiftDay
                  key={dateKey}
                  dateKey={dateKey}
                  setEditStaffRota={setEditStaffRota}
                  slots={(editStaffRota[dateKey] as any)?.slots}
                  timeOptions={timeOptions}
               />
            ))}
         </div>
      </div>
   )
}

interface ShiftDayProps {
   dateKey: string
   slots: TimeCellSlot[]
   setEditStaffRota: React.Dispatch<SetStateAction<StaffRota>>
   timeOptions: { label: string; value: string }[]
}

const ShiftDay = ({ dateKey, slots = [], timeOptions, setEditStaffRota }: ShiftDayProps) => {
   const handleAddShift = () => {
      setEditStaffRota((prev) => {
         const existingSlots: TimeCellSlot[] = (prev?.[dateKey] as any)?.slots || []

         const newSlot: TimeCellSlot = {
            id: Math.random().toString(),
            startDateTimeString: existingSlots[0].startDateTimeString,
            endDateTimeString: existingSlots[0].endDateTimeString,
         }

         const updatedSlots: TimeCellSlot[] = [...existingSlots, newSlot]

         return {
            ...prev,
            [dateKey]: {
               ...(prev?.[dateKey] as any),
               slots: updatedSlots,
            },
         }
      })
   }

   return (
      <div className="flex items-start gap-6">
         <div className="flex items-center gap-3">
            <Switch checked />
            <p className="text-sm text-grey-04">{format(new Date(dateKey), 'iii')}</p>
         </div>
         <div className="flex flex-1 flex-col gap-4">
            {slots.map((slot, index) => (
               <ShiftSlot
                  dateKey={dateKey}
                  key={slot.id}
                  setEditStaffRota={setEditStaffRota}
                  index={index}
                  slot={slot}
                  timeOptions={timeOptions}
               />
            ))}
            <Button variant="text" onClick={handleAddShift}>
               + Add a Shift
            </Button>
         </div>
      </div>
   )
}

interface ShiftSlotProps {
   index: number
   slot: TimeCellSlot
   dateKey: string
   setEditStaffRota: React.Dispatch<SetStateAction<StaffRota>>
   timeOptions: { label: string; value: string }[]
}

const ShiftSlot = ({ index, slot, timeOptions, dateKey, setEditStaffRota }: ShiftSlotProps) => {
   const shiftDuration = convertMinutesToHoursAndMinutes(
      differenceInMinutes(new Date(slot.endDateTimeString), new Date(slot.startDateTimeString)),
   )

   const handleUpdateStartDateTimeString = (value: string, slot: TimeCellSlot) => {
      setEditStaffRota((prev) => {
         const startDateTimeString = addTimeToDateTimeString(value, slot.startDateTimeString)
         const existingSlots: TimeCellSlot[] = (prev?.[dateKey] as any).slots

         const slotIndex = existingSlots.findIndex((_slot) => _slot.id === slot.id)
         if (slotIndex === -1) return prev

         const updatedSlots = [...existingSlots]
         updatedSlots[slotIndex] = { ...existingSlots[slotIndex], startDateTimeString }

         return { ...prev, [dateKey]: { ...(prev[dateKey] as any), slots: updatedSlots } }
      })
   }

   const handleUpdateEndDateTimeString = (value: string, slot: TimeCellSlot) => {
      setEditStaffRota((prev) => {
         const endDateTimeString = addTimeToDateTimeString(value, slot.endDateTimeString)
         const existingSlots: TimeCellSlot[] = (prev?.[dateKey] as any).slots

         const slotIndex = existingSlots.findIndex((_slot) => _slot.id === slot.id)
         if (slotIndex === -1) return prev

         const updatedSlots = [...existingSlots]
         updatedSlots[slotIndex] = { ...existingSlots[slotIndex], endDateTimeString }

         return { ...prev, [dateKey]: { ...(prev[dateKey] as any), slots: updatedSlots } }
      })
   }

   return (
      <div className="flex w-full flex-col gap-2">
         <div className="flex items-center gap-2">
            <h6 className="text-sm font-bold">Shift {index + 1}</h6>
            <p className="text-sm font-medium text-grey-02">{shiftDuration}</p>
         </div>
         <div className="flex items-center gap-6">
            <TimePicker
               rightIcon="chevron"
               options={timeOptions}
               value={format(new Date(slot.startDateTimeString), 'HH:mm')}
               onChange={(value) => handleUpdateStartDateTimeString(value, slot)}
               name="start-time"
               label="Start"
               className="w-full"
            />
            <TimePicker
               rightIcon="chevron"
               options={timeOptions}
               value={format(new Date(slot.endDateTimeString), 'HH:mm')}
               onChange={(value) => handleUpdateEndDateTimeString(value, slot)}
               name="end-time"
               label="End"
            />
         </div>
      </div>
   )
}

export default ScheduleRegularShiftTimes
