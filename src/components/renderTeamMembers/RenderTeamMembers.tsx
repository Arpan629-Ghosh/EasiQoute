import React, { useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Card from '../cardDetailsComponent/Card';
import InterTightMedium from '../fontComponents/InterTightMedium';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import { MemberDetails } from '@/types/apis/settings.types';
import { icons } from '@/config/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation.types';
import { useNavigation } from '@react-navigation/native';

type StatusAppearance = {
  bgColor: string;
  txtColor: string;
  txt: string;
};

const MEMBER_STATUS = {
  active: {
    bgColor: '#3AB4891A',
    txtColor: '#3AB489',
    txt: 'Active',
  },
  disabled: {
    bgColor: '#F053531A',
    txtColor: '#F05353',
    txt: 'Disabled',
  },
} satisfies Record<'active' | 'disabled', StatusAppearance>;

interface Props {
  item: MemberDetails;
}

const RenderTeamMembers = ({ item }: Props) => {
    const { theme } = useAppTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const status = item.active ? MEMBER_STATUS.active : MEMBER_STATUS.disabled;

  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePlaceholder}>
            {/* 
            <Image
              source={{ uri: item.profile }}
              style={styles.profileImage}
            />
            */}
          </View>
        </View>

        <View style={styles.textContainer}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            {item.name}
          </InterTightMedium>

          <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
            {item.email}
          </InterTightRegular>

          <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
            abc123456
          </InterTightRegular>
        </View>
          </View>
          <View style={ styles.border} />

      <View style={styles.cardFooter}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('AddMemberScreen', {
                  editId: item.id,
                  email: item.email,
                  name: item.name
        })}>
          <Image source={icons.ic_edit} style={styles.editIcon} />
        </TouchableOpacity>

        <View
          style={[
            styles.statusContainer,
            {
              backgroundColor: status.bgColor,
            },
          ]}
        >
          <Image
            source={item.active ? icons.ic_active : icons.ic_disabled}
            style={styles.statusIcon}
          />

          <InterTightMedium fsize={14} fcolor={status.txtColor}>
            {status.txt}
          </InterTightMedium>
        </View>
      </View>
    </Card>
  );
};

export default React.memo(RenderTeamMembers);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      marginBottom: 10,
      overflow: 'hidden',
    },

    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    profileContainer: {
      marginRight: 12,
    },

    profilePlaceholder: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: '#E5E7EB',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },

    profileImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },

    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },

    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    editIcon: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
    },

    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
    },

    statusIcon: {
      width: 14,
      height: 14,
      resizeMode: 'contain',
      marginRight: 6,
      },
      border: {
          borderWidth: 0.5,
          borderColor: theme.border
    }
  });
