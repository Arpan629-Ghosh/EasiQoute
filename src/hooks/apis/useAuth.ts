import {
  logoutThunk,
  searchAddressThunk,
  companyProfileSetupThunk,
  forgotPasswordThunk,
  loginThunk,
  profileSetupThunk,
  signupThunk,
} from '@/redux/apis/auth/authThunks';
import { AppDispatch, RootState } from '@/redux/store';
import {  CompanyPayload, ForgotPasswordPayload, LoginPayload, ProfileSetupPayload, SignupPayload } from '@/types/apis/auth.types';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const login = async (payload: LoginPayload) => {
    return dispatch(loginThunk(payload)).unwrap();
  };

    const signup = async (payload: SignupPayload) => {
      // console.log(payload)
    return dispatch(signupThunk(payload)).unwrap();
  };

  const forgotPassword = async (payload: ForgotPasswordPayload) => {
    return dispatch(forgotPasswordThunk(payload)).unwrap();
  };

  const profileSetup = async (payload: ProfileSetupPayload) => {
    return dispatch(profileSetupThunk(payload)).unwrap();
  }

  const companyProfileSetup = async (payload: CompanyPayload) => {
    return dispatch(companyProfileSetupThunk(payload)).unwrap();
  }

  const logout = async () => {
    return dispatch(logoutThunk()).unwrap();
  }

  const searchAddress = async (payload: string) => {
    return dispatch(searchAddressThunk(payload)).unwrap()
  }

  return {
    login,
    signup,
    forgotPassword,
    profileSetup,
    companyProfileSetup,
    logout,
    searchAddress,
    user: auth.user,
    loading: auth.loading,
    error: auth.error,
  };
};
