'use client'

import { cn } from '@/lib/utils'
import { Item } from './tab-group'

interface Props<TabItem extends string> {
   isActive: boolean
   item: Item<TabItem>
   setActiveTab: (tab: TabItem) => void
}

const Tab = <TabItem extends string>({ isActive, item, setActiveTab }: Props<TabItem>) => {
   return (
      <button
         onClick={() => setActiveTab(item.tab)}
         className={cn(
            'flex flex-1 items-center justify-center gap-1 border-b py-4 text-sm font-medium capitalize',
            {
               'border-b-grey-01 text-grey-02': !isActive,
               'border-b-primary text-primary': isActive,
            },
         )}
      >
         {item.text}
         {item.count !== undefined && (
            <span
               className={cn('rounded-full px-2 py-0.5 text-xs font-bold text-white', {
                  'bg-primary': isActive,
                  'bg-grey-02': !isActive,
               })}
            >
               {item.count}
            </span>
         )}
      </button>
   )
}

export default Tab
