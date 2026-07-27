import { View, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useAppTheme } from '@/hooks/useAppTheme'
import { createStyles } from './style'
import InterTightMedium from '@/components/fontComponents/InterTightMedium'
import InterTightLight from '@/components/fontComponents/InterTightLight'

const SummuryScreen = () => {

    const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={theme.gradientPrimary}
            style={styles.linearGradient}
          >
            <View style={styles.txtView}>
              <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                Cabin Restoration
              </InterTightMedium>
              <InterTightLight fsize={14} fcolor={theme.textPrimary}>
                Bryan Johnson
              </InterTightLight>
            </View>
            <View style={styles.border} />

            <InterTightLight fsize={14} fcolor={theme.textPrimary}>
              Linked Quote:{' '}
              <InterTightMedium fsize={14} fcolor={theme.textPrimary}>
                QT-2025-201
              </InterTightMedium>{' '}
            </InterTightLight>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default SummuryScreen