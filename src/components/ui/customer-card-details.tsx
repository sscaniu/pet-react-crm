import FaIcon from '@/components/common/fa-icon'
import { faCreditCard, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@itsallsavvy/savvy-resuable-components'

interface Props {
   nameOnCard: string
   lastFourCardNumber: string
}

export default function CustomerCardDetails({ nameOnCard, lastFourCardNumber }: Props) {
   return (
      <div className="flex flex-col gap-4">
         <h4 className="text-xl font-medium">Customer Card Details</h4>
         <div className="broder-grey-06 flex flex-col gap-6 rounded-lg border p-6">
            <div className="flex items-start justify-between">
               <div className="flex gap-4">
                  <FaIcon icon={faCreditCard} size="lg" className="text-primary" />
                  <h6 className="font-bold">Credit/Debit Card</h6>
               </div>
               <p className="text-sm font-medium text-grey-02">Powered By Savvy Pay</p>
            </div>

            <div className="flex flex-col gap-2">
               <h6 className="text-sm font-medium text-grey-04">Name On Card</h6>
               <p className="font-medium">{nameOnCard}</p>
            </div>

            <div className="flex flex-col gap-2">
               <h6 className="text-sm font-medium text-grey-04">Card Number</h6>

               <p className="font-medium">{lastFourCardNumber}</p>
            </div>
            <hr className="bg-gey-06 h-[1px] w-full" />
            <div className="flex gap-6">
               <Button className="flex-1" leftIcon={<FaIcon icon={faPaperPlane} />}>
                  Send Account Link
               </Button>
            </div>
         </div>
      </div>
   )
}
