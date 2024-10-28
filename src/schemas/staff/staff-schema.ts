import { StaffInviteStatusEnum } from '@/components/settings/staff/table/staffs-list-columns'
import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const staffSchema = z.object({
   id: z.string(),
   name: z.string(),
   ownerId: z.string(),
   email: z.string().email().optional(),
   mobile: z.string().optional(),
   storeLocation: z.string().optional(),
   // Role should be enum
   role: z.string().optional(),
   // PermissionLevel also might be enum
   permissionLevel: z.string().optional(),
   inviteStatus: z.nativeEnum(StaffInviteStatusEnum).optional(),
})

export type StaffSchema = ZodInfer<typeof staffSchema>

export const listStaffResponseSchema = z.array(staffSchema)
export type ListStaffResponse = ZodInfer<typeof listStaffResponseSchema>

// contact: {
//    email: string
//    mobile: string
// }
// storeLocation: string
// role: string
// permissionLevel: string
// inviteStatus: StaffInviteStatusEnum
