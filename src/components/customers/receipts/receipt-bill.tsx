// TODO: Integrate actual data into the UI.
import { ReceiptResponse } from '@/schemas/invoice/receipt-schema'

interface Props {
   receiptData?: ReceiptResponse
}

export default function ReceiptBill({ receiptData }: Props) {
   return (
      <div className="border-t border-grey-01 bg-grey-00 px-10 py-6">
         <div className="flex flex-col gap-4">
            <div className="flex justify-between">
               <p className="text-sm font-medium">Subtotal</p>
               <p className="text-right text-sm font-medium">{receiptData?.subTotal}</p>
            </div>
            <div className="flex justify-between">
               <p className="text-sm font-medium">Tax(20%)</p>
               <p className="text-right text-sm font-medium">{receiptData?.tax}</p>
            </div>

            <div className="flex justify-between">
               <p className="text-sm font-medium">Discount</p>
               <p className="text-right text-sm font-medium">{receiptData?.discount}</p>
            </div>

            <div className="flex justify-between">
               <h4 className="text-xl font-medium">Amount Paid</h4>
               <h6 className="text-right text-xl font-medium">{receiptData?.amountPaid}</h6>
            </div>
            <div className="flex justify-end">
               <h6 className="text-sm font-medium text-grey-02">{receiptData?.paymentType}</h6>
            </div>
         </div>
      </div>
   )
}
