import { ActivityIndicator, Image, Share, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { createStyles } from './style'
import AppInput from '@/components/appInput/AppInput';
import AppButton from '@/components/appButton/AppButton';
import { icons } from '@/config/icons'
import { useAppTheme } from '@/hooks/useAppTheme'
import {  useSafeAreaInsets } from 'react-native-safe-area-context'
import { QuoteTopTabWithRootProps } from '@/types/navigation.types'
import WebView from 'react-native-webview'
import { useQuotes } from '@/hooks/apis/useQuotes'

const PreviewScreen = ({ navigation, route }: QuoteTopTabWithRootProps<'Preview'>) => {
  const [loading, setLoading] = useState(true);
  const { theme } = useAppTheme();
  const { fetchQuoteDetails, quoteDetails} = useQuotes();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigateToTemplatesScreen = () => {
    navigation.navigate('TemplatesScreen');
  };

  const quoteId = route.params?.quoteId

  useEffect(() => {
    if(quoteId)
     fetchQuoteDetails(quoteId)
  }, [fetchQuoteDetails, quoteId])

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this quote ${quoteDetails?.url}`
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.input}>
          <AppInput
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

        {quoteDetails?.url ? (
          <WebView
            source={{ uri: quoteDetails?.url }}
            style={styles.webView}
            startInLoadingState
            javaScriptEnabled
            domStorageEnabled
            originWhitelist={['*']}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={event => {
              console.log('WebView Error', event.nativeEvent);
              setLoading(false);
            }}
          />
        ) : null}
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.firstBttnContainer}>
          <AppButton
            onPress={navigateToTemplatesScreen}
            borderwidth={1}
            borderc={theme.chipBorder}
            bttnTxt="Templates"
            txtColor={theme.textMuted}
          />
        </View>
        <View style={styles.secondBttnContainer}>
          <AppButton
            borderc={theme.chipBorder}
            gap={8}
            borderwidth={1}
            buttonWidth="48.5%"
            bttnTxt="Share"
            txtColor={theme.textMuted}
            onPress={handleShare}
          >
            <Image source={icons.ic_share} style={styles.share} />
          </AppButton>
          <AppButton
            bg={theme.primary}
            buttonWidth="48.5%"
            bttnTxt="Save"
            txtColor={theme.primaryText}
          />
        </View>
      </View>
    </View>
  );
};

export default PreviewScreen