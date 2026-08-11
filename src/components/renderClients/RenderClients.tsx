import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { Clients } from '@/types/apis/client.types';
import Card from '../cardDetailsComponent/Card';
import { useAppTheme } from '@/hooks/useAppTheme';
import InterTightMedium from '../appFonts/InterTightMedium';
import InterTightRegular from '../appFonts/InterTightRegular';
import { icons } from '@/config/icons';
import { Theme } from '@/types/theme.types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation.types';

const RenderClients = ({ item }: { item: Clients }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <TouchableOpacity
          onPress={() =>
            navigation.navigate('ClientDetailScreen', {
              clientId: item.id,
            })
          }
        >
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.txt}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            {item.name}
          </InterTightMedium>
          <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
            {item.company_name}
          </InterTightRegular>
        </View>
        
          <Image source={icons.ic_redirect} style={styles.img} />
        
      </View>
      <View style={styles.empty} />
      <View style={styles.footer}>
        <View style={styles.content}>
          <Image source={icons.ic_emailicn} style={styles.icn} />
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            {item.email}
          </InterTightRegular>
        </View>
        <View style={styles.content}>
          <Image source={icons.ic_emailicn} style={styles.icn} />
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            {item.phone}
          </InterTightRegular>
        </View>
      </View>
    </Card>
    </TouchableOpacity>
  );
};

export default RenderClients;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      gap: 16,
      marginBottom: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    txt: {
      gap: 5,
    },
    img: {
      height: 28,
      width: 28,
    },
    empty: {
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
    },
    footer: {
      gap: 16,
    },
    content: {
      flexDirection: 'row',
      gap: 8,
    },
    icn: {
      height: 24,
      width: 24,
    },
  });
