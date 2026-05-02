import React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { StatusBar, StyleSheet, View } from 'react-native';
import RootStack from './src/navigation/RootStack';

import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/store';

import { useAppTheme } from '@/hooks/useAppTheme';
import { useSyncAppTheme } from '@/hooks/useSyncAppTheme';
import { PersistGate } from 'redux-persist/integration/react';


const AppContent = () => {
  useSyncAppTheme();
  const { theme, isDark } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <RootStack />
      </NavigationContainer>
    </View>
  );
};


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
