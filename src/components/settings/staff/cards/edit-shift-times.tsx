import FaIcon from '@/components/common/fa-icon'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {
   ScrollArea,
   TimeCellSlot,
   TimePicker,
   Button,
   SelectBox,
   Textarea,
   generateTimeRangeOptions,
   DurationOfLeaveEnum,
   convertMinutesToHoursAndMinutes,
} from '@itsallsavvy/savvy-resuable-components'
import { differenceInMinutes, setHours, setMinutes } from 'date-fns'
import { format } from 'date-fns'
import { StaffRota } from '../table/staff-rota-columns'
import { SetStateAction } from 'react'
import { useStaffRotaTableStore } from '@/providers/staff/staff-rota-table-store-provider'
import { FORMATTED_DATE_STRING } from '@/constants/utils'
import { addTimeToDateTimeString } from '@/lib/utils'

interface Props {
   staffRota: StaffRota
   slot: TimeCellSlot
   editShifts: TimeCellSlot[]
   partialLeaveShift: TimeCellSlot
   durationOfLeave: DurationOfLeaveEnum | undefined
   description: string
   editDateString: string
   setPartialLeaveShift: React.Dispatch<SetStateAction<TimeCellSlot>>
   setEditShifts: React.Dispatch<SetStateAction<TimeCellSlot[]>>
   setDurationOfLeave: React.Dispatch<SetStateAction<DurationOfLeaveEnum | undefined>>
   setDescription: React.Dispatch<SetStateAction<string>>
   openConfirmation: () => void
}

export default function EditShiftTimes({
   description,
   editShifts,
   slot,
   staffRota,
   durationOfLeave,
   partialLeaveShift,
   editDateString,
   setPartialLeaveShift,
   setEditShifts,
   setDescription,
   setDurationOfLeave,
   openConfirmation,
}: Props) {
   const { setStaffRotaEditChanges } = useStaffRotaTableStore((state) => state)
   const timeOptions = generateTimeRangeOptions(7, 21)
   const durationOfLeaveOptions = Object.values(DurationOfLeaveEnum).map((leave) => ({
      label: leave,
      value: leave,
   }))

   const handleUpdateStartDateTimeString = (value: string, slot: TimeCellSlot) => {
      setEditShifts((prev) => {
         const shiftIndex = prev.findIndex((s) => s.id === slot.id)
         if (shiftIndex === -1) return prev

         const updatedShifts = [...prev]

         const startDateTimeString = addTimeToDateTimeString(
            value,
            updatedShifts[shiftIndex].startDateTimeString,
         )
         updatedShifts[shiftIndex] = { ...updatedShifts[shiftIndex], startDateTimeString }

         return updatedShifts
      })
   }

   const handleUpdatePartialLeaveStartDateTimeString = (value: string) => {
      setPartialLeaveShift((prev) => {
         const startDateTimeString = addTimeToDateTimeString(value, prev.startDateTimeString)
         return { ...prev, startDateTimeString }
      })
   }

   const handleUpdateEndDateTimeString = (value: string, slot: TimeCellSlot) => {
      setEditShifts((prev) => {
         const shiftIndex = prev.findIndex((s) => s.id === slot.id)
         if (shiftIndex === -1) return prev

         const updatedShifts = [...prev]

         const endDateTimeString = addTimeToDateTimeString(
            value,
            updatedShifts[shiftIndex].endDateTimeString,
         )
         updatedShifts[shiftIndex] = { ...updatedShifts[shiftIndex], endDateTimeString }

         return updatedShifts
      })
   }

   const handleUpdatePartialLeaveEndDateTimeString = (value: string) => {
      setPartialLeaveShift((prev) => {
         const endDateTimeString = addTimeToDateTimeString(value, prev.endDateTimeString)
         return { ...prev, endDateTimeString }
      })
   }

   const handleAddShift = () => {
      setEditShifts((prev) => [
         ...prev,
         {
            id: Math.random().toString(),
            startDateTimeString: prev[0].startDateTimeString,
            endDateTimeString: prev[0].endDateTimeString,
         },
      ])
   }

   const handleRemoveShift = (slot: TimeCellSlot) => {
      setEditShifts((prev) => prev.filter((s) => s.id !== slot.id))
   }

   const handleSaveChanges = () => {
      const editedStaffRota: StaffRota = {
         ...staffRota,
         [editDateString]: { ...(staffRota[editDateString] as any), slots: editShifts },
      }

      let _editedStaffRota: StaffRota = editedStaffRota

      if (durationOfLeave === DurationOfLeaveEnum.ALL_DAY_LEAVE) {
         _editedStaffRota = {
            ...editedStaffRota,
            [editDateString]: {
               ...(editedStaffRota[editDateString] as any),
               slots: (editedStaffRota[editDateString] as any).slots.map((s: TimeCellSlot) => ({
                  ...s,
                  durationOfLeave,
                  isOnLeave: true,
                  leaveDescription: description,
               })),
            },
         }
      }

      if (durationOfLeave === DurationOfLeaveEnum.PARTIAL_LEAVE) {
         _editedStaffRota = {
            ...editedStaffRota,
            [editDateString]: {
               ...(editedStaffRota[editDateString] as any),
               slots: [
                  ...(editedStaffRota[editDateString] as any).slots,
                  { ...partialLeaveShift, leaveDescription: description },
               ],
            },
         }
      }

      setStaffRotaEditChanges(_editedStaffRota)
      openConfirmation()
   }

   return (
      <>
         <div className="border-b border-grey-01 py-6">
            <div>
               {/* TODO: User profile avatar */}
               <div className="flex flex-col gap-1">
                  <h5 className="text-2xl font-medium">{staffRota.name}</h5>
                  <p className="text-xl font-medium text-grey-04">
                     {format(new Date(slot.startDateTimeString), 'iii, dd LLLL, yyyy')}
                  </p>
               </div>
            </div>
         </div>
         <ScrollArea className="h-[60vh]">
            <div className="flex flex-col gap-6 py-6">
               <h5 className="text-lg font-medium">Shift Time</h5>

               {editShifts.map((_slot: TimeCellSlot, index: number) => (
                  <div key={_slot.id} className="flex flex-col gap-2">
                     <div className="flex items-center gap-2">
                        <h6 className="text-sm font-bold">Shift {index + 1}</h6>
                        <p className="text-sm font-medium text-grey-02">
                           {convertMinutesToHoursAndMinutes(
                              differenceInMinutes(
                                 _slot.endDateTimeString,
                                 _slot.startDateTimeString,
                              ),
                           )}
                        </p>
                     </div>
                     <div className="flex items-center gap-6">
                        <div className="flex flex-1 items-center gap-6">
                           <TimePicker
                              rightIcon="chevron"
                              options={timeOptions}
                              value={format(_slot.startDateTimeString, 'HH:mm')}
                              onChange={(value) => handleUpdateStartDateTimeString(value, _slot)}
                              name="start-time"
                              label="Start"
                              className="w-full"
                              disabled={durationOfLeave === DurationOfLeaveEnum.ALL_DAY_LEAVE}
                           />
                           <TimePicker
                              rightIcon="chevron"
                              options={timeOptions}
                              value={format(_slot.endDateTimeString, 'HH:mm')}
                              onChange={(value) => handleUpdateEndDateTimeString(value, _slot)}
                              name="end-time"
                              label="End"
                              disabled={durationOfLeave === DurationOfLeaveEnum.ALL_DAY_LEAVE}
                           />
                        </div>
                        <Button variant="icon" onClick={() => handleRemoveShift(_slot)}>
                           <FaIcon icon={faTrash} className="text-grey-04" />
                        </Button>
                     </div>
                  </div>
               ))}
               <Button variant="text" onClick={handleAddShift}>
                  + Add a Shift
               </Button>
               <div className="w-full">
                  <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
               </div>
               <div className="flex flex-col gap-6">
                  <h5 className="text-xl font-medium">On leave</h5>
                  <div className="flex flex-col gap-2">
                     <h6 className="text-sm font-bold">Duration of Leave</h6>
                     <SelectBox
                        value={durationOfLeave}
                        onChange={(value) => setDurationOfLeave(value as DurationOfLeaveEnum)}
                        name="duration of leave"
                        options={durationOfLeaveOptions}
                     />
                  </div>
                  {durationOfLeave === DurationOfLeaveEnum.PARTIAL_LEAVE && (
                     <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                           <h6 className="text-sm font-bold">Time on Leave</h6>
                           <p className="text-sm font-medium text-grey-02">
                              {convertMinutesToHoursAndMinutes(
                                 differenceInMinutes(
                                    partialLeaveShift.endDateTimeString,
                                    partialLeaveShift.startDateTimeString,
                                 ),
                              )}
                           </p>
                        </div>

                        <div className="flex flex-1 items-center gap-6">
                           <TimePicker
                              rightIcon="chevron"
                              options={timeOptions}
                              value={format(partialLeaveShift.startDateTimeString, 'HH:mm')}
                              onChange={handleUpdatePartialLeaveStartDateTimeString}
                              name="start-time"
                              label="Start"
                              className="w-full"
                           />
                           <TimePicker
                              rightIcon="chevron"
                              options={timeOptions}
                              value={format(partialLeaveShift.endDateTimeString, 'HH:mm')}
                              onChange={handleUpdatePartialLeaveEndDateTimeString}
                              name="end-time"
                              label="End"
                           />
                        </div>
                     </div>
                  )}
                  {(durationOfLeave === DurationOfLeaveEnum.ALL_DAY_LEAVE ||
                     durationOfLeave === DurationOfLeaveEnum.PARTIAL_LEAVE) && (
                     <div className="flex flex-col gap-2">
                        <h6 className="text-sm font-bold">Description</h6>
                        <Textarea
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                        />
                     </div>
                  )}
               </div>
            </div>
         </ScrollArea>
         <div className="flex items-center justify-between border-t border-grey-06 py-6">
            <Button variant="text" className="text-red-01 hover:text-red-02">
               Delete
            </Button>
            <Button color="secondary" onClick={handleSaveChanges}>
               Save
            </Button>
         </div>
      </>
   )
}
