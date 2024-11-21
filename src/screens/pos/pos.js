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
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedItemData, setSelectedItemData] = useState(null);
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





  const onSingleTap = (item, index) => {
    setModsVisible(true);
    setSelectedMods(item);
    setSelectedModInd(index);
  };





  const handleItemTap = (item, index) => {
    if (rowOpen) {
      setRowOpen(false);
    } else {
      onSingleTap(item, index);
    }
  };



  const clearFunc = () => {

    swooshSound();
    setCart([]);
    dispatch(addCart([]));
    setSearchText('');
    setDeleteAllModalVisible(false);
    setOrderSummaryVisible(false);
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
        }}
       
       >

        
        
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
              <View style={{ flex: 0.7 }}>
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
    extradata = extradata.replace(/,(\s*)$/, '$1');
    nodata = nodata.replace(/,(\s*)$/, '$1');
    data[selectedModsInd] = {
      ...selectedMods,
      extraData: extradata,
      nodata: nodata,
    };
    setCart(data);
  };

  
  

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color.palette[ThemeName].background },
        uiTheme?.rhs_lhs_theme === English.uiTable.uiItem2[0] && {
          flexDirection: 'row-reverse',
          gap: 20,
        },
      ]}>
      <View style={styles.leftColumn}>
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

        
        <ItemCancelModal
          isVisible={isDeleteAllModalVisible}
          onClose={() => setDeleteAllModalVisible(false)}
          onConfirm={clearFunc}
          itemName={'all items?'}
        />

        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.4 }}>
            <View style={{ width: '100%',}}>
              <SearchComponent
                text={searchText}
                setText={setSearchText}
                placeholder={English.pos_tab.search_placeholder}
                borderStyle={{
                  borderRadius: 10,
                  backgroundColor: color.palette[ThemeName].layout,
                  marginBottom: 0
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 5,
            }}>
            <View style={{

              flex: 0.5,
            }}>
              <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                {!searchText?.length ? (
                  <View
                    style={[
                      styles.containerCategory,
                     
                    ]}>
                    
                    <ScrollView
                      ref={scrollViewRef}
                      horizontal
                      style={{ flex: 1 }}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.categories}
                      onScroll={event => {
                        setScrollPosition(event.nativeEvent.contentOffset.x);
                      }}
                      onLayout={event => {
                        const { width } = event.nativeEvent.layout;

                        setLayoutWidth(width);
                      }}
                      onContentSizeChange={(width, height) => {
                        setContentWidth(width);
                      }}
                      scrollEventThrottle={16}>
                      {categories.map(category => (
                        <TouchableOpacity
                          key={category.name}
                          style={[
                            [styles.category],
                            selectedCategory === category.name && [
                              styles.selectedCategory,
                              {
                                backgroundColor:
                                  color.palette[ThemeName].menu_button,
                              },
                            ],
                          ]}
                          onPress={() => {
                            tapSound();
                            setSelectedCategory(category.name);
                          }}>
                          <Text
                            style={[
                              [
                                styles.categoryText,
                                { color: color.palette[ThemeName].menu_button },
                              ],
                              selectedCategory === category.name && [
                                styles.selectedCategoryText,
                                { color: color.palette[ThemeName].menu_background },
                              ],
                            ]}>
                            {category.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                ) : null}
              </View>
            </View>
            <View
              style={{
                flex: 4,
              }}>
              <View style={{
                width: '100%',
                height: '85%',
                backgroundColor: color.palette[ThemeName].layout,
                borderRadius: 10,
              }}>
                {!store_details ? (
                  <View>
                    {filteredData?.length ? (
                      <FlatList
                        data={filteredData}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                            style={
                              styles.item

                            }
                            onPress={() => {
                              tapSound();
                              addToCart(item);
                            }}
                            
                            
                            >
                            {uiTheme.items_theme !== English.uiTable.uiItem1[2] ? (
                              <ImageBackground
                                source={{ uri: item?.image }}
                                borderRadius={10}
                                style={[
                                  styles.itemImage,
                                  uiTheme.items_theme ===
                                  English.uiTable.uiItem1[1] && {
                                    height: verticalScale(105),
                                  },
                                ]}>
                                <View style={styles.overlay}>
                                  <Text
                                    //   numberOfLines={1}
                                    style={styles.itemName}>
                                    {item.name}
                                  </Text>
                                  <Text style={styles.itemPrice}>
                                    ${item.price}
                                  </Text>
                                </View>
                              </ImageBackground>
                            ) : (
                              <View
                                style={[
                                  styles.itemWithoutImage,
                                  {
                                    height: verticalScale(70),
                                    backgroundColor:
                                      color.palette[ThemeName].background,
                                  },
                                ]}>
                                <Text
                                  numberOfLines={1}
                                  style={[
                                    [
                                      styles.itemName,
                                      {
                                        fontSize: 16,
                                        width: '100%',
                                        paddingHorizontal: 5,
                                      },
                                    ],
                                    { color: color.palette[ThemeName].body_text },
                                  ]}>
                                  {item.name}
                                </Text>
                                <Text
                                  style={[
                                    styles.itemPrice,
                                    { color: color.palette[ThemeName].body_text },
                                  ]}>
                                  ${item.price}
                                </Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => item?.item_id}
                        key="!"
                        numColumns={3}
                      />
                    ) : (
                      <View>
                        <Text
                          style={{
                            fontFamily: typography.regular,
                            fontSize: 16,
                            textAlign: 'center',
                            color: color.palette.red,
                            marginTop: 30,
                          }}>
                          Selected store has no items
                        </Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <View>
                    <Text
                      style={{
                        fontFamily: typography.regular,
                        fontSize: 16,
                        textAlign: 'center',
                        color: color.palette.red,
                        marginTop: 30,
                      }}>
                      Please select a store and download store data in Settings
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Pos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flex: 0.3,
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
    backgroundColor: palette.btnColor,
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
    color: palette.white,
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
