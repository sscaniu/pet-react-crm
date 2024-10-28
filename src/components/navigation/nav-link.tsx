'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NavLinkType } from '@/constants/nav-links'
import FaIcon from '../common/fa-icon'
import { useNavMenuDrawerStore } from '@/providers/customer/nav-menu-drawer-store-provider'
import { ComponentType } from 'react'
import { IconProps } from '@/types/icon'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

const NavLink = ({ item }: { item: NavLinkType }) => {
   const segment = useSelectedLayoutSegment()
   const { setOpenDrawer } = useNavMenuDrawerStore((state) => state)

   const isActive = `/${segment}` === item.href

   const Icon = item.icon as ComponentType<IconProps>

   return (
      <Link
         href={item.href}
         onClick={() => setOpenDrawer(false)}
         className={cn(
            'flex flex-1 items-center gap-4 rounded-xl p-3 font-medium capitalize text-grey-04 hover:text-primary-02',
            {
               // 'border-b-grey-01 text-grey-02': !isActive,
               'border-2 border-primary-01 bg-primary-bg text-primary-02': isActive,
               'p-0': item.customIcon,
            },
         )}
      >
         {item.customIcon ? (
            <Icon className="h-11 w-11 text-primary-02" />
         ) : (
            <FaIcon icon={item.icon as IconDefinition} size="xl" className="w-8 text-primary-02" />
         )}

         {item.text}
      </Link>
   )
}

export default NavLink
