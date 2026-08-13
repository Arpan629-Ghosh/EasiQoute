import { View, Text } from 'react-native'
import React from 'react'
import { RootScreenProps } from '@/types/navigation.types'
import { usePaymentDetails } from '@/hooks/apis/usePaymentDetails'

const PaymentDetailsScreen = ({route} : RootScreenProps<'PaymentDetailsScreen'>) => {
    const paymentId = route.params.paymentId
    const {
        paymentDetails,
        isPaymentDetailsPending,
        isPaymentDetailsError,
        paymentDetailsError
    } = usePaymentDetails(
        paymentId
    )

    console.log(paymentDetails)
  return (
    <View>
      <Text>PaymentDetailsScreen</Text>
    </View>
  )
}

export default PaymentDetailsScreen