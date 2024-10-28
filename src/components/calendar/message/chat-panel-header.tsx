import FaIcon from '@/components/common/fa-icon'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@itsallsavvy/savvy-resuable-components'
import { AppointmentCustomerInfoType } from '@/schemas/appointment/appointment-customer-info-schema'

interface Props {
   appointmentCustomerInfo: AppointmentCustomerInfoType | undefined
}

export default function ChatPanelHeader({ appointmentCustomerInfo }: Props) {
   return (
      <div className="border-gery-06 rounded-t-2xl border-b p-6 shadow-01">
         <div className="flex flex-col gap-2">
            <h5 className="text-xl font-medium">{appointmentCustomerInfo?.customerName}</h5>
            <div className="flex flex-col gap-1">
               <p className="font-medium text-grey-02">{appointmentCustomerInfo?.customerEmail}</p>
               <p className="font-medium text-grey-02">
                  {appointmentCustomerInfo?.customerPhoneNumber}
               </p>
            </div>
         </div>
      </div>
   )
}
