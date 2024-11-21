import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {English} from '../../utils/en';
import realm from '../../db/schema';
import {
  itemsTheme,
  marchantTokenFunc,
  merchantID,
  offlineDataBoolFunc,
  rhsLhsTheme,
  soundThemeFunc,
  storeNameFunc,
  updateThemes,
} from '../../redux/slice/auth';
import {funofflineData, getCategoryFunc} from '../../redux/slice/items';

export const OfflineLoad = ({setLoading}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const items = realm.objects('MenuItem');

    const loadToken = async () => {
      const themes = await AsyncStorage.getItem('themes');

      dispatch(updateThemes(themes ?? 'Bare'));

      const pictureVariant = await AsyncStorage.getItem('pictureVariant');
      dispatch(itemsTheme(pictureVariant ?? English.uiTable.uiItem1[0]));

      const panelVariant = await AsyncStorage.getItem('panelVariant');
      dispatch(rhsLhsTheme(panelVariant ?? English.uiTable.uiItem2[1]));

      const soundSetting = await AsyncStorage.getItem('soundSetting');

      dispatch(soundThemeFunc(soundSetting ?? English.uiTable.uiItem3[0]));

      const token = await AsyncStorage.getItem('merchantToken');

      dispatch(marchantTokenFunc(token));

      const merchant_id = await AsyncStorage.getItem('merchantID');
      dispatch(merchantID(merchant_id));

      const storeName = await AsyncStorage.getItem('storeName');
      dispatch(storeNameFunc(storeName ? storeName : null));
      if (items?.length) {
        const menuItems = realm.objects('MenuItem');
        dispatch(funofflineData(menuItems));

        const categoryItem = realm.objects('CategoryItem');

        dispatch(getCategoryFunc(categoryItem));

        dispatch(offlineDataBoolFunc(true));
        setLoading(false);
      } else {
        setLoading(false);
        dispatch(offlineDataBoolFunc(false));
      }
    };

    loadToken();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ActivityIndicator />
    </View>
  );
};
