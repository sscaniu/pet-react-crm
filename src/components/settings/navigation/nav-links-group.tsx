import NavLink from './nav-link'
import { settingsNavs } from '@/constants/settings-tabs'

export default function NavLinksGroup() {
   return (
      <div className="flex w-full flex-col justify-center">
         {/* Set height `h-[calc(100vh-64px-48px-76px-80px-54px-49px)]` if ScrollArea is added */}
         {settingsNavs.map((item) => (
            <NavLink item={item} key={item.text} />
         ))}
      </div>
   )
}
