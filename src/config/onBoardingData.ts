import { ImageSourcePropType } from "react-native";
import { images } from "./images";

type TextPart = {
  text: string;
  highlight?: boolean;
};

export type OnboardingItem = {
  id: string;
  textParts: TextPart[];
  image: ImageSourcePropType;
};

export const DATA: OnboardingItem[] = [
  {
    id: '1',
        textParts: [
            { text: "Streamline your ", highlight: false },
            { text: "Clients\nQuotes ", highlight: true },
            { text: "& ", highlight: false },
            {text: "Invoices", highlight: true}
    ],
    image: images.img_intro
  },
  {
    id: '2',
      textParts: [
          { text: "Everything ", highlight: true },
          { text: "You Need to Win\nthe Job and ", highlight: false },
          {text: "Get Paid", highlight: true}
    ],
    image: images.img_onboarding
  },
];