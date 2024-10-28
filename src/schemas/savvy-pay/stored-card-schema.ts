import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const storedCardSchema = z.object({
   holderNameMasked: z.string(),
   lastFour: z.string(),
   brand: z.string(),
})

export const storedCardsListSchema = z.object({
   storedCards: z.array(storedCardSchema),
})

export type StoredCardResponse = ZodInfer<typeof storedCardSchema>
export type ListStoredCardResponse = ZodInfer<typeof storedCardsListSchema>
