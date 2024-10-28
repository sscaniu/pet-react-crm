export enum StaffTableTabEnum {
   LIST = 'list',
   ROTA = 'rota',
   ROLES = 'roles',
}

type StaffTableTabType = {
   name: string
   tab: StaffTableTabEnum
}

export const staffsTableTabs: StaffTableTabType[] = [
   { name: 'staff list', tab: StaffTableTabEnum.LIST },
   { name: 'staff rota', tab: StaffTableTabEnum.ROTA },
   { name: 'staff roles', tab: StaffTableTabEnum.ROLES },
]
