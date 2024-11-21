import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import { color, typography } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { itemsTheme, picturTheme, rhsLhsTheme } from '../../redux/slice/auth';
import { English } from '../../utils/en';
import { verticalScale } from '../../utils/responsive';
import useSound from '../../hooks/use-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { anyPass } from 'ramda';
import BackSvg from '../../assets/svg/back-svg'
const Layout = ({ navigation }) => {
  const { tapSound } = useSound();
  const dispatch = useDispatch();
  const uiTheme = useSelector(state => state.auth);
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);

  const uiData = [
    {
      itemName: [...English?.uiTable?.uiItem1],
      ui: [
        <View style={styles.largerItems}>
          <Image
            source={require('../../assets/image/largepictures.png')}
            resizeMode="stretch"
            style={styles.image}
          />
        </View>,
        <View style={styles.largerItems}>
          <Image
            source={require('../../assets/image/smallpictures.png')}
            resizeMode="stretch"
            style={styles.image}
          />
        </View>,
        <View style={styles.largerItems}>
          <Image
            source={require('../../assets/image/nopictures.png')}
            resizeMode="stretch"
            style={styles.image}
          />
        </View>,
      ],
    },

  ];
  const handlePress = () => {
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.splitPannel,
        ]}>
        <View style={{ flex: 0.2, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <TouchableOpacity onPress={handlePress}>
              <BackSvg />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: typography.regular,
                fontSize: 20,
                color: color.palette.black,
              }}>
              {English.settings_screen.heading[1]}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.itemAlign}>
            {uiData[0].itemName?.map((value, innerIndex) => (
              <TouchableOpacity
                key={innerIndex}
                style={{ gap: 5 }}
                onPress={async () => {
                  tapSound();

                  await AsyncStorage.setItem('pictureVariant', value);
                  dispatch(itemsTheme(value));
                }}>
                <View style={styles.radobuttonalign}>
                  <View style={[styles.radioButtonCountainer, uiTheme?.items_theme == value && { backgroundColor: '#44B9B1' }]}>
                    {uiTheme?.items_theme == value && (
                      <View style={styles.checkArea} />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.themeText,
                      { color: color.palette[ThemeName].body_text },
                    ]}>
                    {value}
                  </Text>
                </View>
                <View>{uiData[0].ui[innerIndex]}</View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 3,
  },
  radobuttonalign: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  radioButtonCountainer: {
    width: 15,
    height: 15,
    backgroundColor: color.palette.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.palette.activeGrey,
  },
  checkArea: {
    width: 8,
    height: 8,
    backgroundColor: color.palette.white,
    borderRadius: 20,
  },
  largerItems: {
    width: verticalScale(105),
    height: verticalScale(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '95%',
    height: '95%',
  },
  itemAlign: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  themeText: {
    fontSize: 13,
    fontFamily: typography.regular,
  },
  splitPannel: {
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
