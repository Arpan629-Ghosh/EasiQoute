import { ImageSourcePropType } from "react-native";
import { icons } from "./icons";

export interface Service {
  type: string;
    icon: ImageSourcePropType;

}

export const SERVICES: Service[] = [
  { type: 'Electrician', icon: icons.ic_icon1 },
  { type: 'HVAC', icon: icons.ic_icon2},
  { type: 'Joiner', icon: icons.ic_icon3},
  { type: 'Landscaper', icon: icons.ic_icon4 },
  { type: 'Carpenter', icon: icons.ic_icon5 },
  { type: 'Bricklayer', icon: icons.ic_icon6 },
  { type: 'Floorer', icon: icons.ic_icon7 },
  { type: 'Roofer', icon: icons.ic_icon8 },
  { type: 'Plumber', icon: icons.ic_icon9 },
  { type: 'Plasterer', icon: icons.ic_icon10 },
  { type: 'Painter', icon: icons.ic_icon11 },
  { type: 'Property Maintenance', icon: icons.ic_icon12},
  { type: 'Upload my own list', icon: icons.ic_icon13 },
];