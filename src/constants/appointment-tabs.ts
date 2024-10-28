import UserAndPawIcon from '@/components/icon/user-and-paw'
import { IconProps } from '@/types/icon'
import {
   faCalendarWeek,
   faEnvelope,
   faFileInvoiceDollar,
   faFileLines,
   IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'

export enum SidebarNavEnum {
   SERVICE = 'service',
   INFORMATION = 'information',
   FORM = 'form',
   PAYMENT = 'payment',
   MESSAGE = 'message',
}

export type SidebarNavType = {
   icon: IconDefinition | FC<IconProps>
   name: SidebarNavEnum
   customIcon?: boolean
}

export const sidebarNavs: SidebarNavType[] = [
   { icon: faCalendarWeek, name: SidebarNavEnum.SERVICE },
   { icon: UserAndPawIcon, name: SidebarNavEnum.INFORMATION, customIcon: true },
   { icon: faFileLines, name: SidebarNavEnum.FORM },
   { icon: faFileInvoiceDollar, name: SidebarNavEnum.PAYMENT },
   { icon: faEnvelope, name: SidebarNavEnum.MESSAGE },
]
