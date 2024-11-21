import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from '../../navigation/routes';
import { offlineDataBoolFunc } from '../../redux/slice/auth';
import { merchantLoginApi } from '../../api';
import { color, typography } from '../../theme';
import { Button } from '../../ui-kit';
import { moderateScale } from '../../utils/responsive';
import Toast from 'react-native-simple-toast';
import { English } from '../../utils/en';

import ClearBackSpace from '../../ui-kit/backspace';
import useSound from '../../hooks/use-sound';
const { width, height } = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import { Dropdown } from 'react-native-element-dropdown';

export const Login = () => {
  const { tapSound, swooshSound, errorSound, successSound } = useSound();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [merchantLogin, setMerchantLogin] = useState(
    __DEV__ ? [...English.test_data.login_id] : [],
  );
  const [loading, setLoading] = useState(false);
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '<'];
  const display = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const shakingDot = useRef(new Animated.Value(0)).current;
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);

  const [value, setValue] = useState('+91');

  const countryCode = [
    { label: 'Ind', value: '+91' },
    { label: 'US', value: '+1' },
  ];

  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    if (merchantLogin?.length < 10) {
      setLoading(false);
    } else {
      const payload = {
        merchant_phone: merchantLogin.join(''),
      };

      try {
        const res = await merchantLoginApi(payload);
        if (res) {
          if (res?.success) {

            try {
              // const number = `${value}${merchantLogin.join('')}`;
              // const confirmation = await auth().signInWithPhoneNumber(number);
              // // dispatch(setVerificationToken(confirmation));
              // successSound();
              // setLoading(false);
              // navigation.navigate(Routes.OTP, {
              //   data: res?.token,
              //   verification_token: confirmation,
              // });
              successSound();
              setLoading(false);
              navigation.navigate(Routes.OTP, { data: res?.token });
            } catch (error) {
              setLoading(false);
              console.log('error', error);
            }
          }
        }
      } catch (error) {
        console.log(error.response.data);

        errorSound();
        setLoading(false);
        if (error?.response?.status == 404) {
          Toast.show(`${error?.response?.data?.message}`, Toast.SHORT);
        } else if (error?.response?.status == 400) {
          Toast.show(
            `${error?.response?.data?.message?.merchant_phone}`,
            Toast.SHORT,
          );
        } else {
          Toast.show(`${error?.message}`, Toast.SHORT);
        }
      }
    }
  };

  function updatePin(e) {
    if (e === '<' || e === 'C') {
      if (e === 'C') {
        setMerchantLogin([]);
      } else {
        setMerchantLogin(prev => prev.slice(0, -1));
      }
      return;
    }
    if (merchantLogin.length <= 10) {
      setMerchantLogin(prev => [...prev, e]);
    }
  }

  return (
    <View
      style={[
        styles.main,
        { backgroundColor: color.palette[ThemeName].background },
      ]}>
      <View style={styles.leftArea}>
        <Image
          source={require('../../assets/image/merchantLogo.png')}
          style={{
            width: moderateScale(100),
            height: moderateScale(100),
          }}
        />
        <Text style={styles.posTitle}>POS</Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '95%',
            height: '90%',
            backgroundColor: color.palette[ThemeName].layout,
            alignItems: 'center',
            borderRadius: moderateScale(5),
          }}>
          <View style={{ height: '15%', width: '100%', justifyContent: 'center', }}>
            <Text style={styles.IntroText}>
              {English.merchant_screen.heading}
            </Text>
          </View>

          <View style={{ height: '70%', width: '100%', justifyContent: 'center', }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
              }}>
              <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', height: '20%', }}>
                <TextInput
                  style={[
                    styles.input,
                    { color: color.palette[ThemeName].body_text },
                  ]}
                  value={merchantLogin.join('')}
                  placeholder={English.merchant_screen.inputPlaceholder}
                  editable={false}
                  keyboardType='numeric'
                  placeholderTextColor={color.palette[ThemeName].body_text}
                />
              </View>
              <View style={styles.pinInputArea}>
                {buttons.map((e, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.pinContainer}
                    onPress={() => {
                      tapSound();
                      updatePin(e);
                    }}
                    activeOpacity={0.9}>
                    <>
                      {i === buttons.length - 1 ? (
                        <View style={{ marginTop: 15 }}>
                          <ClearBackSpace
                            width={moderateScale(30)}
                            height={moderateScale(30)}
                            color={color.palette[ThemeName].other_button}
                          />
                        </View>
                      ) : (
                        <Text
                          style={[
                            styles.pinText,
                            { color: color.palette[ThemeName].other_button },
                          ]}>
                          {' '}
                          {e}
                        </Text>
                      )}
                    </>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <View
            style={{ height: '15%', width: '100%', justifyContent: 'center', }}>
            <View style={styles.buttonArea}>
              <Button
                title={English.merchant_screen.button_text}
                style={[
                  styles.btn,
                  { backgroundColor: color.palette[ThemeName].continue_button },
                ]}
                loading={loading}
                onPress={() => {
                  tapSound();
                  handleLogin();
                }}
              />
              {/* <Text style={styles.footerText}>
                {English.merchant_screen.bottom_text}{' '}
                <Text
                  onPress={() => {
                    tapSound();
                    dispatch(offlineDataBoolFunc(true));
                  }}
                  style={styles.clickhereText}>
                  {' '}
                  {English.merchant_screen.bottom_link}
                </Text>
              </Text> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.palette.backgroundGrey,
  },
  IntroText: {
    fontSize: 24,
    color: color.palette.black,
    fontFamily: typography.semibold,
    textAlign: 'center',
  },

  buttonArea: {
    alignItems: 'center',
  },

  leftArea: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  rightArea: {
    height: '95%',
    width: '50%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  btn: {
    // marginTop: moderateScale(35),
    height: 50,
    width: 163,
  },
  inputStyle: {
    height: 56,
    borderRadius: 5,
    marginTop: 60,
    borderColor: color.palette.borderColor,
    width: moderateScale(180),
    alignSelf: 'center',
  },
  rightLayout: {
    flex: 0.6,
    justifyContent: 'center',
    marginRight: 30,
    backgroundColor: color.palette.white,
  },
  innrCardRhtLayout: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: moderateScale(5),
  },
  footerText: {
    fontSize: width / 60,
    color: color.palette.black,
    fontFamily: typography.regular,
    // marginTop: moderateScale(15),
  },
  clickhereText: {
    fontSize: width / 60,
    color: color.palette.neonGreen,
    fontFamily: typography.medium,
  },

  pinAreaCard: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    gap: width / 40,
  },
  dotDisplay: { flexDirection: 'row', gap: 15, justifyContent: 'center' },
  dotDisplayContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.palette.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotactive: {},
  pinInputArea: {
    marginTop: 10,
    height: '80%',
    width: '60%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 25,
  },
  pinContainer: {
    width: '20%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',

  },
  pinText: {
    color: color.palette.btnColor,
    fontSize: 30,
    fontFamily: typography.semibold,
  },
  dropdown: {
    height: 30,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  posTitle: {
    fontSize: 48,
    fontFamily: typography.semibold,
    color: color.palette.black
  },
  input: {
    width: '100%',
    borderColor: color.palette.gray_border,
    borderWidth: 0.5,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: typography.medium,
    height: 45,
    paddingBottom: 5

  },
});
