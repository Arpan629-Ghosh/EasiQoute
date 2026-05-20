import { ChangePasswordThunk, fetchCategoriesThunk, newCategoriesThunk, updateProfileThunk } from "@/redux/apis/settings/settingsThunk"
import { AppDispatch, RootState } from "@/redux/store"
import { Company } from "@/types/apis/auth.types"
import { ChangePassword, CreateCategories } from "@/types/apis/settings.types"
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

    const fetchCategories = async () => {
        return dispatch(fetchCategoriesThunk()).unwrap()
    }

    return {
        updateCompanyProfile,
        changePassword,
        newCategories,
        fetchCategories,
        settingLoading : settings.loading,
        error: settings.error
    }
}