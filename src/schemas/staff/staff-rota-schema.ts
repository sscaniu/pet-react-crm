import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const slotStaffRotaSchema = z.object({
   id: z.string(),
   startDateTimeString: z.string(),
   endDateTimeString: z.string(),
   isOnLeave: z.string(),
   durationOfLeave: z.string(),
})

export const individualStaffSchema = z.object({
   id: z.string(),
   name: z.boolean(),
   map: z.record(
      z.object({
         slots: z.array(slotStaffRotaSchema),
      }),
   ),
})

export type IndividualStaffRota = ZodInfer<typeof individualStaffSchema>

export const staffRotaSchema = z.object({
   staffRotas: z.array(individualStaffSchema),
})

export type StaffRotaResponse = ZodInfer<typeof staffRotaSchema>

export const timeCellSlotSchema = z.object({
   id: z.string(),
   startTime: z.string(),
   endTime: z.string(),
   onLeave: z.boolean(),
   leaveDescription: z.string(),
   durationOfLeave: z.string(),
})

export type TimeCellSlot = ZodInfer<typeof timeCellSlotSchema>

export const editSingleShiftSchema = z.object({
   staffId: z.string(),
   locationId: z.string(),
   shiftDate: z.date(),
   slots: z.array(timeCellSlotSchema),
})

export type EditSingleShiftArgs = ZodInfer<typeof editSingleShiftSchema>

export const editSingleShiftResponseSchema = z.object({})

export const editRegularShiftSchema = z.object({
   staffId: z.string(),
   locationId: z.string(),
   shiftStartDate: z.date(),
   shiftEndDate: z.date(),
   slots: z.array(timeCellSlotSchema),
})

export type EditRegularShiftArgs = ZodInfer<typeof editRegularShiftSchema>

export const editRegularShiftResponseSchema = z.object({})

export const timeSlotSchema = z.object({
   startTime: z.string(),
   endTime: z.string(),
})

export const regularShiftSchema = z.object({
   staffId: z.string(),
   ownerId: z.date(),
   slots: z.array(timeSlotSchema),
})

export type RegularShift = ZodInfer<typeof regularShiftSchema>
