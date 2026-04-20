import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../../types/navigation.types';
import LoginScreen from '../../screens/authScreens/loginScreen/LoginScreen';
import RegisterScreen from '../../screens/authScreens/regusterScreen/RegisterScreen';
import ResetPasswordScreen from '../../screens/authScreens/resetPasswordScreen/ResetPasswordScreen';



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
          
    </Stack.Navigator>
  )
}

export default AuthStack