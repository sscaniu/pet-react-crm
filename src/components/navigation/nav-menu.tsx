import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '../common/fa-icon'
import NavLinksGroup from './nav-links-group'

export default function NavMenu() {
   return (
      <aside className="flex h-full w-nav-menu flex-col p-4 pt-6">
         <div className="flex w-full flex-1 flex-col justify-between">
            <NavLinksGroup />
            <div className="flex items-center gap-4 p-3">
               <FaIcon icon={faCircleQuestion} className="text-primary-02" size="2xl" />
               <h6 className="text-lg font-medium text-grey-04">Need Help?</h6>
            </div>
         </div>
      </aside>
   )
}
