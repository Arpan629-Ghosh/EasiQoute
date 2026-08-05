import { createSlice } from '@reduxjs/toolkit';
import {
  ChangePasswordThunk,
  createItemsThunk,
  createTeamMemberThunk,
  deleteCategoryThunk,
  deleteItemThunk,
  deleteSubCategoryThunk,
  fetchCategoriesThunk,
  fetchItemsThunk,
  fetchSubCategoriesThunk,
  fetchTeamMembersThunk,
  newCategoriesThunk,
  newSubCategoriesThunk,
  updateProfileThunk,
} from './settingsThunk';
import {
  CreateCategoriesPayload,
  FetchItemsData,
  MemberDetails,
  SubCategoriesPayload,
} from '@/types/apis/settings.types';

export interface SettingsState {
  teamMembers: MemberDetails[] ;
  loadingTeamMembers: boolean;
  members_current_page: number;
  members_last_page: number;
  loading: boolean;
  isStale: boolean;
  isSubCatStale: boolean;
  error: string | null;
  data: CreateCategoriesPayload[];
  current_page: number;
  last_page: number;
  subcat_data: SubCategoriesPayload[];
  subcat_current_page: number;
  subcat_last_page: number;
  items_data: FetchItemsData[];
  items_current_page: number;
  items_last_page: number;
}

const initialState: SettingsState = {
  teamMembers: [],
  loadingTeamMembers: false,
  members_current_page: 1,
  members_last_page: 1,
  loading: false,
  isStale: false,
  isSubCatStale: false,
  error: null,
  data: [],
  current_page: 1,
  last_page: 1,
  subcat_data: [],
  subcat_current_page: 1,
  subcat_last_page: 1,
  items_data: [],
  items_current_page: 1,
  items_last_page: 1
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(updateProfileThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(ChangePasswordThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ChangePasswordThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(ChangePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(newCategoriesThunk.pending, state => {
        state.loading = true;
        state.error = null;
        state.isStale = false;
      })
      .addCase(newCategoriesThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.isStale = true;
      })
      .addCase(newCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isStale = false;
      })
      .addCase(fetchCategoriesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const incomingData = action.payload.data;
        const currentPage = action.payload.meta.current_page;

        if (currentPage === 1) {
          state.data = incomingData;
        } else {
          const existingIds = new Set(state.data.map(item => item.id));

          const uniqueItems = incomingData.filter(
            item => !existingIds.has(item.id),
          );

          state.data.push(...uniqueItems);
        }
        state.isStale = false;
        state.current_page = currentPage;
        state.last_page = action.payload.meta.last_page;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCategoryThunk.pending, state => {
        state.loading = true;
        state.error = null;
        state.isStale = false;
      })
      .addCase(deleteCategoryThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.isStale = true;
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isStale = false;
      })
      .addCase(newSubCategoriesThunk.pending, state => {
        state.loading = true;
        state.error = null;
        state.isSubCatStale = false;
      })
      .addCase(newSubCategoriesThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.isSubCatStale = true;
      })
      .addCase(newSubCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isSubCatStale = false
      })
      .addCase(fetchSubCategoriesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const incomingData = action.payload.data;
        const currentPage = action.payload.meta.current_page;
        if (currentPage === 1) {
          state.subcat_data = incomingData;
        } else {
          const existingIds = new Set(state.subcat_data.map(item => item.id));

          const uniqueItems = incomingData.filter(
            item => !existingIds.has(item.id),
          );

          state.subcat_data.push(...uniqueItems);
        }
        state.isSubCatStale = false;
        state.subcat_current_page = currentPage;
        state.subcat_last_page = action.payload.meta.last_page
      })
      .addCase(fetchSubCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSubCategoryThunk.pending, state => {
        state.loading = true;
        state.error = null;
        state.isSubCatStale = false;
      })
      .addCase(deleteSubCategoryThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.isSubCatStale = true;
      })
      .addCase(deleteSubCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isSubCatStale = false;
      })
      .addCase(createItemsThunk.pending, state => {
        state.loading = true;
        state.error = null;
        state.isStale = false;
      })
      .addCase(createItemsThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.isStale = true;
      })
      .addCase(createItemsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isStale = false;
      })
      .addCase(fetchItemsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItemsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const incomingData = action.payload.data;
        const current_page = action.payload.meta.current_page;

        if (current_page === 1) {
          state.items_data = incomingData;
        } else {
          const existingIds = new Set(state.items_data.map(item => item.id));

          const uniqueItems = incomingData.filter(
            item => !existingIds.has(item.id),
          );
          state.items_data.push(...uniqueItems)
        }
        state.items_current_page = current_page;
        state.items_last_page = action.payload.meta.last_page;
        state.isStale = false;
      })
      .addCase(fetchItemsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteItemThunk.pending, state => {
        state.loading = true;
        state.error = null;
        state.isStale = false;
      })
      .addCase(deleteItemThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isStale = true;
      })
      .addCase(deleteItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isStale = false;
      })
      .addCase(createTeamMemberThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeamMemberThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createTeamMemberThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
      })
      .addCase(fetchTeamMembersThunk.pending, state => {
        state.loadingTeamMembers = true;
        state.error = null;
      })
      .addCase(fetchTeamMembersThunk.fulfilled, (state, action) => {
        state.loadingTeamMembers = false;
        state.error = null;

        const incomingData = action.payload.data;
        const current_page = action.payload.meta.current_page;

        if (current_page === 1) {
          state.teamMembers = incomingData;
        } else {
          const existingIds = new Set(state.teamMembers.map(item => item.id));

          const uniqueItems = incomingData.filter(
            item => !existingIds.has(item.id),
          );
          state.teamMembers.push(...uniqueItems);
        }
        state.members_current_page = current_page;
        state.members_last_page = action.payload.meta.last_page;
        state.isStale = false;
      })
      .addCase(fetchTeamMembersThunk.rejected, (state, action) => {
        state.loadingTeamMembers = false;
        state.error = action.payload as string
    })
  },
});

export default settingsSlice.reducer;
