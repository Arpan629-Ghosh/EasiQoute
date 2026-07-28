import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, { useEffect, useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '@/config/icons';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Card from '@/components/cardDetailsComponent/Card';
import SettingInfoRow from '@/components/cardDetailsComponent/SettingInfoRow';
import CardHeader from '@/components/cardDetailsComponent/CardHeader';
import { useClient } from '@/hooks/apis/useClient';
import RecentClientActivity from '@/components/recentClientActivity/RecentClientActivity';
import { RootScreenProps } from '@/types/navigation.types';

const ClientDetailScreen = ({ navigation, route }: RootScreenProps<'ClientDetailScreen'>) => {
  const clientId = route.params.clientId;
  const { theme, isDark } = useAppTheme();
  const { showClientDetail, client_detail } = useClient();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigateToBack = () => {
    navigation.goBack();
  };

  const navigateToAddClient = () => {
    navigation.navigate('AddClientScreen');
  };

  useEffect(() => {
    showClientDetail(clientId);
  }, [clientId, showClientDetail]);
  return (
    <LinearGradient colors={theme.gradientPrimary} style={[styles.container, {paddingBottom: insets.bottom}]}>
      {isDark ? (
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
      ) : (
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
      )}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerComponent}>
          <TouchableOpacity onPress={navigateToBack}>
            <Image
              source={isDark ? icons.ic_backwhite : icons.ic_back}
              style={styles.img}
            />
          </TouchableOpacity>

          <Image
            source={isDark ? icons.ic_darkdots : icons.ic_dots}
            style={styles.img}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.headerText}>
          <InterTightMedium fsize={20} fcolor={theme.textPrimary}>
            {client_detail?.name}
          </InterTightMedium>
          <InterTightRegular fsize={16} fcolor={theme.textSecondary}>
            {client_detail?.company_name}
          </InterTightRegular>
        </View>
        <View style={styles.amtDetails}>
          <View style={styles.amtHeader}>
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
                  {client_detail?.total_quotes}
                </InterTightMedium>
                <InterTightMedium fsize={14} fcolor={theme.textMuted}>
                  £{client_detail?.total_quotes_amount}
                </InterTightMedium>
              </View>
              <InterTightRegular fsize={12} fcolor={theme.textSecondary}>
                Total Quotes
              </InterTightRegular>
            </Card>
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
                  {client_detail?.total_invoices}
                </InterTightMedium>
                <InterTightMedium fsize={14} fcolor={theme.textMuted}>
                  £{client_detail?.total_invoices_amount}
                </InterTightMedium>
              </View>
              <InterTightRegular fsize={12} fcolor={theme.textSecondary}>
                Total Invoices
              </InterTightRegular>
            </Card>
          </View>
          <Card style={styles.nextCard}>
            <View style={styles.txt}>
              <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
                {client_detail?.available_credit}
              </InterTightMedium>
            </View>
            <View style={styles.txt}>
              <InterTightRegular fsize={12} fcolor={theme.textSecondary}>
                Available Credit
              </InterTightRegular>
            </View>
          </Card>
        </View>
        <Card style={styles.payment}>
          <SettingInfoRow icon={icons.ic_payment} txt="Payments" />
        </Card>

        <Card style={styles.cardtwo}>
          <View style={styles.infocard}>
            <Image
              source={isDark ? icons.ic_darkbg3 : icons.ic_badge3}
              style={styles.img}
            />
            <CardHeader title="Client Details" />
          </View>
          <View style={styles.contact}>
            <View style={styles.contactdetail}>
              <Image
                source={isDark ? icons.ic_dark2 : icons.ic_call}
                style={styles.img}
              />
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                {client_detail?.phone}
              </InterTightRegular>
            </View>
            <View style={styles.contactdetail}>
              <Image
                source={isDark ? icons.ic_dark3 : icons.ic_gmail}
                style={styles.img}
              />
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                {client_detail?.email}
              </InterTightRegular>
            </View>
            <View style={styles.contactdetail}>
              <Image
                source={isDark ? icons.ic_dark4 : icons.ic_location}
                style={styles.img}
              />
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                {client_detail?.address}
              </InterTightRegular>
            </View>
          </View>
        </Card>
        <View style={styles.ractivity}>
          <View style={styles.activityTxt}>
            <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
              Recent Activity
            </InterTightMedium>
            <View style={styles.empty} />
          </View>
          <FlatList
            data={client_detail?.recent_activities}
            renderItem={({ item }) => <RecentClientActivity item={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatlist}
          />
        </View>
      </View>
      <View style={styles.add}>
        <TouchableOpacity activeOpacity={0.8} onPress={navigateToAddClient}>
          <Image source={icons.ic_add} style={styles.ic} />
        </TouchableOpacity>
          </View>
    </LinearGradient>
  );
};

export default ClientDetailScreen;
