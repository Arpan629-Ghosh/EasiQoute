import { homeScreenDataThunk } from "@/redux/apis/home/homeThunk";
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"


export const useHomeScreenData = () => {
    const dispatch = useDispatch<AppDispatch>();
    const home = useSelector((state: RootState) => state.home);
    console.log(home);
    const homeScreenData = async () => {
        return dispatch(homeScreenDataThunk()).unwrap();
    }

    return {
      homeScreenData,
      homeData: home.homeScreenData,
      loading: home.loading,
      error: home.error,
    };
}