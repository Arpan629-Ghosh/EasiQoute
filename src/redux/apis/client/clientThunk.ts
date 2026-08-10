import { clientServices } from "@/apis/services/client.services";
import { CreateClient, GetClients } from "@/types/apis/client.types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createClientThunk = createAsyncThunk(
    "/api/clients",
    async (payload: CreateClient, thunkAPI) => {
        try {
            const response = await clientServices.createClients(payload);

            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.payload
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getClientsThunk = createAsyncThunk('/api/client/get',

    async (payload: GetClients, thunkAPI) => {
        try {
            const response = await clientServices.getClients(payload);
            if (!response.result) {
              return thunkAPI.rejectWithValue(response.message);
            }
            return response.payload;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
        
    }
)

export const showClientDetailsThunk = createAsyncThunk('/api/client/fetch',

    async (payload: number, thunkAPI) => {
        try {
            const response = await clientServices.showClientDetails(payload);
            if (!response.result) {
              return thunkAPI.rejectWithValue(response.message);
            }
            return response.payload;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteClientThunk = createAsyncThunk('/api/client/delete', 

    async (payload: number, thunkAPI) => {
        try {
            const response = await clientServices.deleteClient(payload);

            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.payload;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateClientThunk = createAsyncThunk(
  '/api/clients/edit',
  async (payload: CreateClient, thunkAPI) => {
    try {
      const response = await clientServices.updateClient(payload);

      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);