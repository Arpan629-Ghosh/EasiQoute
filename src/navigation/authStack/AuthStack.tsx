import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '@appTypes/navigation.types';
import LoginScreen from '@screens/authScreens/loginScreen/LoginScreen';
import RegisterScreen from '@screens/authScreens/registerScreen/RegisterScreen';
import ResetPasswordScreen from '@/screens/authScreens/resetPasswordScreen/ResetPasswordScreen';
import ProfileScreen from '@/screens/ProfileScreens/ProfileScreen/ProfileScreen';
import IntroScreen from '@/screens/IntroScreens/IntroScreen/IntroScreen';
import BusinessScreen from '@/screens/ProfileScreens/BusinessScreen/BusinessScreen';



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
          
    </Stack.Navigator>
  )
}

export default AuthStack