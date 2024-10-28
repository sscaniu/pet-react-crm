import { z, ZodType } from 'zod'

export type ZodInfer<T extends ZodType<any, any, any>> = z.infer<T>
