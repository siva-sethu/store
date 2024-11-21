import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    Pressable,
    ImageBackground,
    Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ItemCancelModal from '../../component/pos/item-cancel-modal';
import Mods from '../../component/pos/mods';
import { color, typography } from '../../theme';
import { verticalScale } from '../../utils/responsive';
import CustomerDetailsModal from '../../component/pos/customer-details-modal';
import OrderSummaryModal from '../../component/pos/order-summary-modal';
import { palette } from '../../theme/palette';
import { Divider, Vertical } from '../../ui-kit';
import Toast from 'react-native-simple-toast';
import { SearchComponent } from '../../component/common/search';
import { SwipeListView } from 'react-native-swipe-list-view';
import PaymentModal from '../../component/pos/payment-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createOrderApi } from '../../api';
import useAuth from '../../hooks/use-auth';
import { addCart, totalAmountCalFunc } from '../../redux/slice/cart';
import { English } from '../../utils/en';
import Sound from 'react-native-sound';
import useSound from '../../hooks/use-sound';

const Pos = () => {
    const { tapSound, swooshSound, errorSound, successSound } = useSound();
    const scrollViewRef = useRef(null);
    const dispatch = useDispatch();
    const { merchantHeader } = useAuth();
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { cart_item } = useSelector(state => state.cart);
    const [cart, setCart] = useState(cart_item?.length ? cart_item : []);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isDeleteAllModalVisible, setDeleteAllModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [modsVisible, setModsVisible] = useState(false);
    const [selectedMods, setSelectedMods] = useState(null);
    const [customerDetailsVisible, setCustomerDetailsVisible] = useState(false);
    const [orderSummaryVisible, setOrderSummaryVisible] = useState(false);
    const [namePhone, setNamePhone] = useState('');
    const [selectedModsInd, setSelectedModInd] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const { offlineData, categories } = useSelector(state => state.items);
    const { store_details } = useSelector(state => state.auth);
    const [loader, setLoader] = useState(false);
    const [rowOpen, setRowOpen] = useState(false);
    const [paymentVisible, setPaymentVisible] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [contentWidth, setContentWidth] = useState(0);
    const [layoutWidth, setLayoutWidth] = useState(0);
    const [leftArrowDisabled, setLeftArrowDisabled] = useState(true);
    const [rightArrowDisabled, setRightArrowDisabled] = useState(false);
    const [storeDetails, setstoreDetails] = useState(null);
    const ThemeName = useSelector(state => state.auth.selected_Theme_name);
    const uiTheme = useSelector(state => state.auth);
    const { merchant_data } = useSelector(state => state.auth);
    const [selectedInd, setSelectedInd] = useState(0);
    const [customerSelectedInd, setCustomerSelectedInd] = useState(0);

    const getMerchantID = useCallback(async () => {
        const storeName = await AsyncStorage.getItem('storeName');
        return { storeName };
    }, []);

    useEffect(() => {
        const API = async () => {
            const ids = JSON.parse(await AsyncStorage.getItem('storeName'));
            if (ids) {
                const storeData = ids;
                setstoreDetails(storeData);
            }
        };

        API();
    }, [getMerchantID]);

    const flattenedData = useMemo(() => {
        return offlineData?.reduce((fir, cur) => {
            if (selectedCategory === 'All' || cur.category === selectedCategory) {
                return [...fir, ...cur.itemsData];
            }
            return fir;
        }, []);
    }, [offlineData, selectedCategory]);

    useEffect(() => {
        const filteredDatas = flattenedData?.filter(item =>
            item.name.toLowerCase().includes(searchText?.toLowerCase()),
        );

        setFilteredData(filteredDatas);
    }, [searchText, flattenedData]);

    useEffect(() => {
        setLeftArrowDisabled(scrollPosition <= 0);
        setRightArrowDisabled(scrollPosition + layoutWidth >= contentWidth);
    }, [scrollPosition, contentWidth, layoutWidth]);

    const addToCart = item => {
        let data = { ...item, animation: new Animated.Value(0) };
        setCart([...cart, data]);
        dispatch(addCart([...cart, data]));
    };

    const handleDelete = () => {
        const newCart = [...cart];
        newCart.splice(selectedIndex, 1);
        setCart(newCart);
        dispatch(addCart(newCart));
        setDeleteModalVisible(false);
    };

    const calculateSubtotal = () => {
        return cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
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

    const onSingleTap = (item, index) => {
        setModsVisible(true);
        setSelectedMods(item);
        setSelectedModInd(index);
    };

    const customer_modal_close = () => {
        tapSound();
        setCustomerDetailsVisible(false);
        setCustomerSelectedInd(0);
    };
    const customer_modal_submit = e => {
        tapSound();
        setCustomerSelectedInd(0);
        setCustomerDetailsVisible(false);
        setNamePhone(e);
        setOrderSummaryVisible(true);
    };

    const payment_modal_close = () => {
        tapSound();
        setPaymentVisible(false);
    };

    const payment_modal_submit = () => {
        tapSound();
        setPaymentVisible(false);
        setSelectedInd(0);
        setCustomerDetailsVisible(true);
    };

    const handleItemTap = (item, index) => {
        if (rowOpen) {
            setRowOpen(false);
        } else {
            onSingleTap(item, index);
        }
    };

    const scrollLeft = () => {
        const newScrollPosition = Math.max(0, scrollPosition - 100);
        setScrollPosition(newScrollPosition);
        scrollViewRef.current.scrollTo({ x: newScrollPosition, animated: true });
    };

    const scrollRight = () => {
        const newScrollPosition = scrollPosition + 100;
        setScrollPosition(newScrollPosition);
        scrollViewRef.current.scrollTo({ x: newScrollPosition, animated: true });
    };

    const payFunc = () => {
        tapSound();
        if (cart.length > 0) {
            setPaymentVisible(true);
            dispatch(totalAmountCalFunc(calculateTotal().toFixed(2)));
        } else {
            Toast.show(English.pos_tab.select_item_tost, Toast.SHORT);
            errorSound();
        }
    };

    const clearFunc = () => {
        // swooshRingtone.current.play(success => {
        //   if (success) {
        //     console.log('Successfully finished playingaasdsa');
        //   } else {
        //     setRingtoneFailed(Math.random());
        //     console.log('Playback failed due to audio decoding errors');
        //   }
        // });
        swooshSound();
        setCart([]);
        dispatch(addCart([]));
        setSearchText('');
        setDeleteAllModalVisible(false);
        setOrderSummaryVisible(false);
    };

    const animateRow = index => {
        Animated.timing(cart[index].animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleSelectedItem = useCallback((item, index, rowOpen) => {
        const translateX = item.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -300],
        });

        return (
            <Pressable
                style={{
                    backgroundColor: color.palette[ThemeName].layout,
                    paddingHorizontal: 10,
                }}
                onPress={() => {
                    tapSound();
                    if (rowOpen) {
                        setRowOpen(false);
                    } else {
                        handleItemTap(item, index);
                    }
                }}>
                <Animated.View style={[{ transform: [{ translateX }] }]}>
                    <View style={styles.cartItem}>
                        <Text
                            numberOfLines={1}
                            style={[
                                styles.cartItemName,
                                { color: color.palette[ThemeName].body_text, width: '70%' },
                            ]}>
                            {item.name}
                        </Text>
                        <Text
                            style={[
                                styles.cartItemPrice,
                                { color: color.palette[ThemeName].body_text },
                            ]}>
                            ${item.price}
                        </Text>
                    </View>
                    {item?.extraData !== '' && item?.extraData ? (
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 1 }}>
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
                            <View style={{ flex: 0.7 }}>
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
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 1 }}>
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
                            <View style={{ flex: 0.7 }}>
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
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 1 }}>
                            <View
                                style={{
                                    flex: 0.25,
                                    alignItems:'flex-end',
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
                            <View style={{ flex: 0.7 }}>
                                <Text
                                    style={{
                                        fontFamily: typography.medium,
                                        fontSize:12,
                                        color: color.palette[ThemeName].mods_text,
                                        marginLeft: 8,
                                    }}>
                                    {item?.notes}
                                </Text>
                            </View>
                        </View>
                    ) : null}
                    <Vertical size={10} />
                    <Divider />
                </Animated.View>
            </Pressable>
        );
    }, []);

    const handleDone = () => {
        tapSound();
        setModsVisible(false);
        let data = [...cart];
        let extradata = '';
        let nodata = '';
        selectedMods?.subItem?.map((item, index) => {
            if (item?.extra) {
                extradata = extradata + item?.name + ', ';
            } else if (item?.no) {
                nodata = nodata + item?.name + ', ';
            }
        });
        extradata = extradata.replace();
        nodata = nodata.replace();
        data[selectedModsInd] = {
            ...selectedMods,
            extraData: extradata,
            nodata: nodata,
        };
        setCart(data);
        dispatch(addCart(data));
    };

    const handleOnSubmit = e => {
        tapSound();
        setLoader(true);
        console.log('payload', e.order_data);
        createOrderApi(e, merchantHeader)
            .then(res => {
                console.log('res', res);
                if (res.success) {
                    setLoader(false);
                    setOrderSummaryVisible(false);
                    setCart([]);
                    dispatch(addCart([]));
                    successSound();
                    Toast.show(English?.pos_tab?.kot_successMessage, Toast.SHORT);
                    return;
                }
            })
            .catch(err => {
                console.log('err', err);
                errorSound();
                setLoader(false);
                Toast.show(
                    `${err?.response?.data?.message || err?.message}`,
                    Toast.SHORT,
                );
            });
    };

    const renderHiddenItem = ({ item, index }, rowMap) => {
        return (
            <View
                style={[
                    styles.rowBack,
                    { backgroundColor: color.palette[ThemeName].layout },
                ]}>
                <Pressable
                    hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                    onPress={() => {
                        animateRow(index);
                        setRowOpen(false);

                        swooshSound();
                        setTimeout(() => {
                            rowMap['_' + index.toString()]?.closeRow();
                            const newCart = [...cart];
                            newCart.splice(index, 1);
                            setCart(newCart);
                            dispatch(addCart(newCart));
                        }, 50);
                    }}>
                    <View
                        style={{
                            backgroundColor: color.palette.red,
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            justifyContent: 'center',
                            marginRight: 10,
                        }}>
                        <Image
                            source={require('../../assets/image/bin.png')}
                            style={{
                                height: 19,
                                width: 15,
                                marginRight: 10,
                                tintColor: color.palette.white,
                                alignSelf: 'center',
                                left: 5,
                            }}
                        />
                    </View>
                </Pressable>
            </View>
        );
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: color.palette[ThemeName].background },
            ]}>

            <View style={{ height: '90%', width: '100%' }}>
                <View style={styles.rightColumn}>
                    <View
                        style={[
                            styles.cart,
                            { backgroundColor: color.palette[ThemeName].layout },
                        ]}>
                        <SwipeListView
                            data={cart}
                            renderItem={({ item, index }) =>
                                handleSelectedItem(item, index, rowOpen)
                            }
                            keyExtractor={(item, index) => '_' + index.toString()}
                            key="_"
                            renderHiddenItem={renderHiddenItem}
                            stopLeftSwipe={-0}
                            stopRightSwipe={-100}
                            rightOpenValue={-60}
                            persistentScrollbar
                            onRowOpen={(rowKey, rowMap) => {
                                setRowOpen(true);
                            }}
                        />
                    </View>
                    <Vertical size={10} />
                    <View
                        style={{
                            flex: 0.4,
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            paddingBottom: 10,

                            borderWidth: 0,
                            borderColor: color.palette.borderColor,
                            backgroundColor: color.palette[ThemeName].layout,
                            borderRadius: 10,
                        }}>
                        <Vertical size={5} />
                        <View style={styles.textRow}>
                            <Text
                                style={[
                                    styles.summaryText,
                                    { color: color.palette[ThemeName].body_text, fontSize: 16 },
                                ]}>
                                {English.pos_tab.item_totals.subtotal}
                            </Text>
                            <Text
                                style={[
                                    styles.summaryText,
                                    {
                                        fontFamily: typography.anonyms_bold,
                                        color: color.palette[ThemeName].body_text,
                                    },
                                ]}>
                                ${calculateSubtotal().toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text
                                style={[
                                    styles.summaryText,
                                    { color: color.palette[ThemeName].body_text, fontSize: 16 },
                                ]}>
                                {English.pos_tab.item_totals.tax}
                            </Text>
                            <Text
                                style={[
                                    styles.summaryText,
                                    {
                                        fontFamily: typography.anonyms_bold,
                                        color: color.palette[ThemeName].body_text,
                                    },
                                ]}>
                                ${calculateTax(calculateSubtotal()).toFixed(2)}
                            </Text>
                        </View>
                        <Divider />
                        <View style={styles.textRow}>
                            <Text
                                style={[
                                    styles.totalText,
                                    { color: color.palette[ThemeName].body_text, fontSize: 16 },
                                ]}>
                                {English.pos_tab.item_totals.total}
                            </Text>
                            <Text
                                style={[
                                    styles.totalText,
                                    {
                                        fontFamily: typography.anonyms_bold,
                                        color: color.palette[ThemeName].body_text,
                                    },
                                ]}>
                                ${calculateTotal().toFixed(2)}
                            </Text>
                        </View>
                        <Divider />
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <TouchableOpacity
                                style={[
                                    styles.payButton1,
                                    // { backgroundColor: color.palette[ThemeName].other_button },
                                ]}
                                onPress={() => {
                                    tapSound();
                                    setDeleteAllModalVisible(true);
                                }}>
                                <Text style={styles.payButtonText}>Clear</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.payButton,
                                    // { backgroundColor: color.palette[ThemeName].continue_button },
                                ]}
                                onPress={payFunc}>
                                <Text style={styles.payButtonText}>Pay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <ItemCancelModal
                        isVisible={isDeleteModalVisible}
                        onClose={() => setDeleteModalVisible(false)}
                        onConfirm={handleDelete}
                        itemName={'this item?'}
                    />
                    <Mods
                        visible={modsVisible}
                        onClose={() => {
                            tapSound();
                            setModsVisible(false);
                        }}
                        data={selectedMods}
                        handleDone={handleDone}
                        tapSound={tapSound}
                        selectedModsInd={selectedModsInd}
                        setSelectedMods={setSelectedMods}
                    />

                    <CustomerDetailsModal
                        isVisible={customerDetailsVisible}
                        onClose={customer_modal_close}
                        onSubmit={customer_modal_submit}
                        tapSound={tapSound}
                        selectedInd={customerSelectedInd}
                        setSelectedInd={setCustomerSelectedInd}
                    />

                    <PaymentModal
                        tapSound={tapSound}
                        isVisible={paymentVisible}
                        onClose={payment_modal_close}
                        onSubmit={payment_modal_submit}
                        cartItem={cart}
                        selectedInd={selectedInd}
                        setSelectedInd={setSelectedInd}
                    />

                    <ItemCancelModal
                        isVisible={isDeleteAllModalVisible}
                        onClose={() => setDeleteAllModalVisible(false)}
                        onConfirm={clearFunc}
                        itemName={'all items?'}
                    />

                    <OrderSummaryModal
                        isVisible={orderSummaryVisible}
                        onSubmit={handleOnSubmit}
                        cart={cart}
                        phoneName={namePhone}
                        onClose={() => {
                            tapSound();
                            setOrderSummaryVisible(false);
                        }}
                        storeDetails={storeDetails}
                        merchant_data={merchant_data}
                        loader={loader}
                    />
                </View>
            </View>
        </View>
    );
};

export default Pos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    leftColumn: {
        flex: 1,
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'space-between',
    },
    searchInput: {
        height: 44,
        borderColor: color.palette.borderColor,
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: color.palette.white,
        marginBottom: 10,
        fontFamily: typography.medium,
        fontSize: 16,
        textAlignVertical: 'center',
    },
    containerCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: palette.grey1,
        // borderRadius: 5,
        // paddingVertical: 10,
        // paddingHorizontal: 2,
    },
    arrowButton: {},
    categories: {
        alignItems: 'center',
        gap: 10,
    },
    category: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    selectedCategory: {
        backgroundColor: palette.btnColor,
    },
    categoryText: {
        color: palette.black,
        fontSize: 16,
    },
    selectedCategoryText: {
        color: palette.white,
        fontWeight: 'bold',
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemsGrid: {
        flex: 1,
        width: '100%',
        top: 5,
    },
    item: {
        flex: 1,
        marginVertical: 5,
        backgroundColor: palette.white,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: palette.white_dd,
        marginHorizontal: 5
    },
    itemImage: {
        width: '100%',
        height: verticalScale(150),
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    itemWithoutImage: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    itemName: {
        fontSize: 12,
        color: color.palette.white,
        fontFamily: typography.medium,
        paddingRight: 5,
        textAlign: 'center',
        paddingTop: 15,
    },
    itemPrice: {
        fontSize: 16,
        color: color.palette.white,
        fontFamily: typography.bold,
        paddingRight: 5,
        paddingBottom: 5,
    },
    cart: {
        padding: 2,
        flex: 1,
        paddingTop: 10,
        borderWidth: 0,
        borderColor: color.palette.borderColor,
        backgroundColor: color.palette.white,
        borderRadius: 10,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    cartItemName: {
        fontSize: 16,
        color: palette.black,
        fontFamily: typography.regular,
    },
    cartItemPrice: {
        fontSize: 16,
        color: palette.black,
        fontFamily: typography.anonyms_regular,
    },
    summary: {
        padding: 10,
        borderTopWidth: 1,
        borderColor: palette.white_dd,
        backgroundColor: palette.white,
        width: '100%',
    },
    summaryText: {
        fontSize: 16,
        fontFamily: typography.regular,
        color: palette.black,
    },
    totalText: {
        fontSize: 16,
        fontFamily: typography.medium,
        color: color.palette.black,
    },
    payButton: {
        marginTop: 10,
        padding: 5,
        backgroundColor: '#44B9B1',
        borderRadius: 5,
        alignItems: 'center',
        width: 130,
        height: 40,
    },
    payButton1: {
        marginTop: 10,
        padding: 5,
        backgroundColor: palette.btn_yellow,
        borderRadius: 5,
        alignItems: 'center',
        width: 80,
        height: 35,
    },
    payButtonText: {
        color: palette.black,
        fontSize: 18,
        textAlign: 'center',
    },
    selectedCategoryText: {
        color: palette.white,
    },
    discountBtn: {
        backgroundColor: palette.btn_yellow,
        width: 50,
        height: 40,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    itemWithoutImage: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        // backgroundColor: color.palette.white,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 22,
    },
    hiddenRow: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 15,
    },
    hiddenText: {
        color: 'white',
    },
    visibleRow: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
});
