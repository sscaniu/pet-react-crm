import { settingsNavs } from '@/constants/settings-tabs'
import { cn } from '@/lib/utils'
import NavLinksGroup from '../navigation/nav-links-group'
import { Button, SearchInput } from '@itsallsavvy/savvy-resuable-components'
import FaIcon from '@/components/common/fa-icon'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function SettingsNavMenu() {
   return (
      <div
         className={cn('w-[270px] flex-shrink-0 rounded-2xl bg-white shadow-01 transition-all', {
            //  h-[calc(100vh-128px)] sticky top-[104px]
            /**
             * @description
             * Padding - 100px
             */
            // '-translate-x-[calc(100%+100px)] transform': !open,
            // 'translate-x-0 transform': open,
         })}
      >
         <div className="flex items-center justify-between border-b border-grey-06 p-6">
            <h6 className="text-xl font-medium">Settings</h6>
         </div>
         <div className="flex flex-col gap-2 px-4 pb-16 pt-4">
            <SearchInput name="search tools" className="h-10 rounded-2xl" placeholder="Search..." />
            <NavLinksGroup />
         </div>
         <div className="border-t border-grey-06 px-6 py-2">
            <Button variant="text" color="secondary">
               <FaIcon icon={faArrowRightFromBracket} className="rotate-180" />
               Log out
            </Button>
         </div>
      </div>
   )
}
