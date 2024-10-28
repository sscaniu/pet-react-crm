import { z } from 'zod'
import { ZodInfer } from '@/types/zod'

const phoneNumberSchema = z.object({
   country: z.string(),
   nationalNumber: z.string(),
   internationalNumber: z.string(),
})

export const USER_ROLES = z.enum(['STAFF', 'ADMIN', 'NON_ADMIN'])
// Define a mapping from enum values to labels
export const userRoleLabels: Record<UserRole, string> = {
   ADMIN: 'Administrator',
   STAFF: 'Groomer',
   NON_ADMIN: 'Non-Groomer',
}

export type UserRole = z.infer<typeof USER_ROLES>

export const DASHBOARD_PERMISSION_LEVEL = z.enum(['NONE', 'LOW', 'MEDIUM', 'HIGH'])

// Define a mapping from enum values to labels
export const dashboardPermissionLevelLabels: Record<DashboardPermissionLevel, string> = {
   NONE: 'None',
   LOW: 'Low',
   MEDIUM: 'Medium',
   HIGH: 'High',
}

export type DashboardPermissionLevel = z.infer<typeof DASHBOARD_PERMISSION_LEVEL>

export const createUserSchema = z.object({
   firstName: z.string(),
   lastName: z.string(),
   mobilePhoneNumberObj: phoneNumberSchema,
   emailAddress: z.string().email(), // Added email validation
   defaultLocationId: z.string(),
   userRole: USER_ROLES,
   enableOnlineBooking: z.boolean(),
   inviteToDashboard: z.boolean(),
   dashboardPermissionLevel: DASHBOARD_PERMISSION_LEVEL,
})

export type CreateUserArgs = ZodInfer<typeof createUserSchema>
