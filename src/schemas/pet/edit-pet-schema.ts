import { petSchema } from '@/schemas/pet/pets-list-schema'
import { ZodInfer } from '@/types/zod'

export const editPetArgsSchema = petSchema

export type EditPetArgs = ZodInfer<typeof editPetArgsSchema>
