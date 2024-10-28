import { StaffTableStoreProvider } from '@/providers/staff/staff-table-store-provider'

export default async function StaffLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return <StaffTableStoreProvider>{children}</StaffTableStoreProvider>
}
