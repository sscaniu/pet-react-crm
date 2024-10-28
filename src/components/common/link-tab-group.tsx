import LinkTab from './link-tab'

export type Item = {
   text: string
   slug?: string
   segment?: string
}

interface Props {
   path: string
   parallelRoutesKey?: string
   items: Item[]
}

export default function LinkTabGroup({ path, parallelRoutesKey, items }: Props) {
   return (
      <div className="flex items-center">
         {items.map((item) => (
            <LinkTab
               key={path + item.slug}
               item={item}
               path={path}
               parallelRoutesKey={parallelRoutesKey}
            />
         ))}
      </div>
   )
}
