import FaIcon from '@/components/common/fa-icon'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@itsallsavvy/savvy-resuable-components'
import { addWeeks, endOfWeek, format, startOfDay, startOfWeek, subWeeks } from 'date-fns'
import React, { SetStateAction } from 'react'

interface Props {
   currentDate: Date
   setCurrentDate: React.Dispatch<SetStateAction<Date>>
}

export default function DateRangePicker({ currentDate, setCurrentDate }: Props) {
   const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 })
   const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 })
   const dateString = `${format(startOfWeekDate, 'dd')} - ${format(endOfWeekDate, 'dd')} ${format(currentDate, 'MMMM')} `

   const handleNavigateBack = () => {
      const date = startOfDay(subWeeks(currentDate, 1))
      setCurrentDate(date)
   }

   const handleNavigateNext = () => {
      const date = startOfDay(addWeeks(currentDate, 1))
      setCurrentDate(date)
   }

   return (
      <div className="flex items-center gap-1">
         <Button
            variant="icon"
            className="h-9 w-10 rounded-none rounded-l-lg border border-grey-06 py-1"
            onClick={handleNavigateBack}
         >
            <FaIcon icon={faChevronLeft} />
         </Button>

         <div className="flex h-9 items-center justify-center rounded-none border border-grey-06 p-0 px-4 text-sm font-medium">
            {dateString}
         </div>

         <Button
            variant="icon"
            className="h-9 w-10 rounded-none rounded-r-lg border border-grey-06 py-1"
            onClick={handleNavigateNext}
         >
            <FaIcon icon={faChevronRight} />
         </Button>
      </div>
   )
}
