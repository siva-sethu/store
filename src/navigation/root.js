import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, StyleSheet} from 'react-native';
import {Routes} from './routes';
import {OutsideStack} from './outside-stack';
import InsideStack from './inside-stack';
import {color} from '../theme';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

export const RootNavigator = React.forwardRef((props, ref) => {
  // export const RootNavigator = (props, ref) => {
  const authVerification = useSelector(state => state.auth);
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);

  console.log('ThemeName', ThemeName);
  return (
    // <NavigationContainer {...props} ref={ref}>
    <NavigationContainer {...props} ref={ref}>
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={color?.palette[ThemeName]?.menu_background}
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          
          <Stack.Screen name={Routes.INSIDE_STACK} component={InsideStack} />
        </Stack.Navigator>
      </>
    </NavigationContainer>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  drawer: {
    width: 300,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    backgroundColor: '#fff',
    zIndex: 100,
  },
  main: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
