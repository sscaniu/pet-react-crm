import FaIcon from '@/components/common/fa-icon'
import {
   faArrowUpRightFromSquare,
   faDollarSign,
   faEllipsisVertical,
   faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Badge, Button } from '@itsallsavvy/savvy-resuable-components'
import { AppointmentCustomerInfoType } from '@/schemas/appointment/appointment-customer-info-schema'
import { AppointmentInfoType } from '@/schemas/appointment/appointment-info-schema'

interface Props {
   appointmentCustomerInfo: AppointmentCustomerInfoType | undefined
   appointmentInfo: AppointmentInfoType | undefined
}

export default function CustomerInformation({ appointmentCustomerInfo, appointmentInfo }: Props) {
   return (
      <div className="flex flex-col gap-4">
         <h4 className="text-xl font-semibold">Customer Information</h4>
         <div className="flex flex-col items-start gap-6 rounded-lg border border-cyan-01/50 bg-cyan-02 p-6">
            <div className="flex items-start gap-4">
               <FaIcon icon={faUser} className="pt-1 text-primary" />
               <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                     <h6 className="font-bold">{appointmentCustomerInfo?.customerName}</h6>
                     <Badge className="border-grey-04 bg-transparent text-grey-04">Existing</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                     <p>{appointmentCustomerInfo?.customerEmail}</p>
                     <span className="h-1 w-1 rounded-full bg-text-primary" />
                     <p>{appointmentCustomerInfo?.customerPhoneNumber}</p>
                  </div>
               </div>
            </div>
            <div className="flex w-full flex-col gap-4 rounded-lg border border-grey-06 bg-white p-6">
               <div className="flex justify-between">
                  <div className="flex gap-2">
                     <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary">
                        <FaIcon icon={faDollarSign} className="h-4 w-4 text-primary" />
                     </div>
                     <p className="font-semibold text-primary">Active Balance</p>
                  </div>

                  <Button variant="icon">
                     <FaIcon icon={faEllipsisVertical} className="text-grey-04" />
                  </Button>
               </div>
               <div className="flex gap-2">
                  <p className="font-medium uppercase text-grey-04">
                     {appointmentCustomerInfo?.customerCurrencyCode}
                  </p>
                  <p className="text-2xl font-medium">{appointmentInfo?.balance}</p>
               </div>
            </div>
         </div>
      </div>
   )
}
