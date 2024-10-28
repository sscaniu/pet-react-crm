import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const locationSchema = z.object({
   id: z.string(), // Location id
   name: z.string(), // Location name
})

export type Location = ZodInfer<typeof locationSchema>

export const listLocationsResponseSchema = z.array(locationSchema)
export type ListLocationsResponse = ZodInfer<typeof listLocationsResponseSchema>
