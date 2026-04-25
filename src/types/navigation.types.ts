import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  AuthStack: undefined;
  MainTabs: undefined;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  IntroScreen: undefined;
  ProfileScreen: undefined;
  BusinessScreen: undefined;
  BusinessAddressScreen: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'LoginScreen'
>;
export type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'RegisterScreen'
>;
export type ResetPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'ResetPasswordScreen'
>;

export type IntroScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'IntroScreen'
>;

export type ProfileScreenProps = NativeStackScreenProps<AuthStackParamList, 'ProfileScreen'>

export type BusinessScreenProps = NativeStackScreenProps<AuthStackParamList, 'BusinessScreen'>
export type BusinessAddressScreenProps = NativeStackScreenProps<AuthStackParamList, 'BusinessAddressScreen'>