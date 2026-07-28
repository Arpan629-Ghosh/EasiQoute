import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { createStyles } from './style';
import { images } from '@/config/images';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import { icons } from '@/config/icons';
import Icons from '@/components/icons/Icons';
import AppDetails from '@/components/appDetails/AppDetails';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import RenderActivities from '@/components/renderActivities/RenderActivities';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHomeScreenData } from '@/hooks/apis/useHomeScreenData';
import HomeEmptyScreen from '@/components/emptyScreenComponents/HomeEmptyScreen';
import { useAuth } from '@/hooks/apis/useAuth';
import { useFocusEffect } from '@react-navigation/native';

import Loader from '@/components/loader/Loader';
import { HomeStackProps } from '@/types/navigation.types';

const HomeScreen = ({ navigation }: HomeStackProps<'HomeScreen'>) => {
  const { theme } = useAppTheme();
  const { homeScreenData, homeData, loading } = useHomeScreenData();
  const { user } = useAuth();

  const styles = useMemo(() => createStyles(theme), [theme]);

  useFocusEffect(
    useCallback(() => {
      homeScreenData();
    }, [homeScreenData]),
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await homeScreenData();
  //       console.log('home', data);
  //     } catch (error) {
  //       console.log('HOME SCREEN DATA FETCH ERROR', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <View style={styles.safeareaview}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.bg}>
        <Image source={images.img_gradient} style={styles.bg} />
        <View style={styles.header}>
          <View style={styles.headerComponent}>
            <View style={styles.headerTxt}>
              <View style={styles.profile}>
                <View style={styles.profilepic}>
                  <Image
                    source={
                      user?.avatar
                        ? {
                            uri: user.avatar,
                          }
                        : images.img_profile
                    }
                    style={styles.pic}
                    resizeMode="cover"
                  />
                </View>
                <InterTightMedium fsize={18} fcolor="#FFFFFF">
                  Welcome, {user?.name.split(' ')[0]}!
                </InterTightMedium>
              </View>
              <Image source={images.img_pro} style={styles.pro} />
            </View>
            <View style={styles.details}>
              <View style={styles.invoiceqoute}>
                <AppDetails
                  price={`£${homeData?.invoiceDetails.outstanding_invoices_amount}`}
                  type="Outstanding Invoices"
                  numberDueActive={`${homeData?.invoiceDetails.overdue_invoices} Overdue`}
                />

                <View style={styles.emptyView} />

                <AppDetails
                  price={`£${homeData?.quoteDetails.pending_quotes_amount}`}
                  type="Pending Quotes"
                  numberDueActive={`${homeData?.quoteDetails.active_quotes} Active`}
                />
              </View>
              <View style={styles.icons}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('NewQuoteScreens')}
                >
                  <Icons text="New Quote">
                    <Image source={icons.ic_whiteqoute} style={styles.vector} />
                  </Icons>
                </TouchableOpacity>

                <Icons text="New Invoice">
                  <Image source={icons.ic_whiteqoute} style={styles.vector} />
                </Icons>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Clients')}
                >
                  <Icons text="View Clients">
                    <Image
                      source={icons.ic_whiteclient}
                      style={styles.vector}
                    />
                  </Icons>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.activityContainer}>
        <View style={styles.activityTxt}>
          <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
            Recent Activity
          </InterTightMedium>
          <View style={styles.empty} />
        </View>
        <View>
          <FlatList
            data={homeData?.recentActivities || []}
            renderItem={({ item }) => <RenderActivities item={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatlist}
            ListEmptyComponent={<HomeEmptyScreen />}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <InterTightRegular fsize={14} fcolor="#89909D">
          Free trial ends on November 20, 2025
        </InterTightRegular>
      </View>
      <Loader visible={loading} />
    </View>
  );
};

export default HomeScreen;
