import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import InterTightMedium from '../fontComponents/InterTightMedium';
import { useAppTheme } from '@/hooks/useAppTheme';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { images } from '@/config/images';

const SubCategoryEmptyScreen = () => {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.components}>
        <Image source={images.img_subcatempty} style={styles.img} />
        <View style={styles.txtView}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            No Subcategories Found{' '}
          </InterTightMedium>
          <View>
            <InterTightRegular
              fsize={14}
              fcolor={theme.textSecondary}
              textAlign="center"
            >
              Click on the “+ New Subcategory” 
            </InterTightRegular>
            <InterTightRegular
              fsize={14}
              fcolor={theme.textSecondary}
              textAlign="center"
            >
              below to add new item.
            </InterTightRegular>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SubCategoryEmptyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    alignItems: 'center',
        justifyContent: 'center',
    marginTop: 180
  },
  components: {
    gap: 16,
    alignItems: 'center',
  },
  img: {
    height: 48,
    width: 48,
  },
  txtView: {
    gap: 6,
    alignItems: 'center',
  },
  icn: {
    height: 12,
    width: 12,
  },
});
