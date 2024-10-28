import { StaffInviteStatusEnum } from '@/components/settings/staff/table/staffs-list-columns'
import { FORMATTED_DATE_STRING } from '@/constants/utils'
import { DetailFieldType } from '@/types/utils'
import { type ClassValue, clsx } from 'clsx'
import { format, isValid, parseISO, setHours, setMinutes } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export function retriveNameFromEmail(email: string) {
   return email.split('@')[0]
}

export const transformApiResponse = (
   data: any,
   fields: Record<string, string>,
   dateFormat: string | undefined = 'dd/MM/yy',
): DetailFieldType[] => {
   const transformedFields: DetailFieldType[] = []

   for (const [displayKey, apiKey] of Object.entries(fields)) {
      let value: any

      // Handle concatenated fields
      if (apiKey.includes(' ')) {
         const keys = apiKey.split(' ')
         value = keys
            .map((key) => getValue(data, key) ?? '')
            .join(' ')
            .trim()
      } else {
         value = getValue(data, apiKey)
      }

      // Special handling for 'Customer Name'
      if (displayKey === 'Customer Name') {
         value = `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'N/A'
      }

      // Special handling for 'dob' to calculate age
      if (apiKey === 'dob' && typeof value === 'string') {
         const dobDate = parseISO(value)
         if (isValid(dobDate)) {
            const age = calculateAge(dobDate)
            value = `${format(dobDate, dateFormat)} (${age})`
         } else {
            value = 'N/A'
         }
      } else if (apiKey === 'bitch') {
         if (value === null || value === undefined) {
            value = 'N/A'
         } else {
            value = value === true ? 'Female' : 'Male'
         }
      } else {
         // General date handling
         if (value === null || value === undefined) {
            value = 'N/A'
         } else if (value === '') {
            value = '-'
         } else if (typeof value === 'boolean') {
            value = value ? 'Yes' : 'No'
         } else if (value && typeof value === 'string' && isDate(value)) {
            value = format(value, dateFormat)
         } else if (typeof value === 'string' && isValid(parseISO(value))) {
            const dateValue = parseISO(value)
            value = format(dateValue, dateFormat)
         }
      }

      const field: DetailFieldType = { label: displayKey, value: value.toString() }
      transformedFields.push(field)
   }

   return transformedFields
}

export function calculateAge(dob: Date): string {
   const now = new Date()
   let years = now.getFullYear() - dob.getFullYear()
   let months = now.getMonth() - dob.getMonth()

   if (months < 0) {
      years--
      months += 12
   }

   // Cases where the same year and month are zero
   if (years === 0 && months === 0) {
      return 'Newborn'
   } else if (years === 0) {
      return `${months}m`
   } else if (months === 0) {
      return `${years}y`
   }

   return `${years}y ${months}m`
}

export function getValue(data: any, key: string): any {
   return key.split('.').reduce((acc, part) => acc && acc[part], data)
}

export function isDate(value: any): boolean {
   return !isNaN(Date.parse(value))
}

export function retrieveNumberAndPrefix(mobile: string) {
   const prefix = mobile.slice(0, 3)
   const number = mobile.slice(3)
   return [prefix, number]
}

export function getStatusVariant(status: StaffInviteStatusEnum) {
   switch (status) {
      case StaffInviteStatusEnum.ACTIVE:
         return 'success'
      case StaffInviteStatusEnum.PENDING:
         return 'warning'
      case StaffInviteStatusEnum.NOT_INVITED:
         return 'danger'

      default:
         break
   }
}

export const addTimeToDateTimeString = (timeString: string, dateTimeString: string) => {
   const [hr, min] = timeString.split(':')
   return format(setHours(setMinutes(dateTimeString, +min), +hr), FORMATTED_DATE_STRING)
}

export const convertTime24to12 = (time24: string) => {
   const [hours, minutes] = time24.split(':').map(Number)
   const date = new Date()
   date.setHours(hours, minutes)
   return format(date, 'hh:mm a')
}
