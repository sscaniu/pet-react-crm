import FaIcon from '@/components/common/fa-icon'
import { SidebarNavType } from '@/constants/appointment-tabs'
import { cn } from '@/lib/utils'
import { useSidebarNavStore } from '@/providers/appointment/sidebar-nav-store-provider'
import { IconProps } from '@/types/icon'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@itsallsavvy/savvy-resuable-components'
import { ComponentType } from 'react'

interface Props {
   navs: SidebarNavType[]
}

export default function SidebarNavigation({ navs }: Props) {
   const { mainNav, setMainNav } = useSidebarNavStore((state) => state)

   return (
      <div className={cn('min-h-screen border-r border-grey-06 bg-grey-00')}>
         <div className="sticky top-0 flex flex-col items-center gap-8 px-2 py-6">
            {navs.map((n) => {
               const Icon = n.icon as ComponentType<IconProps>
               return (
                  <Button
                     className={cn({ 'p-0': !!n.customIcon })}
                     variant="icon"
                     key={n.name}
                     onClick={() => setMainNav(n.name)}
                  >
                     {n.customIcon ? (
                        <Icon
                           className={cn('h-11 w-11 p-0', { 'text-primary': n.name === mainNav })}
                        />
                     ) : (
                        <FaIcon
                           icon={n.icon as IconDefinition}
                           className={cn({
                              'text-primary': n.name === mainNav,
                           })}
                           size="xl"
                        />
                     )}
                  </Button>
               )
            })}
         </div>
      </div>
   )
}
