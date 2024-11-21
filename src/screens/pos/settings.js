import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setLanguage } from '../../redux/languageSlice'; // Import the setLanguage action

// Import the translations (assuming you have English and Tamil translations)
import { english } from '../../lamguages/english';
import { tamil } from '../../lamguages/tamil';

// Import SVG components
import AcceptanceSvg from "../../assets/svg/acceptance-of-useSvg";
import LayoutSvg from "../../assets/svg/layoutSvg";
import ThemesSvg from "../../assets/svg/themes-Svg";
import LogoutSvg from "../../assets/svg/log-outSvg";
import SoundSvg from "../../assets/svg/soundSvg";
import StoreDataSvg from "../../assets/svg/store-dataSvg";

// Import styles and colors
import { color, typography } from '../../theme';

// Import hooks and components
import useSound from '../../hooks/use-sound';
import useDownloadData from '../../hooks/use-download-data';

export const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { tapSound } = useSound();
  const clerkData = useSelector(state => state.auth.clerk_data);
  const {selectedLanguage, translations} = useSelector(state => state.language); // Get selected language from Redux
  
 

  const [selectedMenu, setSelectedMenu] = useState(0);
  const { getallDataApi, downloadLoad } = useDownloadData();

  const topMenu = [
    { icon: <LayoutSvg />, title: translations[selectedLanguage]?.layout, navigationName: "" },
    { icon: <ThemesSvg />, title: translations[selectedLanguage]?.themes, navigationName: "Themes" },
    { icon: <SoundSvg />, title: translations[selectedLanguage]?.sound, navigationName: "" },
    { icon: <StoreDataSvg />, title: translations[selectedLanguage]?.storedata, navigationName: "DownloadData" },
  ];

  const bottomMenu = [
    { icon: <AcceptanceSvg />, title: translations[selectedLanguage]?.acceptanceofUse, navigationName: "" },
    { icon: <LogoutSvg />, title: translations[selectedLanguage]?.logout, navigationName: "" },
  ];
  console.log(translations[selectedLanguage]);
  

  const topMenuAction = (val, index) => {
    setSelectedMenu(index);
    if (index === 3) {
      getallDataApi();
      return;
    }
    if (val.navigationName) {
      navigation.navigate(val.navigationName);
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: color.palette.white }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5, justifyContent: 'center' }}>
          <Text style={styles.orderText}>{translations[selectedLanguage]?.settings}</Text>
        </View>

        <View style={{ flex: 5 }}>
          <View style={{ flex: 1 }}>
            {topMenu.map((value, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => topMenuAction(value, index)}
                  style={[
                    styles.menuContainer,
                    selectedMenu === index && { backgroundColor: '#44B9B1', borderRadius: 5 },
                  ]}
                >
                  <View style={styles.iconArea}>
                    {React.cloneElement(value.icon, {
                      color: selectedMenu === index ? '#fff' : null,
                    })}
                  </View>
                  <View style={styles.textArea}>
                    <Text
                      style={[
                        styles.menuText,
                        selectedMenu === index && { color: color.palette.white },
                      ]}
                    >
                      {value.title}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderRadius: 0,
                    borderBottomWidth: 0.5,
                    borderColor: '#A6A6A6',
                  }}
                />
              </React.Fragment>
            ))}
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ height: '75%', justifyContent: 'flex-end', width: '100%' }}>
              {bottomMenu.map((value, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setSelectedMenu(value.title)}
                    style={[
                      styles.menuContainer,
                      selectedMenu === value.title && { backgroundColor: '#44B9B1', borderRadius: 5 },
                    ]}
                  >
                    <View style={styles.iconArea}>
                      {React.cloneElement(value.icon, {
                        color: selectedMenu === value.title ? '#fff' : null,
                      })}
                    </View>
                    <View style={styles.textArea}>
                      <Text
                        style={[
                          styles.menuText,
                          selectedMenu === value.title && { color: color.palette.white },
                        ]}
                      >
                        {value.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderRadius: 0,
                      borderBottomWidth: 0.5,
                      borderColor: '#A6A6A6',
                    }}
                  />
                </React.Fragment>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderText: {
    fontFamily: typography.semibold,
    fontSize: 20,
    color: color.palette.black,
  },
  menuText: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: '#939393',
  },
  menuContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    marginBottom: 5,
  },
  iconArea: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    width: '85%',
    justifyContent: 'center',
  },
});

