import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  AuthStack: undefined;
  MainTabs: undefined;
};


export type AuthStackParamList = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
    ResetPasswordScreen: undefined;
}

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "LoginScreen">
export type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, "RegisterScreen">
export type ResetPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, "ResetPasswordScreen">