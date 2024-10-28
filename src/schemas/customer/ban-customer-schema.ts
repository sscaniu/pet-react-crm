import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const banCustomerResponse = z.object({
   customerId: z.string(),
})

export const banCustomerArgs = z.object({
   customerId: z.string(),
})

export type BanCustomerResponse = ZodInfer<typeof banCustomerResponse>
export type BanCustomerArgs = ZodInfer<typeof banCustomerArgs>
