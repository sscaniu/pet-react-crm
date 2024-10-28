import { ZodInfer } from '@/types/zod'
import { customerSchema } from './customer-information-schema'

export type EditCustomerArgs = ZodInfer<typeof customerSchema>
