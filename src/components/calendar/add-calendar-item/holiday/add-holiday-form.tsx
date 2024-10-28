import RadioItem from '@/components/ui/radio-item'
import { cn } from '@/lib/utils'
import { STAFFS } from '@/stores/appointment/appointment-panel-store'
import { SelectOption } from '@/types/utils'
import {
   Badge,
   Checkbox,
   FrequencyEnum,
   generateTimeRangeOptions,
   Label,
   RadioGroup,
   RadioGroupItem,
   SelectBox,
   StaffSelectionEnum,
   Textarea,
   TextInput,
   TimePicker,
} from '@itsallsavvy/savvy-resuable-components'
import { SetStateAction } from 'react'

interface Props {
   startTime: string
   endTime: string
   staffSelection: StaffSelectionEnum
   isAllDayEvent: boolean
   isBlockedOnlineBooking: boolean
   description: string
   title: string
   frequency: FrequencyEnum
   setFrequency: React.Dispatch<SetStateAction<FrequencyEnum>>
   setTitle: React.Dispatch<SetStateAction<string>>
   setDescription: React.Dispatch<SetStateAction<string>>
   setIsBlockedOnlineBooking: React.Dispatch<SetStateAction<boolean>>
   setIsAllDayEvent: React.Dispatch<SetStateAction<boolean>>
   setStaffSelection: React.Dispatch<SetStateAction<StaffSelectionEnum>>
   setStartTime: React.Dispatch<SetStateAction<string>>
   setEndTime: React.Dispatch<SetStateAction<string>>
}

export default function AddHolidayForm({
   endTime,
   startTime,
   staffSelection,
   isAllDayEvent,
   description,
   isBlockedOnlineBooking,
   title,
   frequency,
   setFrequency,
   setTitle,
   setDescription,
   setIsBlockedOnlineBooking,
   setEndTime,
   setStaffSelection,
   setIsAllDayEvent,
   setStartTime,
}: Props) {
   const timeOptions = generateTimeRangeOptions(7, 21)

   const frequencyOptions: SelectOption[] = Object.values(FrequencyEnum).map((frq) => ({
      label: frq.split('_').join(' '),
      value: frq,
   }))

   return (
      <div className="flex flex-col gap-6 p-10">
         <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
               <p className="text-sm font-medium text-grey-04">Holiday Title</p>
               <TextInput
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="holiday-tile"
               />
            </div>

            <div className="flex flex-col gap-2">
               <p className="text-sm font-medium text-grey-04">Time</p>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                     <TimePicker
                        disabled={isAllDayEvent}
                        name="start-time"
                        value={startTime}
                        options={timeOptions}
                        rightIcon="clock"
                        onChange={(value) => setStartTime(value)}
                        className="w-fit"
                     />
                     <p>-</p>
                     <TimePicker
                        disabled={isAllDayEvent}
                        name="end-time"
                        value={endTime}
                        options={timeOptions}
                        onChange={(value) => setEndTime(value)}
                        rightIcon="clock"
                        className="w-fit"
                     />
                  </div>
                  <div className="flex items-center gap-4">
                     <Checkbox
                        checked={isAllDayEvent}
                        onCheckedChange={(checked: boolean) => setIsAllDayEvent(checked)}
                        id="select-day"
                     />
                     <Label htmlFor="select-day">All Day</Label>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <p className="text-sm font-medium text-grey-04">Event Title</p>
               <SelectBox
                  value={frequency}
                  options={frequencyOptions}
                  onChange={(value) => setFrequency(value as FrequencyEnum)}
                  name="event-tile"
               />
            </div>

            <div className="flex flex-col gap-2">
               <p className="text-sm font-medium text-grey-04">Add Description</p>
               <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="add-description"
               />
            </div>
         </div>
         <div className="flex items-center gap-4 rounded-lg border border-grey-01 bg-grey-00 px-4 py-3">
            <Checkbox
               id="block-online-booking"
               checked={isBlockedOnlineBooking}
               onCheckedChange={(checked: boolean) => setIsBlockedOnlineBooking(checked)}
            />
            <Label htmlFor="block-online-booking">
               Block Online Booking Time Availability During Event Hours
            </Label>
         </div>
         <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-grey-04">Apply Event To</p>
            <RadioGroup
               value={staffSelection}
               onValueChange={(value) => setStaffSelection(value as StaffSelectionEnum)}
            >
               <RadioItem value={StaffSelectionEnum.ALL_STAFF} id="all-staffs" label="All Staff" />
               <RadioItem
                  label="Specific Staff"
                  value={StaffSelectionEnum.SPECIFIC_STAFF}
                  id="specific-staff"
               >
                  <div
                     className={cn(
                        'rounded-2xl border border-grey-06 transition-all duration-300 ease-out',
                        {
                           'mt-6 max-h-screen opacity-100':
                              staffSelection === StaffSelectionEnum.SPECIFIC_STAFF,
                           'mt-0 h-0 max-h-0 overflow-hidden opacity-0':
                              staffSelection !== StaffSelectionEnum.SPECIFIC_STAFF,
                        },
                     )}
                  >
                     <div className="flex flex-col gap-4 p-6">
                        <div className="flex flex-col gap-2">
                           <p className="text-sm font-medium text-grey-04">Search Staff</p>
                           <TextInput placeholder="Search Staff(s)" name="search-staff" />
                        </div>
                        <div className="w-full px-10">
                           <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
                        </div>
                        <div className="flex flex-wrap gap-4">
                           {STAFFS.map((staff) => (
                              <Badge
                                 key={staff.id}
                                 className="border-0 bg-grey-04 px-4 py-2 text-text-primary"
                              >
                                 {staff.name}
                              </Badge>
                           ))}
                        </div>
                     </div>
                  </div>
               </RadioItem>
            </RadioGroup>
         </div>
      </div>
   )
}
