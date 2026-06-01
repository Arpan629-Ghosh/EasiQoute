import { createClientThunk, getClientsThunk } from '@/redux/apis/client/clientThunk';
import { RootState } from './../../redux/store';
import { AppDispatch } from "@/redux/store"
import { CreateClient } from '@/types/apis/client.types';
import { useDispatch, useSelector } from "react-redux"
import { useCallback } from 'react';


export const useClient = () => {
    const dispatch = useDispatch<AppDispatch>();
    const client = useSelector((state: RootState) => state.clients);

    const createClient = (payload: CreateClient) => {
        return dispatch(createClientThunk(payload)).unwrap();
    }

    const getClients = useCallback((payload: string) => {
        return dispatch(getClientsThunk(payload)).unwrap();
    }, [dispatch])

    return {
        createClient,
        getClients,
        clients: client.clients,
        loading: client.loading,
        error: client.error,
        current_page: client.current_page,
        last_page: client.last_page
    }
}