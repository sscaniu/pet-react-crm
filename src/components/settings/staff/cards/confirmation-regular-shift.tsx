import { Button, Label, RadioGroup, RadioGroupItem } from '@itsallsavvy/savvy-resuable-components'
import { StaffRota } from '../table/staff-rota-columns'
import React from 'react'
import FaIcon from '@/components/common/fa-icon'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { RadioItemProps } from '@/components/ui/radio-item'

interface Props {
   staffRota: StaffRota
   closeRegularShiftModal: () => void
}

export default function ConfirmationRegularShift({ staffRota, closeRegularShiftModal }: Props) {
   const handleUpdateRegularShift = () => {
      closeRegularShiftModal()
   }

   return (
      <div className="flex w-full flex-col rounded-2xl border border-grey-06 bg-white px-10 shadow-01">
         <div className="py-6">
            <h5 className="text-lg font-semibold">
               Confirmation Regular Shift Change for{' '}
               <span className="text-primary">{staffRota.name}</span>
            </h5>
         </div>
         <div className="w-full">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>
         <div className="flex flex-col gap-6 py-6">
            <p className="text-sm">
               You have changed one or more of your shifts. Are you sure you want to update your
               staff rota with this new regular shift?
            </p>
            <RadioGroup className="space-y-4">
               <RadioItem value="replace" id="replace">
                  Update and replace existing regular shifts from{' '}
                  <span className="font-bold text-primary">Aug 24, 2024 - Aug 25,2025. </span>
               </RadioItem>
               <RadioItem value="apply" id="apply">
                  Apply new regular shifts after{' '}
                  <span className="font-bold text-primary">Aug 25, 2025</span> (End date of current
                  regular shift schedule)
               </RadioItem>
            </RadioGroup>
            <div className="rounded-lg border border-primary bg-primary-light p-4">
               <div className="flex items-start gap-2">
                  <FaIcon icon={faCircleExclamation} className="text-primary" />
                  <p className="text-sm">
                     If you want to update a shift on a{' '}
                     <span className="font-bold">specific day</span>, click{' '}
                     <span className="font-bold">‘Edit Shift’</span> when you click on a shift time
                     on the Staff Rota.{' '}
                  </p>
               </div>
            </div>
         </div>

         <div className="w-full">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>
         <div className="flex justify-end py-6">
            <Button color="secondary" onClick={handleUpdateRegularShift}>
               Update Regular Shift
            </Button>
         </div>
      </div>
   )
}

//TODO: needs to be refactored
const RadioItem = ({ value, children, id }: RadioItemProps) => {
   return (
      <div className="flex items-center space-x-2 rounded-lg border border-grey-01 p-4">
         <RadioGroupItem value={value} id={id} className="border-2 border-gray-300" />
         <Label htmlFor={id} className="flex-grow text-sm text-grey-04">
            {children}
         </Label>
      </div>
   )
}
