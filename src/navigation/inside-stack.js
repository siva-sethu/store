import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import Orders from '../screens/pos/orders';
import CustomDrawer from './custom-drawer';
import { useIsFocused } from '@react-navigation/native';

import { Settings } from '../screens';
import { useSelector } from 'react-redux';
import Pos from '../screens/pos/pos';
import TabNavigation from "../navigation/tab-navigator";

const Stack = createStackNavigator();

const ScreenWithFocus = ({ component: Component, route }) => {
  const isFocused = useIsFocused();
  return <Component isFocused={isFocused} />;
};

const InsideStack = () => {
  const selectedTab = useSelector(state => state.auth.selected_tab);
  return (


    <Stack.Navigator
      initialRouteName={Routes.BottomTab}
      screenOptions={{ headerShown: false }}>

      <Stack.Screen name={Routes.BottomTab}
        component={TabNavigation}
      >
      </Stack.Screen>
    </Stack.Navigator>

  );
};

export default InsideStack;
