import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  AuthStack: undefined;
  MainTabs: undefined;
  QouteDetailScreen: { quoteId: string };
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  IntroScreen: undefined;
  ProfileScreen: undefined;
  BusinessScreen: undefined;
  BusinessAddressScreen: undefined;
  MainTabs: undefined;
};

export type MainTabParamList = {
  
}

export type QuoteStackParamList = {
  MainQuoteScreen: undefined;
}

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

export type MainQuoteScreenProps = NativeStackScreenProps<QuoteStackParamList, 'MainQuoteScreen'>

export type QouteDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'QouteDetailScreen'>