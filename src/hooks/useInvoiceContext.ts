// InvoiceContext.tsx

import { InvoiceContext } from '@/screens/invoiceScreens/newInvoiceScreens/NewInvoiceScreen';
import { useContext } from 'react';

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);

  if (!context) {
    throw new Error(
      'useInvoiceContext must be used inside InvoiceContext.Provider',
    );
  }

  return context;
};
