import { Item } from '@/components/dropdown/CustomDropdown';
import { FormData } from '@/screens/authAndProfileSetupScreens/profileScreens/businessSetupScreens/businessAddressScren/BusinessAddressScreen';

import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

/* -------------------------------------------------------------------------- */
/*                               PARAM LISTS                                  */
/* -------------------------------------------------------------------------- */

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  IntroScreen: undefined;

  ProfileScreen: {
    isEdit: boolean;
  };

  BusinessScreen: {
    isEdit: boolean;
  };

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

  QouteDetailScreen: {
    quoteId: number;
  };

  IntroductionScreen: {
    order: number;
    sectionId: number;
    title: string;
    content: string;
  };

  NewQuoteScreens:
    | {
    quoteId?: number;
    previewUrl?: string;
      }
    | undefined;

  TemplatesScreen: undefined;

  TeamMembersScreen: undefined;
  AddMemberScreen: undefined;
  ChangePasswordScreen: undefined;
  QuoteAndInvoicesSettingScreen: undefined;
  BillingPreferencesScreen: undefined;
  PaymentInfoScreen: undefined;

  CategoriesScreen: undefined;

  NewCategoryScreen:
    | {
        editId?: number;
        name?: string;
      }
    | undefined;

  SubCategoriesScreen: undefined;

  NewSubCategoryScreen:
    | {
        editId?: number;
        catName?: string;
        name?: string;
      }
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
        sort?: number;
      }
    | undefined;

  AddClientScreen: undefined;

  ClientDetailScreen: {
    clientId: number;
  };

  SelectQuoteScreen: undefined;

  NewInvoiceScreens: {
    quoteId?: number;
    invoiceId?: number;
    preveiwUrl?: string;
  } | undefined;

  InvoiceDetailsScreens: {
    invoiceId: number;
  };
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Qoute: undefined;
  Invoices: undefined;
  Clients: undefined;
  Settings: NavigatorScreenParams<SettingStackParamList>;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
};

export type QuoteStackParamList = {
  MainQuoteScreen: undefined;
};

export type ClientStackParamList = {
  ClientScreen: undefined;
};

export type InvoiceStackParamList = {
  InvoiceScreen: undefined;
};

export type SettingStackParamList = {
  SettingScreen: undefined;
};

export type NewQuoteTopTabParamList = {
  Summury: { quoteId?: number };
  Items: { quoteId?: number };
  Sections: { quoteId?: number };
  Preview: { quoteId?: number; previewUrl: string };
};

export type NewInvoiceTopTabParamList = {
  Summury: { quoteId?: number; invoiceId?: number } | undefined;
  Items: { invoiceId?: number; previewUrl: string  } | undefined;
  Preview: {previewUrl: string | undefined};
};

export type InvoiceDetailsTopTabParamList = {
  Summury: {invoiceId: number};
  Description: undefined;
  Payments: undefined
}

/* -------------------------------------------------------------------------- */
/*                              GENERIC TYPES                                 */
/* -------------------------------------------------------------------------- */

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>;

export type QuoteTabScreenProps<T extends keyof NewQuoteTopTabParamList> =
  MaterialTopTabScreenProps<NewQuoteTopTabParamList, T>;

export type InvoiceTabScreenProps<T extends keyof NewInvoiceTopTabParamList> =
  MaterialTopTabScreenProps<NewInvoiceTopTabParamList, T>;

export type InvoiceDetailsScreenProps<T extends keyof InvoiceDetailsTopTabParamList> =
  MaterialTopTabScreenProps<InvoiceDetailsTopTabParamList, T>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

export type QuoteStackScreenProps<T extends keyof QuoteStackParamList> =
  NativeStackScreenProps<QuoteStackParamList, T>;

export type ClientStackScreenProps<T extends keyof ClientStackParamList> =
  NativeStackScreenProps<ClientStackParamList, T>;

export type InvoiceStackScreenProps<T extends keyof InvoiceStackParamList> =
  NativeStackScreenProps<InvoiceStackParamList, T>;

export type SettingStackScreenProps<T extends keyof SettingStackParamList> =
  NativeStackScreenProps<SettingStackParamList, T>;

/* -------------------------------------------------------------------------- */
/*                         COMMON COMPOSITE HELPERS                            */
/* -------------------------------------------------------------------------- */

export type RootWithTabsProps<
  T extends keyof RootStackParamList,
  Tab extends keyof MainTabParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, T>,
  BottomTabScreenProps<MainTabParamList, Tab>
>;

export type QuoteTopTabWithRootProps<T extends keyof NewQuoteTopTabParamList> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<NewQuoteTopTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type InvoiceTopTabWithRootProps<
  T extends keyof NewInvoiceTopTabParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<NewInvoiceTopTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

export type HomeStackProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type QuoteStackProps<T extends keyof QuoteStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<QuoteStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type ClientStackProps<T extends keyof ClientStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ClientStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type InvoiceStackProps<T extends keyof InvoiceStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<InvoiceStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type SettingStackProps<T extends keyof SettingStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<SettingStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
