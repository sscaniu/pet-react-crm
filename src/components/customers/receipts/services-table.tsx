import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@itsallsavvy/savvy-resuable-components'
import { ReceiptResponse } from '@/schemas/invoice/receipt-schema'

// Dummy demo data
// TODO: remove fake data once API is integrated
/*const services = [
   {
      description: 'Full Groom + Wash Medium',
      unitPrice: '$50.00',
      qty: 1,
      discount: null,
      amount: '$80.00',
   },
   {
      description: 'Full Shine Treatment (Add-On)',
      unitPrice: '$30.00',
      qty: 1,
      discount: null,
      amount: '$30.00',
   },
]*/

interface Props {
   receiptData?: ReceiptResponse
}

export default function ServicesTable({ receiptData }: Props) {
   return (
      <div className="flex flex-col gap-2">
         <h4 className="text-xl font-medium">Services</h4>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Qty.</TableHead>
                  <TableHead>Disc.</TableHead>
                  <TableHead>Amount</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {receiptData?.services?.map((service) => (
                  <TableRow key={service.description}>
                     <TableCell>{service.description}</TableCell>
                     <TableCell>{service.unitPrice}</TableCell>
                     <TableCell className="text-right">{service.qty}</TableCell>
                     <TableCell>{service.discount ?? '-'}</TableCell>
                     <TableCell>{service.amount}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}
