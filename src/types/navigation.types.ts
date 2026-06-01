import { Item } from '@/components/dropdown/CustomDropdown';
import { FormData } from '@/screens/authAndProfileSetupScreens/profileScreens/businessSetupScreens/businessAddressScren/BusinessAddressScreen';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  IntroScreen: undefined;
  ProfileScreen: { isEdit: boolean };
  BusinessScreen: { isEdit: boolean };
  BusinessAddressScreen: {
    onGoBack: (data: {
      address: string;
      city: string;
      country: string;
      postcode: string;
    }) => void;
    address: FormData | null;
  };
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  QouteDetailScreen: { quoteId: number };
  IntroductionScreen: {
    order: number;
    sectionId: number;
    title: string;
    content: string;
  };
  NewQuoteScreens: {quoteId?: number} |undefined;
  TemplatesScreen: undefined;
  TeamMembersScreen: undefined;
  AddMemberScreen: undefined;
  ChangePasswordScreen: undefined;
  QuoteAndInvoicesSettingScreen: undefined;
  BillingPreferencesScreen: undefined;
  PaymentInfoScreen: undefined;
  CategoriesScreen: undefined;
  NewCategoryScreen: { editId?: number; name?: string } | undefined;
  SubCategoriesScreen: undefined;
  NewSubCategoryScreen:
    | { editId?: number; catName?: string; name?: string }
    | undefined;
  ItemsScreen: undefined;
  NewItemsScreen:
    | {
        editId?: number;
        catName?: string;
        subcatName?: Item | null;
        itemName?: string;
        unit?: string;
        pricePerUnit?: number;
        unitCost?: number;
      }
  | undefined;
  NewSectionScreen:
  | {
    editId?: number;
    title?: string;
    content?: string;
    sort?: number
  }
  | undefined;
  AddClientScreen: undefined;
};

export type NewQuoteTopTabParamList = {
  Summury: {
    quoteId?: number;
  };
  Items: {
    quoteId?: number;
  };
  Sections: {
    quoteId?: number;
  };
  Preview: {
    quoteId?: number;
  };
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Qoute: undefined;
  Invoices: undefined;
  Clients: undefined;
  Settings: NavigatorScreenParams<SettingStackParamList>;
};
export type QuoteStackParamList = {
  MainQuoteScreen: undefined;
};
export type HomeStackParamList = {
  HomeScreen: undefined;
};

export type SettingStackParamList = {
  SettingScreen: undefined;
};

export type ClientStackParamList = {
  ClientScreen: undefined;
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
export type ProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>,
  BottomTabScreenProps<MainTabParamList>
>;

// business
export type BusinessScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'BusinessScreen'>,
  BottomTabScreenProps<MainTabParamList>
>;

export type BusinessAddressScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'BusinessAddressScreen'
>;

//main quote
export type MainQuoteScreenProps = CompositeScreenProps<
  NativeStackScreenProps<QuoteStackParamList, 'MainQuoteScreen'>,
  NativeStackScreenProps<RootStackParamList>
  >;

  export type ClientScreenProps = CompositeScreenProps<
    NativeStackScreenProps<ClientStackParamList, 'ClientScreen'>,
    NativeStackScreenProps<RootStackParamList>
  >;

// quote detail
export type QouteDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'QouteDetailScreen'
>;

// introduction
export type IntroductionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'IntroductionScreen'
>;

// new quote
export type NewQuoteScreensProps = NativeStackScreenProps<
  RootStackParamList,
  'NewQuoteScreens'
>;

// templates
export type TemplatesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TemplatesScreen'
>;

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

// CategoryScreen
export type CategoriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CategoriesScreen'
>;

// SubCategoryScreen
export type SubCategoriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SubCategoriesScreen'
>;

//ItemsScreen
export type ItemsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ItemsScreen'
>;

export type NewItemsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NewItemsScreen'
  >;



// resetPassword
export type ChangePasswordScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'ChangePasswordScreen'>,
  BottomTabScreenProps<MainTabParamList>
>;

export type NewCategoryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NewCategoryScreen'
>;

export type NewSubCategoryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NewSubCategoryScreen'
>;

export type NewSectionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NewSectionScreen'
  >

export type SectionsScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<NewQuoteTopTabParamList, 'Sections'>,
  NativeStackScreenProps<RootStackParamList>
  >;

export type ItemScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<NewQuoteTopTabParamList, 'Items'>,
  NativeStackScreenProps<RootStackParamList>
  >

export type AddClientScreenProps = NativeStackScreenProps<
  RootStackParamList, 'AddClientScreen'
  >
