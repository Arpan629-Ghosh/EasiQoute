import { ImageSourcePropType } from 'react-native';
import { icons } from './icons';

export interface Status {
  type: string;
  icon: ImageSourcePropType;
}

export const StatusData: Status[] = [
  {
    type: 'Draft',
    icon: icons.ic_draft,
  },
  {
    type: 'Completed',
    icon: icons.ic_completed,
  },
  {
    type: 'Sent',
    icon: icons.ic_sent,
  },
  {
    type: 'Approved',
    icon: icons.ic_approved,
  },
  {
    type: 'Paid',
    icon: icons.ic_paid,
  },
  {
    type: 'Rejected',
    icon: icons.ic_rejected,
  },
  {
    type: 'Cancelled',
    icon: icons.ic_cancelled,
  },
];
