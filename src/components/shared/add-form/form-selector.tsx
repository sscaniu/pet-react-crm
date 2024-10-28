'use client'

import { cn } from '@/lib/utils'
import {
   Table,
   TableHeader,
   TableRow,
   TableHead,
   TableBody,
   TableCell,
   Badge,
   Checkbox,
   ScrollArea,
   SearchInput,
} from '@itsallsavvy/savvy-resuable-components'
import { SetStateAction, useState } from 'react'
import useSWR from 'swr'
import { getFormTemplates } from '@/fetcher/customers-and-pets/queries/getFormTemplates'
import { FormTemplate } from '@/schemas/forms/form-templates-schema'

interface Props {
   selectedFormIds: string[]
   setSelectedFormIds: React.Dispatch<SetStateAction<string[]>>
   availableForms: FormTemplate[]
}

export default function SelectFormsCard({ selectedFormIds, setSelectedFormIds }: Props) {
   const {
      data: getFormTemplatesData,
      isLoading: fetchingFormTemplatesList,
      isValidating,
   } = useSWR(['/ui/loadCustomerFormTypes'], ([url]) => getFormTemplates({ url }))

   const formTemplatesCount = getFormTemplatesData?.length ?? 0

   const handleCheckboxChange = (id: string, checked: boolean) => {
      if (!checked) {
         setSelectedFormIds((prev) => prev.filter((_id) => _id !== id))
         return
      }

      setSelectedFormIds((prev) => [...prev, id])
   }

   return (
      <div className="flex flex-col gap-4">
         <SearchInput name="search active forms" placeholder="Search Active Forms" />
         <div className="border-grey-6 rounded-lg border">
            <ScrollArea className="h-[60vh]">
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead className="w-[300px]">Form Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Send To</TableHead>
                        <TableHead>Send On</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right"></TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {getFormTemplatesData?.map((form, index) => (
                        <TableRow key={form.id} className="last:border-b-0">
                           <TableCell className="font-medium">{form.name}</TableCell>
                           <TableCell>{form.type}</TableCell>
                           <TableCell>{form.sendTo}</TableCell>
                           <TableCell>{form.sendOn}</TableCell>
                           <TableCell>
                              <Badge className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
                                 {form.status}
                              </Badge>
                           </TableCell>
                           <TableCell className="text-right [&:has([role=checkbox])]:pr-4">
                              <Checkbox
                                 checked={!!selectedFormIds.find((id) => id === form.id)}
                                 onCheckedChange={(checked: boolean) =>
                                    handleCheckboxChange(form.id, checked)
                                 }
                                 className="h-6 w-6 rounded-full data-[state=checked]:rounded-full"
                              />
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </ScrollArea>
         </div>
      </div>
   )
}
