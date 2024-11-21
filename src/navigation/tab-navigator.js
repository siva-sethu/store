import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { color } from '../theme';
import { useSelector } from 'react-redux';
import CustomTabBar from "./custom-tabbar";
import Pos from "../screens/pos/pos";
import Orders from "../screens/pos/orders";
import { Settings } from "../screens/pos/settings";
import Cart from '../screens/pos/cart';
import { SettingsRouts } from './settings-router';

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
    const ThemeName = useSelector(state => state.auth.selected_Theme_name);
    const tabmainOption = {
        headerShown: false,
        unmountOnBlur: true,
        lazy: true,
        tabBarAllowFontScaling: false,
        tabBarStyle: {
            shadowColor: '#37A19680',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 50,
            backgroundColor: 'white',
        },
    }
    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={color.palette[ThemeName].background}
            />
            <Tab.Navigator
                screenOptions={tabmainOption}
                tabBar={props => <CustomTabBar   {...props} />}
                initialRouteName='pos'
            >
                <Tab.Screen
                    name="pos"
                    component={Pos}
                />
                <Tab.Screen
                    name="cart"
                    component={Cart}
                />
                <Tab.Screen
                    name="orders"
                    component={Orders}
                />
                <Tab.Screen
                    name="settings"
                    component={SettingsRouts}
                />

            </Tab.Navigator>
        </>

    )
}


export default TabNavigation

