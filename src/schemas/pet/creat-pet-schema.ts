import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const createPetArgsSchema = z.object({
   petOwnerId: z.string(),
   name: z.string(),
   petType: z.string(),
   petSizeId: z.string(),
   breed: z.string(),
   //    size: z.string(),
   bitch: z.boolean().nullish(),
   colour: z.string().nullish(),
   spayedOrNeutered: z.boolean().nullish(),
   weight: z.number().nullish(),
   blades: z.string().nullish(),
   insured: z.boolean().nullish(),
   recommendedVisitFrequencyInWeeks: z.number().nullish(),
   specialConsiderations: z.string().nullish(),
   medical: z.string().nullish(),
   allergies: z.string().nullish(),
   petNotes: z.string().nullish(),
   dob: z.string().date(),
   flags: z.array(z.string()).nullish(),
})

export type CreatePetArgs = ZodInfer<typeof createPetArgsSchema>
