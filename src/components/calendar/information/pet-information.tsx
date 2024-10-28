import FaIcon from '@/components/common/fa-icon'
import { faArrowUpRightFromSquare, faDog, faUser } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@itsallsavvy/savvy-resuable-components'
import { AppointmentCustomerPetType } from '@/schemas/appointment/appointment-customer-info-schema'

interface Props {
   pets: AppointmentCustomerPetType[] | undefined
}

export default function PetInformation({ pets }: Props) {
   return (
      <div className="flex flex-col gap-4">
         <h4 className="text-xl font-semibold">Pet Information</h4>
         <div className="flex flex-col gap-4">
            {pets?.map((pet) => <PetInfoCard key={pet.petName} {...pet} />)}
         </div>
      </div>
   )
}

const PetInfoCard = ({
   petBreedLabel,
   petName,
   petTypeLabel,
   petSizeLabel,
}: AppointmentCustomerPetType) => {
   return (
      <div className="items-start rounded-lg border border-cyan-01/50 bg-cyan-02 p-6">
         <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
               <FaIcon icon={faDog} className="pt-1 text-primary" />
               <div className="flex flex-col gap-4">
                  <h6 className="font-bold">{petName}</h6>
                  <div className="flex items-center gap-2">
                     <p>{petTypeLabel}</p>
                     <span className="h-1 w-1 rounded-full bg-text-primary" />
                     <p>{petBreedLabel}</p>
                     <span className="h-1 w-1 rounded-full bg-text-primary" />
                     <p>{petSizeLabel} Size</p>
                  </div>
               </div>
            </div>
            <Button variant="icon">
               <FaIcon icon={faArrowUpRightFromSquare} className="text-grey-04" />
            </Button>
         </div>
      </div>
   )
}
