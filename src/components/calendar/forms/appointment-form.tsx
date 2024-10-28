import { Button } from '@itsallsavvy/savvy-resuable-components'
import FaIcon from '@/components/common/fa-icon'
import { faEye, faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import Seperator from '@/components/common/seperator'
import { FormStatusEnum, FormType } from '@/types/utils'

interface Props {
   appointmentForm: FormType
}

//TODO: needs to be refactored
export default function AppointmentForm({ appointmentForm }: Props) {
   let stateLabel = ''
   let stateValue = ''

   if (appointmentForm.completedOn) {
      stateLabel = 'Form completed on'
      stateValue = appointmentForm.completedOn
   } else if (appointmentForm.sentOn) {
      stateLabel = 'Form sent on'
      stateValue = appointmentForm.sentOn
   } else if (appointmentForm.createdOn) {
      stateLabel = 'Created on'
      stateValue = appointmentForm.createdOn
   }

   return (
      <div className="flex flex-col justify-between gap-2 rounded-xl border border-grey-06 px-6 py-4">
         <div className="flex items-start justify-between">
            <h6 className="font-medium">{appointmentForm.title}</h6>
            <div className="flex items-center gap-4 text-grey-04">
               <Button variant="icon">
                  <FaIcon icon={faEye} />
               </Button>
               <Button variant="icon">
                  <FaIcon icon={faPaperPlane} />
               </Button>
            </div>
         </div>
         <div
            className={cn(
               'flex w-fit items-center gap-2 rounded-full bg-opacity-10 p-2 text-primary',
               {
                  'bg-cyan-01': appointmentForm.status === FormStatusEnum.COMPLETED,
                  'bg-yellow': appointmentForm.status === FormStatusEnum.INCOMPLETE,
               },
            )}
         >
            {appointmentForm.status === FormStatusEnum.COMPLETED && <FaIcon icon={faFaceSmile} />}
            <p
               className={cn('text-sm font-medium', {
                  'text-primary': appointmentForm.status === FormStatusEnum.COMPLETED,
                  'text-yellow': appointmentForm.status === FormStatusEnum.INCOMPLETE,
               })}
            >
               {appointmentForm.status}
            </p>
         </div>
         <Seperator />
         <div className="flex flex-col gap-0.5">
            <p className="text-xs font-medium text-grey-02">{stateLabel}</p>
            <p className="fotn-medium text-sm text-grey-02">{stateValue}</p>
         </div>
      </div>
   )
}
