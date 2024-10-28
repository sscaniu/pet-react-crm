import { Dispatch, SetStateAction } from 'react'
import Tab from './tab'

export type Item<TabItem extends string> = {
   text: string
   tab: TabItem
   count?: number
}

interface Props<TabItem extends string> {
   items: Item<TabItem>[]
   activeTab: TabItem
   setActiveTab: (tab: TabItem) => void
}

export default function TabGroup<TabItem extends string>({
   items,
   activeTab,
   setActiveTab,
}: Props<TabItem>) {
   return (
      <div className="flex items-center">
         {items.map((item) => (
            <Tab<TabItem>
               key={item.tab}
               item={item}
               setActiveTab={setActiveTab}
               isActive={activeTab === item.tab}
            />
         ))}
      </div>
   )
}
