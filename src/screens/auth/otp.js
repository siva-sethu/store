import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  clerkDataFunc,
  marchantTokenFunc,
  marchantVerifiedFunc,
  storeNameFunc,
  updateMerchantData,
  updateTab,
} from '../../redux/slice/auth';
import { verifyOtp } from '../../api';
import { color, typography } from '../../theme';
import { Button } from '../../ui-kit';
import { moderateScale } from '../../utils/responsive';
import Toast from 'react-native-simple-toast';

import UseDownloadHook from '../../hooks/use-download-data';
import { addOrderTableStatus } from '../../redux/slice/order-details';

import { English } from '../../utils/en';
import ClearBackSpace from '../../ui-kit/backspace';
import useSound from '../../hooks/use-sound';

const { width } = Dimensions.get('window');

export const Otp = ({ route }) => {
  const { data, verification_token } = route?.params ?? {};
  const { tapSound, swooshSound, errorSound, successSound } = useSound();
  const dispatch = useDispatch();
  const { removeOldData } = UseDownloadHook();
  const [errMsg, setErrMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const shakingDot = useRef(new Animated.Value(0)).current;
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '<'];
  const display = [1, 2, 3, 4, 5, 6];
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);

  useEffect(() => {
    if (errMsg) {
      setTimeout(() => {
        setErrMsg(false);
        setOtp([]);
      }, 2000);
    }
  }, [errMsg]);

  const handleLogin = async () => {
    tapSound();
    if (otp?.length === 6) {
      setLoading(true);

      try {
        // let confirmationResult = verification_token;

        // await confirmationResult.confirm(otp.join(''));
        const header = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${data}`,
        };
        const payload = {
          "otp": otp.join(''),
          "type": "mobile"
        }
        verifyOtp(payload, header)
          .then(async res => {
            if (res?.success) {
              successSound();
              const oldMerchant = await AsyncStorage.getItem('merchantID');
              if (oldMerchant && oldMerchant !== res?.merchant_id) {
                await AsyncStorage.removeItem('storeName');
                dispatch(storeNameFunc(null));
                dispatch(addOrderTableStatus(true));
                removeOldData();
              }
              await AsyncStorage.setItem('mastertToken', res?.token);
              await AsyncStorage.setItem('merchantToken', res?.token);
              await AsyncStorage.setItem('merchantID', res?.merchant_id);

              dispatch(marchantTokenFunc(res?.token));
              dispatch(clerkDataFunc(null));
              dispatch(
                updateMerchantData({
                  merchant_id: res?.merchant_id,
                  merchant_name: res?.merchant_name,
                  business_logo: res?.business_logo.full_logo,
                }),
              );
              AsyncStorage.setItem('merchantVerified', JSON.stringify(true))
                .then(res => {
                  dispatch(updateTab(2));
                  dispatch(marchantVerifiedFunc(true));
                  setLoading(false);
                })
                .catch(err => {
                  setLoading(false);
                });
            }
          })
          .catch(err => {
            errorSound();
            setLoading(false);
            if (err?.response?.status == 400 || err?.response?.status == 404) {
              Toast.show(
                `${err?.response?.data?.message?.otp ||
                err?.response?.data?.message?.type ||
                err?.response?.data?.message
                }`,
                Toast.SHORT,
              );
            } else {
              Toast.show(`${err?.message}`, Toast.SHORT);
            }
          });
      } catch (error) {
        setLoading(false);
        Toast.show(`${error.message}`, Toast.SHORT);
        return;
      }
    } else {
      errorSound();
      Animated.sequence([
        Animated.timing(shakingDot, {
          toValue: 15,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakingDot, {
          toValue: -15,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakingDot, {
          toValue: 15,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakingDot, {
          toValue: -15,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakingDot, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      setOtp([]);
    }
  };

  const updatePin = e => {
    if (e === '<' || e === 'C') {
      if (e === 'C') {
        setOtp([]);
      } else {
        setOtp(prev => prev.slice(0, -1));
      }
      return;
    }
    if (otp.length <= 6) {
      setOtp(prev => [...prev, e]);
    }
  };

  const handleResendOtp = () => {

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
          <View style={{ height: '15%', width: '100%', justifyContent: 'center' }}>
            <Text style={styles.IntroText}>{English.otp_screen.heading}</Text>
            <Text style={styles.footerText}>
              {English.otp_screen.bottom_text}
            </Text>
          </View>
          <View style={{ height: '65%', width: '100%' }}>
            <View
              style={{
                marginTop: moderateScale(19.5),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>

              <Animated.View
                style={[
                  styles.dotDisplay,
                  {
                    transform: [{ translateX: shakingDot }],
                    marginBottom: errMsg ? moderateScale(0) : moderateScale(20),
                  },
                ]}>
                {display.map((_, i) => (
                  <View key={i} style={styles.dotDisplayContainer}>
                    {otp.map((_, j) => (
                      <View key={j}>
                        {i == j && (
                          <View style={styles.dotactive}>
                            <Text
                              style={{
                                fontFamily: typography.bold,
                                fontSize: 20,
                                color: color.palette.btnColor,
                                top: 2,
                              }}>
                              {otp[i]}
                            </Text>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                ))}
              </Animated.View>
              <TouchableOpacity onPress={handleResendOtp} style={{ width: '100%', alignItems: 'flex-end', paddingRight: 20 }}>
                <Text style={styles.resendText}>{English.otp_screen.resend_text}</Text>
              </TouchableOpacity>
              {errMsg && (
                <Text
                  style={{
                    marginTop: 15,
                    textAlign: 'left',
                    width: '55%',
                    marginBottom: moderateScale(20),
                    fontSize: 18,
                    color: color.palette.red,
                  }}>
                  {English.otp_screen.error_message}
                </Text>
              )}
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
            style={{ height: '20%', width: '100%', justifyContent: 'flex-end', }}>
            <View style={styles.buttonArea}>
              <Button
                title={English.otp_screen.button_text}
                style={[
                  styles.btn,
                  { backgroundColor: color.palette[ThemeName].continue_button },
                ]}
                onPress={handleLogin}
                loading={loading}
              />

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
    padding: 4,
  },

  leftArea: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },

  btn: {
    // marginTop: moderateScale(35),
    marginHorizontal: 20,
    height: 50,
    marginBottom: 30,
    width: 163,
  },

  rightLayout: {
    flex: 0.6,
    justifyContent: 'center',
    marginRight: 30,
    backgroundColor: color.palette.white,
    marginVertical: 28,
  },
  innrCardRhtLayout: {
    flex: 1,
    borderRadius: moderateScale(5),
  },
  otpErrorStyle: {
    marginLeft: 20,
    textAlign: 'center',
    fontFamily: typography.regular,
    color: color.palette.red,
  },
  title: {
    fontFamily: typography.medium,
    fontSize: 16,
    color: color.palette.lightGrey,
    textAlign: 'center',
    marginVertical: 2,
  },

  dotDisplay: { flexDirection: 'row', gap: width / 40, justifyContent: 'center' },
  dotDisplayContainer: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.palette.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotactive: {},
  pinInputArea: {
    marginTop: '6%',
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

  buttonArea: {
    alignItems: 'center',
    padding: 4,
  },
  buttonContainer: {
    width: moderateScale(100),
    height: moderateScale(25),
    backgroundColor: color.palette.btnColor,
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFont: { color: 'white', fontSize: width / 55 },
  footerText: {
    fontSize: 16,
    color: color.palette.black,
    fontFamily: typography.medium,
    textAlign: 'center'
    // marginTop: moderateScale(15),
  },
  clickhereText: {
    fontSize: width / 60,
    color: color.palette.neonGreen,
    fontFamily: typography.medium,
  },
  posTitle: {
    fontSize: 48,
    fontFamily: typography.semibold,
    color: color.palette.black
  },
  resendText: {
    fontSize: 16,
    fontFamily: typography.medium,
    color: color.palette.black
  }
});
