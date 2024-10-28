import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const contractsSchema = z.object({
   id: z.string(),
   title: z.string(),
   status: z.string(),
   completedOn: z.string(),
})

export const contractsResponseSchema = z.array(contractsSchema)

export type ContractsResponse = ZodInfer<typeof contractsResponseSchema>
