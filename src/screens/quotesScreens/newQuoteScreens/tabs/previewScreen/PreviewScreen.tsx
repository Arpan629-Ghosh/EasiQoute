import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { createStyles } from './style'
import Input from '@/components/inputComponent/Input'
import ButtonComponent from '@/components/buttonComponent/ButtonComponent'
import { icons } from '@/config/icons'
import { useAppTheme } from '@/hooks/useAppTheme'
import {  useSafeAreaInsets } from 'react-native-safe-area-context'
import { QuoteTopTabWithRootProps } from '@/types/navigation.types'
import WebView from 'react-native-webview'

const PreviewScreen = ({ navigation, route }: QuoteTopTabWithRootProps<'Preview'>) => {
  const [loading, setLoading] = useState(true);
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigateToTemplatesScreen = () => {
    navigation.navigate('TemplatesScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.input}>
          <Input
            placeholder="Search or select subcategory"
            style={styles.noBorderInput}
          />
          <TouchableOpacity>
            <Image source={icons.ic_drop} style={styles.searchic} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.webViewContainer}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        )}

        <WebView
          source={{ uri: route.params?.previewUrl }}
          style={styles.webView}
          startInLoadingState
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          scalesPageToFit
          mixedContentMode="always"
          showsVerticalScrollIndicator={false}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={event => {
            console.log('WebView Error', event.nativeEvent);
            setLoading(false);
          }}
        />
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.firstBttnContainer}>
          <ButtonComponent
            onPress={navigateToTemplatesScreen}
            borderwidth={1}
            borderc={theme.chipBorder}
            bttnTxt="Templates"
            txtColor={theme.textMuted}
          />
        </View>
        <View style={styles.secondBttnContainer}>
          <ButtonComponent
            borderc={theme.chipBorder}
            gap={8}
            borderwidth={1}
            buttonWidth={182}
            bttnTxt="Share"
            txtColor={theme.textMuted}
          >
            <Image source={icons.ic_share} style={styles.share} />
          </ButtonComponent>
          <ButtonComponent
            bg={theme.primary}
            buttonWidth={182}
            bttnTxt="Save"
            txtColor={theme.primaryText}
          />
        </View>
      </View>
    </View>
  );
};

export default PreviewScreen