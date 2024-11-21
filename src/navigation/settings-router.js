import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Routes } from './routes';
import Acceptance from '../component/settings/acceptance';
// import DownloadData from '../component/settings/download-data';
import Layout from '../component/settings/layout';
import SoundSetting from '../component/settings/sound';
import Themes from '../component/settings/themes';
import { Settings } from '../screens/pos/settings';

const Stack = createStackNavigator();
export const SettingsRouts = () => {
    return (
        <Stack.Navigator initialRouteName='Settings'>
            <Stack.Screen
                name={'Settings'}
                component={Settings}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'acceptance'}
                component={Acceptance}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name={'DownloadData'}
                component={DownloadData}
                options={{ headerShown: false }}
            /> */}
            <Stack.Screen
                name={'Layout'}
                component={Layout}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'SoundSetting'}
                component={SoundSetting}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'Themes'}
                component={Themes}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
};
