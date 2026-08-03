import { homeScreenDataThunk } from "@/redux/apis/home/homeThunk";
import { AppDispatch, RootState } from "@/redux/store"
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"


export const useHomeScreenData = () => {
    const dispatch = useDispatch<AppDispatch>();
    const home = useSelector((state: RootState) => state.home);
    const homeScreenData = useCallback(() => {
        return dispatch(homeScreenDataThunk()).unwrap();
    }, [dispatch])

    return {
      homeScreenData,
      homeData: home.homeScreenData,
      loading: home.loading,
      error: home.error,
    };
}