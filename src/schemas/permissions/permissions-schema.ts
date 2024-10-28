import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

// Define the user roles enum
export const USER_ROLES = z.enum(['STAFF', 'ADMIN', 'NON_ADMIN'])
export type UserRole = z.infer<typeof USER_ROLES>

// Define the permission schema
export const permissionSchema = z.object({
   id: z.string(),
   name: z.string(),
   description: z.string(),
   staffEnabled: z.boolean(),
   adminEnabled: z.boolean(),
   nonAdminEnabled: z.boolean(),
   lockedRoles: z.array(USER_ROLES),
})

// Define the permission group schema
const permissionGroupSchema = z.object({
   id: z.string(),
   name: z.string(),
   permissions: z.array(permissionSchema),
})
export const userRoleValues: Record<UserRole, keyof ZodInfer<typeof permissionSchema>> = {
   ADMIN: 'adminEnabled',
   STAFF: 'staffEnabled',
   NON_ADMIN: 'nonAdminEnabled',
}
export const permissionGroupSchemaList = z.array(permissionGroupSchema)
// Define types based on the Zod schemas
export type PermissionResponse = ZodInfer<typeof permissionSchema>
export type PermissionGroupResponse = ZodInfer<typeof permissionGroupSchema>
export type PermissionGroupListResponse = ZodInfer<typeof permissionGroupSchemaList>
