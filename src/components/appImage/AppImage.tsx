import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';

import FastImage, { FastImageProps } from '@d11/react-native-fast-image';

import { images } from '@/config/images';

interface AppImageProps extends Omit<FastImageProps, 'source' | 'style'> {
  uri?: string | null;
  fallbackImage?: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
}

const AppImage = ({
  uri,
  fallbackImage = images.img_profile,
  style,
  ...props
}: AppImageProps) => {
  const [isLoading, setIsLoading] = useState(Boolean(uri));
  const [hasError, setHasError] = useState(false);

  if (!uri || hasError) {
    return (
      <Image
        source={fallbackImage}
        style={[styles.image, style]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={[styles.container, style]}>
      <FastImage
        key={uri}
        {...props}
        source={{
          uri,
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.normal,
        }}
        style={StyleSheet.absoluteFill}
        resizeMode={FastImage.resizeMode.cover}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />

      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    overflow: 'hidden',
  },

  image: {
    width: 100,
    height: 100,
  },

  loaderContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppImage;
