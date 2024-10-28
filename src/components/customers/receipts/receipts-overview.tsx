import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { PetViewEnum, ReceiptViewEnum } from '@/constants/customers-tabs'
import ReceiptsList from './receipts-list'
import ReceiptDetails from './receipt-details'

export default function ReceiptsOverview() {
   const { receiptView } = useSidebarNavStore((state) => state)

   const receiptsElement = {
      [PetViewEnum.LIST]: <ReceiptsList />,
      [ReceiptViewEnum.DETAILS]: <ReceiptDetails />,
   }[receiptView]

   return receiptsElement
}
