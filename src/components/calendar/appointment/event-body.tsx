import { EventProps } from '@itsallsavvy/savvy-resuable-components'
import { format } from 'date-fns'

interface Props {
   event: EventProps
}

export default function EventBody({ event }: Props) {
   return (
      <div className="flex flex-col gap-0.5 px-3 py-1.5">
         <div className="flex justify-between gap-1">
            <p className="truncate text-sm font-bold">{`${format(new Date(event.startDateTimeString), 'hh:mm')} - ${format(new Date(event.endDateTimeString), 'hh:mm a')}`}</p>
         </div>
         <div className="flex flex-col">
            <p className="truncate text-xs font-bold">{event.title}</p>
            <p className="truncate text-[10px] font-medium text-grey-04">{event.description}</p>
         </div>
      </div>
   )
}
