
import { FormData } from '@/screens/authAndProfileSetupScreens/profileScreens/businessSetupScreens/businessAddressScren/BusinessAddressScreen';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  IntroScreen: undefined;
  ProfileScreen: undefined;
  BusinessScreen: undefined;
  BusinessAddressScreen: {
    onGoBack: (data: {
      address: string;
      city: string;
      country: string;
      postcode: string;
    }) => void;
    address: FormData | null;
  };
  MainTabs: undefined;
  QouteDetailScreen: { quoteId: string };
  IntroductionScreen: undefined;
  NewQuoteScreens: undefined;
  TemplatesScreen: undefined;
  TeamMembersScreen: undefined;
  AddMemberScreen: undefined;
  ChangePasswordScreen: undefined;
  QuoteAndInvoicesSettingScreen: undefined;
  BillingPreferencesScreen: undefined;
  PaymentInfoScreen: undefined;
  CategoriesScreen: undefined;
  NewCategoryScreen: undefined;
  SubCategoriesScreen: undefined;
  NewSubCategoryScreen: undefined;
  ItemsScreen: undefined;
  NewItemsScreen: undefined;
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

export type SettingStackParamList = {
  SettingScreen: undefined
}

// login
export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginScreen'
  >;

// register
export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RegisterScreen'
  >;

  //reset
export type ResetPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ResetPasswordScreen'
  >;

  // onBoarding
export type IntroScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'IntroScreen'
  >;

  //Profile
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>

// business
export type BusinessScreenProps = NativeStackScreenProps<RootStackParamList, 'BusinessScreen'>
export type BusinessAddressScreenProps = NativeStackScreenProps<RootStackParamList, 'BusinessAddressScreen'>

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

// setting
export type SettingScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SettingStackParamList, 'SettingScreen'>,
  NativeStackScreenProps<RootStackParamList>
  >;

  export type TeamMembersScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'TeamMembersScreen'
    >;
  
export type ChangePasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ChangePasswordScreen'>
    
// CategoryScreen
export type CategoriesScreenProps = NativeStackScreenProps<RootStackParamList, 'CategoriesScreen'>

// SubCategoryScreen
export type SubCategoriesScreenProps = NativeStackScreenProps<RootStackParamList, 'SubCategoriesScreen'>

//ItemsScreen
export type ItemsScreenProps = NativeStackScreenProps<RootStackParamList, 'ItemsScreen'>

// resetPassword

