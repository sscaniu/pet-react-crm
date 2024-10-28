import { FormErrorMessage } from '@/constants/message'
import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const petGenderSchema = z.enum(['MALE', 'FEMALE'])

export const yesOrNoEnum = z.enum(['YES', 'NO'])

export const petActionSchema = z.object({
   name: z.string().min(1, { message: FormErrorMessage.PET_NAME_REQUIRED }),
   type: z.string().min(1, { message: FormErrorMessage.PET_TYPE_REQUIRED }),
   breed: z.string().min(1, { message: FormErrorMessage.PET_BREED_REQUIRED }),
   size: z.string().min(1, { message: FormErrorMessage.PET_SIZE_REQUIRED }),
   sex: z.string().min(1, { message: FormErrorMessage.PET_GENDER_REQUIRED }),
   bitch: z.boolean().optional(),
   colour: z.string().optional(),
   neutrated: z.string().optional(),
   transformedNeutrated: z.boolean().optional(),
   weight: z
      .string()
      .optional()
      .refine((value) => value === '' || /^\d+$/.test(value as any), {
         message: FormErrorMessage.INVALID_WEIGHT,
      }),
   regularBlades: z.string().optional(),
   deceased: z.boolean().optional(),
   insured: z.string().optional(),
   transformedInsured: z.boolean().optional(),
   recommendedVisitFreq: z.string().optional(),
   specialConsiderations: z.string().optional(),
   medicalConditions: z.string().optional(),
   allergies: z.string().optional(), // Assuming this is a typo and should be "allergies"
   internalNotes: z.string().optional(),
   //    dob: z.string().min(1, { message: FormErrorMessage.INVALID_DOB }),
   dob: z.date({
      errorMap: (issue, { defaultError }) => ({
         message:
            issue.code === 'invalid_date' ? "That's not a date!" : FormErrorMessage.INVALID_DOB,
      }),
   }),
   flags: z.object({ label: z.string(), value: z.string() }).array().nullable(),
})

export type PetActionValues = ZodInfer<typeof petActionSchema>
