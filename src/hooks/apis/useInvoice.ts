import { createInvoiceThunk, getInvoiceDetailsThunk, getInvoicesThunk, updateInvoiceThunk } from "@/redux/apis/invoice/invoiceThunk";
import { AppDispatch, RootState } from "@/redux/store";
import { InvoiceCreate, UpdateInvoicePayload } from "@/types/apis/invoice.types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";


export const useInvoice = () => {
    const dispatch = useDispatch<AppDispatch>();

    const invoice = useSelector((state: RootState) => state.invoice);

    const createInvoice = useCallback((payload: InvoiceCreate) => {
        return dispatch(createInvoiceThunk(payload)).unwrap()
    }, [dispatch]);

    const getInvoices = useCallback((payload: number) => {
        return dispatch(getInvoicesThunk(payload)).unwrap()
    }, [dispatch])

    const getInvoiceDetails = useCallback((payload: number) => {
        return dispatch(getInvoiceDetailsThunk(payload)).unwrap()
    }, [dispatch])

    const updateInvoice = useCallback((payload: UpdateInvoicePayload) => {
        console.log("payloadUI: ", payload)
        return dispatch(updateInvoiceThunk(payload)).unwrap();
    }, [dispatch])

    return {
        createInvoice,
        getInvoices,
        getInvoiceDetails,
        updateInvoice,

        invoiceList: invoice.invoiceList,
        invoiceDetails: invoice.invoiceDetails,
        loadingGetInvoice: invoice.loadingGetInvoice,
        current_page: invoice.current_page,
        last_page: invoice.last_page,
        loadingInvoiceUpdate: invoice.loadingInvoiceUpdate,
        loadingCreateInvoice: invoice.loadingCreateInvoice,
        loadingInvoiceDetails: invoice.loadingInvoiceDetails,
        error: invoice.error
    };
};