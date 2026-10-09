import { paymentServices } from "@/apis/services/payment.services";
import { useQuery } from "@tanstack/react-query";


export const usePaymentDetails = (id: number) => {
    const paymentDetails = useQuery({
      queryKey: ['payment', id],
      queryFn: async () => {
        const response = await paymentServices.getPaymentDetails(id);
        return {
          data: response.payload ?? null,
        };
      },
      enabled: !!id,
    });

    return {
      paymentDetails: paymentDetails.data?.data,
      isPaymentDetailsPending: paymentDetails.isPending,
      isPaymentDetailsError: paymentDetails.isError,
      paymentDetailsError: paymentDetails.error,
    };
}