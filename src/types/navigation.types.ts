import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  AuthStack: undefined;
  MainTabs: undefined;
  QouteDetailScreen: { quoteId: string };
  IntroductionScreen: undefined;
  NewQuoteScreens: undefined;
  TemplatesScreen: undefined;
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

export type NewQuoteTopTabParamList = {
  Summury: undefined;
  Items: undefined;
  Sections: undefined;
  Preview: undefined;
};

export type MainTabParamList = {
  
}

export type QuoteStackParamList = {
  MainQuoteScreen: undefined;

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

export type MainQuoteScreenProps = NativeStackScreenProps<QuoteStackParamList, 'MainQuoteScreen'>

export type QouteDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'QouteDetailScreen'>

export type IntroductionScreenProps = NativeStackScreenProps<RootStackParamList, 'IntroductionScreen'>

export type NewQuoteScreensProps = NativeStackScreenProps<RootStackParamList, 'NewQuoteScreens'>
export type TemplatesScreenProps = NativeStackScreenProps<RootStackParamList, 'TemplatesScreen'>

export type PreviewScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<NewQuoteTopTabParamList, 'Preview'>,
  NativeStackScreenProps<RootStackParamList>
>;