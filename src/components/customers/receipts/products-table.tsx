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
// TODO: remove fake data once API is intergrated.
/*const products = [
   {
      description: 'Animology White Wash Shampoo',
      unitPrice: '$12.00',
      discount: null,
      qty: 1,
      amount: '$12.00',
   },
]*/

interface Props {
   receiptData?: ReceiptResponse
}

export default function ProductsTable({ receiptData }: Props) {
   return (
      <div className="flex flex-col gap-2">
         <h4 className="text-xl font-medium">Products</h4>
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
               {receiptData?.products?.map((product) => (
                  <TableRow key={product.description}>
                     <TableCell>{product.description}</TableCell>
                     <TableCell>{product.unitPrice}</TableCell>
                     <TableCell className="text-right">{product.qty}</TableCell>
                     <TableCell>{product.discount ?? '-'}</TableCell>
                     <TableCell>{product.amount}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}
