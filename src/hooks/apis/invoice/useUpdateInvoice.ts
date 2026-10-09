import { invoiceServices } from '@/apis/services/invoice.services';
import { UpdateInvoicePayload } from '@/types/apis/invoice.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateInvoice = () => {

    const queryClient = useQueryClient();
  const updateInvoiceMutation = useMutation({
    mutationFn: async (payload: UpdateInvoicePayload) => {
      invoiceServices.updateInvoice(payload);
      },
      
      onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['invoiceDetails'],
          });
      }
  });

  return {
    updateInvoiceMutate: updateInvoiceMutation.mutateAsync,
    isUpdatingInvoice: updateInvoiceMutation.isPending,
  };
};
