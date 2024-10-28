import RadioItem from '@/components/ui/radio-item'
import { cn } from '@/lib/utils'
import { Checkbox, DatePicker, Label, RadioGroup } from '@itsallsavvy/savvy-resuable-components'
import React, { SetStateAction } from 'react'
import { ParticipantSelection } from './add-form'

// Dummy Types
export type CustomerType = { id: string; name: string }
export type PetType = { id: string; name: string; petType: string }

interface Props {
   customer?: CustomerType
   pets?: PetType[]
   selectedPetsIds: string[]
   setSelectedPetIds: React.Dispatch<SetStateAction<string[]>>
   participantSelection: ParticipantSelection
   setParticipantSelection: React.Dispatch<SetStateAction<ParticipantSelection>>
}

export default function CustomerAndPetForm({
   customer,
   pets,
   selectedPetsIds,
   participantSelection,
   setSelectedPetIds,
   setParticipantSelection,
}: Props) {
   const handlePetCheckChange = (id: string, checked: boolean) => {
      if (!checked) {
         setSelectedPetIds((prev) => prev.filter((_id) => _id !== id))
         return
      }

      setSelectedPetIds((prev) => [...prev, id])
   }

   return (
      <div className="flex flex-col gap-6">
         <h6 className="font-medium">Select who this form is intended for</h6>
         <RadioGroup
            value={participantSelection}
            onValueChange={(value) => setParticipantSelection(value as ParticipantSelection)}
         >
            <RadioItem
               value={ParticipantSelection.CUSTOMER}
               id="customer"
               label={`For ${customer?.name}`}
            />
            <RadioItem label="For Pet(s)" value={ParticipantSelection.PETS} id="pets">
               <div
                  className={cn('rounded-2xl transition-all duration-300 ease-out', {
                     'mt-6 max-h-screen opacity-100':
                        participantSelection === ParticipantSelection.PETS,
                     'mt-0 h-0 max-h-0 overflow-hidden opacity-0':
                        participantSelection !== ParticipantSelection.PETS,
                  })}
               >
                  <div className="flex w-full items-center gap-2">
                     {pets?.map((pet) => (
                        <PetCheckbox
                           key={pet.id}
                           pet={pet}
                           selectedPetsIds={selectedPetsIds}
                           handlePetCheckChange={handlePetCheckChange}
                        />
                     ))}
                  </div>
               </div>
            </RadioItem>
         </RadioGroup>
         <div className="w-full px-10">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>

         <div className="flex flex-col gap-2">
            <h6 className="font-medium">{`Set a deadline(optional)`}</h6>
            <DatePicker name="deadline" />
         </div>
      </div>
   )
}

interface PetCheckboxProps {
   pet: PetType
   selectedPetsIds: string[]
   handlePetCheckChange: (id: string, checked: boolean) => void
}

export const PetCheckbox = ({ pet, selectedPetsIds, handlePetCheckChange }: PetCheckboxProps) => {
   return (
      <div className="flex flex-1 items-center gap-4 rounded-2xl border border-grey-06 px-6 py-4">
         <Checkbox
            id={pet.id}
            checked={!!selectedPetsIds.find((id) => pet.id === id)}
            onCheckedChange={(checked: boolean) => handlePetCheckChange(pet.id, checked)}
         />
         <Label htmlFor={pet.id} className="text-sm">
            {`${pet.name} (${pet.petType})`}
         </Label>
      </div>
   )
}
