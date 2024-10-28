import FaIcon from '@/components/common/fa-icon'
import { SidebarNavType } from '@/constants/customers-tabs'
import { cn } from '@/lib/utils'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { Button } from '@itsallsavvy/savvy-resuable-components'

interface Props {
   navs: SidebarNavType[]
}

export default function SidebarNavigation({ navs }: Props) {
   const { mainNav, setMainNav, action } = useSidebarNavStore((state) => state)

   return (
      <div
         className={cn(
            'sticky top-0 flex min-h-screen flex-col items-center gap-8 border-r border-grey-06 bg-grey-00 px-2 py-6',
         )}
      >
         {navs.map((n) => (
            <Button variant="icon" key={n.name} onClick={() => setMainNav(n.name)}>
               <FaIcon
                  icon={n.icon}
                  className={cn({
                     'text-primary': n.name === mainNav,
                  })}
                  size="xl"
               />
            </Button>
         ))}
      </div>
   )
}
