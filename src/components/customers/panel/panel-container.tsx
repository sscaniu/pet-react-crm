'use client'
import { cn } from '@/lib/utils'
import { useCustomerDrawerStore } from '@/providers/customer/customer-drawer-store-provider'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { faPaw, faPlus, faSliders, faUser } from '@fortawesome/free-solid-svg-icons'
import { Button, SearchInput } from '@itsallsavvy/savvy-resuable-components'
import FaIcon from '../../common/fa-icon'
import {
   customersTableTabs,
   CustomerTableTabEnum,
   SidebarActionEnum,
} from '@/constants/customers-tabs'
import { useRef } from 'react'
import TabGroup from '@/components/common/tab-group'
import { Customer } from '../table/columns'
import { Table } from '@tanstack/react-table'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import useDebounce from '@/hooks/use-debounce'

interface Props {
   open: boolean
   handleOpenFiltersMenu: () => void
   table: Table<Customer>
   totalCustomersCount: number
   totalPetsCount: number
   totalTabCount: number
   totalTabPetCount: number
   children: React.ReactNode
}

type CountsOnTab = {
   [x in CustomerTableTabEnum]: number
}

export default function PanelContainer({
   open,
   handleOpenFiltersMenu,
   table,
   children,
   totalCustomersCount,
   totalPetsCount,
   totalTabCount,
   totalTabPetCount,
}: Props) {
   const { setOpenDrawer } = useCustomerDrawerStore((state) => state)
   const { setAction } = useSidebarNavStore((state) => state)
   const searchRef = useRef<HTMLInputElement | null>(null)
   const { tableTab, setTableTab, filters, setSearchQuery } = useCustomerTableStore(
      (state) => state,
   )

   const isFiltered = filters.length > 0

   const countsOnTab: CountsOnTab = {
      ACTIVE: tableTab === CustomerTableTabEnum.ACTIVE ? totalTabCount : 0,
      ARCHIVED: tableTab === CustomerTableTabEnum.ARCHIVED ? totalTabCount : 0,
      BLACKLISTED: tableTab === CustomerTableTabEnum.BLACKLISTED ? totalTabCount : 0,
   }

   const debouncedSetSearchQuery = useDebounce((query: string) => {
      setSearchQuery(query)
   }, 300)

   const handleChangeSearchRef = () => {
      const query = searchRef?.current?.value
      debouncedSetSearchQuery(query ?? '')
   }

   const handleOpenDrawer = () => {
      setOpenDrawer(true)
      setAction(SidebarActionEnum.CREATE)
   }

   return (
      <div
         className={cn(
            /**
             * @description
             * Navbar height - 64px,w
             * Padding Y - 48px
             */
            'flex min-h-[calc(100vh-64px-48px)] flex-1 flex-col gap-8 rounded-2xl bg-white p-8 shadow-03 transition-all',
            {
               /**
                * @description
                * Filter panel width - 300px,
                * Gap - 24px
                */
               '-ml-[calc(300px+24px)]': !open,
            },
         )}
      >
         <div className="flex items-start justify-between">
            {/* Page title and subheading */}
            <div className="flex flex-col gap-2">
               <h4 className="text-xl font-medium tracking-tight">Customers & Pets</h4>
               <div className="flex items-center gap-5 text-2xs font-bold">
                  <p className="text-grey-02">Total Active</p>
                  <div className="flex items-center gap-1 text-grey-02">
                     <FaIcon icon={faUser} size="lg" />
                     <p className="text-grey-02">{totalCustomersCount}</p>
                  </div>
                  <div className="flex items-center gap-1 text-grey-02">
                     <FaIcon icon={faPaw} size="lg" />
                     <p className="text-grey-02">{totalPetsCount}</p>
                  </div>
               </div>
            </div>
            {/* Primary Action to table */}
            <div>
               <Button
                  color="secondary"
                  rightIcon={<FaIcon icon={faPlus} size="sm" />}
                  onClick={handleOpenDrawer}
               >
                  Add New
               </Button>
            </div>
         </div>

         {/* Search and Customers Table  */}
         <div className="flex flex-col gap-4">
            {/* SearchBox And Filter */}
            <div className="flex max-w-lg items-center gap-2">
               <SearchInput
                  name="Customer search"
                  placeholder="Search Names, Emails and Mobile..."
                  ref={searchRef}
                  onChange={handleChangeSearchRef}
               />
               <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleOpenFiltersMenu}
                  rightIcon={<FaIcon icon={faSliders} size="sm" />}
                  className="relative"
               >
                  Filter
                  {isFiltered ? (
                     <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-center text-[10px] text-white">
                        {filters.length}
                     </span>
                  ) : (
                     <></>
                  )}
               </Button>
            </div>
            <div>
               {isFiltered && (
                  <div className="border-b border-grey-06 py-2">
                     <p className="text-sm font-medium text-grey-04">
                        {`Showing filtered results: Customers: ${totalTabCount}, Pets: ${totalTabPetCount}`}
                     </p>
                  </div>
               )}
               <TabGroup
                  items={[
                     ...customersTableTabs.map((tab) => ({
                        text: tab.name,
                        tab: tab.tab,
                        count: countsOnTab[tab.tab],
                     })),
                  ]}
                  activeTab={tableTab}
                  setActiveTab={setTableTab}
               />
            </div>

            {children}
         </div>
      </div>
   )
}
