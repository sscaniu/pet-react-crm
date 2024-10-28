import {
   faCalendar,
   faFileLines,
   faMoneyBillWave,
   faPaw,
   faUser,
   IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

export enum CustomerTableTabEnum {
   ACTIVE = 'ACTIVE',
   ARCHIVED = 'ARCHIVED',
   BLACKLISTED = 'BLACKLISTED',
}

export enum NoteVariantEnum {
   APPOINTMENT = 'APPOINTMENT',
   CUSTOMER = 'CUSTOMER',
   PET = 'PET',
}

export enum SidebarActionEnum {
   EDIT = 'edit',
   CREATE = 'create',
   PET_ADD = 'pet-add',
}

export enum SidebarNavEnum {
   CUSTOMER = 'customer',
   PET = 'pet',
   APPOINTMENT = 'appointment',
   RECEIPT = 'receipt',
   FORM = 'form',
}

export enum DetailsTabEnum {
   INFORMATION = 'information',
   NOTES = 'notes',
}

export enum InternalNotesTabEnum {
   APPOINTMENT = 'appointment',
   PET = 'pet',
   CUSTOMER = 'customer',
}

export enum PetProfileTabEnum {
   INFORMATION = 'information',
   APPOINTMENTS = 'appointments',
}

export enum ReceiptTabEnum {
   PAID = 'paid',
   UNPAID = 'unpaid',
   DRAFT = 'draft',
   VOID = 'void',
}

export enum ReceiptViewEnum {
   LIST = 'list',
   DETAILS = 'details',
}

export enum PetViewEnum {
   LIST = 'list',
   DETAILS = 'details',
}

export enum FormTabEnum {
   CHECK_IN = 'check_in',
   CONTRACT = 'contract',
   OTHER = 'other',
}

type CustomerTableTabType = {
   name: string
   tab: CustomerTableTabEnum
}

type CustomerDetailsTabType = {
   name: string
   tab: DetailsTabEnum
}

type CustomerInternalNoteTabType = {
   name: string
   tab: InternalNotesTabEnum
}

type PetProfileTabType = {
   name: string
   tab: PetProfileTabEnum
}

type ReceiptTabType = {
   name: string
   tab: ReceiptTabEnum
}

export type SidebarNavType = {
   icon: IconDefinition
   name: SidebarNavEnum
}

type FormTabType = {
   name: string
   tab: FormTabEnum
}

export const customersTableTabs: CustomerTableTabType[] = [
   { name: 'active', tab: CustomerTableTabEnum.ACTIVE },
   { name: 'archived', tab: CustomerTableTabEnum.ARCHIVED },
   { name: 'blacklisted', tab: CustomerTableTabEnum.BLACKLISTED },
]

export const customerDetailsTabs: CustomerDetailsTabType[] = [
   { name: 'customer information', tab: DetailsTabEnum.INFORMATION },
   { name: 'internal notes', tab: DetailsTabEnum.NOTES },
]

export const customerInternalNotesTabs: CustomerInternalNoteTabType[] = [
   { name: 'appointment notes', tab: InternalNotesTabEnum.APPOINTMENT },
   { name: 'pet notes', tab: InternalNotesTabEnum.PET },
   { name: 'customer notes', tab: InternalNotesTabEnum.CUSTOMER },
]

export const petProfileTabs: PetProfileTabType[] = [
   { name: 'pet info', tab: PetProfileTabEnum.INFORMATION },
   { name: 'appointments', tab: PetProfileTabEnum.APPOINTMENTS },
]

export const receiptTabs: ReceiptTabType[] = [
   { name: 'paid', tab: ReceiptTabEnum.PAID },
   { name: 'unpaid', tab: ReceiptTabEnum.UNPAID },
   { name: 'draft', tab: ReceiptTabEnum.DRAFT },
   { name: 'void', tab: ReceiptTabEnum.VOID },
]

export const formTabs: FormTabType[] = [
   { name: 'check-in forms', tab: FormTabEnum.CHECK_IN },
   { name: 'contracts', tab: FormTabEnum.CONTRACT },
   { name: 'other', tab: FormTabEnum.OTHER },
]

export const sidebarNavs: SidebarNavType[] = [
   { icon: faUser, name: SidebarNavEnum.CUSTOMER },
   { icon: faPaw, name: SidebarNavEnum.PET },
   { icon: faCalendar, name: SidebarNavEnum.APPOINTMENT },
   { icon: faMoneyBillWave, name: SidebarNavEnum.RECEIPT },
   { icon: faFileLines, name: SidebarNavEnum.FORM },
]
