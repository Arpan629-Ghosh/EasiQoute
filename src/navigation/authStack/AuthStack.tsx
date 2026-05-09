import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '@appTypes/navigation.types';
import LoginScreen from '@/screens/authAndProfileSetupScreens/authScreens/loginScreen/LoginScreen';
import RegisterScreen from '@/screens/authAndProfileSetupScreens/authScreens/registerScreen/RegisterScreen';
import ResetPasswordScreen from '@/screens/authAndProfileSetupScreens/authScreens/resetPasswordScreen/ResetPasswordScreen';
import ProfileScreen from '@/screens/authAndProfileSetupScreens/profileScreens/ProfileScreen/ProfileScreen';
import IntroScreen from '@/screens/authAndProfileSetupScreens/introScreens/IntroScreen/IntroScreen';
import BusinessScreen from '@/screens/authAndProfileSetupScreens/profileScreens/businessSetupScreens/businessScreen/BusinessScreen';
import BusinessAddressScreen from '@/screens/authAndProfileSetupScreens/profileScreens/businessSetupScreens/businessAddressScren/BusinessAddressScreen';



const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthStack = () => {
  return (
      <Stack.Navigator
          initialRouteName='LoginScreen'
          screenOptions={{
              headerShown: false
          }}
      >
          
          <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                  title: "login",
                  headerShown: false
              }}
          />
          <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{
                  title: "register",
                  headerShown: false
              }}
          />
          <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
              options={{
                  title: "Reset password",
                  headerShown: false
              }}
          />

          <Stack.Screen
              name="IntroScreen"
              component={IntroScreen}
              options={{
                  title: "Intro Screen",
                  headerShown: false
              }}
          />


          <Stack.Screen
              name='ProfileScreen'
              component={ProfileScreen}
              options={{
                  title: "Profile Screen",
                  headerShown: false
              }}
          />

          <Stack.Screen
              name='BusinessScreen'
              component={BusinessScreen}
              options={{
                  title: 'Business Setup',
                  headerShown: false
              }}
          />

          <Stack.Screen
              name='BusinessAddressScreen'
              component={BusinessAddressScreen}
              options={{
                  title: "Business Address",
                  headerShown: false
              }}
          />
          
    </Stack.Navigator>
  )
}

export default AuthStack