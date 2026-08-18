import { TranslationKeys } from "../types";

const hi: TranslationKeys = {
  common: {
    save: 'सहेजें',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    submit: 'जमा करें',
    retry: 'पुनः प्रयास करें',
    loading: 'लोड हो रहा है...',
  },

  auth: {
    login: 'लॉग इन',
    signup: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    forgotPassword: 'पासवर्ड भूल गए?',
  },

  profile: {
    profile: 'प्रोफ़ाइल',
    name: 'नाम',
    phone: 'फ़ोन नंबर',
    company: 'कंपनी',
  },

  settings: {
      title: 'सेटिंग्स',

      profile: {
        businessInformation: 'व्यवसाय की जानकारी',
        lastProfile: 'अंतिम प्रोफ़ाइल',
      },

      personalisation: {
        title: 'व्यक्तिकरण',
        subscriptionBilling: 'सब्सक्रिप्शन और बिलिंग',
        teamMembers: 'टीम सदस्य',
        appearance: 'दिखावट',
      },

      paymentsInvoicing: {
        title: 'भुगतान और चालान',
        connectStripe: 'Stripe कनेक्ट करें',
        paymentInfo: 'भुगतान की जानकारी',
        billingPreferences: 'बिलिंग प्राथमिकताएँ',
        quoteInvoiceSettings: 'कोट और चालान सेटिंग्स',
      },

      inventorySetup: {
        title: 'इन्वेंटरी सेटअप',
        categories: 'श्रेणियाँ',
        subcategories: 'उप-श्रेणियाँ',
        items: 'आइटम',
      },

      notifications: {
        title: 'सूचनाएँ',
        pushNotifications: 'पुश सूचनाएँ',
        emailUpdates: 'ईमेल अपडेट',
      },

      supportLegal: {
        title: 'सहायता और कानूनी',
        vendorTutorials: 'विक्रेता ट्यूटोरियल',
        contactSupport: 'सहायता से संपर्क करें',
        termsOfService: 'सेवा की शर्तें',
        privacyPolicy: 'गोपनीयता नीति',
      },

      accountSettings: {
        title: 'खाता सेटिंग्स',
        changePassword: 'पासवर्ड बदलें',
        deleteAccount: 'खाता हटाएँ',
        logout: 'लॉग आउट',
      },
    },
};

export default hi;
