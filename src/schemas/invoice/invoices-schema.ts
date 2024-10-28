import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const invoicesSchema = z.object({
   id: z.string(),
   invoiceNumber: z.string(),
   amount: z.string(),
   dateIssued: z.string(),
})

export const invoicesResponseSchema = z.object({
   contents: z.array(invoicesSchema),
   totalElements: z.number(),
   totalPages: z.number(),
})

export const listInvoicesForCustomerArgsSchema = z.object({
   customerId: z.string().optional(),
   receiptType: z.string(),
   start: z.string(),
   end: z.string(),
   pageNum: z.number(),
   pageSize: z.number(),
})

export type ListInvoicesForCustomerArgs = ZodInfer<typeof listInvoicesForCustomerArgsSchema>

export type ListInvoicesForCustomerResponse = ZodInfer<typeof invoicesResponseSchema>
