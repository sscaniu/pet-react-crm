import {
   faBell,
   faCalendar,
   faCreditCard,
   faEnvelope,
   faFileImport,
   faFlag,
   faGem,
   faInbox,
   faPercent,
   faScissors,
   faShop,
   faUsers,
   IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

export enum SettingsNavEnum {
   SHOP = 'shop',
   SAVVY_PLAN = 'savvy-plan',
   PAYMENTS = 'payments',
   AUTOMATIONS = 'automations',
   SERVICES_AND_PRODUCTS = 'services-and-products',
   STAFF = 'staff',
   TAX = 'tax',
   BOOKING = 'booking',
   CALENDAR = 'calendar',
   FLAGS = 'flags',
   MESSAGES = 'messages',
   IMPORT = 'import',
}

export type SettingsNavType = {
   icon: IconDefinition
   href: SettingsNavEnum
   text: string
}

export const settingsNavs: SettingsNavType[] = [
   { icon: faShop, href: SettingsNavEnum.SHOP, text: 'Shop' },
   { icon: faGem, href: SettingsNavEnum.SAVVY_PLAN, text: 'Savvy Plan' },
   { icon: faCreditCard, href: SettingsNavEnum.PAYMENTS, text: 'Payments' },
   { icon: faBell, href: SettingsNavEnum.AUTOMATIONS, text: 'Automations' },
   { icon: faScissors, href: SettingsNavEnum.SERVICES_AND_PRODUCTS, text: 'Services & Products' },
   { icon: faUsers, href: SettingsNavEnum.STAFF, text: 'Staff' },
   { icon: faPercent, href: SettingsNavEnum.TAX, text: 'Tax' },
   { icon: faInbox, href: SettingsNavEnum.BOOKING, text: 'Online Booking' },
   { icon: faCalendar, href: SettingsNavEnum.CALENDAR, text: 'Calendar' },
   { icon: faFlag, href: SettingsNavEnum.FLAGS, text: 'Flags' },
   { icon: faEnvelope, href: SettingsNavEnum.MESSAGES, text: 'Messages' },
   { icon: faFileImport, href: SettingsNavEnum.IMPORT, text: 'Data Import' },
]
