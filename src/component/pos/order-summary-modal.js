import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {palette} from '../../theme/palette';
import {Divider, Vertical} from '../../ui-kit';
import moment from 'moment';
import {color, typography} from '../../theme';
import {useSelector} from 'react-redux';
import {isArray} from 'lodash';
import {English} from '../../utils/en';

const OrderSummaryModal = ({
  isVisible,
  onClose,
  onSubmit,
  cart,
  phoneName,
  from_orderScreen,
  loader,
  preview,
  storeDetails,
  merchant_data,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const clerkData = useSelector(state => state.auth.clerk_data);
  const [fomattedSec, setFormattedSec] = useState();
  const {payment_state, order_type, balance_amount} = useSelector(
    state => state.status,
  );
  const ThemeName = useSelector(state => state.auth.selected_Theme_name);

  useEffect(() => {
    const time = moment(from_orderScreen?.bill_time, 'hh:mm A');
    setFormattedSec(time);
    setCurrentDateTime(moment());
  }, [from_orderScreen?.bill_time]);

  if (!currentDateTime) {
    return null;
  }

  const calculateSubtotal = () => {
    return cart?.reduce((sum, item) => sum + parseFloat(item.price), 0);
  };

  const calculateTax = subtotal => {
    return subtotal * 0.085;
  };

  const calculateDeliveryFee = subtotal => {
    return subtotal * 0.04;
  };

  const calculateDiscount = subtotal => {
    return subtotal * 0.0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const deliveryFee = calculateDeliveryFee(subtotal);
    const discountValue = calculateDiscount(subtotal);
    return subtotal + tax;
  };

  const handleSubmit = async () => {
    const cardData = cart.map(item => {
      const filteredSubItems = item.subItem.filter(
        subItem => subItem.extra || subItem.no,
      );
      const updateData =
        filteredSubItems.length > 0
          ? filteredSubItems.map(subItem => ({...subItem, strike: false}))
          : [];

      return {
        item_id: item.item_id,
        name: item.name,
        price: item.price,
        extra_data: item?.extraData,
        no_data: item?.nodata,
        notes:
          item?.notes !== null
            ? [
                {
                  text: item?.notes,
                  strike: false,
                },
              ]
            : [],
        sub_item: updateData,
        item_strike: false,
      };
    });

    const orderData = {
      order_date: moment().format('YYYY-MM-DD'),
      order_time: moment().format('hh:mm A'),
      order_seconds: moment().format('ss'),
      store_name: clerkData?.store_id.store_name || storeDetails?.store_name,
      store_id: clerkData ? clerkData?.store_id._id : storeDetails?._id,
      cusomer_name: phoneName?.name,
      phone: phoneName?.phone,
      discount: calculateDiscount(calculateSubtotal())?.toFixed(2),
      order_data: cardData,
      order_status: 'Accepted',
      order_type: order_type,
      pay_type: payment_state,
      sub_total: calculateSubtotal()?.toFixed(2),
      tax: calculateTax(calculateSubtotal())?.toFixed(2),
      total_price: calculateTotal()?.toFixed(2),
      balance_amount: balance_amount,
    };

    onSubmit(orderData);
  };

  const formatPhoneNumber = input => {
    const cleaned = ('' + input).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    return match
      ? [match[1], match[2], match[3]].filter(Boolean).join('-')
      : input;
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: color.palette[ThemeName].layout},
          ]}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text
              style={[
                styles.orderNumber,
                {marginVertical: 0, color: color.palette[ThemeName].body_text},
              ]}>
              {' '}
              {from_orderScreen ? from_orderScreen?.order_type : order_type}
            </Text>

            <Text
              style={[
                styles.orderNumber,
                {
                  marginVertical: 0,
                  color: color.palette[ThemeName].body_text,
                  //   fontSize: 19,
                },
              ]}>
              {from_orderScreen?.customer_name || phoneName?.name}
            </Text>
            {phoneName?.phone || from_orderScreen?.phone ? (
              <Text
                style={[
                  styles.orderNumber,
                  {
                    marginVertical: 0,
                    color: color.palette[ThemeName].body_text,
                    //   fontSize: 19,
                  },
                ]}>
                {(phoneName?.phone || from_orderScreen?.phone) &&
                  ` +1 ${formatPhoneNumber(
                    phoneName?.phone || from_orderScreen?.phone,
                  )}`}
              </Text>
            ) : null}

            <Text
              style={[
                styles.orderNumber,
                {marginVertical: 0, color: color.palette[ThemeName].body_text},
              ]}>
              {English.modals.order_summary.text} #:{' '}
              {from_orderScreen?.order_id
                ? from_orderScreen?.order_id
                : English.modals.order_summary.text2}
            </Text>
            <Vertical size={10} />
            <Divider
              variant="solid"
              style={{borderColor: color.palette.black}}
            />
            <Vertical size={9} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
              }}>
              <Text
                style={[
                  styles.orderNumber,
                  {fontSize: 18, color: color.palette[ThemeName].body_text},
                ]}>
                {merchant_data?.merchant_name}, {storeDetails?.store_name || ''}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                // gap: 10,
              }}>
              <Text
                style={[
                  styles.orderNumber,

                  {
                    fontSize: 18,
                    color: color.palette[ThemeName].body_text,
                    // lineHeight: 1.4,
                  },
                ]}>
                {storeDetails?.store_street || ''}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',

                // gap: 10,
              }}>
              <Text
                style={[
                  styles.orderNumber,
                  {fontSize: 18, color: color.palette[ThemeName].body_text},
                ]}>
                {storeDetails?.store_city || ''}{' '}
                {storeDetails?.store_state || ''}{' '}
                {storeDetails?.store_zip_code || ''}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                // gap: 10,
              }}>
              <Text
                style={[
                  styles.orderNumber,
                  {fontSize: 18, color: color.palette[ThemeName].body_text},
                ]}>
                +1 {formatPhoneNumber(storeDetails?.store_phone || '')}
              </Text>
            </View>

            <Vertical size={10} />
            <Divider
              variant="solid"
              style={{borderColor: color.palette.black}}
            />
            <Vertical size={9} />
            <View style={styles.textRow}>
              <Text
                style={[
                  styles.textBefore,
                  {color: color.palette[ThemeName].body_text},
                ]}>
                Order Placed:
              </Text>
              <Text
                style={[
                  styles.textAfter,
                  {color: color.palette[ThemeName].body_text},
                ]}>
                {from_orderScreen
                  ? from_orderScreen?.bill_date
                  : currentDateTime.format('YYYY-MM-DD')}{' '}
                {from_orderScreen
                  ? moment(fomattedSec).format('hh:mm A')
                  : currentDateTime.format('hh:mm A')}
              </Text>
            </View>

            <Vertical size={5} />
            <Divider style={{borderColor: color.palette.black}} />
            <View style={styles.separator} />
            {cart && cart?.length != null
              ? cart?.map((item, index) => (
                  <View key={'$' + index.toString()}>
                    <Vertical size={5} />
                    <View style={[styles.textRow]}>
                      <Text
                        style={[
                          styles.textAll,
                          {color: color.palette[ThemeName].body_text},
                        ]}>
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          styles.textAfter2,
                          {color: color.palette[ThemeName].body_text},
                        ]}>
                        ${parseFloat(item.price).toFixed(2)}
                      </Text>
                    </View>
                    {item?.extraData !== '' && item?.extraData ? (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          marginTop: 1,
                        }}>
                        <View
                          style={{
                            flex: 0.25,
                            alignItems: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontFamily: typography.medium,
                              fontSize: 12,
                              color: color.palette[ThemeName].mods_text,
                            }}>
                            -Extras:
                          </Text>
                        </View>
                        <View style={{flex: 0.7}}>
                          <Text
                            style={{
                              fontFamily: typography.medium,
                              fontSize: 12,
                              color: color.palette[ThemeName].mods_text,
                              marginLeft: 8,
                            }}>
                            {item?.extraData}
                          </Text>
                        </View>
                      </View>
                    ) : null}

                    {item?.nodata !== '' && item?.nodata ? (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          marginTop: 1,
                        }}>
                        <View
                          style={{
                            flex: 0.25,
                            alignItems: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontFamily: typography.medium,
                              fontSize: 12,
                              color: color.palette[ThemeName].mods_text,
                            }}>
                            -No:
                          </Text>
                        </View>
                        <View style={{flex: 0.7}}>
                          <Text
                            style={{
                              fontFamily: typography.medium,
                              fontSize: 12,
                              color: color.palette[ThemeName].mods_text,
                              marginLeft: 8,
                            }}>
                            {item?.nodata}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                    {item?.notes ? (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          marginTop: 1,
                        }}>
                        <View
                          style={{
                            flex: 0.25,
                            alignItems: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontFamily: typography.medium,
                              fontSize: 12,
                              color: color.palette[ThemeName].mods_text,
                            }}>
                            -Note:
                          </Text>
                        </View>
                        <View style={{flex: 0.7}}>
                          <Text
                            style={{
                              fontFamily: typography.medium,
                              fontSize: 12,
                              color: color.palette[ThemeName].mods_text,
                              marginLeft: 8,
                            }}>
                            {item?.notes}
                          </Text>
                        </View>
                      </View>
                    ) : null}

                    {/* <Divider variant="dotted" /> */}
                    {index + 1 === cart?.length ? null : (
                      <>
                        <Vertical size={5} />
                        <Divider variant="dotted" />
                      </>
                    )}
                  </View>
                ))
              : from_orderScreen?.items_from_order_summary?.map(
                  (item, index) => {
                    return (
                      <View key={'%' + index.toString()}>
                        <Vertical size={5} />
                        <View style={styles.textRow}>
                          <Text
                            style={[
                              styles.textAll,
                              {color: color.palette[ThemeName].body_text},
                            ]}>
                            {item.name}
                          </Text>
                          <Text
                            style={[
                              styles.textAfter2,
                              {color: color.palette[ThemeName].body_text},
                            ]}>
                            ${parseFloat(item.price)?.toFixed(2)}
                          </Text>
                        </View>
                        {item?.extra_data !== '' && item?.extra_data ? (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              marginTop: 1,
                            }}>
                            <View
                              style={{
                                flex: 0.25,
                                alignItems: 'flex-end',
                              }}>
                              <Text
                                style={{
                                  fontFamily: typography.medium,
                                  fontSize: 12,
                                  color: color.palette[ThemeName].mods_text,
                                }}>
                                -Extras:
                              </Text>
                            </View>
                            <View style={{flex: 0.7}}>
                              <Text
                                style={{
                                  fontFamily: typography.medium,
                                  fontSize: 12,
                                  color: color.palette[ThemeName].mods_text,
                                  marginLeft: 8,
                                }}>
                                {item?.extra_data}
                              </Text>
                            </View>
                          </View>
                        ) : null}

                        {item?.no_data && item?.no_data !== '' ? (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              marginTop: 1,
                            }}>
                            <View
                              style={{
                                flex: 0.25,
                                alignItems: 'flex-end',
                              }}>
                              <Text
                                style={{
                                  fontFamily: typography.medium,
                                  fontSize: 12,
                                  color: color.palette[ThemeName].mods_text,
                                }}>
                                -No:
                              </Text>
                            </View>
                            <View style={{flex: 0.7}}>
                              <Text
                                style={{
                                  fontFamily: typography.medium,
                                  fontSize: 12,
                                  color: color.palette[ThemeName].mods_text,
                                  marginLeft: 8,
                                }}>
                                {item?.no_data}
                              </Text>
                            </View>
                          </View>
                        ) : null}
                        {item?.notes && item?.notes > 0 ? (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              marginTop: 1,
                            }}>
                            <View
                              style={{
                                flex: 0.25,
                                alignItems: 'flex-end',
                              }}>
                              <Text
                                style={{
                                  fontFamily: typography.medium,
                                  fontSize: 12,
                                  color: color.palette[ThemeName].mods_text,
                                }}>
                                -Note:
                              </Text>
                            </View>
                            <View style={{flex: 0.7}}>
                              <Text
                                style={{
                                  fontFamily: typography.medium,
                                  fontSize: 12,
                                  color: color.palette[ThemeName].mods_text,
                                  marginLeft: 8,
                                }}>
                                {}
                                {item?.notes && !isArray(item?.notes)
                                  ? item?.notes
                                  : item?.notes?.[0]?.text || ''}
                              </Text>
                            </View>
                          </View>
                        ) : null}

                        {index + 1 ===
                        from_orderScreen?.items_from_order_summary
                          ?.length ? null : (
                          <>
                            <Vertical size={5} />
                            <Divider variant="dotted" />
                          </>
                        )}
                      </View>
                    );
                  },
                )}
            <Vertical size={5} />
            <View style={styles.footer}>
              <Divider style={{borderColor: color.palette.black}} />
              <Vertical size={12} />
              <View style={styles.textRow}>
                <Text
                  style={[
                    styles.textAll,
                    {color: color.palette[ThemeName].body_text, fontSize: 16},
                  ]}>
                  {English.modals.order_summary.total_count.text}
                </Text>
                <Text
                  style={[
                    styles.textAfter,
                    {
                      fontFamily: typography.anonyms_bold,
                      color: color.palette[ThemeName].body_text,
                    },
                  ]}>
                  $
                  {from_orderScreen
                    ? from_orderScreen?.sub_total
                    : calculateSubtotal()?.toFixed(2)}
                </Text>
              </View>
              <View style={styles.textRow}>
                <Text
                  style={[
                    styles.textAll,
                    {color: color.palette[ThemeName].body_text, fontSize: 16},
                  ]}>
                  {English.modals.order_summary.total_count.text2}
                </Text>
                <Text
                  style={[
                    styles.textAfter,
                    {
                      fontFamily: typography.anonyms_bold,
                      color: color.palette[ThemeName].body_text,
                    },
                  ]}>
                  $
                  {from_orderScreen
                    ? from_orderScreen?.tax
                    : calculateTax(calculateSubtotal())?.toFixed(2)}
                </Text>
              </View>
              <View style={styles.textRow}>
                <Text
                  style={[
                    styles.textTotal,
                    {color: color.palette[ThemeName].body_text},
                  ]}>
                  {English.modals.order_summary.total_count.text3}
                </Text>
                <Text
                  style={[
                    styles.textToatlAfter,
                    {
                      fontFamily: typography.anonyms_bold,
                      color: color.palette[ThemeName].body_text,
                    },
                  ]}>
                  $
                  {from_orderScreen
                    ? from_orderScreen?.total_price
                    : calculateTotal()?.toFixed(2)}
                </Text>
              </View>
              <Vertical size={12} />
              <Divider
                variant="solid"
                style={{borderColor: color.palette.black}}
              />
            </View>
          </ScrollView>
          {!preview ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  {backgroundColor: color.palette[ThemeName].cancel_button},
                ]}
                onPress={onClose}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: color.palette[ThemeName].button_text},
                  ]}>
                  {English.modals.order_summary.buttons.button_text}
                </Text>
              </TouchableOpacity>
              {loader ? (
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    {backgroundColor: color.palette[ThemeName].continue_button},
                  ]}>
                  <ActivityIndicator size="small" color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    {backgroundColor: color.palette[ThemeName].continue_button},
                  ]}
                  onPress={handleSubmit}>
                  <Text
                    style={[
                      styles.buttonText,
                      {color: color.palette[ThemeName].button_text},
                    ]}>
                    {English.modals.order_summary.buttons.button_text2}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.buttonContainer1}>
              <TouchableOpacity
                style={[
                  styles.cancelButton1,
                  {backgroundColor: color.palette[ThemeName].other_button},
                ]}
                onPress={onClose}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: color.palette[ThemeName].button_text},
                  ]}>
                  {English.modals.order_summary.buttons.button_text3}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default OrderSummaryModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 339,
    backgroundColor: palette.white,
    borderRadius: 10,

    height: '90%',
    justifyContent: 'space-between',
    zIndex: 3,
  },
  modalHeader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: typography.medium,
    color: palette.black,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  orderNumber: {
    fontSize: 24,
    fontFamily: typography.regular,
    textAlign: 'center',
    // marginVertical: 2,
    color: palette.black,
  },

  StoreKey: {
    fontSize: 18,
    fontFamily: typography.regular,
    textAlign: 'center',
    marginVertical: 2,
    color: palette.grey,
  },

  footer: {
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 38,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 38,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  cancelButton: {
    backgroundColor: palette.btn_yellow,
    padding: 13,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton1: {
    backgroundColor: palette.btn_yellow,
    padding: 13,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: palette.btnColor,
    padding: 13,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: palette.white,
    fontFamily: typography.medium,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textTotal: {
    fontFamily: typography.semibold,
    fontSize: 17,
    color: palette.black,
  },
  textToatlAfter: {
    fontFamily: typography.bold,
    fontSize: 16,
    color: palette.black,
  },
  textBefore: {
    fontFamily: typography.medium,
    fontSize: 16,
    color: palette.black,
  },
  textAfter: {
    fontFamily: typography.medium,
    fontSize: 16,
    color: palette.black,
  },
  textAfter1: {
    fontFamily: typography.medium,
    fontSize: 14,
    color: palette.gray_ordersummary,
  },
  textAfter2: {
    fontFamily: typography.anonyms_bold,
    fontSize: 16,
    color: palette.black,
  },
  textAll: {
    fontFamily: typography.medium,
    fontSize: 16,
    color: palette.black,
  },
});
