import {
   Table,
   TableHeader,
   TableRow,
   TableHead,
   TableBody,
   TableCell,
} from '@itsallsavvy/savvy-resuable-components'
import { AppointmentInvoiceItem } from '@/schemas/appointment/appointment-invoice-schema'

interface Props {
   invoiceItem: AppointmentInvoiceItem[] | undefined
}

export default function PaymentTable({ invoiceItem }: Props) {
   return (
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
            {invoiceItem?.map((payment) => (
               <TableRow key={payment.description}>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>{payment.unitPrice}</TableCell>
                  <TableCell className="text-right">{payment.qty}</TableCell>
                  <TableCell>{payment.discount ?? '-'}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}
