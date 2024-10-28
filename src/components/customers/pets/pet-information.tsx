import FaIcon from '@/components/common/fa-icon'
import Seperator from '@/components/common/seperator'
import { transformApiResponse } from '@/lib/utils'
import { useCustomerDetailsStore } from '@/providers/customer/customer-details-store-provider'
import { DetailFieldType } from '@/types/utils'
import { faDog, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@itsallsavvy/savvy-resuable-components'
import { useEffect, useState } from 'react'
import PetDetails from './pet-details'
import PetInternalNotes from './pet-internal-notes'

export default function PetInformation() {
   const [mainFields, setMainFields] = useState<DetailFieldType[]>([])
   const [otherFields, setOtherFields] = useState<DetailFieldType[]>([])

   const { petInformationData } = useCustomerDetailsStore((state) => state)

   useEffect(() => {
      if (petInformationData) {
         const petDetailsMainFields = {
            'Pet Type': 'petType',
            Size: 'petSizeId',
            'Date of Birth': 'dob',
            Sex: 'bitch',
            'Color / pattern': 'colour',
            Neutrated: 'spayedOrNeutered',
            Weight: 'weight',
            'Regular blades': 'blades',
            Insured: 'insured',
            'Recommended Visit Freq': 'recommendedVisitFrequencyInWeeks',
         }

         const petDetailsOtherFields = {
            'Special Conditions': 'specialConsiderations',
            'Medial Conditions': 'medical',
            Allergies: 'allergies',
         }

         setMainFields(transformApiResponse(petInformationData, petDetailsMainFields))
         setOtherFields(transformApiResponse(petInformationData, petDetailsOtherFields))
      }
   }, [petInformationData])

   return (
      <div className="flex flex-col gap-4 px-10 py-6">
         <div className="flex items-center gap-4">
            <FaIcon icon={faDog} size="sm" className="text-primary" />
            <h4 className="text-xl font-medium">Pet Information</h4>
         </div>
         {/* {fetchingPetInformation ? (
            <div className="flex h-[300px] w-full items-center justify-center">
               <Loader />
            </div>
         ) : ( */}
         <PetDetails mainFields={mainFields} otherFields={otherFields} />
         {/* )} */}
         <Seperator />
         <PetInternalNotes />
         <Seperator />
         <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium">Vaccination</h4>
            <Button variant="icon">
               <FaIcon icon={faPlus} size="xl" />
            </Button>
         </div>
      </div>
   )
}
