import { FormErrorMessage } from '@/constants/message'
import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const createStaffActionSchema = z
   .object({
      name: z.string().min(1, { message: FormErrorMessage.NAME_REQUIRED }),
      userMobilePrefix: z.string().optional(),
      mobile: z.string().regex(/^\d+$/, { message: FormErrorMessage.INVALID_MOBILE }),
      telephone: z.string(),
      email: z.string().email({ message: FormErrorMessage.INVALID_EMAIL }),
      defaultLocationId: z.string(),
      userRole: z.string(),
      enableOnlineBooking: z.boolean(),
      inviteToDashboard: z.boolean(),
      dashboardPermissionLevel: z.string(),
   })
   .refine(
      (data) => {
         if (data.mobile && !data.userMobilePrefix) {
            return false
         }
         return true
      },
      {
         message: FormErrorMessage.MOBILE_PREFIX_REQUIRED,
         path: ['mobile'],
      },
   )

export type CreateStaffActionValues = ZodInfer<typeof createStaffActionSchema>
