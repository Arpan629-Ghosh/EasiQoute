import { settingsServices } from '@/apis/services/settings.services';
import { Company } from '@/types/apis/auth.types';
import {
  ChangePassword,
  CreateCategories,
  CreateItems,
  CreateSubCategories,
  CreateTeamMemberPayload,
  FetchTeamMembersPayload,
} from '@/types/apis/settings.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateProfileThunk = createAsyncThunk(
  '/api/company',

  async (payload: Company, thunkAPI) => {
    try {
      const response = await settingsServices.companyProfileUpdate(payload);
      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }
      console.log(response.payload);
      return response.payload;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const ChangePasswordThunk = createAsyncThunk(
  '/api/auth/change-password',

  async (payload: ChangePassword, thunkAPI) => {
    try {
      const response = await settingsServices.changePassword(payload);

      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const newCategoriesThunk = createAsyncThunk(
  ' /api/categories',

  async (payload: CreateCategories, thunkAPI) => {
    try {
      const response = await settingsServices.newCategory(payload);
      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const fetchCategoriesThunk = createAsyncThunk(
  '/api/categories',

  async (payload: number, thunkAPI) => {
    try {
      const response = await settingsServices.fetchNewCategories(payload);
      if (!response.result) {
        thunkAPI.rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteCategoryThunk = createAsyncThunk(
  '/api/categories/delete',

  async (payload: number, thunkAPI) => {
    try {
      const response = await settingsServices.deleteCategory(payload);
      if (!response.result) {
        thunkAPI.rejectWithValue(response.message);
      }
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const newSubCategoriesThunk = createAsyncThunk(
  '/api/sub-categories',
  async (payload: CreateSubCategories, thunkAPI) => {
    try {
      const response = await settingsServices.newSubCategory(payload);
      if (!response.result) {
        thunkAPI.rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const fetchSubCategoriesThunk = createAsyncThunk(
  '/api/sub-categories/get',

  async (payload: number, thunkAPI) => {
    try {
      const response = await settingsServices.fetchNewSubCategories(payload);
      if (!response.result) {
        thunkAPI.rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteSubCategoryThunk = createAsyncThunk(
  '/api/sub-categories/delete',
  async (payload: CreateSubCategories, thunkAPI) => {
    try {
      const response = await settingsServices.deleteSubCategory(payload);
      if (!response.result) {
        thunkAPI.rejectWithValue(response.message);
      }

      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const createItemsThunk = createAsyncThunk(
  '/api/item/create-or-update',

  async (payload: CreateItems, thunkAPI) => {
    try {
      const response = await settingsServices.createItems(payload);
      if (!response.result) {
        thunkAPI.rejectWithValue(response.message);
      }

      return response.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const fetchItemsThunk = createAsyncThunk(
  '/api/items',

  async (payload: number, thunkAPI) => {
    try {
      const response = await settingsServices.fetchItems(payload);
      if (!response.result) {
        thunkAPI.rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteItemThunk = createAsyncThunk(
  'api/items',

  async (payload: number, thunkAPI) => {
    try {
      const response = await settingsServices.deleteItem(payload);
      if (!response.result) {
        thunkAPI.rejectWithValue(response.message);
      }

      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const createTeamMemberThunk = createAsyncThunk(
  '/api/company/users',

  async (payload: CreateTeamMemberPayload, thunkAPI) => {
    try {
      const response = await settingsServices.createTeamMember(payload);

      if (!response.result) {
        thunkAPI.rejectWithValue(response.message);
      }

      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const fetchTeamMembersThunk = createAsyncThunk(
  '/get/api/company/users',

  async (payload: FetchTeamMembersPayload, thunkAPI) => {
    try {
      const response = await settingsServices.fetchTeamMembers(payload);

      if (!response.result) {
        thunkAPI.rejectWithValue(response.message);
      }

      return response.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
