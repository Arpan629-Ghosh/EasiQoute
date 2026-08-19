import { ImageSourcePropType } from "react-native";
import { images } from "./images";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTranslation } from "react-i18next";

type TextPart = {
  text: string;
  highlight?: boolean;
};

export type OnboardingItem = {
  id: string;
  textParts: TextPart[];
  image: ImageSourcePropType;
};



export const useOnBoardingData = (): OnboardingItem[] => {
  const { isDark } = useAppTheme()
  const { t } = useTranslation();
  
  return [
    {
      id: '1',
      textParts: [
        { text: `${t('auth.onBoarding1.sy') }`, highlight: false },
        {
          text: `${t('auth.onBoarding1.clients')}\n${t(
            'auth.onBoarding1.quotes',
          )}`,
          highlight: true,
        },
        { text: '& ', highlight: false },
        { text: t('auth.onBoarding1.invoice'), highlight: true },
      ],
      image: isDark ? images.img_lightintro : images.img_intro,
    },
    {
      id: '2',
      textParts: [
        { text: t('auth.onBoarding2.everything'), highlight: true },
        {
          text: `${t('auth.onBoarding2.mssg1')}\n ${t(
            'auth.onBoarding2.mssg2',
          )}`,
          highlight: false,
        },
        { text: t('auth.onBoarding2.getPaid'), highlight: true },
      ],
      image: isDark ? images.img_darklist : images.img_onboarding,
    },
  ];}