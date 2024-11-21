import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { palette } from '../../theme/palette';
import Toast from 'react-native-simple-toast';
import { color, typography } from '../../theme';
import { Button, Button1 } from '../../ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { addBalanceAmount, addPaymentStatus } from '../../redux/slice/status';

import { English } from '../../utils/en';
import { useFocusEffect } from '@react-navigation/native';
import useSound from '../../hooks/use-sound';

const PaymentModal = ({
  isVisible,
  onClose,
  onSubmit,
  cartItem,
  tapSound,
  selectedInd,
  setSelectedInd,
}) => {
  const { errorSound, successSound } = useSound();
  const dispatch = useDispatch();
  const totalPay = useSelector(state => state.cart.total_amount_cal);

  const [selectedAmount, setSelectedAmount] = useState([]);
  const [amountEnter, setAmountEnter] = useState('');
  const [customerGivenAmount, setCustomerGivenAmount] = useState(0);
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);
  const totalPrice = cartItem.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.price);
  }, 0);

  //   useEffect(() => {
  //     setSelectedInd(0);
  //   }, [Math.random()]);

  const calculateBalance = () => {
    const amountToSubtract = customerGivenAmount
      ? parseFloat(customerGivenAmount)
      : parseFloat(amountEnter);

    const balance = amountToSubtract - parseFloat(totalPay);
    if (isNaN(balance)) {
      return totalPay;
    }
    return Math.abs(balance).toFixed(2);
  };

  const changeText = () => {
    const amountToSubtract = customerGivenAmount
      ? parseFloat(customerGivenAmount)
      : parseFloat(amountEnter);
    const balance = amountToSubtract - parseFloat(totalPay);

    if (isNaN(balance) || balance < 0) {
      return English.modals.paymentModal.total_count.text3;
    } else {
      return English.modals.paymentModal.total_count.text4;
    }
  };

  const handleSubmit = () => {
    const calculate = selectedAmount.reduce((accumulator, item) => {
      return accumulator + parseFloat(item);
    }, 0);

    const amountToSubtract =
      selectedAmount.length > 0
        ? parseFloat(calculate)
        : parseFloat(amountEnter);
    if (
      (selectedInd === 1 && amountToSubtract < totalPrice) ||
      isNaN(amountToSubtract)
    ) {
      errorSound();
      return Toast.show(
        English.modals.paymentModal.amount_error_tost,
        Toast.SHORT,
      );
    }

    dispatch(addPaymentStatus(selectedInd === 0 ? 'CARD' : 'CASH'));
    dispatch(addBalanceAmount(calculateBalance()));
    onSubmit();
    clearAmount();
  };

  const clearAmount = () => {
    tapSound();
    setSelectedAmount([]);
    setCustomerGivenAmount(null);
    setAmountEnter('');
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContainer,
                {
                  backgroundColor: color.palette[ThemeName].layout,
                  //   paddingBottom: 10,
                },
              ]}>
              <View
                style={[
                  styles.modalHeader,
                  {
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingTop: 5,
                    backgroundColor: color.palette[ThemeName].menu_background,
                    // paddingBottom: 10,
                  },
                ]}>
                <Pressable
                  onPress={() => {
                    tapSound();
                    setSelectedInd(1);
                  }}
                  style={{
                    width: '48%',
                    height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 25,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    // shadowColor: '#000000',
                    // shadowOffset: {
                    //   width: 4,
                    //   height: 18,
                    // },
                    // shadowOpacity: 3,
                    // shadowRadius: 30,
                    // elevation: 10,
                    backgroundColor:
                      selectedInd === 1
                        ? color.palette[ThemeName].menu_button
                        : color.palette[ThemeName].background,
                  }}>
                  {/* <Image
                    source={require('../assets/image/cash.png')}
                    style={{
                      height: 55,
                      width: 55,
                    }}
                  /> */}
                  <Text
                    style={{
                      fontSize: 24,
                      fontFamily: typography.semibold,
                      color:
                        selectedInd === 1
                          ? color.palette[ThemeName].menu_background
                          : color.palette[ThemeName].menu_button,
                    }}>
                    {English.modals.paymentModal.heading2}
                  </Text>
                  {selectedInd === 1 && (
                    <Image
                      source={require('../../assets/image/tick.png')}
                      style={{ height: 35, width: 35 }}
                    />
                  )}
                </Pressable>
                <Pressable
                  onPress={() => {
                    tapSound();
                    setSelectedInd(0);
                  }}
                  style={{
                    width: '48%',
                    height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 25,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    // shadowColor: '#000000',
                    // shadowOffset: {
                    //   width: 4,
                    //   height: 18,
                    // },
                    // shadowOpacity: 3,
                    // shadowRadius: 30,
                    // elevation: 10,
                    backgroundColor:
                      selectedInd === 0
                        ? color.palette[ThemeName].menu_button
                        : // : color.palette[ThemeName].menu_background,
                        color.palette[ThemeName].background,
                  }}>
                  {/* <Image
                    source={require('../assets/image/card.png')}
                    style={{ height: 55, width: 55 }}
                  /> */}
                  <Text
                    style={{
                      fontSize: 24,
                      fontFamily: typography.semibold,
                      color:
                        selectedInd === 0
                          ? color.palette[ThemeName].menu_background
                          : color.palette[ThemeName].menu_button,
                    }}>
                    {English.modals.paymentModal.heading}
                  </Text>
                  {selectedInd === 0 && (
                    <Image
                      source={require('../../assets/image/tick.png')}
                      style={{ height: 35, width: 35 }}
                    />
                  )}
                </Pressable>
              </View>
              {/* <View
                style={{
                  backgroundColor: '#d3d3d3',
                  width: '100%',
                  height: 2,
                }}></View> */}
              <View style={styles.body}>
                {selectedInd === 0 && (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 28,
                    }}>
                    <View style={{ height: 158 }}></View>
                  </View>
                )}
                {selectedInd === 1 && (
                  <View style={styles.cashbox}>
                    {English.modals.paymentModal.amount.map((item, index) => {
                      const selected = selectedAmount.includes(item);
                      return (
                        <Pressable
                          key={index}
                          style={{
                            width: '30%',
                            paddingVertical: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            textAlign: 'center',
                            marginBottom: 20,
                          }}>
                          {item !== '' ? (
                            <Button
                              variant={'bold'}
                              textStyleOverride={{ color: 'red' }}
                              onPress={() => {
                                tapSound();
                                setSelectedAmount(selectedAmount => [
                                  item,
                                  ...selectedAmount,
                                ]);
                                setAmountEnter('');
                                setCustomerGivenAmount(
                                  prevAmount => prevAmount + item,
                                );
                              }}
                              Color={
                                selected
                                  ? color.palette[ThemeName].button_text
                                  : color.palette[ThemeName].body_text
                              }
                              title={`$${item} x${selectedAmount.filter(amt => amt === item)
                                  .length
                                }`}
                              style={{
                                width: '70%',
                                height: 50,
                                textAlign: 'center',
                                backgroundColor: selected
                                  ? color.palette[ThemeName].continue_button
                                  : 'transparent',
                                borderWidth: selected ? 0 : 1,
                                borderColor: '#000',
                                borderRadius: 5,
                                fontSize: 25,
                                gap: 5,
                              }}
                            />
                          ) : (
                            <View
                              style={{
                                width: '70%',
                                height: 50,
                                flexDirection: 'row',
                                textAlign: 'center',
                                backgroundColor: 'transparent',
                                borderWidth: 1,
                                borderColor: '#000',
                                borderRadius: 5,
                                fontSize: 25,
                                gap: 5,
                              }}>
                              <Text
                                style={{
                                  width: '23%',
                                  height: '100%',
                                  fontSize: 25,
                                  paddingTop: 10,
                                  paddingLeft: 5,
                                  fontFamily: typography.medium,
                                }}
                                key={index}>
                                $
                              </Text>
                              <TextInput
                                keyboardType="number-pad"
                                value={amountEnter}
                                onChangeText={text => {
                                  setSelectedAmount([]);
                                  setAmountEnter(text);
                                  setCustomerGivenAmount(parseFloat(text));
                                }}
                                style={{
                                  borderBottomWidth: 1,
                                  borderBottomColor: '#000',
                                  width: '65%',
                                  height: '90%',
                                  fontSize: 24,
                                  padding: 0,
                                  textAlign: 'center',
                                }}
                              />
                            </View>
                          )}
                        </Pressable>
                      );
                    })}
                  </View>
                )}
                <View
                  style={{
                    backgroundColor: '#d3d3d3',
                    width: '100%',
                    height: 2,
                  }}></View>
                <View style={styles.amount}>
                  <View style={styles.amount_box}>
                    <Text style={styles.amount_right_text}>
                      {English.modals.paymentModal.total_count.text}
                    </Text>
                    <Text style={styles.amount_left_text}>
                      ${totalPay ? totalPay : '0.00'}
                    </Text>
                  </View>

                  <View style={styles.amount_box}>
                    <Text style={styles.amount_right_text}>
                      {English.modals.paymentModal.total_count.text2}
                    </Text>
                    <Text style={styles.amount_left_text}>
                      $
                      {amountEnter === ''
                        ? customerGivenAmount
                          ? customerGivenAmount.toFixed(2)
                          : '0.00'
                        : parseFloat(amountEnter).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.amount_box}>
                    <Text
                      style={[
                        styles.amount_right_text,
                        {
                          color:
                            changeText() === 'Balance Due'
                              ? color.palette.red
                              : color.palette.neonGreen,
                        },
                      ]}>
                      {changeText()}
                    </Text>
                    <Text style={styles.amount_left_text}>
                      ${calculateBalance()}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#d3d3d3',
                    width: '100%',
                    height: 2,
                  }}></View>
                <View style={styles.btn}>
                  {selectedInd === 1 && (
                    <Button
                      title={English.modals.paymentModal.buttons.button_text}
                      style={[
                        styles.button,
                        {
                          backgroundColor:
                            color.palette[ThemeName].other_button,
                          width: '30%',
                        },
                        { marginRight: 29 },
                      ]}
                      onPress={clearAmount}
                    />
                  )}
                  <Button
                    title={English.modals.paymentModal.buttons.button_text2}
                    style={[
                      styles.button,
                      {
                        backgroundColor: color.palette[ThemeName].cancel_button,
                        width: selectedInd === 0 ? '45%' : '30%',
                      },
                      { marginRight: 29 },
                    ]}
                    onPress={() => {
                      setSelectedInd(0);
                      clearAmount();
                      onClose();
                    }}
                  />
                  <Button
                    title={English.modals.paymentModal.buttons.button_text3}
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          color.palette[ThemeName].continue_button,
                        width: selectedInd === 0 ? '45%' : '30%',
                      },
                    ]}
                    onPress={() => {
                      handleSubmit();
                    }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '95%',
    minHeight: '65%',
    backgroundColor: palette.white,
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: '10%',
    gap: 4,
  },
  body: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    gap: 3,
  },
  cashbox0: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  cashbox: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingTop: 15,
  },
  amount: {
    width: '92%',
    alignContent: 'center',
    paddingTop: 15,
    gap: 5,
  },
  amount_box: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  amount_right_text: {
    fontSize: 18,
    color: 'black',
    flex: 1,
    fontFamily: typography.regular,
  },
  amount_left_text: {
    fontSize: 20,
    width: '20%',
    color: 'black',
    textAlign: 'right',
    fontFamily: typography.anonyms_regular,
  },
  btn: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    fontSize: 20,
    fontFamily: typography.semibold,
  },
});
