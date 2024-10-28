'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Item } from './link-tab-group'
import { cn } from '@/lib/utils'
import useSWR from 'swr'
import { getCustomersAndPets } from '@/fetcher/customers-and-pets/queries/getCustomersAndPets'

const LinkTab = ({
   path,
   parallelRoutesKey,
   item,
}: {
   path: string
   parallelRoutesKey?: string
   item: Item
}) => {
   const segment = useSelectedLayoutSegment(parallelRoutesKey)
   const { data: customersAndPetsData } = useSWR(
      [
         '/searchV2/performSearch',
         {
            searchString: 'custom',
            paginationData: {
               pageNumber: 1,
               pageSize: 20,
            },
            includeFlags: [],
            excludeFlags: [],
            ascending: true,
         },
      ],
      ([url, args]) => getCustomersAndPets({ url, args }),
   )

   const href = item.slug ? path + '/' + item.slug : path
   const isActive =
      // Example home pages e.g. `/layouts`
      (!item.slug && segment === null) ||
      segment === item.segment ||
      // Nested pages e.g. `/layouts/electronics`
      segment === item.slug

   return (
      <Link
         href={href}
         className={cn(
            'flex flex-1 items-center justify-center border-b py-4 text-sm font-medium capitalize',
            {
               'border-b-grey-01 text-grey-02': !isActive,
               'border-b-primary text-primary': isActive,
            },
         )}
      >
         <div className="flex items-center gap-2">
            {item.text}
            <span
               className={cn('rounded-full px-2 py-0.5 text-xs font-bold text-white', {
                  'bg-primary': isActive,
                  'bg-grey-02': !isActive,
               })}
            >
               {item.slug === 'active' ? (customersAndPetsData?.totalElements ?? 0) : 0}
            </span>
         </div>
      </Link>
   )
}

export default LinkTab
