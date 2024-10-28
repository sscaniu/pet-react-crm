import { CustomerTableTabEnum } from '@/constants/customers-tabs'
import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const petSchema = z.object({
   petId: z.string(),
   petName: z.string(),
   petBreed: z.string().nullable(),
})

const customerSchema = z.object({
   customerId: z.string(),
   ownerId: z.string(),
   fullName: z.string(),
   mobileInternational: z.string().nullable(),
   email: z.string().email().nullable(),
   flags: z.array(z.string()),
   pets: z.array(petSchema),
})

export const customersAndPetsArgsSchema = z.object({
   searchString: z.string(),
   paginationData: z
      .object({
         pageNumber: z.number().optional(),
         pageSize: z.number().optional(),
      })
      .optional(),
   includeFlags: z.array(z.string()).optional(),
   breed: z.string().optional(),
   petTypes: z.string().array().optional(),
   excludeFlags: z.array(z.string()).optional(),
   ascending: z.boolean().nullish(),
   status: z.nativeEnum(CustomerTableTabEnum).optional(),
})

export const customersAndPetsResponseSchmea = z.object({
   results: z.array(customerSchema),
   totalElements: z.number(),
   totalPages: z.number(),
})

export const customersAndPetsCountSummaryResponseSchema = z.object({
   customerCount: z.number(),
   petCount: z.number(),
})

export type CustomersAndPetsArgs = ZodInfer<typeof customersAndPetsArgsSchema>

export type CustomersAndPetsResponse = ZodInfer<typeof customersAndPetsResponseSchmea>

export type CustomersAndPetsCountSummaryResponse = ZodInfer<
   typeof customersAndPetsCountSummaryResponseSchema
>
