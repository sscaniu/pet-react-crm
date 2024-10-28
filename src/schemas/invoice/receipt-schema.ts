import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const productsSchema = z.object({
   description: z.string(),
   unitPrice: z.string(),
   discount: z.string(),
   qty: z.string(),
   amount: z.string(),
})

const servicesSchema = z.object({
   description: z.string(),
   unitPrice: z.string(),
   discount: z.string(),
   qty: z.string(),
   amount: z.string(),
})

export const receiptResponseSchema = z.object({
   subTotal: z.string(),
   tax: z.string(),
   amountPaid: z.string(),
   discount: z.string(),
   paymentType: z.string(),
   products: z.array(productsSchema),
   services: z.array(servicesSchema),
})

export type ReceiptResponse = ZodInfer<typeof receiptResponseSchema>
