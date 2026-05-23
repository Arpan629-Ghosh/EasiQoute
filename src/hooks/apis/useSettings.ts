import { settingsServices } from "@/apis/services/settingsServices"
import { ChangePasswordThunk, fetchCategoriesThunk, fetchSubCategoriesThunk, newCategoriesThunk, newSubCategoriesThunk, updateProfileThunk } from "@/redux/apis/settings/settingsThunk"
import { AppDispatch, RootState } from "@/redux/store"
import { Company } from "@/types/apis/auth.types"
import { ChangePassword, CreateCategories, CreateSubCategories } from "@/types/apis/settings.types"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"


export const useSettings = () => {
    const dispatch = useDispatch<AppDispatch>()
    const settings = useSelector((state: RootState) => state.settings)
    const updateCompanyProfile = async (payload: Company) => {
        return dispatch(updateProfileThunk(payload)).unwrap();
        
    }

    const changePassword = async (payload: ChangePassword) => {
       return dispatch(ChangePasswordThunk(payload)).unwrap();
    }

    const newCategories = async (payload: CreateCategories) => {
        return dispatch(newCategoriesThunk(payload)).unwrap()
    }

    const fetchCategories = useCallback((payload: number) => {
        return dispatch(fetchCategoriesThunk(payload)).unwrap()
    }, [dispatch])

    const deleteCategory = async (payload: number) => {
        return await settingsServices.deleteCategory(payload)
    }

    const newSubCtaegories = (payload: CreateSubCategories) => {
        return dispatch(newSubCategoriesThunk(payload)).unwrap()
    }
    const fetchSubCategories = useCallback(
      (payload: number) => {
        return dispatch(fetchSubCategoriesThunk(payload)).unwrap();
      },
      [dispatch],
    );

    const deleteSubCategory = async (payload: CreateSubCategories) => {
      return await settingsServices.deleteSubCategory(payload);
    };

    return {
        updateCompanyProfile,
        changePassword,
        newCategories,
        fetchCategories,
        deleteCategory,
        newSubCtaegories,
        fetchSubCategories,
        deleteSubCategory,
        settingLoading : settings.loading,
        error: settings.error,
        data: settings.data,
        subcat_data: settings.subcat_data,
        current_page: settings.current_page,
        last_page: settings.last_page,
        subcat_current_page: settings.subcat_current_page,
        subcat_last_page: settings.subcat_last_page
    }
}