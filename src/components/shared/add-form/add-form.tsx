import { useState } from 'react'
import FormSelector from './form-selector'
import CustomerAndPetForm, { CustomerType, PetType } from './customer-and-pets-form'
import AddFormAction from './add-form-action'
import { FormTemplate } from '@/schemas/forms/form-templates-schema'

export enum FormStep {
   SELECT_FORMS,
   SELECT_CUSTOMER_AND_PETS,
}

export enum ParticipantSelection {
   CUSTOMER = 'customer',
   PETS = 'pets',
}

export const stepOrder = [FormStep.SELECT_FORMS, FormStep.SELECT_CUSTOMER_AND_PETS]

interface Props {
   onSubmit: (formData: any) => Promise<void>
   customer?: CustomerType
   pets?: PetType[]
   availableForms: FormTemplate[]
   closeModal: () => void
}

export default function AddForm({ onSubmit, customer, pets, closeModal, availableForms }: Props) {
   const [selectedFormIds, setSelectedIds] = useState<string[]>(['01'])
   const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.SELECT_FORMS)

   const [selectedPetIds, setSelectedPetIds] = useState<string[]>([])
   const [participantSelection, setParticipantSelection] = useState<ParticipantSelection>(
      ParticipantSelection.CUSTOMER,
   )

   const currentStepIndex = stepOrder.indexOf(currentStep) + 1
   const stepCounts = Object.keys(FormStep).filter((key) => isNaN(Number(key))).length

   const formsSelectedCount = selectedFormIds.length

   const handleSubmit = async () => {
      await onSubmit({
         formIds: selectedFormIds,
         customer,
         pets,
      })
      closeModal()
   }

   const stepContent = {
      [FormStep.SELECT_FORMS]: (
         <FormSelector
            selectedFormIds={selectedFormIds}
            availableForms={availableForms}
            setSelectedFormIds={setSelectedIds}
         />
      ),
      [FormStep.SELECT_CUSTOMER_AND_PETS]: (
         <CustomerAndPetForm
            participantSelection={participantSelection}
            selectedPetsIds={selectedPetIds}
            setParticipantSelection={setParticipantSelection}
            setSelectedPetIds={setSelectedPetIds}
            customer={customer}
            pets={pets}
         />
      ),
   }[currentStep]

   return (
      <div className="flex w-full flex-col gap-4 rounded-2xl border border-grey-06 bg-white p-10 shadow-01">
         <div className="flex items-center gap-4">
            <h6 className="text-2xl font-medium">Add Form</h6>
            <p className="font-medium text-grey-04">
               {`Step ${currentStepIndex}`} of {stepCounts}
            </p>
         </div>

         {stepContent}
         <AddFormAction
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            formsSelectedCount={formsSelectedCount}
            onSubmit={handleSubmit}
         />
      </div>
   )
}
