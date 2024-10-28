import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const flagDefinitionSchema = z.object({
   id: z.string(),
   version: z.nullable(z.any()),
   deleted: z.boolean(),
   archived: z.boolean(),
   createdBy: z.string().nullable(),
   createdDate: z.string().datetime().nullable(),
   lastModifiedUser: z.string().nullable(),
   lastModifiedDate: z.string().datetime().nullable(),
   ownerId: z.string(),
   name: z.string(),
   description: z.string(),
   colour: z.enum(['primary', 'accent', 'warn']).nullable(),
   icon: z.nullable(z.any()),
   flagDefinitionType: z.enum(['PET', 'CUSTOMER']),
   entityDefinitionId: z.nullable(
      z.object({
         id: z.string(),
         type: z.literal('ENTITY_DEFINITION_ID'),
      }),
   ),
   flagDefinitionId: z.object({
      id: z.string(),
      type: z.literal('FLAG_DEFINITION_ID'),
   }),
})

export const petFlagDefinitionSchema = flagDefinitionSchema.extend({
   flagDefinitionType: z.literal('PET'),
})

export const customerFlagDefinitionSchema = flagDefinitionSchema.extend({
   flagDefinitionType: z.literal('CUSTOMER'),
})

export const customerFlagsResponseSchema = z.object({
   flagDefinitions: z.array(customerFlagDefinitionSchema),
})

export const petFlagsResponseSchema = z.object({
   flagDefinitions: z.array(petFlagDefinitionSchema),
})

export type FlagType = ZodInfer<typeof flagDefinitionSchema>
export type CustomerFlagType = ZodInfer<typeof customerFlagDefinitionSchema>
export type PetFlagType = ZodInfer<typeof petFlagDefinitionSchema>

export type CustomerFlagsResponse = ZodInfer<typeof customerFlagsResponseSchema>
export type PetFlagsResponse = ZodInfer<typeof petFlagsResponseSchema>
