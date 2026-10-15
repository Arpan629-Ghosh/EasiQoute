import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import {
  Infinity,
  BriefcaseBusiness,
  Paintbrush,
  ChartNoAxesCombined,
  LucideIcon,
} from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { scaleHeight, scaleWidth } from '@/utils/normalize';
import { fontFamily } from '@/constants/fontFamily';
import InterTightRegular from '../ui/appFonts/InterTightRegular';
import { Theme } from '@/types/theme.types';



export interface BenefitItem {
  id: string;
  title: string;
  icon: LucideIcon;
}

interface BenefitsListProps {
  items?: BenefitItem[];
  style?: ViewStyle;
}

const DEFAULT_BENEFITS: BenefitItem[] = [
  {
    id: 'quotes',
    title: 'Unlimited Quotes & Invoices',
    icon: Infinity,
  },
  {
    id: 'clients',
    title: 'Unlimited Clients',
    icon: BriefcaseBusiness,
  },
  {
    id: 'branding',
    title: 'Custom Branding',
    icon: Paintbrush,
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics & Insights',
    icon: ChartNoAxesCombined,
  },
];

const BenefitsList: React.FC<BenefitsListProps> = ({
  items = DEFAULT_BENEFITS,
  style,
}) => {
    const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.cardSecondary ?? '#F3F3FA' },
        style,
      ]}
    >
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <View
            key={item.id}
            style={[
              styles.row,
              index !== items.length - 1 && styles.divider,
              {
                borderBottomColor: theme.border ?? '#E8E8F0',
              },
            ]}
          >
            <View style={styles.iconContainer}>
              <Icon
                size={scaleWidth(17)}
                color={theme.textPrimary}
                strokeWidth={2.2}
              />
            </View>

            <InterTightRegular
              fsize={16}
              fcolor={theme.textPrimary}
              style={styles.label}
            >
              {item.title}
            </InterTightRegular>
          </View>
        );
      })}
    </View>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: scaleWidth(12),
    paddingHorizontal: scaleWidth(7),
    paddingVertical: scaleHeight(2),
    borderWidth: 0.5,
    borderColor: theme.border
  },

  row: {
    minHeight: scaleHeight(47),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(9),
  },

  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  iconContainer: {
    width: scaleWidth(32),
    height: scaleWidth(32),
    borderRadius: scaleWidth(5),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    flex: 1,
    fontFamily: fontFamily.INTER_TIGHT.medium,
  },
});

export default BenefitsList;
