import { ChangePasswordThunk, createItemsThunk, deleteCategoryThunk, deleteItemThunk, deleteSubCategoryThunk, fetchCategoriesThunk, fetchItemsThunk, fetchSubCategoriesThunk, newCategoriesThunk, newSubCategoriesThunk, updateProfileThunk } from "@/redux/apis/settings/settingsThunk"
import { AppDispatch, RootState } from "@/redux/store"
import { Company } from "@/types/apis/auth.types"
import { ChangePassword, CreateCategories, CreateItems, CreateSubCategories } from "@/types/apis/settings.types"
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

    const deleteCategory = (payload: number) => {
        return dispatch(deleteCategoryThunk(payload)).unwrap();
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

    const deleteSubCategory = (payload: CreateSubCategories) => {
      return dispatch(deleteSubCategoryThunk(payload)).unwrap()
    };

    const createItems = (payload: CreateItems) => {
        return dispatch(createItemsThunk(payload)).unwrap()
    }

    const fetchItems = useCallback((payload: number) => {
        return dispatch(fetchItemsThunk(payload)).unwrap()
    },[dispatch])

    const deleteItem = (payload: number) => {
        return dispatch(deleteItemThunk(payload)).unwrap()
    }

    return {
        updateCompanyProfile,
        changePassword,
        newCategories,
        fetchCategories,
        deleteCategory,
        newSubCtaegories,
        fetchSubCategories,
        deleteSubCategory,
        createItems,
        fetchItems,
        deleteItem,

        settingLoading: settings.loading,
        isStale: settings.isStale,
        isSubcatStale: settings.isSubCatStale,
        error: settings.error,
        data: settings.data,
        subcat_data: settings.subcat_data,
        current_page: settings.current_page,
        last_page: settings.last_page,
        subcat_current_page: settings.subcat_current_page,
        subcat_last_page: settings.subcat_last_page,
        items_data: settings.items_data,
        items_current_page: settings.items_current_page,
        items_last_page: settings.items_last_page
    }
}