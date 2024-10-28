import UserAndPawIcon from '@/components/icon/user-and-paw'
import { IconProps } from '@/types/icon'
import {
   faCalendar,
   faChartPie,
   faEnvelope,
   faFileLines,
   faMoneyBillWave,
   faPaw,
   faScissors,
   IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'

export type NavLinkType = {
   text: string
   href: string
   customIcon?: boolean
   icon: IconDefinition | FC<IconProps>
}

export const navLinks: NavLinkType[] = [
   { text: 'calendar', href: '/calendar', icon: faCalendar },
   { text: 'appointments', href: '/appointments', icon: faScissors },
   {
      text: 'customers and pets',
      href: '/customers-and-pets',
      icon: UserAndPawIcon,
      customIcon: true,
   },
   { text: 'forms', href: '/forms', icon: faFileLines },
   { text: 'payments', href: '/payments', icon: faMoneyBillWave },
   { text: 'messages', href: '/messages', icon: faEnvelope },
   { text: 'reports & analytics', href: '/reports-and-analytics', icon: faChartPie },
]
