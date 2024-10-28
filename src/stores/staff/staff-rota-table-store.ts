import { StaffRota } from '@/components/settings/staff/table/staff-rota-columns'
import { RegularShiftTabEnum } from '@/constants/staff-rota-regular-shift-tabs'
import { createStore } from 'zustand'
import { KeyedMutator } from 'swr'
import { StaffRotaResponse } from '@/schemas/staff/staff-rota-schema'

export type StaffRotaState = {
   staffRotaEditChanges?: StaffRota
   regularShiftTab: RegularShiftTabEnum
   refetchStaffRotaList?: KeyedMutator<StaffRotaResponse>
}

export type StaffRotaTableActions = {
   setStaffRotaEditChanges: (state: StaffRotaState['staffRotaEditChanges']) => void
   setRefetchStaffRotaList: (state: StaffRotaState['refetchStaffRotaList']) => void
   setRegularShiftTab: (state: StaffRotaState['regularShiftTab']) => void
}

export type StaffRotaTableStore = StaffRotaState & StaffRotaTableActions

export const initStaffRotaTableStore = (): StaffRotaState => {
   return {
      regularShiftTab: RegularShiftTabEnum.SHIFT_TIME,
   }
}

export const defaultInitState: StaffRotaState = {
   regularShiftTab: RegularShiftTabEnum.SHIFT_TIME,
}

export const createStaffRotaTableStore = (initState: StaffRotaState = defaultInitState) => {
   return createStore<StaffRotaTableStore>()((set) => ({
      ...initState,
      setStaffRotaEditChanges: (staffRota) => set(() => ({ staffRotaEditChanges: staffRota })),
      setRefetchStaffRotaList: (refetch) => set(() => ({ refetchStaffRotaList: refetch })),
      setRegularShiftTab: (tab) => set(() => ({ regularShiftTab: tab })),
   }))
}
