import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const undoBanCustomerResponse = z.object({
   customerId: z.string(),
})

export const undoBanCustomerArgs = z.object({
   customerId: z.string(),
})

export type UndoBanCustomerResponse = ZodInfer<typeof undoBanCustomerResponse>
export type UndoBanCustomerArgs = ZodInfer<typeof undoBanCustomerArgs>
