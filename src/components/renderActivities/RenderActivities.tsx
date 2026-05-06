import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { Activities } from '@/config/activities';
import InterTightMedium from '../fontComponents/InterTightMedium';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { useNavigation } from '@react-navigation/native';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import {   RootStackParamList } from '@/types/navigation.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

const RenderActivities = ({ item }: { item: Activities }) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const { theme } = useAppTheme();
      const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <ButtonComponent
        onPress={() =>
          navigation.navigate('QouteDetailScreen', {
            quoteId: item.id,
          })
        }
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.txtContainer}>
              <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                {item.title}
              </InterTightMedium>
              <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                {item.company}
              </InterTightRegular>
            </View>

            <View style={[styles.status, { backgroundColor: item.viewColor }]}>
              <InterTightMedium fsize={12} fcolor={item.textcolor}>
                {item.paymentStatus}
              </InterTightMedium>
            </View>
          </View>

         <View style={styles.empty} />

          <View style={styles.footer}>
            <View style={styles.footerTxt}>
              <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                {item.type}
              </InterTightRegular>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                {item.typeValue}
              </InterTightRegular>
            </View>

            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              {item.price}
            </InterTightRegular>
          </View>
        </View>
      </ButtonComponent>
    </View>
  );
};

export default React.memo(RenderActivities);

const createStyles = (theme: Theme) =>  StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 12,
    gap: 16,
    backgroundColor: theme.card,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtContainer: {
    height: '100%',
    gap: 5,
  },
  status: {
    height: 21,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 6,
    gap: 10,
    backgroundColor: '#F0535312',
    alignItems: 'center',
  },
  empty: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: theme.border,
  },
  footer: {
    height: 17,
    width: '100%',
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerTxt: {
    flexDirection: 'row',
  },
});
