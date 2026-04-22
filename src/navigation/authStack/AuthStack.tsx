import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '@appTypes/navigation.types';
import LoginScreen from '@screens/authScreens/loginScreen/LoginScreen';
import RegisterScreen from '@screens/authScreens/registerScreen/RegisterScreen';
import ResetPasswordScreen from '@/screens/authScreens/resetPasswordScreen/ResetPasswordScreen';
import IntroScreen1 from '@/screens/IntroScreens/introScreen1/IntroScreen1';
import IntroScreen2 from '@/screens/IntroScreens/introScreen2/IntroScreen2';
import ProfileScreen from '@/screens/ProfileScreens/ProfileScreen/ProfileScreen';



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
              name="IntroScreen1"
              component={IntroScreen1}
              options={{
                  title: "Intro One",
                  headerShown: false
              }}
          />

          <Stack.Screen
              name='IntroScreen2'
              component={IntroScreen2}
              options={{
                  title: "Intro Two",
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
          
    </Stack.Navigator>
  )
}

export default AuthStack