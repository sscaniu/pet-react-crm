import {
   Checkbox,
   DatePicker,
   generateTimeRangeOptions,
   Label,
   RadioGroup,
   SelectBox,
   StaffSelectionEnum,
   Textarea,
   TextInput,
   TimePicker,
   toast,
} from '@itsallsavvy/savvy-resuable-components'
import { SetStateAction, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import useSWRMutation from 'swr/mutation'
import { createCalendarEvent } from '@/fetcher/calendar/mutations/createCalendarEvent'
import {
   calendarEventActionSchema,
   CalendarEventActionValues,
} from '@/schemas/form-schemas/calendar-event-action-schema'
import { useForm } from '@mantine/form'
import { formResolve } from '@/schemas/form-schemas'
import {
   BlockCalendarEventResponse,
   FrequencyEnum,
   frequencyLabels,
} from '@/schemas/calendar/block-calendar-event-schema'
import AddEventAction from './add-event-action'
import AddEventStaff from './add-event-staffs'
import RadioItem from '@/components/ui/radio-item'
import { formatISO } from 'date-fns'
import { useShopConfigStore } from '@/providers/global/shop-config-store-provider'

interface Props {
   eventDate: Date
   startTime: string
   endTime: string
   isAllDayEvent: boolean
   title: string
   frequency: FrequencyEnum
   startDateTimeString: string
   endDateTimeString: string
   setTitle: React.Dispatch<SetStateAction<string>>
   setFrequency: React.Dispatch<SetStateAction<FrequencyEnum>>
   setIsAllDayEvent: React.Dispatch<SetStateAction<boolean>>
   setStartTime: React.Dispatch<SetStateAction<string>>
   setEndTime: React.Dispatch<SetStateAction<string>>
}

export default function AddEventForm({
   eventDate,
   endTime,
   startTime,
   isAllDayEvent,
   title,
   frequency,
   startDateTimeString,
   endDateTimeString,
   setFrequency,
   setTitle,
   setEndTime,
   setIsAllDayEvent,
   setStartTime,
}: Props) {
   const [selectedUsers, setSelectedUsers] = useState<string[]>([])
   const timeOptions = generateTimeRangeOptions(7, 21)
   const { selectedLocationId } = useShopConfigStore((state) => state)

   const frequencyOptions = Object.keys(frequencyLabels).map((value) => ({
      label: frequencyLabels[value as FrequencyEnum],
      value,
   }))

   const form = useForm<CalendarEventActionValues>({
      // TODO: make the form to be uncontrolled to improve performance. (date picker not working currently)
      // mode: 'uncontrolled',
      initialValues: {
         title: title,
         description: '',
         startDate: eventDate,
         endDate: eventDate,
         startTime: startTime,
         endTime: endTime,
         frequency: frequencyLabels[frequency as FrequencyEnum],
         userIds: [],
         staffSelection: StaffSelectionEnum.ALL_STAFF,
         allStaff: true,
         allDay: isAllDayEvent,
         blockOnlineBooking: false,
      },
      transformValues: (values) => ({
         title: values.title,
         description: values.description,
         startDate: values.startDate,
         endDate: values.endDate,
         startTime: startTime,
         endTime: values.endTime,
         frequency: values.frequency,
         userIds: values.userIds,
         staffSelection: values.staffSelection,
         allStaff: values.staffSelection === StaffSelectionEnum.ALL_STAFF,
         allDay: isAllDayEvent,
         blockOnlineBooking: false,
      }),
      validate: formResolve(calendarEventActionSchema),
   })

   // const requiredFields = ['name', 'email', 'gender', 'mobile']

   // const btnIsDisabled = requiredFields.some(
   //    (field) => !form.getTransformedValues()[field as keyof CalendarEventActionValues],
   // )

   const btnIsDisabled = false

   const { trigger: createCalendarEventMutation, isMutating: creatingCalendarEvent } =
      useSWRMutation('/blockCalendarEvent/addCalendarEvent', createCalendarEvent)

   useEffect(() => {
      if (selectedUsers) {
         console.log(selectedUsers)
      }
   }, [selectedUsers, setSelectedUsers])

   const handleSubmitAction = ({
      description,
      allStaff,
      blockOnlineBooking,
   }: CalendarEventActionValues) => {
      console.log('here submit   ')

      console.log(startTime)
      const users = selectedUsers
         ? selectedUsers.map((u) => {
              return { id: u, type: 'USER_ID' }
           })
         : []

      const startDateString = formatISO(eventDate ?? '', { representation: 'date' })
      const endDateString = formatISO(eventDate ?? '', { representation: 'date' })

      if (selectedLocationId) {
         const blockCalendarEventArgs: BlockCalendarEventResponse = {
            title,
            description,
            startDate: startDateString,
            endDate: endDateString,
            startTime,
            endTime,
            allDay: isAllDayEvent,
            blockOnlineBooking,
            locationId: selectedLocationId,
            userIds: users,
            allStaff,
            startDateUtc: startDateTimeString,
            endDateUtc: endDateTimeString,
         }
         console.log(blockCalendarEventArgs)
         createCalendarEventMutation(
            {
               timePeriodType: 'DAYS', //TODO implement repeat frequency
               blockCalendarEvent: blockCalendarEventArgs,
            },
            {
               onSuccess: async () => {
                  {
                     toast.success('Event successfully created.')
                  }
               },
            },
         )
      }
   }

   return (
      <form onSubmit={form.onSubmit(handleSubmitAction)}>
         <div className="flex flex-col gap-6 p-10">
            <div className="flex flex-col gap-4">
               <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-grey-04">Event Title</p>
                  <TextInput
                     value={title}
                     {...(form.errors['title'] && {
                        errorMessage: form.errors['title'] as string,
                     })}
                     required
                     name="event-tile"
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  />
               </div>
               <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-grey-04">Time</p>
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2">
                        <TimePicker
                           disabled={form.values.allDay}
                           name="start-time"
                           options={timeOptions}
                           rightIcon="clock"
                           className="w-fit"
                           value={startTime}
                           onChange={(value) => {
                              setStartTime(value)
                           }}
                        />
                        <p>-</p>
                        <TimePicker
                           value={endTime}
                           disabled={form.values.allDay}
                           name="end-time"
                           options={timeOptions}
                           onChange={(value) => setEndTime(value)}
                           rightIcon="clock"
                           className="w-fit"
                        />
                     </div>
                     <div className="flex items-center gap-4">
                        <Checkbox
                           checked={form.values.allDay}
                           onCheckedChange={(checked: boolean) => {
                              form.setFieldValue('allDay', checked)
                              setIsAllDayEvent(checked)
                           }}
                           id="select-day"
                        />
                        <Label htmlFor="select-day">All Day</Label>
                     </div>
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-grey-04">Frequency</p>
                  <SelectBox
                     value={frequency}
                     required
                     name="frequency"
                     options={frequencyOptions}
                     onChange={(value) => setFrequency(value as FrequencyEnum)}
                  />
               </div>

               {frequency !== 'DOES_NOT_REPEAT' && (
                  <div className="flex flex-col gap-2">
                     <p className="text-sm font-medium text-grey-04">Start & End Date</p>
                     <div className="flex items-center gap-6">
                        <DatePicker
                           name="startDate"
                           {...form.getInputProps('startDate')}
                           {...(form.errors['startDate'] && {
                              errorMessage: form.errors['startDate'] as string,
                           })}
                           maxDate={new Date()}
                           required
                        />
                        <p>-</p>
                        <DatePicker
                           name="endDate"
                           {...form.getInputProps('endDate')}
                           {...(form.errors['endDate'] && {
                              errorMessage: form.errors['endDate'] as string,
                           })}
                           maxDate={new Date()}
                           required
                        />
                     </div>
                  </div>
               )}

               <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-grey-04">Add Description</p>
                  <Textarea
                     {...form.getInputProps('description')}
                     {...(form.errors['description'] && {
                        errorMessage: form.errors['description'] as string,
                     })}
                     required
                     name="add-description"
                  />
               </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-grey-01 bg-grey-00 px-4 py-3">
               <Checkbox
                  id="block-online-booking"
                  checked={form.values.blockOnlineBooking}
                  onCheckedChange={(checked: boolean) =>
                     form.setFieldValue('blockOnlineBooking', checked)
                  }
               />
               <Label htmlFor="block-online-booking">
                  Block Online Booking Time Availability During Event Hours
               </Label>
            </div>
            <div className="flex flex-col gap-2">
               <p className="text-sm font-medium text-grey-04">Apply Event To</p>
               <RadioGroup
                  {...form.getInputProps('staffSelection')}
                  onValueChange={(value) => {
                     const allDayValue =
                        value === 'ALL_STAFF'
                           ? StaffSelectionEnum.ALL_STAFF
                           : StaffSelectionEnum.SPECIFIC_STAFF
                     form.setFieldValue('staffSelection', allDayValue)
                  }}
               >
                  <RadioItem
                     value={StaffSelectionEnum.ALL_STAFF} //will transform to boolean on transform values
                     id="all-staffs"
                     label="All Staff"
                  />
                  <RadioItem
                     label="Specific Staff"
                     value={StaffSelectionEnum.SPECIFIC_STAFF} //will transform to boolean on transform values
                     id="specific-staff"
                  >
                     <div
                        className={cn(
                           'rounded-2xl border border-grey-06 transition-all duration-300 ease-out',
                           {
                              'mt-6 max-h-screen opacity-100':
                                 form.values.staffSelection === StaffSelectionEnum.SPECIFIC_STAFF,
                              'mt-0 h-0 max-h-0 overflow-hidden opacity-0':
                                 form.values.staffSelection === StaffSelectionEnum.ALL_STAFF,
                           },
                        )}
                     >
                        <AddEventStaff setSelectedUsers={setSelectedUsers} />
                     </div>
                  </RadioItem>
               </RadioGroup>
            </div>
         </div>

         <AddEventAction
            onSubmitEvent={() => handleSubmitAction(form.getValues())}
            isAddEventBtnDisabled={btnIsDisabled}
         />
      </form>
   )
}
