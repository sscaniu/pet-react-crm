import { cn } from '@/lib/utils'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { SelectOption } from '@/types/utils'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import {
   Badge,
   Button,
   Checkbox,
   MultiSelectBox,
   SelectBox,
} from '@itsallsavvy/savvy-resuable-components'
import { useEffect } from 'react'
import FaIcon from '../../common/fa-icon'

interface Props {
   open: boolean
   handleOpenFiltersMenu: () => void
}

export default function FiltersMenu({ open, handleOpenFiltersMenu }: Props) {
   const {
      selectedBreed,
      selectedFlags,
      selectedPetTypes,
      petTypes,
      breeds,
      filters,
      flags,
      setSelectedPetTypes,
      setSelectedBreed,
      clearFilters,
      setSelectedFlags,
      setFilters,
   } = useCustomerTableStore((state) => state)

   const isFiltered = filters.length > 0

   const breedsOptions: SelectOption[] = breeds.map((breed) => ({
      label: breed.label,
      value: breed.name,
   }))

   const flagsOptions: SelectOption[] = flags.map((flag) => ({ label: flag.name, value: flag.id }))

   const handleCheckedChange = (id: string, checked: boolean) => {
      setSelectedPetTypes(id, checked)
   }

   useEffect(() => {
      const breedLabel = breeds.find((brd) => brd.name === selectedBreed)?.label
      const flagLabels = selectedFlags.map((flag) => flag.label)
      const petTypeNames = selectedPetTypes.map((type) => type.type)

      setFilters([...(breedLabel ? [breedLabel] : []), ...flagLabels, ...petTypeNames])
   }, [selectedBreed, selectedFlags, breeds, petTypes, setFilters, selectedPetTypes])

   return (
      <div
         className={cn('w-[300px] flex-shrink-0 rounded-2xl bg-white shadow-01 transition-all', {
            //  h-[calc(100vh-128px)] sticky top-[104px]
            /**
             * @description
             * Padding - 100px
             */
            '-translate-x-[calc(100%+100px)] transform': !open,
            'translate-x-0 transform': open,
         })}
      >
         <div className="flex items-center justify-between border-b border-grey-06 p-6">
            <p className="text-sm font-medium">Filters</p>
            <Button variant="icon" onClick={handleOpenFiltersMenu}>
               <FaIcon icon={faChevronLeft} size="sm" />
            </Button>
         </div>

         <div className="flex flex-1 flex-col gap-5 p-6">
            {isFiltered && (
               <>
                  <div className="flex flex-col gap-1">
                     <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Applied Filters</h4>
                        <Button variant="text" color="secondary" onClick={() => clearFilters()}>
                           X Clear Filters
                        </Button>
                     </div>

                     <div className="flex flex-wrap gap-1">
                        {filters.map((filter) => (
                           <Badge key={filter}>{filter}</Badge>
                        ))}
                     </div>
                  </div>
                  <hr className="w-full bg-grey-06" />
               </>
            )}

            <div className="flex flex-col gap-4">
               <h4 className="text-sm font-medium">By Pet Type</h4>
               <div className="flex flex-col gap-2">
                  {petTypes.map((type) => (
                     <div className="flex gap-1" key={type.id}>
                        <Checkbox
                           checked={!!selectedPetTypes.find((petType) => petType.id === type.id)}
                           onCheckedChange={(checked: boolean) =>
                              handleCheckedChange(type.id, checked)
                           }
                        />
                        <span className="text-xs font-medium text-grey-04">{type.name}</span>
                     </div>
                  ))}
               </div>
               <button type="button" className="w-fit text-xs font-medium underline">
                  Manage Pet Types
               </button>
            </div>

            <hr className="w-full bg-grey-06" />

            <div className="flex flex-col gap-4">
               <h4 className="text-sm font-medium">By Breed</h4>
               <SelectBox
                  value={selectedBreed}
                  onChange={(value) => setSelectedBreed(value)}
                  placeholder="Select Breed"
                  options={breedsOptions}
                  name="Breed Type"
                  className="w-full text-left"
               />
            </div>

            <hr className="w-full bg-grey-06" />

            <div className="flex flex-col gap-4">
               <h4 className="text-sm font-medium">By Flags</h4>
               <MultiSelectBox
                  options={flagsOptions}
                  value={selectedFlags}
                  onChange={setSelectedFlags}
                  placeholder="Flags"
                  name="Flag"
                  className="w-full"
               />
               <button type="button" className="w-fit text-xs font-medium underline">
                  Manage Flags
               </button>
            </div>
         </div>
      </div>
   )
}
