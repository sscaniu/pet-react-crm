import { FlagType } from '@/schemas/customers-and-pets/flags-schema'

export type DetailFieldType = {
   label: string
   value: string | number | Date | undefined | boolean
}

export type SelectOption = { label: string; value: string }

export type FlagsData = {
   [x in FlagType['id']]: FlagType
}

export type FormType = {
   id: string
   title: string
   status: FormStatusEnum | null
   completedOn: string
   sentOn: string
   createdOn: string
}

export enum FormStatusEnum {
   COMPLETED = 'completed',
   INCOMPLETE = 'incomplete',
}
