import FaIcon from '@/components/common/fa-icon'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, SleepingDogIcon } from '@itsallsavvy/savvy-resuable-components'

interface Props {
   onAddPet: () => void
}

export default function PetListEmptyPlaceholder({ onAddPet }: Props) {
   return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center gap-4">
         <SleepingDogIcon size={120} className="text-grey-06" />
         <p className="text-sm font-bold text-grey-02">No pet data found for this customer.</p>
         <Button
            onClick={onAddPet}
            leftIcon={<FaIcon icon={faPlus} />}
            color="secondary"
            className="rounded-full"
         >
            Add a new pet
         </Button>
      </div>
   )
}
