import { View, ActivityIndicator, Image } from 'react-native'
import React, { useMemo, useState } from 'react'
import { InvoiceTopTabWithRootProps } from '@/types/navigation.types'
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import WebView from 'react-native-webview';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { icons } from '@/config/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PreviewScreen = ({ route }: InvoiceTopTabWithRootProps<'Preview'>) => {
  const [loading, setLoading] = useState(true);
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme])

  console.log(route.params?.previewUrl)
  return (
    <View style={styles.containe}>
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
}

export default PreviewScreen