import { StaffTableTabEnum } from '@/constants/staff-tabs'
import { createStore } from 'zustand'
import { ListStaffResponse } from '@/schemas/staff/staff-schema'
import { KeyedMutator } from 'swr'

export type StaffState = {
   tableTab: StaffTableTabEnum
   openAddStaffModal: boolean
   staffsListtableData?: ListStaffResponse
   refetchStaffList?: KeyedMutator<ListStaffResponse>
}

export type StaffTableActions = {
   setTableTab: (state: StaffState['tableTab']) => void
   setRefetchStaffList: (state: StaffState['refetchStaffList']) => void
   setOpenAddStaffModal: (state: StaffState['openAddStaffModal']) => void
}

export type StaffTableStore = StaffState & StaffTableActions

export const initStaffTableStore = (): StaffState => {
   return {
      tableTab: StaffTableTabEnum.LIST,
      openAddStaffModal: false,
   }
}

export const defaultInitState: StaffState = {
   tableTab: StaffTableTabEnum.LIST,
   openAddStaffModal: false,
}

export const createStaffTableStore = (initState: StaffState = defaultInitState) => {
   return createStore<StaffTableStore>()((set) => ({
      ...initState,
      setTableTab: (tableTab) => set(() => ({ tableTab })),
      setRefetchStaffList: (refetch) => set(() => ({ refetchStaffList: refetch })),
      setOpenAddStaffModal: (open) => set(() => ({ openAddStaffModal: open })),
   }))
}
