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
  Home: undefined;
  Qoute: undefined;
  Invoices: undefined;
  Clients: undefined;
  Settings: undefined;
};
export type QuoteStackParamList = {
  MainQuoteScreen: undefined;

};
export type HomeStackParamList = {
  HomeScreen: undefined;
}

// login
export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'LoginScreen'
  >;

// register
export type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'RegisterScreen'
  >;

  //reset
export type ResetPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'ResetPasswordScreen'
  >;

  // onBoarding
export type IntroScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'IntroScreen'
  >;

  //Profile
export type ProfileScreenProps = NativeStackScreenProps<AuthStackParamList, 'ProfileScreen'>

// business
export type BusinessScreenProps = NativeStackScreenProps<AuthStackParamList, 'BusinessScreen'>
export type BusinessAddressScreenProps = NativeStackScreenProps<AuthStackParamList, 'BusinessAddressScreen'>

//main quote
export type MainQuoteScreenProps = CompositeScreenProps<
  NativeStackScreenProps<QuoteStackParamList, 'MainQuoteScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

// quote detail
export type QouteDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'QouteDetailScreen'>

// introduction
export type IntroductionScreenProps = NativeStackScreenProps<RootStackParamList, 'IntroductionScreen'>

// new quote
export type NewQuoteScreensProps = NativeStackScreenProps<RootStackParamList, 'NewQuoteScreens'>

// templates
export type TemplatesScreenProps = NativeStackScreenProps<RootStackParamList, 'TemplatesScreen'>

//preview
export type PreviewScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<NewQuoteTopTabParamList, 'Preview'>,
  NativeStackScreenProps<RootStackParamList>
>;