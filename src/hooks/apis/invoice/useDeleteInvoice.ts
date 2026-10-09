import { invoiceServices } from '@/apis/services/invoice.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (invoiceId: number) => invoiceServices.deleteInvoice(invoiceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
};
