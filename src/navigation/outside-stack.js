import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { ClerkPin, Login, Otp } from '../screens';
import { Routes } from './routes';
import { StatusBar } from 'react-native';
import { color } from '../theme';

const Stack = createStackNavigator();
export const OutsideStack = () => {
  const showScreen = useSelector(state => state.auth.offline_data_bool);
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={color.palette[ThemeName].background}
      />
      <Stack.Navigator>
        {showScreen ? (
          <Stack.Screen
            name={Routes.CLERKPIN}
            component={ClerkPin}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name={Routes.LOGIN}
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Routes.OTP}
              component={Otp}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </>

  );
};
