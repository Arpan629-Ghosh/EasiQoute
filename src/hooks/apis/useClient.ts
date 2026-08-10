import { createClientThunk, deleteClientThunk, getClientsThunk, showClientDetailsThunk, updateClientThunk } from '@/redux/apis/client/clientThunk';
import { RootState } from './../../redux/store';
import { AppDispatch } from "@/redux/store"
import { CreateClient, GetClients } from '@/types/apis/client.types';
import { useDispatch, useSelector } from "react-redux"
import { useCallback } from 'react';


export const useClient = () => {
    const dispatch = useDispatch<AppDispatch>();
    const client = useSelector((state: RootState) => state.clients);

    const createClient = (payload: CreateClient) => {
        return dispatch(createClientThunk(payload)).unwrap();
    }

    const getClients = useCallback((payload: GetClients) => {
        return dispatch(getClientsThunk(payload)).unwrap();
    }, [dispatch])

    const showClientDetail = useCallback((payload: number) => {
        return dispatch(showClientDetailsThunk(payload)).unwrap();
    }, [dispatch])

    const updateClient = useCallback((payload: CreateClient) => {
        return dispatch(updateClientThunk(payload)).unwrap();

    }, [dispatch])

    const deleteClient = useCallback((payload: number) => {
        return dispatch(deleteClientThunk(payload)).unwrap();
    }, [dispatch])

    return {
        createClient,
        getClients,
        showClientDetail,
        updateClient,
        deleteClient,
        clients: client.clients,
        client_detail: client.client_detail,
        loading: client.loading,
        deleteClientLoader: client.deleteClientLoader,
        updateClientLoader: client.updateClientLoader,
        error: client.error,
        current_page: client.current_page,
        last_page: client.last_page
    }
}