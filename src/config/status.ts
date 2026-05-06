import { ImageSourcePropType } from 'react-native';
import { icons } from './icons';
import { useAppTheme } from '@/hooks/useAppTheme';

export interface Status {
  type: string;
  icon: ImageSourcePropType;
}

export const StatusData = (): Status[] => {
  const { isDark } = useAppTheme();
  return [
    {
      type: 'Draft',
      icon: isDark ? icons.ic_darkl1 : icons.ic_draft,
    },
    {
      type: 'Completed',
      icon: isDark ? icons.ic_darkl2 : icons.ic_completed,
    },
    {
      type: 'Sent',
      icon: isDark ? icons.ic_darkl2 : icons.ic_sent,
    },
    {
      type: 'Approved',
      icon: isDark ? icons.ic_darkl3 : icons.ic_approved,
    },
    {
      type: 'Paid',
      icon: isDark ? icons.ic_darkl3 : icons.ic_paid,
    },
    {
      type: 'Rejected',
      icon: isDark ? icons.ic_darkl4 : icons.ic_rejected,
    },
    {
      type: 'Cancelled',
      icon: isDark ? icons.ic_darkl4 : icons.ic_cancelled,
    },
  ];
};
