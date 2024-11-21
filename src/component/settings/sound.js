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
import {
  itemsTheme,
  picturTheme,
  rhsLhsTheme,
  soundThemeFunc,
} from '../../redux/slice/auth';
import { English } from '../../utils/en';
import { verticalScale } from '../../utils/responsive';
import useSound from '../../hooks/use-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { anyPass } from 'ramda';
import BackSvg from '../../assets/svg/back-svg';

const SoundSetting = ({ navigation }) => {
  const { tapSound } = useSound();
  const dispatch = useDispatch();
  const soundSettingInd = useSelector(state => state.auth);
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);

  const uiData = [
    {
      itemName: [...English?.uiTable?.uiItem3],
      ui: [
        <View style={styles.lhsRhs}>
          <Image
            source={require('../../assets/image/soundon.png')}
            resizeMode="stretch"
            style={styles.image}
          />
        </View>,
        <View style={styles.lhsRhs}>
          <Image
            source={require('../../assets/image/soundoff.png')}
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
      <View style={{ flex: 0.2, justifyContent: 'center', paddingHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity onPress={handlePress}>
            <BackSvg />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: typography.regular,
              fontSize: 20,
              color: color.palette.black,
            }}>
            {English.settings_screen.heading[2]}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.splitPannel,
          // { backgroundColor: color.palette[ThemeName].layout },
        ]}>
        <View style={styles.subContainer}>
          <View style={styles.itemAlign}>
            {uiData[0].itemName?.map((value, innerIndex) => (
              <TouchableOpacity
                key={innerIndex}
                onPress={async () => {
                  tapSound();
                  await AsyncStorage.setItem('soundSetting', value);
                  dispatch(soundThemeFunc(value));
                }}>
                <View style={styles.radobuttonalign}>
                  <View style={styles.radioButtonCountainer}>
                    {soundSettingInd?.soundSetting == value && (
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

export default SoundSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  subContainer: {
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  radobuttonalign: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioButtonCountainer: {
    width: 25,
    height: 25,
    backgroundColor: color.palette.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.palette.activeGrey,
  },
  checkArea: {
    width: 20,
    height: 20,
    backgroundColor: color.palette.activeGrey,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color.palette.activeGrey,
  },

  lhsRhs: {
    width: verticalScale(130),
    height: verticalScale(80),
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemAlign: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
  },
  themeText: {
    fontSize: 15,
    fontFamily: typography.regular,
  },
  splitPannel: {
    flex: 3,
    borderRadius: 10,
  },
});
