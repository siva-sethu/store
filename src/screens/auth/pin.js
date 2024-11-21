import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  clerkDataFunc,
  marchantTokenFunc,
  marchantVerifiedFunc,
  offlineDataBoolFunc,
  updateMerchantData,
  updateTab,
} from '../../redux/slice/auth';
import { clerkLogin } from '../../api';
import { color } from '../../theme/color';
import { typography } from '../../theme/typography';
import { Button } from '../../ui-kit';
import Toast from 'react-native-simple-toast';
import { moderateScale } from '../../utils/responsive';
import { English } from '../../utils/en';
import ClearBackSpace from '../../ui-kit/backspace';
import useSound from '../../hooks/use-sound';

const { width } = Dimensions.get('window');

export const ClerkPin = () => {
  const { tapSound, swooshSound, errorSound, successSound } = useSound();

  const dispatch = useDispatch();
  const shakingDot = useRef(new Animated.Value(0)).current;
  const [pin, setPin] = useState([]);
  const [loading, setLoading] = useState(false);
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '<'];
  const display = [1, 2, 3, 4];
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);
  function updatePin(e) {
    if (e === '<' || e === 'C') {
      if (e === 'C') {
        // swooshSound();
        setPin([]);
      } else {
        // swooshSound();
        setPin(prev => prev.slice(0, -1));
      }
      return;
    }
    if (pin.length <= 3) {
      tapSound();
      setPin(prev => [...prev, e]);
    }
  }

  const getMerchantID = async () => {
    const merchantID = await AsyncStorage.getItem('merchantID');
    const storeID = await AsyncStorage.getItem('storeID');
    const MasterToken = await AsyncStorage.getItem('mastertToken');

    return { merchantID, storeID, MasterToken };
  };

  async function handleLogin() {
    if (pin?.length === 4) {
      const ids = await getMerchantID();

      if (!ids.MasterToken) {
        errorSound();
        return Toast.show(English.clerk_screen.tocken_lost_tost, Toast.SHORT);
      }

      setLoading(true);
      const payload = {
        password: pin.join(''),
      };

      const header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + ids.MasterToken,
      };
      await clerkLogin(payload, header)
        .then(async res => {
          if (res?.success) {
            successSound();
            await AsyncStorage.setItem('merchantToken', res?.token);
            dispatch(marchantTokenFunc(res?.token));
            dispatch(clerkDataFunc(res?.data));
            dispatch(
              updateMerchantData({
                merchant_id: res?.data?.merchant_id?._id,
                merchant_name: res?.data?.merchant_id?.merchant_name,
                business_logo:
                  res?.data?.merchant_id?.bussiness_logo?.full_logo,
              }),
            );
            AsyncStorage.setItem('merchantVerified', JSON.stringify(true))
              .then(res => {
                dispatch(updateTab(0));
                dispatch(marchantVerifiedFunc(true));
                setPin([]);
                setLoading(false);
              })
              .catch(err => {
                setPin([]);
                setLoading(false);
              });
          }
        })
        .catch(err => {
          errorSound();
          setPin([]);
          setLoading(false);
          if (err?.response?.status == 500) {
            Toast.show(`${err?.response?.data?.message}`, Toast.SHORT);
          } else if (
            err?.response?.status == 400 ||
            err?.response?.status == 404
          ) {
            Toast.show(
              `${err?.response?.data?.message?.password ||
              err?.response?.data?.message
              }`,
              Toast.SHORT,
            );
          } else {
            Toast.show(`${err?.message}`, Toast.SHORT);
          }
        });
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

      setPin([]);
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
          <View style={{ height: '15%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.IntroText}>{English.clerk_screen.heading}</Text>
          </View>
          <View style={{ height: '65%', width: '100%' }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100%'
              }}>
              <Animated.View
                style={[
                  styles.dotDisplay,
                  {
                    transform: [{ translateX: shakingDot }],
                    marginBottom: moderateScale(20),
                  },
                ]}>
                {display.map((_, i) => (
                  <View key={i} style={styles.dotDisplayContainer}>
                    {pin.map((_, j) => (
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
                              {pin[i]}
                            </Text>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                ))}
              </Animated.View>
              <View style={styles.pinInputArea}>
                {buttons.map((e, i) => (
                  <TouchableOpacity
                    touchSoundDisabled={false}
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
            style={{ height: '20%', width: '100%', justifyContent: 'center' }}>
            <View>
              <View style={styles.buttonArea}>
                <Button
                  title={English.clerk_screen.button_text}
                  style={[
                    styles.btn,
                    { backgroundColor: color.palette[ThemeName].continue_button },
                  ]}
                  onPress={() => {
                    // tapSound();

                    handleLogin();
                  }}
                  loading={loading}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ width: '100%', height: '10%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.footerText}>
            {English.clerk_screen.bottom_text}{' '}
            <Text
              onPress={() => {
                tapSound();

                dispatch(offlineDataBoolFunc(false));
              }}
              style={styles.clickhereText}>
              {' '}
              {English.clerk_screen.bottom_link}
            </Text>
          </Text>
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
  titleCard: { flex: 0.5, alignItems: 'center', justifyContent: 'center' },
  pinAreaCard: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    gap: width / 40,
  },
  dotDisplay: { flexDirection: 'row', gap: width / 15, justifyContent: 'center', height: '20%', },
  dotDisplayContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.palette.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotactive: {},
  pinInputArea: {
    // marginTop: '6%',
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
    fontFamily: typography.regular,
    // marginTop: moderateScale(15),
  },
  clickhereText: {
    fontSize: 16,
    color: color.palette.neonGreen,
    fontFamily: typography.medium,
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
    marginHorizontal: 20,
    height: 50,
    marginBottom: 20,
    width: 163,
  },
  posTitle: {
    fontSize: 48,
    fontFamily: typography.semibold,
    color: color.palette.black
  },
});
