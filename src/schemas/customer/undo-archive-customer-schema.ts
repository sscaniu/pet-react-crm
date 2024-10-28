import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const undoArchiveCustomerResponse = z.object({
   customerId: z.string(),
})

export const undoArchiveCustomerArgs = z.object({
   customerId: z.string(),
})

export type UndoArchiveCustomerResponse = ZodInfer<typeof undoArchiveCustomerResponse>
export type UndoArchiveCustomerArgs = ZodInfer<typeof undoArchiveCustomerArgs>
