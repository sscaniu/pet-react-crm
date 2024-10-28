export enum RegularShiftTabEnum {
   SHIFT_TIME = 'shift time',
   SHIFT_FREQUENCY = 'shift frequency',
}

type RegularShiftTabType = {
   name: string
   tab: RegularShiftTabEnum
}

export const regularShiftTabs: RegularShiftTabType[] = [
   { name: 'shift time', tab: RegularShiftTabEnum.SHIFT_TIME },
   { name: 'shift frequency', tab: RegularShiftTabEnum.SHIFT_FREQUENCY },
]
