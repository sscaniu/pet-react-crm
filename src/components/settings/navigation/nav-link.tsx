'use client'

import FaIcon from '@/components/common/fa-icon'
import { NavLinkType } from '@/constants/nav-links'
import { cn } from '@/lib/utils'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavLink = ({ item }: { item: NavLinkType }) => {
   const pathname = usePathname()

   const isActive = pathname.split('/')[2] === item.href

   return (
      <Link
         href={`/settings/${item.href}`}
         className={cn(
            'flex flex-1 items-center gap-4 rounded-xl px-4 py-3 font-medium capitalize text-grey-04 hover:text-primary-02',
            {
               'bg-primary-bg text-primary-02': isActive,
               'p-0': item.customIcon,
            },
         )}
      >
         <FaIcon icon={item.icon as IconDefinition} className="w-8" />

         {item.text}
      </Link>
   )
}

export default NavLink
