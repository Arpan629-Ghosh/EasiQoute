import { ChangePasswordThunk, createItemsThunk, createTeamMemberThunk, deleteCategoryThunk, deleteItemThunk, deleteSubCategoryThunk, fetchCategoriesThunk, fetchItemsThunk, fetchSubCategoriesThunk, fetchTeamMembersThunk, newCategoriesThunk, newSubCategoriesThunk } from "@/redux/apis/settings/settingsThunk"
import { AppDispatch, RootState } from "@/redux/store"
import { ChangePassword, CreateCategories, CreateItems, CreateSubCategories, CreateTeamMemberPayload, FetchTeamMembersPayload } from "@/types/apis/settings.types"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"


export const useSettings = () => {
    const dispatch = useDispatch<AppDispatch>()
    const settings = useSelector((state: RootState) => state.settings)

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

    const createTeamMembers = useCallback((payload: CreateTeamMemberPayload) => {
        return dispatch(createTeamMemberThunk(payload)).unwrap()
    }, [dispatch])

    const fetchTeamMembers = useCallback((payload: FetchTeamMembersPayload) => {
        return dispatch(fetchTeamMembersThunk(payload)).unwrap()
    }, [dispatch])

    return {
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
        createTeamMembers,
        fetchTeamMembers,

        settingLoading: settings.loading,
        categoryLoading: settings.categoryLoading,
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
        items_last_page: settings.items_last_page,
        teamMembers: settings.teamMembers,
        loadingTeamMembers: settings.loadingTeamMembers,
        member_current_page: settings.members_current_page,
        member_last_page: settings.members_last_page
    }
}