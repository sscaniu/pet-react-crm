import { SetStateAction } from 'react'
import AddEventForm from '../add-calendar-item/event/add-event-form'
import AddEventHeader from '../add-calendar-item/event/add-event-header'
import { FrequencyEnum } from '@/schemas/calendar/block-calendar-event-schema'

interface Props {
   eventDate: Date
   startTime: string
   endTime: string
   frequency: FrequencyEnum
   isAllDayEvent: boolean
   title: string
   date: Date
   startDateTimeString: string
   endDateTimeString: string
   setFrequency: React.Dispatch<SetStateAction<FrequencyEnum>>
   setDate: React.Dispatch<SetStateAction<Date>>
   setTitle: React.Dispatch<SetStateAction<string>>
   setIsAllDayEvent: React.Dispatch<SetStateAction<boolean>>
   setStartTime: React.Dispatch<SetStateAction<string>>
   setEndTime: React.Dispatch<SetStateAction<string>>
}

export default function AddEventCard({
   eventDate,
   endTime,
   startTime,
   isAllDayEvent,
   frequency,
   title,
   date,
   startDateTimeString,
   endDateTimeString,
   setFrequency,
   setDate,
   setTitle,
   setEndTime,
   setStartTime,
   setIsAllDayEvent,
}: Props) {
   return (
      <div>
         <AddEventHeader
            title={title}
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
         <AddEventForm
            eventDate={eventDate}
            frequency={frequency}
            setFrequency={setFrequency}
            title={title}
            setTitle={setTitle}
            isAllDayEvent={isAllDayEvent}
            setIsAllDayEvent={setIsAllDayEvent}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            startDateTimeString={startDateTimeString}
            endDateTimeString={endDateTimeString}
         />
      </div>
   )
}
