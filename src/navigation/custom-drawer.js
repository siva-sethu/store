import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Routes} from './routes';
import {color, typography} from '../theme';
import {Divider, Vertical} from '../ui-kit';
import {scale, verticalScale} from '../utils/responsive';
import {useDispatch, useSelector} from 'react-redux';
import {
  marchantVerifiedFunc,
  storeNameFunc,
  updateTab,
} from '../redux/slice/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addOrderTableStatus} from '../redux/slice/order-details';
import {English} from '../utils/en';
import useSound from '../hooks/use-sound';
import {addCart} from '../redux/slice/cart';

const CustomDrawer = ({children}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {tapSound} = useSound();
  const selectedTab = useSelector(state => state.auth.selected_tab);
  const clerkData = useSelector(state => state.auth.clerk_data);
  const {merchant_data, store_details} = useSelector(state => state.auth);
  const [refetch, setRefetch] = useState(false);
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);
  const defaultLogo = English?.sidebar?.sidebar_defalt_logo;

  const getMerchantID = useCallback(async () => {
    const storeName = await AsyncStorage.getItem('storeName');
    return {storeName};
  }, []);

  useEffect(() => {
    if (!store_details) {
      setRefetch(true);
      setTimeout(() => {
        setRefetch(false);
      }, 2000);
    }
  }, [refetch, store_details]);

  useEffect(() => {
    const API = async () => {
      if (!refetch) {
        const data = await getMerchantID();
        dispatch(addOrderTableStatus(true));

        dispatch(storeNameFunc(JSON.parse(data.storeName)));
      }
    };

    API();
  }, [getMerchantID, refetch]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View
          style={[
            styles.drawer,
            {backgroundColor: color.palette[ThemeName].menu_background},
          ]}>
          <Image
            source={
              clerkData
                ? clerkData?.merchant_id?.bussiness_logo?.full_logo
                  ? {uri: clerkData?.merchant_id?.bussiness_logo?.full_logo}
                  : {uri: defaultLogo}
                : merchant_data?.business_logo
                ? {uri: merchant_data?.business_logo}
                : {uri: defaultLogo}
            }
            style={{
              width: 130,
              height: 58,
              marginHorizontal: 9,
              marginVertical: 7,
              borderRadius: 5,
            }}
          />
          <Divider />
          <Vertical size={30} />
          <View style={{flex: 0.6}}>
            <TouchableOpacity
              style={[
                selectedTab === 0
                  ? [
                      styles.drawerItem,
                      {backgroundColor: color.palette[ThemeName].menu_button},
                    ]
                  : styles.drawerItem,

                route.name === Routes.HOME && styles.activeDrawerItem,
              ]}
              onPress={() => {
                tapSound();
                dispatch(updateTab(0));
              }}>
              <Image
                source={require('../assets/image/home.png')}
                style={
                  selectedTab === 0
                    ? [
                        styles.icon,
                        {tintColor: color.palette[ThemeName].menu_background},
                      ]
                    : [
                        styles.icon,
                        {tintColor: color.palette[ThemeName].menu_button},
                      ]
                }
              />
              <Text
                style={
                  selectedTab === 0
                    ? [
                        styles.drawerItemText,
                        {color: color.palette[ThemeName].menu_background},
                      ]
                    : [
                        styles.drawerItemText,
                        {color: color.palette[ThemeName].menu_button},
                      ]
                }>
                {English.sidebar.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedTab === 1
                  ? [
                      styles.drawerItem,
                      {backgroundColor: color.palette[ThemeName].menu_button},
                    ]
                  : styles.drawerItem,
                route.name === Routes.ORDERS && styles.activeDrawerItem,
              ]}
              onPress={() => {
                tapSound();
                dispatch(updateTab(1));
              }}>
              <Image
                source={require('../assets/image/order.png')}
                style={
                  selectedTab === 1
                    ? [
                        styles.icon,
                        {tintColor: color.palette[ThemeName].menu_background},
                      ]
                    : [
                        styles.icon,
                        {tintColor: color.palette[ThemeName].menu_button},
                      ]
                }
              />
              <Text
                style={
                  selectedTab === 1
                    ? [
                        styles.drawerItemText,
                        {color: color.palette[ThemeName].menu_background},
                      ]
                    : [
                        styles.drawerItemText,
                        {color: color.palette[ThemeName].menu_button},
                      ]
                }>
                {English.sidebar.text2}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={[
                selectedTab === 2
                  ? [
                      styles.drawerItem,
                      {
                        backgroundColor: color.palette[ThemeName].menu_button,
                        alignItems: 'flex-end',
                      },
                    ]
                  : [styles.drawerItem, {alignItems: 'flex-end'}],
                route.name === Routes.SETTING && styles.activeDrawerItem,
              ]}
              onPress={() => {
                tapSound();
                dispatch(updateTab(2));
              }}>
              <Image
                source={require('../assets/image/settings.png')}
                style={
                  selectedTab === 2
                    ? [
                        styles.icon,
                        {tintColor: color.palette[ThemeName].menu_background},
                      ]
                    : [
                        styles.icon,
                        {tintColor: color.palette[ThemeName].menu_button},
                      ]
                }
              />
              <Text
                style={
                  selectedTab === 2
                    ? [
                        styles.drawerItemText,
                        {
                          color: color.palette[ThemeName].menu_background,
                          alignItems: 'center',
                        },
                      ]
                    : [
                        styles.drawerItemText,
                        {
                          color: color.palette[ThemeName].menu_button,
                          alignItems: 'center',
                        },
                      ]
                }>
                {English.sidebar.text3}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.drawerItem]}
              onPress={() => {
                tapSound();
                dispatch(addCart([]));
                dispatch(marchantVerifiedFunc(false));
              }}>
              <Image
                source={require('../assets/image/logout.png')}
                style={[
                  styles.icon,
                  {tintColor: color.palette[ThemeName].menu_button},
                ]}
              />
              <Text
                style={[
                  styles.drawerItemText,
                  {color: color.palette[ThemeName].menu_button},
                ]}>
                {English.sidebar.text4}
              </Text>
            </TouchableOpacity>
            <Divider />
            <Vertical size={15} />

            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: typography.regular,
                  textAlign: 'center',
                  color: color.palette[ThemeName].menu_button,
                }}>
                {clerkData
                  ? clerkData?.clerk_name?.slice(0, 16)
                  : `${merchant_data?.merchant_name?.slice(0, 16)}`}
              </Text>
            </View>

            <Vertical size={15} />
          </View>
        </View>
        <View
          style={[
            styles.contentContainer,
            {backgroundColor: color.palette[ThemeName].background},
          ]}>
          {children}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  drawer: {
    flex: 0.13,
    backgroundColor: color.palette.neonGreen,
  },
  drawerItem: {
    marginVertical: 5,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 17,
    width: '90%',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  activeDrawerItem: {
    backgroundColor: '#cfcfcf',
  },
  drawerItemText: {
    color: color.palette.black,
    fontSize: 14,
    fontFamily: typography.regular,
    top: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 13,
  },
  icon: {
    height: verticalScale(19),
    width: scale(6),
    marginRight: 18.5,
  },
});
