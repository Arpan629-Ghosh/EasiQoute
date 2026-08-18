import { TranslationKeys } from "../types";

const bn: TranslationKeys = {
  common: {
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল করুন',
    delete: 'মুছে ফেলুন',
    edit: 'সম্পাদনা করুন',
    submit: 'জমা দিন',
    retry: 'আবার চেষ্টা করুন',
    loading: 'লোড হচ্ছে...',
  },

  auth: {
    login: 'লগ ইন',
    signup: 'সাইন আপ',
    email: 'ইমেল',
    password: 'পাসওয়ার্ড',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
  },

  profile: {
    profile: 'প্রোফাইল',
    name: 'নাম',
    phone: 'ফোন নম্বর',
    company: 'কোম্পানি',
  },

  settings: {
    
      title: 'সেটিংস',

      profile: {
        businessInformation: 'ব্যবসায়িক তথ্য',
        lastProfile: 'শেষ প্রোফাইল',
      },

      personalisation: {
        title: 'ব্যক্তিগতকরণ',
        subscriptionBilling: 'সাবস্ক্রিপশন ও বিলিং',
        teamMembers: 'টিম সদস্য',
        appearance: 'চেহারা',
      },

      paymentsInvoicing: {
        title: 'পেমেন্ট ও ইনভয়েসিং',
        connectStripe: 'Stripe সংযুক্ত করুন',
        paymentInfo: 'পেমেন্টের তথ্য',
        billingPreferences: 'বিলিং পছন্দসমূহ',
        quoteInvoiceSettings: 'কোট ও ইনভয়েস সেটিংস',
      },

      inventorySetup: {
        title: 'ইনভেন্টরি সেটআপ',
        categories: 'ক্যাটাগরি',
        subcategories: 'সাবক্যাটাগরি',
        items: 'আইটেম',
      },

      notifications: {
        title: 'বিজ্ঞপ্তি',
        pushNotifications: 'পুশ বিজ্ঞপ্তি',
        emailUpdates: 'ইমেল আপডেট',
      },

      supportLegal: {
        title: 'সহায়তা ও আইনি',
        vendorTutorials: 'বিক্রেতা টিউটোরিয়াল',
        contactSupport: 'সহায়তার সাথে যোগাযোগ করুন',
        termsOfService: 'পরিষেবার শর্তাবলি',
        privacyPolicy: 'গোপনীয়তা নীতি',
      },

      accountSettings: {
        title: 'অ্যাকাউন্ট সেটিংস',
        changePassword: 'পাসওয়ার্ড পরিবর্তন করুন',
        deleteAccount: 'অ্যাকাউন্ট মুছে দিন',
        logout: 'লগ আউট',
      },
  },
};

export default bn;
