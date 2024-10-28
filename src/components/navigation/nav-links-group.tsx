import { navLinks } from '@/constants/nav-links'
import NavLink from './nav-link'

export default function NavLinksGroup() {
   return (
      <div className="flex w-full flex-col justify-center gap-2">
         {navLinks.map((item) => (
            <NavLink item={item} key={item.text} />
         ))}
      </div>
   )
}
