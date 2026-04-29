import { FlatList, Image, StatusBar, View } from 'react-native';
import React from 'react';
import { styles } from './style';
import { images } from '@/config/images';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import { icons } from '@/config/icons';
import Icons from '@/components/icons/Icons';
import AppDetails from '@/components/appDetails/AppDetails';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import RenderActivities from '@/components/renderActivities/RenderActivities';
import { DATA } from '@/config/activities';

const HomeScreen = () => {
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
                  {/* profile image from response */}
                </View>
                <InterTightMedium fsize={18} fcolor="#FFFFFF">
                  Welcome, Emma!
                </InterTightMedium>
              </View>
              <Image source={images.img_pro} style={styles.pro} />
            </View>
            <View style={styles.details}>
              <View style={styles.invoiceqoute}>
                <AppDetails
                  price="£12,500.00"
                  type="Outstanding Invoices"
                  numberDueActive="3 Overdue"
                />

                <View style={styles.emptyView} />

                <AppDetails
                  price="£8,250.00"
                  type="Pending Quotes"
                  numberDueActive="5 Active"
                />
              </View>
              <View style={styles.icons}>
                <Icons text="New Quote">
                  <Image source={icons.ic_whiteqoute} style={styles.vector} />
                </Icons>
                <Icons text="New Invoice">
                  <Image source={icons.ic_whiteqoute} style={styles.vector} />
                </Icons>
                <Icons text="View Clients">
                  <Image source={icons.ic_whiteclient} style={styles.vector} />
                </Icons>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.activityContainer}>
        <View style={styles.activityTxt}>
          <InterTightMedium fsize={18} fcolor="#2D2D2D">
            Recent Activity
          </InterTightMedium>
          <View style={styles.empty} />
        </View>
        <View >
          <FlatList
            
            data={DATA}
            renderItem={({ item }) => <RenderActivities item={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
           
          />
        </View>
      </View>
      <View style={styles.footer}>
        <InterTightRegular fsize={14} fcolor="#89909D">
          Free trial ends on November 20, 2025
        </InterTightRegular>
      </View>
    </View>
  );
};

export default HomeScreen;
