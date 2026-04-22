import { ImageSourcePropType } from "react-native";
import { images } from "./images";

export interface IntroItem {
  id: string;
  image: ImageSourcePropType;
}
export const DATA : IntroItem[] = [{
    id: "1",
    image: images.img_onboarding
}]