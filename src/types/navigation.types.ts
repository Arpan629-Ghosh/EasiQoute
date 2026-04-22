import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  AuthStack: undefined;
  MainTabs: undefined;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  IntroScreen1: undefined;
  IntroScreen2: undefined;
  ProfileScreen: undefined;
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

export type IntroScreen1Props = NativeStackScreenProps<
  AuthStackParamList,
  'IntroScreen1'
>;

export type IntroScreen2Props = NativeStackScreenProps<
  AuthStackParamList,
  'IntroScreen2'
>;

export type ProfileScreenProps = NativeStackScreenProps<AuthStackParamList, 'ProfileScreen'>