import { SleepingDogIcon } from '@itsallsavvy/savvy-resuable-components'

interface Props {
   message: string
}

export default function EmptyPlaceholder({ message }: Props) {
   return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center gap-4">
         <SleepingDogIcon size={120} className="text-grey-06" />
         <p className="text-sm font-bold text-grey-02">{message}</p>
      </div>
   )
}
