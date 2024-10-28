import { cn, transformApiResponse } from '@/lib/utils'
import { CustomerInformationResponse } from '@/schemas/customer/customer-information-schema'
import CustomerCardDetails from '../../ui/customer-card-details'
import useSWR from 'swr'
import { listStoredCardsByCustomerId } from '@/fetcher/savvy-pay/queries/savvyPayStoredCards/listStoredCardsByCustomerId'

interface Props {
   customerInformationData?: CustomerInformationResponse
}

export default function CustomerInformation({ customerInformationData }: Props) {
   const customerDetailsFields = {
      'Customer Name': 'firstName lastName',
      Gender: 'gender',
      'Mobile Number': 'mobilePhoneNumberObj.internationalNumber',
      'Email Address': 'username',
      Address: 'address.address1',
      Joined: 'createdDate',
   }

   const customerAlternativeContactFields = {
      'Contact Name': 'firstName lastName',
      'Relationship to primary contact': 'relationshipToPrimaryContact',
      'Mobile Number': 'phoneNumber.internationalNumber',
      'Email Address': 'email',
   }

   const transformedCustomerDetails = transformApiResponse(
      customerInformationData,
      customerDetailsFields,
      'MM/dd/yyyy',
   )

   const transformedCustomerAlternativeContacts = transformApiResponse(
      customerInformationData?.alternateContact,
      customerAlternativeContactFields,
   )

   const { data: listStoredCardsData } = useSWR(
      customerInformationData?.id
         ? ['/savvyPayStoredCards/listStoredCardsByCustomerId', customerInformationData?.id]
         : null,
      ([url, customerId]) => listStoredCardsByCustomerId({ url, customerId }),
   )

   return (
      <div className="flex flex-col gap-10 px-10 py-6">
         <div className="flex flex-col gap-4">
            <h4 className="text-xl font-semibold">Customer Information</h4>
            <div className="grid grid-cols-2 gap-8 rounded-lg border border-cyan-01/50 bg-cyan-02 p-6">
               {transformedCustomerDetails.map((field) => (
                  <div
                     key={field.label}
                     className={cn('flex flex-col gap-1', {
                        'col-span-2': field.label === 'address',
                     })}
                  >
                     <h6 className="text-sm font-medium capitalize text-grey-02">{field.label}</h6>
                     <p className="break-words font-semibold">{field.value?.toString()}</p>
                  </div>
               ))}
            </div>
         </div>
         <div className="flex flex-col gap-4">
            <h4 className="text-xl font-semibold">Alternative Contact</h4>
            <div className="grid grid-cols-2 gap-8 rounded-lg border border-cyan-01/50 bg-cyan-02 p-6">
               {transformedCustomerAlternativeContacts.map((field) => (
                  <div
                     key={field.label}
                     className={cn('flex flex-col gap-1', {
                        'col-span-2': field.label === 'address',
                     })}
                  >
                     <h6 className="text-sm font-medium capitalize text-grey-02">{field.label}</h6>
                     <p className="font-semibold">{field.value?.toString()}</p>
                  </div>
               ))}
            </div>
         </div>
         {listStoredCardsData?.storedCards &&
            listStoredCardsData?.storedCards.map((card, index) => (
               <CustomerCardDetails
                  key={index} // or use a unique identifier from card data
                  nameOnCard={card.holderNameMasked}
                  lastFourCardNumber={card.lastFour}
               />
            ))}
      </div>
   )
}
