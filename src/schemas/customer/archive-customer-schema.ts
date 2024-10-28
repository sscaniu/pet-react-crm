import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const archiveCustomerResponse = z.object({
   customerId: z.string(),
   userId: z.string().nullable(),
})

export const archiveCustomerArgs = z.object({
   customerId: z.string(),
})

export type ArchiveCustomerResponse = ZodInfer<typeof archiveCustomerResponse>
export type ArchiveCustomerArgs = ZodInfer<typeof archiveCustomerArgs>
