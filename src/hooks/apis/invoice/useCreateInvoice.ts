import { invoiceServices } from '@/apis/services/invoice.services';
import { InvoiceCreate } from '@/types/apis/invoice.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  const createInvoiceMutation = useMutation({
    mutationFn: (payload: InvoiceCreate) =>
      invoiceServices.createInvoice(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
  return {
    createInvoiceMutateAsync: createInvoiceMutation.mutateAsync,
    isCreatingInvoice: createInvoiceMutation.isPending,
  };
};
