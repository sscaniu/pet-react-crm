import FaIcon from '@/components/common/fa-icon'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, SleepingDogIcon } from '@itsallsavvy/savvy-resuable-components'

export default function FormsListEmptyPlaceholder() {
   return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center gap-4">
         <SleepingDogIcon size={120} className="text-grey-06" />
         <p className="text-sm font-bold text-grey-02">No form data found for this appointment.</p>
      </div>
   )
}
