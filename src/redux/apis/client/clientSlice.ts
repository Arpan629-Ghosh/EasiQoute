import { createSlice } from '@reduxjs/toolkit';
import { createClientThunk, getClientsThunk } from './clientThunk';
import { Clients } from '@/types/apis/client.types';

interface ClientState {
  clients: Clients[];
  loading: boolean;
  error: string | null;
  current_page: number;
  last_page: number;
}

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
  current_page: 1,
  last_page: 1,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(createClientThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClientThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getClientsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const incomingData = action.payload.data;
        const current_page = action.payload.meta.current_page;

        if (current_page === 1) {
          state.clients = incomingData;
        } else {
          const existingIds = new Set(state.clients.map(item => item.id));

          const uniqueItems = incomingData.filter(
            item => !existingIds.has(item.id),
          );
          state.clients.push(...uniqueItems);
        }

        state.current_page = action.payload.meta.current_page;
        state.last_page = action.payload.meta.last_page;
      })
        .addCase(getClientsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
      })
  },
});

export default clientSlice.reducer;
