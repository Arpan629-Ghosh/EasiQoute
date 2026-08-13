
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import Card from '../cardDetailsComponent/Card'
import { useAppTheme } from '@/hooks/useAppTheme'
import { Theme } from '@/types/theme.types'
import { Data } from '@/types/apis/payments.types'
import InterTightMedium from '../appFonts/InterTightMedium'
import InterTightRegular from '../appFonts/InterTightRegular'
import { PAYMENT_STATUS_COLORS } from '@/config/statusColors'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types/navigation.types'

const RenderPaymentList = ({ item }: { item: Data }) => {
    
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme])

    const statusColors = PAYMENT_STATUS_COLORS[
      item.status as keyof typeof PAYMENT_STATUS_COLORS
    ] || {
      view: '#E8ECF4',
      text: '#64748B',
    };
  return (
      <TouchableOpacity onPress={() => navigation.navigate("PaymentDetailsScreen", {
        paymentId: item.id
    })}>
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerTxt}>
            <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
              {item.client_name}
            </InterTightMedium>
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              Payment Id:{' '}
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                {item.id}
              </InterTightRegular>
            </InterTightRegular>
          </View>
          <View
            style={[styles.statusView, { backgroundColor: statusColors.view }]}
          >
            <InterTightMedium fsize={12} fcolor={statusColors.text}>
              {item.status}
            </InterTightMedium>
          </View>
        </View>
              <View style={styles.border} />
              <View style={styles.cardFooter}>
                  <View style = {styles.footer}>
                      <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                          Amount
                      </InterTightRegular>
                      <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                      £{item.amount}
                      </InterTightRegular>
                  </View>
                  <View style = {styles.footer}>
                      <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                          Allocated
                      </InterTightRegular>
                      <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                      £{item.allocated}
                      </InterTightRegular>
                  </View>
                  <View style = {styles.footer}>
                      <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                          Credit
                      </InterTightRegular>
                      <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                      £{item.credit}
                      </InterTightRegular>
                  </View>
              </View>
      </Card>
    </TouchableOpacity>
  );
}

export default React.memo(RenderPaymentList);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      gap: 16,
      marginBottom: 8,
    },

    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerTxt: {
      gap: 5,
    },
    statusView: {
      gap: 10,
      paddingVertical: 3,
      paddingHorizontal: 6,
      borderRadius: 5,
      height: 21,
    },
    border: {
      borderWidth: 0.5,
      borderColor: theme.border,
    },
      cardFooter: {
        flex : 1,
      flexDirection: 'row',
      gap: 8,
    },
      footer: {
        flex: 1,
      borderRadius: 8,
      gap: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: theme.cardSecondary,
    },
  });