import { SetStateAction } from 'react'
import { StaffSelectionEnum, FrequencyEnum } from '@itsallsavvy/savvy-resuable-components'
import AddHolidayHeader from '../add-calendar-item/holiday/add-holiday-header'
import AddHolidayForm from '../add-calendar-item/holiday/add-holiday-form'

interface Props {
   startTime: string
   endTime: string
   staffSelection: StaffSelectionEnum
   frequency: FrequencyEnum
   isBlockedOnlineBooking: boolean
   isAllDayEvent: boolean
   description: string
   title: string
   date: Date
   setFrequency: React.Dispatch<SetStateAction<FrequencyEnum>>
   setDate: React.Dispatch<SetStateAction<Date>>
   setTitle: React.Dispatch<SetStateAction<string>>
   setDescription: React.Dispatch<SetStateAction<string>>
   setIsAllDayEvent: React.Dispatch<SetStateAction<boolean>>
   setStaffSelection: React.Dispatch<SetStateAction<StaffSelectionEnum>>
   setStartTime: React.Dispatch<SetStateAction<string>>
   setIsBlockedOnlineBooking: React.Dispatch<SetStateAction<boolean>>
   setEndTime: React.Dispatch<SetStateAction<string>>
}

export default function AddHolidayCard({
   staffSelection,
   endTime,
   startTime,
   isAllDayEvent,
   frequency,
   isBlockedOnlineBooking,
   description,
   title,
   date,
   setFrequency,
   setDate,
   setTitle,
   setDescription,
   setIsBlockedOnlineBooking,
   setEndTime,
   setStaffSelection,
   setStartTime,
   setIsAllDayEvent,
}: Props) {
   return (
      <div>
         <AddHolidayHeader
            date={date}
            setDate={setDate}
            startTime={startTime}
            endTime={endTime}
            frequency={frequency}
            isAllDayEvent={isAllDayEvent}
         />
         <div className="w-full px-10">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>
         <AddHolidayForm
            title={title}
            setFrequency={setFrequency}
            frequency={frequency}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            isBlockedOnlineBooking={isBlockedOnlineBooking}
            setIsBlockedOnlineBooking={setIsBlockedOnlineBooking}
            isAllDayEvent={isAllDayEvent}
            setIsAllDayEvent={setIsAllDayEvent}
            startTime={startTime}
            setStartTime={setStartTime}
            staffSelection={staffSelection}
            setStaffSelection={setStaffSelection}
            endTime={endTime}
            setEndTime={setEndTime}
         />
      </div>
   )
}
