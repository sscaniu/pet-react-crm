import { SetStateAction } from 'react'
import { FormStep, stepOrder } from './add-form'
import { Button } from '@itsallsavvy/savvy-resuable-components'

interface Props {
   currentStep: FormStep
   formsSelectedCount: number
   setCurrentStep: React.Dispatch<SetStateAction<FormStep>>
   onSubmit: () => Promise<void>
}

export default function AddFormAction({
   currentStep,
   onSubmit,
   setCurrentStep,
   formsSelectedCount,
}: Props) {
   const handleNextStep = () => {
      const currentIndex = stepOrder.indexOf(currentStep)
      if (currentIndex < stepOrder.length - 1) {
         setCurrentStep(stepOrder[currentIndex + 1])
      }
   }

   const handlePreviousStep = () => {
      const currentIndex = stepOrder.indexOf(currentStep)
      if (currentIndex > 0) {
         setCurrentStep(stepOrder[currentIndex - 1])
      }
   }

   return (
      <div className="flex justify-between">
         {currentStep === FormStep.SELECT_FORMS && (
            <>
               <p>{formsSelectedCount > 0 ? `${formsSelectedCount} selected` : ''}</p>
               <Button color="secondary" onClick={handleNextStep}>
                  Next
               </Button>
            </>
         )}
         {currentStep === FormStep.SELECT_CUSTOMER_AND_PETS && (
            <>
               <Button color="secondary" variant="outlined" onClick={handlePreviousStep}>
                  Back
               </Button>
               <Button color="secondary" onClick={onSubmit}>
                  Add Form
               </Button>
            </>
         )}
      </div>
   )
}
