import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo } from 'react';
import { createStyles } from './style';
import { images } from '@/config/images';
import InterTightMedium from '@/components/appFonts/InterTightMedium';
import { icons } from '@/config/icons';
import Icons from '@/components/icons/Icons';
import AppDetails from '@/components/appDetails/AppDetails';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import RenderActivities from '@/components/renderActivities/RenderActivities';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHomeScreenData } from '@/hooks/apis/home/useHomeScreenData';
import Loader from '@/components/loader/Loader';
import { HomeStackProps } from '@/types/navigation.types';
import EmptyStateScreen from '@/components/emptyStateScreen/EmptyStateScreen';
import AppImage from '@/components/appImage/AppImage';
import { useGetUserDetails } from '@/hooks/apis/useGetUserDetails';

const HomeScreen = ({ navigation }: HomeStackProps<'HomeScreen'>) => {
  const { theme, isDark } = useAppTheme();
  const { userDetails } = useGetUserDetails();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const {
    homeScreenData,
    isPending,
    isError
  } = useHomeScreenData();

  console.log(isError)

  return (
    <View style={[styles.safeareaview]}>
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
                  <AppImage
                    uri={userDetails?.avatar}
                    style={styles.pic}
                  />
                </View>
                <InterTightMedium fsize={18} fcolor="#FFFFFF">
                  Welcome, {userDetails?.name.split(' ')[0]}!
                </InterTightMedium>
              </View>
              <Image source={images.img_pro} style={styles.pro} />
            </View>
            <View style={styles.details}>
              <View style={styles.invoiceqoute}>
                <AppDetails
                  price={`£${homeScreenData?.invoiceDetails?.outstanding_invoices_amount}`}
                  type="Outstanding Invoices"
                  numberDueActive={`${homeScreenData?.invoiceDetails.overdue_invoices} Overdue`}
                />

                <View style={styles.emptyView} />

                <AppDetails
                  price={`£${homeScreenData?.quoteDetails.pending_quotes_amount}`}
                  type="Pending Quotes"
                  numberDueActive={`${homeScreenData?.quoteDetails.active_quotes} Active`}
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
                <TouchableOpacity
                  onPress={() => navigation.navigate('NewInvoiceScreens')}
                >
                  <Icons text="New Invoice">
                    <Image source={icons.ic_whiteqoute} style={styles.vector} />
                  </Icons>
                </TouchableOpacity>

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
        
          <FlatList
            data={homeScreenData?.recentActivities || []}
            renderItem={({ item }) => <RenderActivities item={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlist}
          style = {styles.flat}
            ListEmptyComponent={
              <EmptyStateScreen
                icon={isDark ? images.img_darkrecent : images.img_homeEmpty}
                message="Start with creating quotes and"
                nextMessage="invoices to show here"
                primaryText="No Recent Activity"
                butttonEnabled={true}
              />
            }
          />
        
      </View>
      <View style={styles.footer}>
        <InterTightRegular fsize={14} fcolor="#89909D">
          Free trial ends on November 20, 2025
        </InterTightRegular>
      </View>
      <Loader visible={isPending} />
    </View>
  );
};

export default HomeScreen;
