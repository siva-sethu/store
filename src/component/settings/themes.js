import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateThemes } from '../../redux/slice/auth';
import { color, typography } from '../../theme';
import useSound from '../../hooks/use-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackSvg from '../../assets/svg/back-svg';
import { English } from '../../utils/en';
const Themes = ({ navigation }) => {
  const dispatch = useDispatch();
  const { tapSound } = useSound();
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);
  const data = [
    {
      colorName: color.palette.Bare.theme_name,
      colorCodes: [
        color.palette.Bare.menu_background,
        color.palette.Bare.menu_button,
        color.palette.Bare.background,
        color.palette.Bare.layout,
        color.palette.Bare.continue_button,
        color.palette.Bare.cancel_button,
        color.palette.Bare.other_button,
      ],
    },
    {
      colorName: color.palette.Skyline.theme_name,
      colorCodes: [
        color.palette.Skyline.menu_background,
        color.palette.Skyline.menu_button,
        color.palette.Skyline.background,
        color.palette.Skyline.layout,
        color.palette.Skyline.continue_button,
        color.palette.Skyline.cancel_button,
        color.palette.Skyline.other_button,
      ],
    },
    {
      colorName: color.palette.Volcano.theme_name,
      colorCodes: [
        color.palette.Volcano.menu_background,
        color.palette.Volcano.menu_button,
        color.palette.Volcano.background,
        color.palette.Volcano.layout,
        color.palette.Volcano.continue_button,
        color.palette.Volcano.cancel_button,
        color.palette.Volcano.other_button,
      ],
    },
    {
      colorName: color.palette.Earth.theme_name,
      colorCodes: [
        color.palette.Earth.menu_background,
        color.palette.Earth.menu_button,
        color.palette.Earth.background,
        color.palette.Earth.layout,
        color.palette.Earth.continue_button,
        color.palette.Earth.cancel_button,
        color.palette.Earth.other_button,
      ],
    },
    {
      colorName: color.palette.Corona.theme_name,
      colorCodes: [
        color.palette.Corona.menu_background,
        color.palette.Corona.menu_button,
        color.palette.Corona.background,
        color.palette.Corona.layout,
        color.palette.Corona.continue_button,
        color.palette.Corona.cancel_button,
        color.palette.Corona.other_button,
      ],
    },
  ];

  const selectedColor = async val => {
    await AsyncStorage.setItem('themes', val);
    dispatch(updateThemes(val));
  };
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
            {English.settings_screen.heading[0]}
          </Text>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        {data.map((value, index) => (
          <TouchableOpacity key={index} style={[styles.listcountainer, { padding: 10 }, ThemeName == value?.colorName && { backgroundColor: '#44B9B1', borderRadius: 10 }]}
            onPress={() => {
              tapSound();
              selectedColor(value?.colorName);
            }}
          >
            <Text
              style={styles.radobuttonalign}>
              {/* <View style={styles.radioButtonCountainer}>
                {ThemeName == value?.colorName && (
                  <View style={styles.checkArea} />
                )}
              </View> */}

              <Text
                style={[
                  styles.themeText,
                  { color: ThemeName == value?.colorName ? color.palette.white : color.palette[ThemeName].body_text },
                ]}>
                {value?.colorName}
              </Text>
            </Text>
            <View style={styles.colorPaletteCountainer}>
              {value?.colorCodes.map((colorcodes, idx) => (
                <View
                  key={idx}
                  style={[styles.colorPalette, { backgroundColor: colorcodes }]}
                />
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
};

export default Themes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listcountainer: {
    // flexDirection: 'row',
    marginHorizontal: 10,
    gap: 15
  },
  radobuttonalign: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: 'auto',
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
  colorPalette: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 100
  },
  colorPaletteCountainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  themeText: {
    fontSize: 15,
    fontFamily: typography.regular,
  },
});
